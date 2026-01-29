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
  console.log("=== HOMEPAGE DATA FETCH START ===");
  console.log("Timestamp:", new Date().toISOString());

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
    const supabase = await createClient();
    console.log("Supabase client created");

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("business_name, phone, email, address, theme_color")
      .limit(1)
      .maybeSingle();

    console.log("Profile query result:", { data: profileData, error: profileError });

    if (profileError) {
      console.error("PROFILE ERROR:", profileError.message, profileError.code);
    } else if (profileData) {
      profile = profileData;
      console.log("Profile loaded successfully:", profile.business_name);
    } else {
      console.log("No profile found in database - using defaults");
    }

    const { data: sectionsData, error: sectionsError } = await supabase
      .from("sections")
      .select("id, slug, name, is_visible, order_index")
      .eq("is_visible", true)
      .order("order_index", { ascending: true });

    console.log("Sections query result:", { count: sectionsData?.length, error: sectionsError });

    if (sectionsError) {
      console.error("SECTIONS ERROR:", sectionsError.message, sectionsError.code);
    } else {
      visibleSections = (sectionsData || []) as Section[];
      console.log("Sections loaded:", visibleSections.length, visibleSections.map(s => s.slug));
    }

    const { data: servicesData, error: servicesError } = await supabase
      .from("services")
      .select("id, title, description, price, image_url, order_index")
      .order("order_index", { ascending: true });

    console.log("Services query result:", { count: servicesData?.length, error: servicesError });

    if (servicesError) {
      console.error("SERVICES ERROR:", servicesError.message, servicesError.code);
    } else {
      serviceList = (servicesData || []) as Service[];
      console.log("Services loaded:", serviceList.length);
    }

    const { data: galleryData, error: galleryError } = await supabase
      .from("gallery")
      .select("id, image_url, caption, order_index")
      .order("order_index", { ascending: true });

    console.log("Gallery query result:", { count: galleryData?.length, error: galleryError });

    if (galleryError) {
      console.error("GALLERY ERROR:", galleryError.message, galleryError.code);
    } else {
      galleryItems = (galleryData || []) as GalleryItem[];
      console.log("Gallery items loaded:", galleryItems.length);
    }
  } catch (error) {
    console.error("CRITICAL ERROR in HomePage:", error);
  }

  console.log("=== FINAL DATA SUMMARY ===");
  console.log("Profile:", profile.business_name);
  console.log("Sections:", visibleSections.length);
  console.log("Services:", serviceList.length);
  console.log("Gallery:", galleryItems.length);
  console.log("=== HOMEPAGE DATA FETCH END ===");

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
