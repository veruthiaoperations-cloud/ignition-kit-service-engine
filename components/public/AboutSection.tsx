import { Shield, Clock, Award, Users } from "lucide-react";

interface AboutSectionProps {
  businessName: string;
}

export function AboutSection({ businessName }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">About Us</h2>
            <p className="text-xl text-slate-600">
              Your trusted partner for professional service
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-slate-700 leading-relaxed text-center">
              At {businessName}, we pride ourselves on delivering exceptional service
              with integrity and professionalism. Our team of experienced technicians
              is dedicated to ensuring your complete satisfaction on every job, big or small.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Licensed & Insured</h3>
              <p className="text-slate-600 text-sm">
                Fully licensed professionals you can trust
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Response</h3>
              <p className="text-slate-600 text-sm">
                Quick turnaround on all service calls
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Work</h3>
              <p className="text-slate-600 text-sm">
                Exceptional craftsmanship on every project
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Customer First</h3>
              <p className="text-slate-600 text-sm">
                Your satisfaction is our top priority
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
