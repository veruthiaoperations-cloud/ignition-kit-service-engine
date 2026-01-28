import { Wrench, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string | null;
}

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  if (services.length === 0) {
    return null;
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Professional service solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Wrench className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600 mb-4 leading-relaxed">
                  {service.description}
                </CardDescription>
                <div className="flex items-center gap-2 text-primary font-semibold text-lg pt-4 border-t">
                  <DollarSign className="h-5 w-5" />
                  {service.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
