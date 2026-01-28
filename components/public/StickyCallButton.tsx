"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyCallButtonProps {
  phone: string;
}

export function StickyCallButton({ phone }: StickyCallButtonProps) {
  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 p-4 shadow-lg">
      <Button
        size="lg"
        className="w-full text-lg h-14"
        onClick={handleCall}
      >
        <Phone className="mr-2 h-5 w-5" />
        Call Now: {phone || "(555) 123-4567"}
      </Button>
    </div>
  );
}
