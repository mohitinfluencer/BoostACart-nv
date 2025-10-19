-- Check what stores exist in the database
SELECT id, name, domain, user_id, created_at FROM stores;

-- Also check widget_settings
SELECT ws.*, s.name as store_name, s.domain as store_domain 
FROM widget_settings ws 
JOIN stores s ON ws.store_id = s.id;
