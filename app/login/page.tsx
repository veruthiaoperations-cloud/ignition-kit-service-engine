"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          await supabase.from("profiles").insert({
            user_id: data.user.id,
            business_name: "Your Business Name",
            theme_color: "#3b82f6",
          });

          const defaultSections = [
            { user_id: data.user.id, name: "Hero", slug: "hero", is_visible: true, order_index: 1 },
            { user_id: data.user.id, name: "Services", slug: "services", is_visible: true, order_index: 2 },
            { user_id: data.user.id, name: "Gallery", slug: "gallery", is_visible: true, order_index: 3 },
            { user_id: data.user.id, name: "Reviews", slug: "reviews", is_visible: true, order_index: 4 },
            { user_id: data.user.id, name: "About", slug: "about", is_visible: true, order_index: 5 },
            { user_id: data.user.id, name: "FAQ", slug: "faq", is_visible: true, order_index: 6 },
          ];

          await supabase.from("sections").insert(defaultSections);

          const demoServices = [
            {
              user_id: data.user.id,
              title: "AC Tune-Up",
              description: "Complete air conditioning system inspection and maintenance. Includes filter replacement, coil cleaning, and refrigerant check.",
              price: "Starting at $89",
              order_index: 1,
            },
            {
              user_id: data.user.id,
              title: "Furnace Repair",
              description: "Expert furnace diagnostics and repair. We fix all makes and models. Same-day service available.",
              price: "Starting at $129",
              order_index: 2,
            },
            {
              user_id: data.user.id,
              title: "Emergency Service",
              description: "24/7 emergency HVAC service. No extra charge for nights or weekends.",
              price: "Starting at $149",
              order_index: 3,
            },
          ];

          await supabase.from("services").insert(demoServices);

          router.push("/admin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        router.push("/admin");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignUp
              ? "Start building your service business website"
              : "Sign in to manage your business"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-primary hover:underline"
              disabled={loading}
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
