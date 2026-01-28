import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  businessName: string;
  phone: string;
}

export function HeroSection({ businessName, phone }: HeroSectionProps) {
  const handleCall = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {businessName}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
            Professional, Reliable Service When You Need It Most
          </p>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Fast response times, expert technicians, and customer satisfaction guaranteed.
            Available 24/7 for emergency service calls.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              onClick={handleCall}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now: {phone || "(555) 123-4567"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 h-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => {
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Services
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-slate-400 mt-1">Emergency Service</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">Licensed</p>
              <p className="text-sm text-slate-400 mt-1">& Insured</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-slate-400 mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
