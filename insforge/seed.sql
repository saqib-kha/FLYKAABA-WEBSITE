-- ==============================================================================
-- FlyKaaba Seed Data for InsForge PostgreSQL Backend
-- ==============================================================================

-- 1. SEED TRAVEL AGENCIES
INSERT INTO public.agencies (id, name, tagline, about, city, rating, reviews_count, verified, license_number, fleet_size, contact_phone, contact_email, whatsapp, cover_image, badge)
VALUES
  ('agency-1', 'Al-Faisal Executive Transport', 'Official VIP Chauffeur & Fleet Provider across Makkah and Madinah', 'Al-Faisal Transport has been operating luxury chauffeur services for pilgrims and executive travelers since 2012. Specializing in VIP airport transfers, hotel shuttles, and customized Umrah/Hajj transport.', 'Makkah', 4.95, 412, true, 'MOT-7821-MKK', 48, '+966 12 555 0192', 'booking@alfaisal-transport.sa', '+966 50 123 4567', '/src/assets/images/agency_alfaisal_cover_1792229464259.jpg', 'Top Rated Operator'),
  ('agency-2', 'Riyadh Fleet Co', 'Fast and comfortable transfers between Riyadh, Jeddah and Makkah', 'Riyadh Fleet Co operates modern sedans, luxury SUVs, and VIP coaster buses for Umrah delegations, business travelers, and families.', 'Riyadh', 4.88, 298, true, 'MOT-9142-RUH', 65, '+966 11 482 9900', 'operations@riyadhfleet.sa', '+966 55 987 6543', '/src/assets/images/agency_riyadh_fleet_cover_1792229464185.jpg', 'Verified Operator'),
  ('agency-3', 'Najd Premium Transfers', 'Comfortable family and group transport with English & Arabic speaking drivers', 'Specialized in comfortable family vans, GMC Yukons, and modern buses across Jeddah Airport, Makkah Haram, and Madinah hotels.', 'Jeddah', 4.91, 350, true, 'MOT-3321-JED', 35, '+966 12 690 1144', 'contact@najdtransfers.sa', '+966 54 321 0987', '/src/assets/images/agency_najd_cover_1792229464916.jpg', 'Verified Operator'),
  ('agency-4', 'Taif Mountain & Ziyarat Tours', 'Scenic transfers and historical Ziyarat tours in Taif, Makkah and Madinah', 'Offering guided Ziyarat journeys to historical Islamic sites in Makkah, Madinah, Badr, and the cooler mountain climate of Taif.', 'Taif', 4.82, 185, true, 'MOT-5509-TIF', 22, '+966 12 733 8811', 'tours@taiftransfers.sa', '+966 56 789 0123', '/src/assets/images/agency_taif_transfers_cover_1792229464657.jpg', 'Ziyarat Specialist')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  verified = EXCLUDED.verified,
  rating = EXCLUDED.rating;

-- 2. SEED VEHICLE CATEGORIES
INSERT INTO public.categories (id, title, description, capacity_passengers, capacity_luggage, starting_price_sar, image_url, sort_order)
VALUES
  ('cat-economy', 'Economy Car', 'Comfortable modern sedans ideal for couples and solo travelers.', 3, 2, 180, '/src/assets/images/cat_economy_car_1792229441985.jpg', 1),
  ('cat-luxury', 'Luxury Sedan', 'Executive luxury transport with premium comfort and amenities.', 3, 3, 350, '/src/assets/images/cat_luxury_car_1792229442551.jpg', 2),
  ('cat-suv', 'GMC / Large SUV', 'Spacious luxury SUVs with ample luggage space for families.', 6, 5, 450, '/src/assets/images/cat_suv_1792229443174.jpg', 3),
  ('cat-van', 'Family Van', 'Ideal for extended families and pilgrimage groups with extra bags.', 8, 8, 380, '/src/assets/images/cat_van_1792229443646.jpg', 4),
  ('cat-bus', 'Coaster / Bus', 'Comfortable minibuses and coaches for tour delegations.', 25, 25, 850, '/src/assets/images/cat_bus_1792229442958.jpg', 5)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  starting_price_sar = EXCLUDED.starting_price_sar;

-- 3. SEED VEHICLES
INSERT INTO public.vehicles (id, agency_id, category_id, name, category, model_year, company_name, passenger_capacity, luggage_capacity, price_sar, price_per_day_sar, rating, trips_count, image_url, is_featured, is_available)
VALUES
  ('veh-1', 'agency-1', 'cat-suv', 'GMC Yukon XL 2024 (White)', 'SUV', 2024, 'Al-Faisal Executive Transport', 6, 6, 450, 450, 4.95, 340, '/src/assets/images/gmc_yukon_white_1792229407681.jpg', true, true),
  ('veh-2', 'agency-1', 'cat-luxury', 'BMW 7 Series 2024 (Black)', 'Luxury Car', 2024, 'Al-Faisal Executive Transport', 3, 3, 600, 600, 4.98, 215, '/src/assets/images/bmw_7_series_dark_1792229408256.jpg', true, true),
  ('veh-3', 'agency-2', 'cat-economy', 'Toyota Camry 2024 (White)', 'Economy Car', 2024, 'Riyadh Fleet Co', 3, 2, 220, 220, 4.88, 510, '/src/assets/images/toyota_camry_white_1792229409354.jpg', true, true),
  ('veh-4', 'agency-3', 'cat-van', 'Toyota HiAce Super Custom 2024', 'Van', 2024, 'Najd Premium Transfers', 9, 8, 380, 380, 4.90, 420, '/src/assets/images/cat_van_1792229443646.jpg', true, true),
  ('veh-5', 'agency-4', 'cat-bus', 'Toyota Coaster VIP 2024', 'Bus', 2024, 'Taif Mountain & Ziyarat Tours', 22, 20, 850, 850, 4.85, 175, '/src/assets/images/cat_bus_1792229442958.jpg', false, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price_sar = EXCLUDED.price_sar;

-- 4. SEED POPULAR ROUTES
INSERT INTO public.routes (id, pickup_city, destination_city, estimated_duration, distance_km, standard_price_sar, popular)
VALUES
  ('route-1', 'Jeddah Airport (JED)', 'Makkah', '1 hr 15 min', 85, 250, true),
  ('route-2', 'Makkah', 'Madinah', '4 hr 15 min', 430, 650, true),
  ('route-3', 'Madinah Airport (MED)', 'Madinah Central', '25 min', 20, 150, true),
  ('route-4', 'Jeddah', 'Madinah', '4 hr 30 min', 415, 600, true),
  ('route-5', 'Makkah', 'Taif', '1 hr 30 min', 90, 300, true)
ON CONFLICT (id) DO UPDATE SET
  standard_price_sar = EXCLUDED.standard_price_sar;

-- 5. SEED BLOG POSTS
INSERT INTO public.blog_posts (id, slug, title, excerpt, content, category, author_name, read_time, published)
VALUES
  ('blog-1', 'complete-guide-umrah-transportation-2026', 'Complete Guide to Umrah Transportation in 2026', 'Everything you need to know about traveling between Jeddah Airport, Makkah, and Madinah comfortably.', 'Performing Umrah is a deeply spiritual journey. Navigating transportation between King Abdulaziz International Airport (JED), Haramain High Speed Railway, and your hotel in Makkah requires reliable planning.', 'Umrah Guide', 'FlyKaaba Editorial Team', '5 min read', true),
  ('blog-2', 'ziyarat-in-makkah-sacred-historical-sites', 'Top Sacred Historical Sites for Ziyarat in Makkah', 'Discover Jabal al-Nour (Cave of Hira), Cave of Thawr, Mina, and Mount Arafat with authorized transport.', 'Ziyarat journeys allow pilgrims to deepen their appreciation of early Islamic history. Jabal al-Nour, where the first verses of the Holy Quran were revealed to Prophet Muhammad (PBUH), remains a beacon of reflection.', 'Historical Ziyarat', 'Sheikh Faruq Al-Madani', '7 min read', true),
  ('blog-3', 'choosing-the-right-vehicle-for-family-umrah', 'Choosing the Right Vehicle for Family Umrah Delegations', 'Comparing GMC Yukon, Toyota HiAce, and Luxury Sedans for multi-generational pilgrim groups.', 'Traveling with elders and young children demands optimal luggage capacity and dual-zone air conditioning. We examine which vehicle category offers the smoothest highway comfort on the Jeddah-Makkah expressway.', 'Travel Tips', 'FlyKaaba Fleet Team', '4 min read', true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt;
