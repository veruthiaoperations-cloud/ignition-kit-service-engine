"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronUp, ChevronDown } from "lucide-react";
import { revalidateHomepage } from "@/app/actions";

interface Section {
  id: string;
  name: string;
  slug: string;
  is_visible: boolean;
  order_index: number;
}

export default function LayoutManagerPage() {
  const supabase = createClient();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSections();
  }, []);

  const loadSections = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("sections")
        .select("*")
        .eq("user_id", user.id)
        .order("order_index", { ascending: true });

      if (error) throw error;
      if (data) {
        setSections(data);
      }
    } catch (error) {
      console.error("Error loading sections:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (section: Section) => {
    try {
      const { error } = await supabase
        .from("sections")
        .update({ is_visible: !section.is_visible })
        .eq("id", section.id);

      if (error) throw error;

      setSections((prev) =>
        prev.map((s) =>
          s.id === section.id ? { ...s, is_visible: !s.is_visible } : s
        )
      );

      await revalidateHomepage();
      showMessage("Section visibility updated");
    } catch (error) {
      console.error("Error updating section:", error);
      showMessage("Error updating section");
    }
  };

  const moveSection = async (section: Section, direction: "up" | "down") => {
    const currentIndex = sections.findIndex((s) => s.id === section.id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newSections = [...sections];
    const [removed] = newSections.splice(currentIndex, 1);
    newSections.splice(newIndex, 0, removed);

    const updates = newSections.map((s, index) => ({
      id: s.id,
      order_index: index + 1,
    }));

    try {
      for (const update of updates) {
        const { error } = await supabase
          .from("sections")
          .update({ order_index: update.order_index })
          .eq("id", update.id);

        if (error) throw error;
      }

      setSections(newSections.map((s, index) => ({ ...s, order_index: index + 1 })));
      await revalidateHomepage();
      showMessage("Section order updated");
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
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Layout Manager</h1>
        <p className="text-slate-500 mt-1">
          Control which sections appear on your website and their order
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Page Sections</CardTitle>
          <CardDescription>
            Toggle sections on/off and use arrows to reorder them vertically
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                  section.is_visible
                    ? "bg-white border-slate-200"
                    : "bg-slate-50 border-slate-200 opacity-60"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveSection(section, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveSection(section, "down")}
                      disabled={index === sections.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {section.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Position: {section.order_index}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Label
                    htmlFor={`toggle-${section.id}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {section.is_visible ? "Visible" : "Hidden"}
                  </Label>
                  <Switch
                    id={`toggle-${section.id}`}
                    checked={section.is_visible}
                    onCheckedChange={() => toggleVisibility(section)}
                  />
                </div>
              </div>
            ))}
          </div>

          {message && (
            <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
              {message}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Tip:</strong> Hidden sections will not appear on your public website.
          Use the up/down arrows to change the order sections appear on the page.
        </p>
      </div>
    </div>
  );
}
