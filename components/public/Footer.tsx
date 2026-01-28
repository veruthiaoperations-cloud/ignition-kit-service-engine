import { Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  businessName: string;
  phone: string;
  email: string;
  address: string;
}

export function Footer({ businessName, phone, email, address }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{businessName}</h3>
            <p className="text-slate-400 leading-relaxed">
              Professional service you can trust. Available 24/7 for all your
              service needs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {email}
                </a>
              )}
              {address && (
                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>{address}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2 text-slate-400">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Emergency Only</p>
              <p className="text-primary font-semibold mt-3">24/7 Emergency Service</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <p className="mt-2">
            Powered by{" "}
            <span className="text-primary font-semibold">Ignition Kit</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
