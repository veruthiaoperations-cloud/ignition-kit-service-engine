/*
  # Link All Data to Admin User
  
  Updates all sections, services, and gallery records to be owned by the admin user
  so they appear in the admin panel.
  
  Admin user_id: 61f3926a-f4cc-4416-bf17-26c6c18b3c0f
*/

UPDATE sections SET user_id = '61f3926a-f4cc-4416-bf17-26c6c18b3c0f' WHERE user_id IS NULL;
UPDATE services SET user_id = '61f3926a-f4cc-4416-bf17-26c6c18b3c0f' WHERE user_id IS NULL;
UPDATE gallery SET user_id = '61f3926a-f4cc-4416-bf17-26c6c18b3c0f' WHERE user_id IS NULL;
UPDATE profiles SET user_id = '61f3926a-f4cc-4416-bf17-26c6c18b3c0f' WHERE user_id IS NULL;
