/*
  # Fix Public Read Access for All Roles
  
  ## Problem
  The current RLS policies only allow `anon` role to read public data.
  When the server has any auth cookies, it uses `authenticated` role,
  which then fails because the user_id doesn't match.
  
  ## Solution
  Add read policies for `authenticated` role that allow reading ALL records
  (not just owned records). This enables the public homepage to work
  regardless of whether a user is logged in or not.
  
  ## Changes
  1. Add "Authenticated can view all profiles" policy
  2. Add "Authenticated can view all sections" policy  
  3. Add "Authenticated can view all services" policy
  4. Add "Authenticated can view all gallery" policy
*/

-- Drop existing restrictive policies and add permissive ones
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own sections" ON sections;
DROP POLICY IF EXISTS "Users can view own services" ON services;
DROP POLICY IF EXISTS "Users can view own gallery" ON gallery;

-- Profiles: Allow any authenticated user to read all profiles
CREATE POLICY "Authenticated can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Sections: Allow any authenticated user to read all sections
CREATE POLICY "Authenticated can view all sections"
  ON sections
  FOR SELECT
  TO authenticated
  USING (true);

-- Services: Allow any authenticated user to read all services
CREATE POLICY "Authenticated can view all services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

-- Gallery: Allow any authenticated user to read all gallery items
CREATE POLICY "Authenticated can view all gallery"
  ON gallery
  FOR SELECT
  TO authenticated
  USING (true);