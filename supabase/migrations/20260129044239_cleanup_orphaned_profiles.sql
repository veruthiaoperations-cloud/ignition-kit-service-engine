/*
  # Clean up orphaned profiles
  
  Removes profile entries that don't have corresponding auth users
*/

DELETE FROM profiles WHERE email IN ('admin1@ignitionkit.com', 'admin01@ignitionkit.com');
