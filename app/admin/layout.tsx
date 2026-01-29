"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Building2, LayoutDashboard, Palette, Image, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      for (let attempt = 0; attempt < 5; attempt++) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setLoading(false);
          return;
        }

        if (attempt < 4) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      router.push("/login");
    };
    checkAuth();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", icon: Building2, label: "Brand" },
    { href: "/admin/layout", icon: LayoutDashboard, label: "Layout" },
    { href: "/admin/services", icon: Palette, label: "Services" },
    { href: "/admin/gallery", icon: Image, label: "Gallery" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-900">Ignition Kit</h1>
            <p className="text-sm text-slate-500">Admin Panel</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}

            <button
              onClick={() => setShowUpsellModal(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors relative"
            >
              <Lock className="h-5 w-5" />
              AI Receptionist
              <span className="absolute right-3 top-3 bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-semibold">
                PRO
              </span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-200">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>

      <Dialog open={showUpsellModal} onOpenChange={setShowUpsellModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Lock className="h-6 w-6 text-yellow-500" />
              AI Receptionist
            </DialogTitle>
            <DialogDescription className="text-base pt-4 space-y-4">
              <p className="font-semibold text-slate-900 text-lg">
                Stop Spam, Start Booking
              </p>
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Filters 100% of robocalls automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Books appointments 24/7 without human intervention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Live revenue tracker shows recovered bookings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Answers customer questions instantly</span>
                </li>
              </ul>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                <p className="font-semibold text-slate-900 mb-1">
                  Founding Partner Pricing
                </p>
                <p className="text-2xl font-bold text-primary">$199/month</p>
                <p className="text-sm text-slate-600">Lock in this rate forever</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button size="lg" className="w-full">
              Unlock Founding Partner Access
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUpsellModal(false)}
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
