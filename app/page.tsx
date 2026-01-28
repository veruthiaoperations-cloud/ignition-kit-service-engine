import { createClient } from "@/utils/supabase/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HeroSection } from "@/components/public/HeroSection";
import { ServicesGrid } from "@/components/public/ServicesGrid";
import { GallerySection } from "@/components/public/GallerySection";
import { AboutSection } from "@/components/public/AboutSection";
import { ReviewsSection } from "@/components/public/ReviewsSection";
import { FAQSection } from "@/components/public/FAQSection";
import { Footer } from "@/components/public/Footer";
import { StickyCallButton } from "@/components/public/StickyCallButton";

interface Section {
  id: string;
  slug: string;
  name: string;
  is_visible: boolean;
  order_index: number;
}

interface Profile {
  business_name: string;
  phone: string;
  email: string;
  address: string;
  theme_color: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string | null;
  order_index: number;
}

interface GalleryItem {
  id: string;
  image_url: string;
  caption: string;
  order_index: number;
}

export default async function HomePage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .limit(1)
    .maybeSingle();

  const profile: Profile = profiles || {
    business_name: "Your Business Name",
    phone: "(555) 123-4567",
    email: "contact@yourbusiness.com",
    address: "123 Main St, City, State 12345",
    theme_color: "#3b82f6",
  };

  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("is_visible", true)
    .order("order_index", { ascending: true });

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("order_index", { ascending: true });

  const { data: gallery } = await supabase
    .from("gallery")
    .select("*")
    .order("order_index", { ascending: true });

  const visibleSections = (sections || []) as Section[];
  const serviceList = (services || []) as Service[];
  const galleryItems = (gallery || []) as GalleryItem[];

  const sectionComponents: Record<string, React.ReactNode> = {
    hero: <HeroSection businessName={profile.business_name} phone={profile.phone} />,
    services: <ServicesGrid services={serviceList} />,
    gallery: <GallerySection items={galleryItems} />,
    about: <AboutSection businessName={profile.business_name} />,
    reviews: <ReviewsSection />,
    faq: <FAQSection />,
  };

  return (
    <ThemeProvider themeColor={profile.theme_color}>
      <main className="min-h-screen">
        {visibleSections.map((section) => (
          <div key={section.id}>{sectionComponents[section.slug]}</div>
        ))}

        <Footer
          businessName={profile.business_name}
          phone={profile.phone}
          email={profile.email}
          address={profile.address}
        />
      </main>

      <StickyCallButton phone={profile.phone} />
    </ThemeProvider>
  );
}
