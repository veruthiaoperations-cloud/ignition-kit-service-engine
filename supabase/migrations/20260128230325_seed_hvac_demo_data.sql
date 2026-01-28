/*
  # HVAC Demo Data - Seed Data for Preview

  ## Summary
  Populates the database with realistic HVAC business demo data so the public website has content to display immediately.

  ## Changes Made

  ### 1. Profile Data
  - Business Name: "Arctic Air HVAC Services"
  - Phone: "(555) 789-4567"
  - Email: "contact@arcticairhvac.com"
  - Address: "123 Comfort Lane, Springfield, IL 62701"
  - Theme Color: #0ea5e9 (sky blue for HVAC industry)

  ### 2. Section Data (6 sections)
  - Hero (visible, order 0)
  - Services (visible, order 1)
  - Gallery (visible, order 2)
  - About (visible, order 3)
  - Reviews (visible, order 4)
  - FAQ (visible, order 5)

  ### 3. Service Data (6 HVAC services)
  - AC Installation & Replacement
  - Furnace Repair & Maintenance
  - Duct Cleaning & Sealing
  - Emergency HVAC Service
  - Heat Pump Installation
  - Indoor Air Quality Solutions

  ### 4. Gallery Data (6 work photos)
  - Various HVAC installation and service photos from Pexels

  ## Notes
  - All data has user_id = NULL so it's accessible to everyone (public demo data)
  - Images are from Pexels (free stock photos)
  - Pricing reflects realistic HVAC industry rates
  - This data serves as a template that users can customize through the admin panel
*/

-- Insert demo profile (public demo data)
INSERT INTO profiles (id, user_id, business_name, phone, email, address, theme_color, created_at, updated_at)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  NULL,
  'Arctic Air HVAC Services',
  '(555) 789-4567',
  'contact@arcticairhvac.com',
  '123 Comfort Lane, Springfield, IL 62701',
  '#0ea5e9',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Insert demo sections (all visible, ordered)
INSERT INTO sections (id, user_id, name, slug, is_visible, order_index, created_at, updated_at)
VALUES
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Hero Section', 'hero', true, 0, now(), now()),
  ('b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Our Services', 'services', true, 1, now(), now()),
  ('b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Work Gallery', 'gallery', true, 2, now(), now()),
  ('b4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'About Us', 'about', true, 3, now(), now()),
  ('b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'Customer Reviews', 'reviews', true, 4, now(), now()),
  ('b6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NULL, 'FAQ', 'faq', true, 5, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert demo services (6 HVAC services)
INSERT INTO services (id, user_id, title, description, price, image_url, order_index, created_at, updated_at)
VALUES
  (
    'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'AC Installation & Replacement',
    'Professional air conditioning installation with energy-efficient systems. Same-day service available. 10-year warranty on all installations.',
    'Starting at $2,999',
    'https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg',
    0,
    now(),
    now()
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Furnace Repair & Maintenance',
    'Expert furnace diagnostics and repair. Annual maintenance plans available. Keep your home warm all winter long with our certified technicians.',
    'Starting at $129',
    'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg',
    1,
    now(),
    now()
  ),
  (
    'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Duct Cleaning & Sealing',
    'Improve air quality and energy efficiency with professional duct cleaning. Remove dust, allergens, and debris from your ventilation system.',
    'Starting at $399',
    'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
    2,
    now(),
    now()
  ),
  (
    'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Emergency HVAC Service',
    '24/7 emergency repair service. When your heating or cooling system breaks down, we are here to help. Fast response times guaranteed.',
    '$99 Service Call',
    'https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg',
    3,
    now(),
    now()
  ),
  (
    'c5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Heat Pump Installation',
    'Energy-efficient heat pump systems for year-round comfort. Save up to 40% on your energy bills with modern heat pump technology.',
    'Starting at $4,299',
    'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg',
    4,
    now(),
    now()
  ),
  (
    'c6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'Indoor Air Quality Solutions',
    'Advanced air purification systems, humidifiers, and dehumidifiers. Breathe easier with our indoor air quality improvement services.',
    'Starting at $599',
    'https://images.pexels.com/photos/8251281/pexels-photo-8251281.jpeg',
    5,
    now(),
    now()
  )
ON CONFLICT (id) DO NOTHING;

-- Insert demo gallery items (6 work photos)
INSERT INTO gallery (id, user_id, image_url, caption, order_index, created_at, updated_at)
VALUES
  (
    'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'https://images.pexels.com/photos/1662159/pexels-photo-1662159.jpeg',
    'Central AC unit installation',
    0,
    now(),
    now()
  ),
  (
    'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg',
    'Furnace maintenance and inspection',
    1,
    now(),
    now()
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg',
    'Professional duct cleaning service',
    2,
    now(),
    now()
  ),
  (
    'd4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg',
    'Emergency HVAC repair completed',
    3,
    now(),
    now()
  ),
  (
    'd5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg',
    'Modern heat pump system installation',
    4,
    now(),
    now()
  ),
  (
    'd6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    NULL,
    'https://images.pexels.com/photos/8251281/pexels-photo-8251281.jpeg',
    'Air quality system upgrade',
    5,
    now(),
    now()
  )
ON CONFLICT (id) DO NOTHING;