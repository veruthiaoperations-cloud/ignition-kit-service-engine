/*
  # Add Public Read Access Policies
  
  Allows unauthenticated (anon) users to read public business data.
  This enables the public homepage to display content without login.
  
  1. Security Changes
    - profiles: Add SELECT policy for anon users
    - sections: Add SELECT policy for anon users  
    - services: Add SELECT policy for anon users
    - gallery: Add SELECT policy for anon users
    
  Note: Write operations (INSERT/UPDATE/DELETE) remain restricted to authenticated owners only.
*/

CREATE POLICY "Public can view profiles"
  ON profiles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view sections"
  ON sections FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view services"
  ON services FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view gallery"
  ON gallery FOR SELECT
  TO anon
  USING (true);
