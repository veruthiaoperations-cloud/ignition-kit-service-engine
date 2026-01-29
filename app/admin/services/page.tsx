"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import { revalidateHomepage } from "@/app/actions";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string | null;
  order_index: number;
}

export default function ServicesManagerPage() {
  const supabase = createClient();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id)
        .order("order_index", { ascending: true });

      if (error) throw error;
      if (data) {
        setServices(data);
      }
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        price: service.price,
      });
    } else {
      setEditingService(null);
      setFormData({ title: "", description: "", price: "" });
    }
    setShowDialog(true);
  };

  const handleSave = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(formData)
          .eq("id", editingService.id);

        if (error) throw error;
        showMessage("Service updated successfully");
      } else {
        const maxOrder =
          services.length > 0
            ? Math.max(...services.map((s) => s.order_index))
            : 0;

        const { error } = await supabase.from("services").insert({
          ...formData,
          user_id: user.id,
          order_index: maxOrder + 1,
        });

        if (error) throw error;
        showMessage("Service added successfully");
      }

      setShowDialog(false);
      await loadServices();
      await revalidateHomepage();
    } catch (error) {
      console.error("Error saving service:", error);
      showMessage("Error saving service");
    }
  };

  const handleDelete = async (service: Service) => {
    if (!confirm(`Delete "${service.title}"?`)) return;

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", service.id);

      if (error) throw error;
      showMessage("Service deleted");
      await loadServices();
      await revalidateHomepage();
    } catch (error) {
      console.error("Error deleting service:", error);
      showMessage("Error deleting service");
    }
  };

  const moveService = async (service: Service, direction: "left" | "right") => {
    const currentIndex = services.findIndex((s) => s.id === service.id);
    if (
      (direction === "left" && currentIndex === 0) ||
      (direction === "right" && currentIndex === services.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    const newServices = [...services];
    const [removed] = newServices.splice(currentIndex, 1);
    newServices.splice(newIndex, 0, removed);

    const updates = newServices.map((s, index) => ({
      id: s.id,
      order_index: index + 1,
    }));

    try {
      for (const update of updates) {
        const { error } = await supabase
          .from("services")
          .update({ order_index: update.order_index })
          .eq("id", update.id);

        if (error) throw error;
      }

      setServices(newServices.map((s, index) => ({ ...s, order_index: index + 1 })));
      await revalidateHomepage();
      showMessage("Service order updated");
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
          <h1 className="text-3xl font-bold text-slate-900">Services Manager</h1>
          <p className="text-slate-500 mt-1">
            Manage your service offerings and pricing
          </p>
        </div>
        <Button onClick={() => openDialog()} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={service.id} className="relative group">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openDialog(service)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(service)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3 line-clamp-3">
                {service.description}
              </CardDescription>
              <p className="text-lg font-semibold text-primary">{service.price}</p>

              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveService(service, "left")}
                  disabled={index === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-slate-500">
                  Position {service.order_index}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveService(service, "right")}
                  disabled={index === services.length - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {services.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Wrench className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No services yet</p>
              <Button onClick={() => openDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Service
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update the service details"
                : "Add a new service to your website"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Service Name</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., AC Tune-Up"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the service"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="e.g., Starting at $89"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingService ? "Update" : "Add"} Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
