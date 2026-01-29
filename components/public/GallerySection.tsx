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
