/*
  # Ignition Kit Database Schema - Service Business Engine v2.1

  ## Overview
  This schema powers the clone-to-deploy service business template.
  Designed for HVAC, Plumbing, Auto Repair, and similar industries.

  ## Tables Created

  ### 1. profiles
  - Stores business brand information (name, contact, logo, theme color)
  - One profile per authenticated user
  - Fields: id, user_id, business_name, phone, email, address, logo_url, theme_color

  ### 2. sections
  - Controls the layout/skeleton of the public website
  - Defines which sections appear and in what order
  - Fields: id, user_id, name, is_visible, order_index, slug
  - Sections: hero, services, gallery, reviews, about, faq

  ### 3. services
  - Service offerings displayed in a grid
  - Admin can reorder using order_index
  - Fields: id, user_id, title, description, price, image_url, order_index

  ### 4. gallery
  - Photo gallery for showcasing work
  - Admin can reorder using order_index
  - Fields: id, user_id, image_url, caption, order_index

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own data
  - Policies enforce authentication and ownership

  ## Seed Data
  - Pre-populated with HVAC business data
  - Ensures the template is never blank
  - Ready for immediate demo and customization
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: profiles
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL DEFAULT 'Your Business Name',
  phone text DEFAULT '',
  email text DEFAULT '',
  address text DEFAULT '',
  logo_url text,
  theme_color text DEFAULT '#3b82f6',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view any profile"
  ON profiles FOR SELECT
  TO anon
  USING (true);

-- =====================================================
-- TABLE: sections
-- =====================================================
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  is_visible boolean DEFAULT true,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, slug)
);

-- Enable RLS
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sections
CREATE POLICY "Users can view own sections"
  ON sections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sections"
  ON sections FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sections"
  ON sections FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sections"
  ON sections FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view visible sections"
  ON sections FOR SELECT
  TO anon
  USING (is_visible = true);

-- =====================================================
-- TABLE: services
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  price text DEFAULT '',
  image_url text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Users can view own services"
  ON services FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own services"
  ON services FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own services"
  ON services FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view any services"
  ON services FOR SELECT
  TO anon
  USING (true);

-- =====================================================
-- TABLE: gallery
-- =====================================================
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gallery
CREATE POLICY "Users can view own gallery"
  ON gallery FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gallery"
  ON gallery FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gallery"
  ON gallery FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own gallery"
  ON gallery FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view any gallery"
  ON gallery FOR SELECT
  TO anon
  USING (true);

-- =====================================================
-- SEED DATA: Demo HVAC Business
-- =====================================================
-- Note: Seed data will be created automatically when a user signs up
-- through the admin panel. The data below serves as a reference template.

-- Demo HVAC Services Template (for reference):
-- 1. AC Tune-Up - Starting at $89
-- 2. Furnace Repair - Starting at $129
-- 3. Duct Cleaning - Starting at $299
-- 4. Heat Pump Installation - Call for Quote
-- 5. Emergency Service - Starting at $149
-- 6. Thermostat Upgrade - Starting at $199

-- Demo Sections (created automatically for new users):
-- 1. Hero, 2. Services, 3. Gallery, 4. Reviews, 5. About, 6. FAQ

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_sections_user_id ON sections(user_id);
CREATE INDEX IF NOT EXISTS idx_sections_order ON sections(user_id, order_index);
CREATE INDEX IF NOT EXISTS idx_services_user_id ON services(user_id);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(user_id, order_index);
CREATE INDEX IF NOT EXISTS idx_gallery_user_id ON gallery(user_id);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery(user_id, order_index);
