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

export const dynamic = 'force-dynamic';

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
  console.log("Fetching data for homepage...");

  let profile: Profile = {
    business_name: "Your Business Name",
    phone: "(555) 123-4567",
    email: "contact@yourbusiness.com",
    address: "123 Main St, City, State 12345",
    theme_color: "#3b82f6",
  };

  let visibleSections: Section[] = [];
  let serviceList: Service[] = [];
  let galleryItems: GalleryItem[] = [];

  try {
    const supabase = createClient();

    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    } else if (profiles) {
      profile = profiles;
      console.log("Profile loaded:", profile.business_name);
    }

    const { data: sections, error: sectionsError } = await supabase
      .from("sections")
      .select("*")
      .eq("is_visible", true)
      .order("order_index", { ascending: true });

    if (sectionsError) {
      console.error("Error fetching sections:", sectionsError);
    } else {
      visibleSections = (sections || []) as Section[];
      console.log("Sections loaded:", visibleSections.length);
    }

    const { data: services, error: servicesError } = await supabase
      .from("services")
      .select("*")
      .order("order_index", { ascending: true });

    if (servicesError) {
      console.error("Error fetching services:", servicesError);
    } else {
      serviceList = (services || []) as Service[];
      console.log("Services loaded:", serviceList.length);
    }

    const { data: gallery, error: galleryError } = await supabase
      .from("gallery")
      .select("*")
      .order("order_index", { ascending: true });

    if (galleryError) {
      console.error("Error fetching gallery:", galleryError);
    } else {
      galleryItems = (gallery || []) as GalleryItem[];
      console.log("Gallery items loaded:", galleryItems.length);
    }
  } catch (error) {
    console.error("Error in HomePage:", error);
  }

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
