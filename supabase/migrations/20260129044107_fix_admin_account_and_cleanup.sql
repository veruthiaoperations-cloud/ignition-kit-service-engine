/*
  # Fix Admin Account and Cleanup
  
  1. Delete extra user accounts
    - Remove admin01@ignitionkit.com
    - Remove admin1@ignitionkit.com
    - Remove contact@arcticairhvac.com
  
  2. Fix admin profile
    - Update profile user_id to match the auth user id
*/

DELETE FROM auth.users WHERE email IN ('admin01@ignitionkit.com', 'admin1@ignitionkit.com', 'contact@arcticairhvac.com');

UPDATE profiles
SET user_id = '61f3926a-f4cc-4416-bf17-26c6c18b3c0f'
WHERE email = 'admin@ignitionkit.com' AND user_id IS NULL;
