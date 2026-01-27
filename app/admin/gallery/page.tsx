"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  order_index: number;
}

export default function GalleryManagerPage() {
  const supabase = createClient();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    image_url: "",
    caption: "",
  });

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .eq("user_id", user.id)
        .order("order_index", { ascending: true });

      if (error) throw error;
      if (data) {
        setItems(data);
      }
    } catch (error) {
      console.error("Error loading gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = () => {
    setFormData({ image_url: "", caption: "" });
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const maxOrder =
        items.length > 0 ? Math.max(...items.map((i) => i.order_index)) : 0;

      const { error } = await supabase.from("gallery").insert({
        ...formData,
        user_id: user.id,
        order_index: maxOrder + 1,
      });

      if (error) throw error;
      showMessage("Image added successfully");
      setShowDialog(false);
      loadGallery();
    } catch (error) {
      console.error("Error saving image:", error);
      showMessage("Error saving image");
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("Delete this image?")) return;

    try {
      const { error } = await supabase.from("gallery").delete().eq("id", item.id);

      if (error) throw error;
      showMessage("Image deleted");
      loadGallery();
    } catch (error) {
      console.error("Error deleting image:", error);
      showMessage("Error deleting image");
    }
  };

  const moveItem = async (item: GalleryItem, direction: "left" | "right") => {
    const currentIndex = items.findIndex((i) => i.id === item.id);
    if (
      (direction === "left" && currentIndex === 0) ||
      (direction === "right" && currentIndex === items.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    const newItems = [...items];
    const [removed] = newItems.splice(currentIndex, 1);
    newItems.splice(newIndex, 0, removed);

    const updates = newItems.map((item, index) => ({
      id: item.id,
      order_index: index + 1,
    }));

    try {
      for (const update of updates) {
        const { error } = await supabase
          .from("gallery")
          .update({ order_index: update.order_index })
          .eq("id", update.id);

        if (error) throw error;
      }

      setItems(newItems.map((item, index) => ({ ...item, order_index: index + 1 })));
      showMessage("Gallery order updated");
    } catch (error) {
      console.error("Error updating order:", error);
      showMessage("Error updating order");
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Gallery Manager</h1>
          <p className="text-slate-500 mt-1">
            Showcase your work with a photo gallery
          </p>
        </div>
        <Button onClick={openDialog} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card key={item.id} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-slate-100 flex items-center justify-center">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.caption || "Gallery image"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<div class="flex items-center justify-center w-full h-full"><svg class="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>';
                    }}
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-slate-300" />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {item.caption && (
                <div className="p-3 bg-white">
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              )}
              <div className="flex items-center justify-center gap-2 p-3 border-t bg-slate-50">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveItem(item, "left")}
                  disabled={index === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-slate-500">
                  Position {item.order_index}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveItem(item, "right")}
                  disabled={index === items.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No images yet</p>
              <Button onClick={openDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Image
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Use high-quality images from Pexels or your own photos.
          The left/right arrows let you control the order images appear in the gallery.
        </p>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Image</DialogTitle>
            <DialogDescription>
              Add an image to your gallery. Use a URL from Pexels or another image hosting service.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://images.pexels.com/..."
              />
              <p className="text-xs text-slate-500">
                Find free stock photos at{" "}
                <a
                  href="https://www.pexels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Pexels.com
                </a>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption (Optional)</Label>
              <Input
                id="caption"
                value={formData.caption}
                onChange={(e) =>
                  setFormData({ ...formData, caption: e.target.value })
                }
                placeholder="Describe this image"
              />
            </div>
            {formData.image_url && (
              <div className="border rounded-lg p-2 bg-slate-50">
                <p className="text-xs text-slate-500 mb-2">Preview:</p>
                <div className="aspect-video bg-white rounded overflow-hidden flex items-center justify-center">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<div class="flex items-center justify-center w-full h-full text-slate-400"><span>Invalid image URL</span></div>';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!formData.image_url}>
              Add Image
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
