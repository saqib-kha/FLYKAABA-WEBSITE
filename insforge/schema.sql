-- ==============================================================================
-- FlyKaaba Vehicle Booking Marketplace - InsForge PostgreSQL Schema
-- Database tables, relationships, constraints, indexes, and Row-Level Security (RLS)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('pilgrim', 'agency_owner', 'admin');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('Pending', 'Confirmed', 'Completed', 'Cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE vehicle_category_type AS ENUM ('Economy Car', 'Luxury Sedan', 'GMC / Large SUV', 'Family Van', 'Coaster / Bus');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  role user_role DEFAULT 'pilgrim' NOT NULL,
  avatar_url TEXT,
  country TEXT DEFAULT 'Saudi Arabia',
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. TRAVEL AGENCIES / TRANSPORT COMPANIES TABLE
CREATE TABLE IF NOT EXISTS public.agencies (
  id TEXT PRIMARY KEY DEFAULT ('agency-' || substr(md5(random()::text), 1, 8)),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  about TEXT,
  city TEXT NOT NULL,
  headquarters TEXT,
  rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating >= 1.00 AND rating <= 5.00),
  reviews_count INT DEFAULT 0,
  verified BOOLEAN DEFAULT false NOT NULL,
  license_number TEXT,
  commercial_reg_number TEXT,
  fleet_size INT DEFAULT 1,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  whatsapp TEXT,
  working_hours TEXT DEFAULT '24/7 Available',
  established_year INT DEFAULT 2020,
  cover_image TEXT,
  badge TEXT DEFAULT 'Verified Operator',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. VEHICLE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  capacity_passengers INT NOT NULL,
  capacity_luggage INT NOT NULL,
  starting_price_sar INT NOT NULL,
  image_url TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0
);

-- 6. VEHICLES FLEET TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
  id TEXT PRIMARY KEY DEFAULT ('veh-' || substr(md5(random()::text), 1, 8)),
  agency_id TEXT NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  model_year INT DEFAULT 2024,
  company_name TEXT NOT NULL,
  passenger_capacity INT NOT NULL,
  luggage_capacity INT NOT NULL,
  price_sar INT NOT NULL,
  price_per_day_sar INT,
  pricing_type TEXT DEFAULT 'fixed',
  rating NUMERIC(3, 2) DEFAULT 4.90,
  trips_count INT DEFAULT 0,
  image_url TEXT,
  transmission TEXT DEFAULT 'Automatic',
  fuel_type TEXT DEFAULT 'Petrol / Hybrid',
  ac_type TEXT DEFAULT 'Dual-Zone Air Conditioning',
  free_wifi BOOLEAN DEFAULT true,
  free_water BOOLEAN DEFAULT true,
  child_seat_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. ROUTES & POPULAR CITY TRANSFERS TABLE
CREATE TABLE IF NOT EXISTS public.routes (
  id TEXT PRIMARY KEY DEFAULT ('route-' || substr(md5(random()::text), 1, 8)),
  pickup_city TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  estimated_duration TEXT NOT NULL,
  distance_km INT NOT NULL,
  standard_price_sar INT NOT NULL,
  popular BOOLEAN DEFAULT true,
  route_type TEXT DEFAULT 'city-to-city',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7.1 VEHICLE ROUTE ASSIGNMENTS & DYNAMIC PRICING TABLE
CREATE TABLE IF NOT EXISTS public.vehicle_routes (
  id TEXT PRIMARY KEY DEFAULT ('vr-' || substr(md5(random()::text), 1, 8)),
  vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  route_id TEXT REFERENCES public.routes(id) ON DELETE SET NULL,
  pickup_city TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  one_way_price_sar INT NOT NULL,
  round_trip_price_sar INT,
  hourly_rate_sar INT,
  daily_rate_sar INT,
  estimated_duration TEXT,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_vehicle_route UNIQUE (vehicle_id, pickup_city, destination_city)
);

-- 7.2 VEHICLE SCHEDULES & AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS public.vehicle_schedules (
  id TEXT PRIMARY KEY DEFAULT ('vs-' || substr(md5(random()::text), 1, 8)),
  vehicle_id TEXT NOT NULL REFERENCES public.vehicles(id) ON DELETE CASCADE,
  unavailable_date DATE NOT NULL,
  reason TEXT DEFAULT 'Reserved Trip',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY DEFAULT ('book-' || substr(md5(random()::text), 1, 8)),
  reference_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  vehicle_id TEXT REFERENCES public.vehicles(id) ON DELETE SET NULL,
  agency_id TEXT REFERENCES public.agencies(id) ON DELETE SET NULL,
  vehicle_name TEXT NOT NULL,
  vehicle_category TEXT NOT NULL,
  company_name TEXT NOT NULL,
  pickup_city TEXT NOT NULL,
  destination_city TEXT NOT NULL,
  travel_date DATE NOT NULL,
  pickup_time TEXT NOT NULL,
  trip_type TEXT DEFAULT 'one-way' NOT NULL,
  passengers INT DEFAULT 1 NOT NULL,
  total_price_sar INT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  flight_number TEXT,
  special_requests TEXT,
  status booking_status DEFAULT 'Pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. REVIEWS AND RATINGS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY DEFAULT ('rev-' || substr(md5(random()::text), 1, 8)),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  booking_id TEXT REFERENCES public.bookings(id) ON DELETE SET NULL,
  agency_id TEXT NOT NULL REFERENCES public.agencies(id) ON DELETE CASCADE,
  vehicle_id TEXT REFERENCES public.vehicles(id) ON DELETE SET NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_country TEXT DEFAULT 'Saudi Arabia',
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_verified_booking BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY DEFAULT ('blog-' || substr(md5(random()::text), 1, 8)),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT DEFAULT 'FlyKaaba Editorial Team',
  read_time TEXT DEFAULT '5 min read',
  cover_image TEXT,
  published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_vehicles_agency_id ON public.vehicles(agency_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON public.vehicles(category);
CREATE INDEX IF NOT EXISTS idx_vehicles_available ON public.vehicles(is_available);
CREATE INDEX IF NOT EXISTS idx_agencies_verified ON public.agencies(verified);
CREATE INDEX IF NOT EXISTS idx_agencies_city ON public.agencies(city);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_agency_id ON public.bookings(agency_id);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON public.bookings(reference_number);
CREATE INDEX IF NOT EXISTS idx_reviews_agency_id ON public.reviews(agency_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_routes_cities ON public.vehicle_routes(pickup_city, destination_city);
CREATE INDEX IF NOT EXISTS idx_vehicle_routes_vehicle ON public.vehicle_routes(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_schedules_date ON public.vehicle_schedules(vehicle_id, unavailable_date);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
CREATE POLICY "Public read user profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- AGENCIES POLICIES (Public read, Owner update)
CREATE POLICY "Public read verified agencies" ON public.agencies
  FOR SELECT USING (true);

CREATE POLICY "Owners can update own agency" ON public.agencies
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Authenticated users can register agency" ON public.agencies
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- CATEGORIES & ROUTES POLICIES (Public read)
CREATE POLICY "Public read categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Public read routes" ON public.routes
  FOR SELECT USING (true);

-- VEHICLES POLICIES (Public read, Agency owner manage)
CREATE POLICY "Public read vehicles" ON public.vehicles
  FOR SELECT USING (is_available = true);

CREATE POLICY "Agency owners manage vehicles" ON public.vehicles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.agencies
      WHERE public.agencies.id = public.vehicles.agency_id
      AND public.agencies.owner_id = auth.uid()
    )
  );

-- VEHICLE ROUTES POLICIES (Public read active routes, Agency owners manage)
CREATE POLICY "Public read active vehicle routes" ON public.vehicle_routes
  FOR SELECT USING (is_active = true);

CREATE POLICY "Agency owners manage vehicle routes" ON public.vehicle_routes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.vehicles
      JOIN public.agencies ON public.agencies.id = public.vehicles.agency_id
      WHERE public.vehicles.id = public.vehicle_routes.vehicle_id
      AND public.agencies.owner_id = auth.uid()
    )
  );

-- VEHICLE SCHEDULES POLICIES (Public read schedules for availability validation)
CREATE POLICY "Public read vehicle schedules" ON public.vehicle_schedules
  FOR SELECT USING (true);

-- BOOKINGS POLICIES (Customers see own bookings, Agencies see bookings for their fleet)
CREATE POLICY "Customers view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = customer_id OR customer_email = auth.email());

CREATE POLICY "Agencies view assigned bookings" ON public.bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.agencies
      WHERE public.agencies.id = public.bookings.agency_id
      AND public.agencies.owner_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can submit booking requests" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authorized owners and customers can update booking status" ON public.bookings
  FOR UPDATE USING (
    auth.uid() = customer_id OR 
    EXISTS (
      SELECT 1 FROM public.agencies
      WHERE public.agencies.id = public.bookings.agency_id
      AND public.agencies.owner_id = auth.uid()
    )
  );

-- REVIEWS POLICIES (Public read, verified users submit)
CREATE POLICY "Public read reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- BLOG POSTS POLICIES (Public read)
CREATE POLICY "Public read published blog posts" ON public.blog_posts
  FOR SELECT USING (published = true);
