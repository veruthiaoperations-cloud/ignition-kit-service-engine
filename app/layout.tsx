import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("business_name")
    .limit(1)
    .maybeSingle();

  const businessName = profile?.business_name || "Your Business Name";

  return {
    title: `${businessName} | Professional Services`,
    description: `${businessName} - Expert service solutions for your needs. Quality workmanship, competitive pricing, and customer satisfaction guaranteed.`,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
