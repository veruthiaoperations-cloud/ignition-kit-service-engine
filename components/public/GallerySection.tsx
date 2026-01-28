import { Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Work</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            See the quality and craftsmanship we bring to every project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-video overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.caption || "Gallery image"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLImageElement).parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<div class="flex items-center justify-center w-full h-full bg-slate-200"><svg class="h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>';
                      }
                    }}
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-slate-400" />
                )}
              </div>
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
