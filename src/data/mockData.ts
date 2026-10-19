/**
 * FlyKaaba Mock Database & Data Models
 * Authentic data matching the reference screenshots for Saudi Arabia transport marketplace.
 */

import catEconomyImg from '../assets/images/cat_economy_car_1792229441985.jpg';
import catLuxuryImg from '../assets/images/cat_luxury_car_1792229442551.jpg';
import catSuvImg from '../assets/images/cat_suv_1792229443174.jpg';
import catVanImg from '../assets/images/cat_van_1792229443646.jpg';
import catBusImg from '../assets/images/cat_bus_1792229442958.jpg';

import gmcYukonImg from '../assets/images/gmc_yukon_white_1792229407681.jpg';
import bmw7Img from '../assets/images/bmw_7_series_dark_1792229408256.jpg';
import toyotaCamryImg from '../assets/images/toyota_camry_white_1792229409354.jpg';

import agencyAlfaisalCover from '../assets/images/agency_alfaisal_cover_1792229464259.jpg';
import agencyRiyadhCover from '../assets/images/agency_riyadh_fleet_cover_1792229464185.jpg';
import agencyTaifCover from '../assets/images/agency_taif_transfers_cover_1792229464657.jpg';
import agencyNajdCover from '../assets/images/agency_najd_cover_1792229464916.jpg';

export {
  catEconomyImg,
  catLuxuryImg,
  catSuvImg,
  catVanImg,
  catBusImg,
  gmcYukonImg,
  bmw7Img,
  toyotaCamryImg,
  agencyAlfaisalCover,
  agencyRiyadhCover,
  agencyTaifCover,
  agencyNajdCover,
};

export interface TravelAgency {
  id: string;
  name: string;
  slug: string;
  city: string;
  isVerified: boolean;
  coverImage: string;
  avatarImage: string;
  rating: number; // 0 for N/A
  reviewCount: number;
  phone: string;
  whatsapp: string;
  email: string;
  description: string;
  licenseNumber: string;
  foundedYear: number;
  vehicleCount: number;
  featuredVehicles: string[];
  address?: string;
  website?: string;
}

export interface VehicleRoutePrice {
  routeKey: string;
  fromCity: string;
  toCity: string;
  oneWayPriceSar: number;
  roundTripPriceSar?: number;
  estimatedDuration?: string;
  distanceKm?: number;
  isAvailable?: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  category: 'Economy Car' | 'Luxury Car' | 'SUV' | 'Van' | 'Bus' | 'Sedan';
  companyId: string;
  companyName: string;
  companyAvatar?: string;
  companyInitials?: string;
  city: string;
  passengerCapacity: number;
  luggageCapacity: number;
  transmission: 'Automatic' | 'Manual';
  pricePerDay: number;
  hourlyRateSar?: number;
  coversCity?: string;
  currency: string;
  images: string[];
  description: string;
  amenities: string[];
  isAvailable: boolean;
  supportedRoutes?: VehicleRoutePrice[];
  unavailableDates?: string[];
  featuresDetails?: {
    luggage?: string;
    ac?: string;
    cancellation?: string;
    driver?: string;
    tolls?: string;
    extraNote?: string;
  };
}

export interface RouteInfo {
  id: string;
  fromCity: string;
  toCity: string;
  distanceKm: number;
  estimatedTime: string;
  popularFor: string;
  startingPriceSar: number;
  description: string;
}

export interface ZiyaratDestination {
  id: string;
  title: string;
  city: string;
  duration: string;
  highlights: string[];
  description: string;
  suggestedVehicles: string[];
  priceEstimateSar: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  categories: string[];
  excerpt: string;
  content: string;
  date: string;
  image: string;
  author: string;
  readTime: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Saudi Arabian Cities
export const SAUDI_CITIES = [
  'Makkah',
  'Madinah',
  'Jeddah',
  'Riyadh',
  'Taif',
  'Dammam',
  'Al Khobar',
  'Tabuk',
  'Abha',
  'Yanbu',
  'AlUla',
  'Jubail',
  'Badr',
];

// Car Categories matching Screenshot 2
export const CAR_CATEGORIES = [
  {
    id: 'economy',
    title: 'Economy Car',
    slug: 'economy-car',
    image: catEconomyImg,
    description: 'Fuel-efficient, compact cars ideal for solo travelers and couples.',
    passengerCapacity: '4 Passengers',
    typicalPrice: 'From 200 SAR/day',
  },
  {
    id: 'luxury',
    title: 'Luxury Car',
    slug: 'luxury-car',
    image: catLuxuryImg,
    description: 'Executive premium sedans for VIP airport transfers and business comfort.',
    passengerCapacity: '4 Passengers',
    typicalPrice: 'From 700 SAR/day',
  },
  {
    id: 'suv',
    title: 'SUV',
    slug: 'suv',
    image: catSuvImg,
    description: 'Spacious family vehicles with plenty of luggage space and comfort.',
    passengerCapacity: '7 Passengers',
    typicalPrice: 'From 450 SAR/day',
  },
  {
    id: 'van',
    title: 'Van',
    slug: 'van',
    image: catVanImg,
    description: 'High-capacity family passenger vans for Umrah groups and airport luggage.',
    passengerCapacity: '10-14 Passengers',
    typicalPrice: 'From 550 SAR/day',
  },
  {
    id: 'bus',
    title: 'Bus',
    slug: 'bus',
    image: catBusImg,
    description: 'Large passenger coaches and minibuses for pilgrimage tour delegations.',
    passengerCapacity: '25-49 Passengers',
    typicalPrice: 'From 1,200 SAR/day',
  },
];

// Verified Travel Agencies matching Screenshot 3
export const TRAVEL_AGENCIES: TravelAgency[] = [
  {
    id: 'agency-1',
    name: 'Al Faisal Transport Co',
    slug: 'al-faisal-transport-co',
    city: 'Madinah',
    isVerified: true,
    coverImage: agencyAlfaisalCover,
    avatarImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=150&auto=format&fit=crop&q=80', // Classic wood steering wheel icon
    rating: 5.0,
    reviewCount: 1,
    phone: '+966 50 123 4567',
    whatsapp: '+966501234567',
    email: 'contact@alfaisaltransport.sa',
    description: 'Official licensed pilgrimage transport provider operating luxury and executive fleets across Makkah, Madinah, and Jeddah with professional multi-lingual chauffeurs.',
    licenseNumber: 'KSA-MOT-44289',
    foundedYear: 2014,
    vehicleCount: 42,
    featuredVehicles: ['veh-1', 'veh-2'],
  },
  {
    id: 'agency-2',
    name: 'Riyadh Fleet Co',
    slug: 'riyadh-fleet-co',
    city: 'Riyadh',
    isVerified: true,
    coverImage: agencyRiyadhCover,
    avatarImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=150&auto=format&fit=crop&q=80', // Sport steering wheel icon
    rating: 0,
    reviewCount: 0,
    phone: '+966 54 889 0123',
    whatsapp: '+966548890123',
    email: 'info@riyadhfleet.sa',
    description: 'Specializing in corporate executive sedans, luxury SUVs, and VIP inter-city transfers connecting the capital Riyadh with Eastern and Western provinces.',
    licenseNumber: 'KSA-MOT-51204',
    foundedYear: 2021,
    vehicleCount: 1,
    featuredVehicles: ['veh-gmc-yukon-2023'],
    address: 'Office #2, 2nd Floor, Sindhu Trade Centre, Moon Market, Allama Iqbal Town, Riyadh',
    website: 'https://riyadhfleet.sa',
  },
  {
    id: 'agency-3',
    name: 'Taif Highlands Transfers',
    slug: 'taif-highlands-transfers',
    city: 'Taif',
    isVerified: false,
    coverImage: agencyTaifCover,
    avatarImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=150&auto=format&fit=crop&q=80', // Car key fob icon
    rating: 4.7,
    reviewCount: 3,
    phone: '+966 56 432 9988',
    whatsapp: '+966564329988',
    email: 'transfers@taifhighlands.sa',
    description: 'Premier mountain passes and Ziyarat transfer agency connecting Makkah with the cool heights of Taif. Experienced drivers familiar with mountain curves and sights.',
    licenseNumber: 'KSA-MOT-38910',
    foundedYear: 2017,
    vehicleCount: 19,
    featuredVehicles: ['veh-4', 'veh-5'],
  },
  {
    id: 'agency-4',
    name: 'Najd Premier Cars',
    slug: 'najd-premier-cars',
    city: 'Riyadh',
    isVerified: false,
    coverImage: agencyNajdCover,
    avatarImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=150&auto=format&fit=crop&q=80', // Mountain highway horizon icon
    rating: 4.5,
    reviewCount: 2,
    phone: '+966 53 776 2200',
    whatsapp: '+966537762200',
    email: 'najd.cars@premiergroup.sa',
    description: 'Exclusive luxury fleet of BMW, Mercedes-Benz, and Audi vehicles tailored for executive clients, high-profile delegations, and private long-distance journeys.',
    licenseNumber: 'KSA-MOT-62118',
    foundedYear: 2019,
    vehicleCount: 35,
    featuredVehicles: ['veh-2'],
  },
  {
    id: 'agency-5',
    name: 'Al Haramain Ride Co',
    slug: 'al-haramain-ride-co',
    city: 'Jeddah',
    isVerified: true,
    coverImage: agencyAlfaisalCover,
    avatarImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 8,
    phone: '+966 55 901 3344',
    whatsapp: '+966559013344',
    email: 'support@alharamainride.sa',
    description: 'Reliable King Abdulaziz Airport (JED) pickups and 24/7 dedicated door-to-door express shuttles between Makkah and Madinah.',
    licenseNumber: 'KSA-MOT-41902',
    foundedYear: 2015,
    vehicleCount: 50,
    featuredVehicles: ['veh-3'],
  },
  {
    id: 'agency-6',
    name: 'Makkah Al-Mukarramah Limousine',
    slug: 'makkah-al-mukarramah-limousine',
    city: 'Makkah',
    isVerified: true,
    coverImage: agencyAlfaisalCover,
    avatarImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 19,
    phone: '+966 50 882 1100',
    whatsapp: '+966508821100',
    email: 'reservations@makkahlimo.sa',
    description: 'Premier pilgrimage transportation specialist in Makkah. Premium GMC Yukon XL and Toyota HiAce fleets catering to Haram hotels, Haramain High-Speed Rail Station, and Ziyarat sites (Jabal al-Nour, Thawr, Mina, Arafat).',
    licenseNumber: 'KSA-MOT-39144',
    foundedYear: 2012,
    vehicleCount: 65,
    featuredVehicles: ['veh-yukon-1', 'veh-hiace-1'],
  },
  {
    id: 'agency-7',
    name: 'Rawdah Munawwarah Chauffeurs',
    slug: 'rawdah-munawwarah-chauffeurs',
    city: 'Madinah',
    isVerified: true,
    coverImage: agencyTaifCover,
    avatarImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=150&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewCount: 14,
    phone: '+966 54 221 7700',
    whatsapp: '+966542217700',
    email: 'contact@rawdahtransfers.sa',
    description: 'Specialized Madinah airport (MED) reception, Prince Mohammad Bin Abdulaziz transfers, and heritage historical tours across Quba Mosque, Mount Uhud, and Seven Mosques.',
    licenseNumber: 'KSA-MOT-48201',
    foundedYear: 2016,
    vehicleCount: 38,
    featuredVehicles: ['veh-camry-2024', 'veh-bmw-1'],
  },
  {
    id: 'agency-8',
    name: 'Jeddah Red Sea Executive Fleet',
    slug: 'jeddah-red-sea-executive-fleet',
    city: 'Jeddah',
    isVerified: true,
    coverImage: agencyRiyadhCover,
    avatarImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=150&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewCount: 11,
    phone: '+966 56 991 3322',
    whatsapp: '+966569913322',
    email: 'executive@redseafleet.sa',
    description: 'Luxury German and Japanese fleet for pilgrims, diplomats, and business delegates arriving at KAIA North, South, and Terminal 1.',
    licenseNumber: 'KSA-MOT-55092',
    foundedYear: 2018,
    vehicleCount: 44,
    featuredVehicles: ['veh-bmw-1', 'veh-camry-2024'],
  },
  {
    id: 'agency-9',
    name: 'Madinah Pilgrim Fleet',
    slug: 'madinah-pilgrim-fleet',
    city: 'Madinah',
    isVerified: true,
    coverImage: agencyTaifCover,
    avatarImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 22,
    phone: '+966 54 888 4433',
    whatsapp: '+966548884433',
    email: 'info@madinahpilgrimfleet.sa',
    description: 'Premier Madinah pilgrimage transport specialist offering modern air-conditioned vans, minibuses, and sedans for historic Ziyarat and airport transfers.',
    licenseNumber: 'KSA-MOT-52890',
    foundedYear: 2018,
    vehicleCount: 45,
    featuredVehicles: ['madina-hiace-2023'],
  },
  {
    id: 'agency-jj',
    name: 'Journey Junction',
    slug: 'journey-junction',
    city: 'Makkah',
    isVerified: true,
    coverImage: agencyRiyadhCover,
    avatarImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=150&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewCount: 38,
    phone: '+966 54 888 7766',
    whatsapp: '+966548887766',
    email: 'booking@journeyjunction.sa',
    description: 'Premier luxury transport and VIP intercity transfers across Makkah, Madinah, Jeddah, and Riyadh with executive English and Arabic speaking chauffeurs.',
    licenseNumber: 'KSA-MOT-58291',
    foundedYear: 2019,
    vehicleCount: 28,
    featuredVehicles: ['veh-bmw-5-2025'],
  },
];


// Featured & Category Vehicles matching Screenshots Capture.PNG, Capture1.PNG, Capture2.PNG, Capture4.PNG, Capture5.PNG
export const FEATURED_VEHICLES: Vehicle[] = [
  // 1. BMW 5 Series 2025 (Capture1.PNG: SUV, Journey Junction, 4 seats, Automatic, Route: Makkah to Madinah: 750 SAR)
  {
    id: 'veh-bmw-5-2025',
    name: 'BMW 5 Series 2025',
    make: 'BMW',
    model: '5 Series',
    year: 2025,
    category: 'SUV',
    companyId: 'agency-jj',
    companyName: 'Journey Junction',
    companyInitials: 'JJ',
    city: 'Makkah',
    passengerCapacity: 4,
    luggageCapacity: 4,
    transmission: 'Automatic',
    pricePerDay: 750,
    hourlyRateSar: 120,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      bmw7Img,
      catLuxuryImg,
      catSuvImg,
    ],
    description: 'Executive BMW 5 Series featuring premium leather luxury seating, whisper-quiet highway ride, and professional multi-lingual chauffeur.',
    amenities: ['Executive Dual Climate AC', 'High-Speed Wi-Fi', 'Bottled Mineral Water', 'USB-C Fast Chargers', 'Highway Tolls Included'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-riyadh', fromCity: 'Makkah', toCity: 'Riyadh', oneWayPriceSar: 2100, roundTripPriceSar: 3950, estimatedDuration: '8 hr 30 min' },
      { routeKey: 'riyadh-makkah', fromCity: 'Riyadh', toCity: 'Makkah', oneWayPriceSar: 2100, roundTripPriceSar: 3950, estimatedDuration: '8 hr 30 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 750, roundTripPriceSar: 1400, estimatedDuration: '4 hr 15 min' },
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 400, roundTripPriceSar: 750, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'jeddah-makkah', fromCity: 'Jeddah', toCity: 'Makkah', oneWayPriceSar: 400, roundTripPriceSar: 750, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'madinah-makkah', fromCity: 'Madinah', toCity: 'Makkah', oneWayPriceSar: 750, roundTripPriceSar: 1400, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 2. Toyota Camry 2023 (Capture1.PNG: SEDAN, Al Haramain Ride Co, 4 seats, Automatic, Route: Makkah to Jeddah: 250 SAR; Capture4: Hourly 90 SAR; Capture6: Daily 300 SAR)
  {
    id: 'veh-camry-2023',
    name: 'Toyota Camry 2023',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    category: 'Sedan',
    companyId: 'agency-5',
    companyName: 'Al Haramain Ride Co',
    companyInitials: 'AH',
    city: 'Makkah',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 300,
    hourlyRateSar: 90,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      toyotaCamryImg,
      catEconomyImg,
    ],
    description: 'The preferred choice for reliable, air-conditioned intercity transfers between holy sanctuaries and international airports.',
    amenities: ['High Output AC', 'Bluetooth Sound System', 'Bottled Mineral Water', 'Child Seat On Request'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-riyadh', fromCity: 'Makkah', toCity: 'Riyadh', oneWayPriceSar: 1450, roundTripPriceSar: 2750, estimatedDuration: '8 hr 45 min' },
      { routeKey: 'riyadh-makkah', fromCity: 'Riyadh', toCity: 'Makkah', oneWayPriceSar: 1450, roundTripPriceSar: 2750, estimatedDuration: '8 hr 45 min' },
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 250, roundTripPriceSar: 480, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 650, roundTripPriceSar: 1200, estimatedDuration: '4 hr 15 min' },
      { routeKey: 'jeddah-makkah', fromCity: 'Jeddah', toCity: 'Makkah', oneWayPriceSar: 250, roundTripPriceSar: 480, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'madinah-makkah', fromCity: 'Madinah', toCity: 'Makkah', oneWayPriceSar: 650, roundTripPriceSar: 1200, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 3. Hyundai Staria 2023 (Capture1.PNG: VAN, Al Haramain Ride Co, 9 seats, Automatic, Route: Makkah to Jeddah: 380 SAR; Capture2: Makkah to Madinah: 900 SAR; Capture4: Hourly 140 SAR; Capture6: Daily 600 SAR)
  {
    id: 'veh-staria-2023',
    name: 'Hyundai Staria 2023',
    make: 'Hyundai',
    model: 'Staria',
    year: 2023,
    category: 'Van',
    companyId: 'agency-5',
    companyName: 'Al Haramain Ride Co',
    companyInitials: 'AH',
    city: 'Makkah',
    passengerCapacity: 9,
    luggageCapacity: 7,
    transmission: 'Automatic',
    pricePerDay: 600,
    hourlyRateSar: 140,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      toyotaCamryImg,
    ],
    description: 'Futuristic comfort passenger van with panoramic windows, captain seats, individual air-conditioning vents, and expansive luggage space.',
    amenities: ['Individual Passenger AC Vents', 'Rear USB-C Charging Ports', 'Tinted Windows', 'Ample Luggage Bay'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-riyadh', fromCity: 'Makkah', toCity: 'Riyadh', oneWayPriceSar: 1850, roundTripPriceSar: 3500, estimatedDuration: '8 hr 30 min' },
      { routeKey: 'riyadh-makkah', fromCity: 'Riyadh', toCity: 'Makkah', oneWayPriceSar: 1850, roundTripPriceSar: 3500, estimatedDuration: '8 hr 30 min' },
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 380, roundTripPriceSar: 720, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 900, roundTripPriceSar: 1700, estimatedDuration: '4 hr 15 min' },
      { routeKey: 'jeddah-makkah', fromCity: 'Jeddah', toCity: 'Makkah', oneWayPriceSar: 380, roundTripPriceSar: 720, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'madinah-makkah', fromCity: 'Madinah', toCity: 'Makkah', oneWayPriceSar: 900, roundTripPriceSar: 1700, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 4. Toyota Hiace 2022 (Capture2.PNG: VAN, Al Haramain Ride Co, 13 seats, Automatic, Route: Makkah to Jeddah: 450 SAR; Capture4: Hourly 170 SAR; Capture5: Daily 500 SAR)
  {
    id: 'veh-hiace-2022',
    name: 'Toyota Hiace 2022',
    make: 'Toyota',
    model: 'Hiace',
    year: 2022,
    category: 'Van',
    companyId: 'agency-5',
    companyName: 'Al Haramain Ride Co',
    companyInitials: 'AH',
    city: 'Makkah',
    passengerCapacity: 13,
    luggageCapacity: 10,
    transmission: 'Automatic',
    pricePerDay: 500,
    hourlyRateSar: 170,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      catBusImg,
    ],
    description: 'High-capacity family and Umrah group van with dual roof air conditioning and cavernous luggage capacity for large group pilgrimages.',
    amenities: ['High Roof Standing Room', 'Dual Roof AC Evaporator', 'Wide Sliding Door', 'Microphone System for Guides'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 450, roundTripPriceSar: 850, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 850, roundTripPriceSar: 1600, estimatedDuration: '4 hr 15 min' },
      { routeKey: 'jeddah-makkah', fromCity: 'Jeddah', toCity: 'Makkah', oneWayPriceSar: 450, roundTripPriceSar: 850, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'madinah-makkah', fromCity: 'Madinah', toCity: 'Makkah', oneWayPriceSar: 850, roundTripPriceSar: 1600, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 5. GMC Yukon 2023 (Capture5.PNG: SUV, Riyadh Fleet Co, 7 seats, Daily 450 SAR, Route: Makkah to Riyadh: 1950 SAR)
  {
    id: 'veh-gmc-yukon-2023',
    name: 'GMC Yukon 2023',
    make: 'GMC',
    model: 'Yukon',
    year: 2023,
    category: 'SUV',
    companyId: 'agency-2',
    companyName: 'Riyadh Fleet Co',
    companyInitials: 'RF',
    city: 'Makkah',
    passengerCapacity: 7,
    luggageCapacity: 6,
    transmission: 'Automatic',
    pricePerDay: 450,
    hourlyRateSar: 180,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      gmcYukonImg,
      catSuvImg,
    ],
    description: 'First-class luxury SUV for up to 7 passengers with generous trunk capacity, tri-zone automatic climate control, and supreme highway stability.',
    amenities: ['Tri-Zone Climate Control', 'Free Wi-Fi', 'Bottled Mineral Water', 'USB Charging Ports', 'Tinted Heat-Shield Windows'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-riyadh', fromCity: 'Makkah', toCity: 'Riyadh', oneWayPriceSar: 1950, roundTripPriceSar: 3700, estimatedDuration: '8 hr 15 min' },
      { routeKey: 'riyadh-makkah', fromCity: 'Riyadh', toCity: 'Makkah', oneWayPriceSar: 1950, roundTripPriceSar: 3700, estimatedDuration: '8 hr 15 min' },
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 500, roundTripPriceSar: 950, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 950, roundTripPriceSar: 1800, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 6. Toyota Camry 2024 (Capture5.PNG: ECONOMY CAR, Al Faisal Transport Co, 5 seats, Daily 150 SAR)
  {
    id: 'veh-camry-2024',
    name: 'Toyota Camry 2024',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    category: 'Economy Car',
    companyId: 'agency-1',
    companyName: 'Al Faisal Transport Co',
    companyInitials: 'AF',
    city: 'Makkah',
    passengerCapacity: 5,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 150,
    hourlyRateSar: 80,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      toyotaCamryImg,
      catEconomyImg,
    ],
    description: 'Latest model Toyota Camry sedan with spacious 5-passenger interior, dual AC cooling, and smooth highway transmission.',
    amenities: ['Dual Climate AC', 'Fast Mobile Charger', 'Bottled Water', 'Child Seat On Request'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 200, roundTripPriceSar: 380, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 600, roundTripPriceSar: 1100, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 7. Toyota Camry 2022 (Sedan #2 from Makkah, Hourly 85 SAR, Daily 220 SAR)
  {
    id: 'veh-camry-2022',
    name: 'Toyota Camry 2022',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    category: 'Sedan',
    companyId: 'agency-jj',
    companyName: 'Journey Junction',
    companyInitials: 'JJ',
    city: 'Makkah',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 220,
    hourlyRateSar: 85,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catEconomyImg,
      toyotaCamryImg,
    ],
    description: 'Clean, dependable automatic sedan for inter-hotel transfers, airport pickups, and local errands.',
    amenities: ['Air Conditioning', 'AM/FM Bluetooth Audio', 'Luggage Assistance', 'English/Arabic Driver'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 230, roundTripPriceSar: 440, estimatedDuration: '1 hr 15 min' },
    ],
  },

  // 8. Honda Accord 2022 (Sedan #3 from Makkah, Hourly 95 SAR, Daily 280 SAR)
  {
    id: 'veh-accord-2022',
    name: 'Honda Accord 2022',
    make: 'Honda',
    model: 'Accord',
    year: 2022,
    category: 'Sedan',
    companyId: 'agency-3',
    companyName: 'Taif Highlands Transfers',
    companyInitials: 'TH',
    city: 'Makkah',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 280,
    hourlyRateSar: 95,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catEconomyImg,
      toyotaCamryImg,
    ],
    description: 'Comfortable Japanese mid-size sedan with quiet cabin insulation and balanced suspension, well suited for highway trips.',
    amenities: ['High Output AC', 'Bluetooth Sound', 'Tinted Heat-Shield Windows', 'Clean Interior'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-taif', fromCity: 'Makkah', toCity: 'Taif', oneWayPriceSar: 280, roundTripPriceSar: 520, estimatedDuration: '1 hr 30 min' },
    ],
  },

  // 9. Lexus ES 350 2023 (Sedan #4 from Makkah, Hourly 150 SAR, Daily 550 SAR)
  {
    id: 'veh-lexus-es-2023',
    name: 'Lexus ES 350 2023',
    make: 'Lexus',
    model: 'ES 350',
    year: 2023,
    category: 'Sedan',
    companyId: 'agency-4',
    companyName: 'Najd Premier Cars',
    companyInitials: 'NP',
    city: 'Makkah',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 550,
    hourlyRateSar: 150,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catLuxuryImg,
      bmw7Img,
    ],
    description: 'Quiet, silky-smooth V6 Japanese luxury sedan. Refined leather appointments, sunshades, and supreme reliability.',
    amenities: ['Mark Levinson Audio', 'Power Rear Sunshade', 'Cold Bottled Water', 'Leather Seating'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 350, roundTripPriceSar: 680, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 800, roundTripPriceSar: 1500, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 10. Toyota HiAce Super Custom 2024 (Van #3 from Makkah, Hourly 160 SAR, Daily 520 SAR)
  {
    id: 'veh-hiace-custom-2024',
    name: 'Toyota HiAce Super Custom 2024',
    make: 'Toyota',
    model: 'HiAce',
    year: 2024,
    category: 'Van',
    companyId: 'agency-5',
    companyName: 'Al Haramain Ride Co',
    companyInitials: 'AH',
    city: 'Makkah',
    passengerCapacity: 10,
    luggageCapacity: 8,
    transmission: 'Automatic',
    pricePerDay: 520,
    hourlyRateSar: 160,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      catBusImg,
    ],
    description: 'Comfortable 10-seater family passenger van with individual seatbelts, high ceiling, and tinted privacy glass.',
    amenities: ['Individual AC Ducts', 'USB Charging Ports', 'Luggage Assistance', 'Spacious Seating'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 420, roundTripPriceSar: 800, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 850, roundTripPriceSar: 1600, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 11. Hyundai H-1 2023 (Van #4 from Makkah, Hourly 150 SAR, Daily 480 SAR)
  {
    id: 'veh-hyundai-h1-2023',
    name: 'Hyundai H-1 2023',
    make: 'Hyundai',
    model: 'H-1',
    year: 2023,
    category: 'Van',
    companyId: 'agency-1',
    companyName: 'Al Faisal Transport Co',
    companyInitials: 'AF',
    city: 'Makkah',
    passengerCapacity: 9,
    luggageCapacity: 7,
    transmission: 'Automatic',
    pricePerDay: 480,
    hourlyRateSar: 150,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      gmcYukonImg,
    ],
    description: 'Reliable 9-seater passenger van with smooth suspension, strong dual-zone AC, and wide entry doors.',
    amenities: ['Dual AC Cooling', 'Foldable 3rd Row', 'Clean Cabin', 'Professional Driver'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 370, roundTripPriceSar: 700, estimatedDuration: '1 hr 15 min' },
    ],
  },

  // 12. Ford Transit Custom 2023 (Van #5 from Makkah, Hourly 145 SAR, Daily 490 SAR)
  {
    id: 'veh-ford-transit-2023',
    name: 'Ford Transit Custom 2023',
    make: 'Ford',
    model: 'Transit',
    year: 2023,
    category: 'Van',
    companyId: 'agency-2',
    companyName: 'Riyadh Fleet Co',
    companyInitials: 'RF',
    city: 'Makkah',
    passengerCapacity: 8,
    luggageCapacity: 8,
    transmission: 'Automatic',
    pricePerDay: 490,
    hourlyRateSar: 145,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      catBusImg,
    ],
    description: 'European designed executive multi-passenger van with cavernous trunk space for heavy pilgrim luggage.',
    amenities: ['Deep Trunk Storage', 'Independent Rear Climate', 'Armrest Captain Seats', 'Toll Passes'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 390, roundTripPriceSar: 740, estimatedDuration: '1 hr 15 min' },
    ],
  },

  // 13. Mercedes-Benz Vito 2024 (Van #6 from Makkah, Hourly 190 SAR, Daily 680 SAR)
  {
    id: 'veh-mercedes-vito-2024',
    name: 'Mercedes-Benz Vito 2024',
    make: 'Mercedes-Benz',
    model: 'Vito',
    year: 2024,
    category: 'Van',
    companyId: 'agency-jj',
    companyName: 'Journey Junction',
    companyInitials: 'JJ',
    city: 'Makkah',
    passengerCapacity: 8,
    luggageCapacity: 7,
    transmission: 'Automatic',
    pricePerDay: 680,
    hourlyRateSar: 190,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      catLuxuryImg,
    ],
    description: 'Premium German executive van offering refined passenger refinement, ambient lighting, and exceptional soundproofing.',
    amenities: ['Black Leather Interior', 'Thermotronic Climate System', 'Complimentary Zamzam', 'Chauffeur in Formal Attire'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 490, roundTripPriceSar: 920, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 1100, roundTripPriceSar: 2100, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 14. Toyota Granvia VIP 2023 (Van #7 from Makkah, Hourly 200 SAR, Daily 720 SAR)
  {
    id: 'veh-toyota-granvia-2023',
    name: 'Toyota Granvia VIP 2023',
    make: 'Toyota',
    model: 'Granvia',
    year: 2023,
    category: 'Van',
    companyId: 'agency-4',
    companyName: 'Najd Premier Cars',
    companyInitials: 'NP',
    city: 'Makkah',
    passengerCapacity: 6,
    luggageCapacity: 6,
    transmission: 'Automatic',
    pricePerDay: 720,
    hourlyRateSar: 200,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      catSuvImg,
    ],
    description: 'VIP luxury passenger van fitted with Ottoman reclining seats, dual power sliding doors, and ultra-quiet cabin ride.',
    amenities: ['Power Ottoman Recliners', 'Rear Entertainment System', 'Dual Sunroofs', 'High-speed Wi-Fi Hotspot'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 520, roundTripPriceSar: 980, estimatedDuration: '1 hr 15 min' },
      { routeKey: 'makkah-madinah', fromCity: 'Makkah', toCity: 'Madinah', oneWayPriceSar: 1150, roundTripPriceSar: 2200, estimatedDuration: '4 hr 15 min' },
    ],
  },

  // 15. Nissan Urvan 2022 (Van #8 from Makkah, Manual Transmission, Hourly 140 SAR, Daily 420 SAR)
  {
    id: 'veh-nissan-urvan-2022',
    name: 'Nissan Urvan 2022',
    make: 'Nissan',
    model: 'Urvan',
    year: 2022,
    category: 'Van',
    companyId: 'agency-3',
    companyName: 'Taif Highlands Transfers',
    companyInitials: 'TH',
    city: 'Makkah',
    passengerCapacity: 12,
    luggageCapacity: 8,
    transmission: 'Manual',
    pricePerDay: 420,
    hourlyRateSar: 140,
    coversCity: 'Makkah',
    currency: 'SAR',
    images: [
      catVanImg,
      catBusImg,
    ],
    description: 'Dependable and spacious passenger van ideal for budget group transfers and Ziyarat tour circuits.',
    amenities: ['Air Conditioning', 'High Back Seating', 'Luggage Compartment', 'Licensed Driver'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'makkah-jeddah', fromCity: 'Makkah', toCity: 'Jeddah', oneWayPriceSar: 350, roundTripPriceSar: 660, estimatedDuration: '1 hr 15 min' },
    ],
  },

  // 16. BMW 7 Series 2024 (Riyadh VIP fleet)
  {
    id: 'veh-bmw-7-2024',
    name: 'BMW 7 Series 2024',
    make: 'BMW',
    model: '7 Series',
    year: 2024,
    category: 'Luxury Car',
    companyId: 'agency-4',
    companyName: 'Najd Premier Cars',
    companyInitials: 'NP',
    city: 'Riyadh',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 1100,
    hourlyRateSar: 250,
    currency: 'SAR',
    images: [
      bmw7Img,
      catLuxuryImg,
    ],
    description: 'Unmatched luxury executive transport. Reclining leather seating, whisper-quiet cabin acoustics, panoramic sky lounge roof.',
    amenities: ['Executive Leather Interior', 'On-board Wi-Fi', 'Complimentary Zamzam & Refreshments', 'Chauffeur in Uniform'],
    isAvailable: true,
    supportedRoutes: [
      { routeKey: 'riyadh-dammam', fromCity: 'Riyadh', toCity: 'Dammam', oneWayPriceSar: 1400, roundTripPriceSar: 2600, estimatedDuration: '3 hr 45 min' },
    ],
  },
];


// Popular Intercity Routes
export const POPULAR_ROUTES: RouteInfo[] = [
  {
    id: 'route-1',
    fromCity: 'Jeddah Airport (JED)',
    toCity: 'Makkah',
    distanceKm: 95,
    estimatedTime: '1 hr 15 mins',
    popularFor: 'Arrival Pilgrims (Umrah)',
    startingPriceSar: 200,
    description: 'Direct highway transfer from King Abdulaziz International Airport (Terminals 1 & North) to hotel doorsteps in Makkah.',
  },
  {
    id: 'route-2',
    fromCity: 'Makkah',
    toCity: 'Madinah',
    distanceKm: 440,
    estimatedTime: '4 hrs 15 mins',
    popularFor: 'Inter-Holy City Pilgrimage',
    startingPriceSar: 450,
    description: 'Scenic intercity transfer along the historic Hijaz highway with comfort stops at rest areas.',
  },
  {
    id: 'route-3',
    fromCity: 'Madinah',
    toCity: 'Jeddah Airport (JED)',
    distanceKm: 415,
    estimatedTime: '4 hrs',
    popularFor: 'Departure Transfers',
    startingPriceSar: 420,
    description: 'Smooth departure trip from the Prophet’s Mosque hotels directly to your flight terminal.',
  },
  {
    id: 'route-4',
    fromCity: 'Makkah',
    toCity: 'Taif',
    distanceKm: 85,
    estimatedTime: '1 hr 30 mins',
    popularFor: 'Ziyarat & Mountain Retreat',
    startingPriceSar: 280,
    description: 'Ascend the winding Al Hada mountain pass into the cooler rose gardens and historic mosques of Taif.',
  },
  {
    id: 'route-5',
    fromCity: 'Riyadh',
    toCity: 'Dammam',
    distanceKm: 395,
    estimatedTime: '3 hrs 45 mins',
    popularFor: 'Business & Family Travel',
    startingPriceSar: 500,
    description: 'Direct highway connection between the capital and the Eastern Province coast.',
  },
];

// Ziyarat Pilgrimage Tours
export const ZIYARAT_DESTINATIONS: ZiyaratDestination[] = [
  {
    id: 'ziyarat-makkah',
    title: 'Makkah Historical Sites (Ziyarat)',
    city: 'Makkah',
    duration: '3 - 4 Hours',
    highlights: ['Cave of Hira (Jabal al-Nour)', 'Cave of Thawr', 'Mina Tent City', 'Muzdalifah Plain', 'Mount Arafat (Jabal al-Rahmah)'],
    description: 'Visit the foundational sites of Islamic revelation and Hajj rituals with a dedicated driver who waits at each landmark for prayers and contemplation.',
    suggestedVehicles: ['GMC Yukon', 'Toyota Camry', 'Toyota HiAce'],
    priceEstimateSar: 250,
  },
  {
    id: 'ziyarat-madinah',
    title: 'Madinah Sacred Heritage Ziyarat',
    city: 'Madinah',
    duration: '3.5 - 5 Hours',
    highlights: ['Masjid Quba (First Mosque)', 'Mount Uhud & Martyrs Cemetery', 'Masjid al-Qiblatayn', 'Seven Mosques (Battle of the Trench)', 'Ghamama Mosque'],
    description: 'Comprehensive guided tour to perform sunnah prayers at Masjid Quba and honor the resting place of Sayyidna Hamza and the companions at Mount Uhud.',
    suggestedVehicles: ['Toyota Camry', 'Mercedes Sprinter', 'Toyota Coaster'],
    priceEstimateSar: 220,
  },
  {
    id: 'ziyarat-taif',
    title: 'Taif Historical & Miqat Tour',
    city: 'Taif',
    duration: 'Full Day (6 - 8 Hours)',
    highlights: ['Masjid Abdullah Ibn Abbas', 'Addas Garden & Mosque', 'Al-Hada Cable Car & Mountains', 'Qarn al-Manazil Miqat', 'Rose Oil Distilleries'],
    description: 'Experience the emotional history of the Prophet (pbuh) at Taif, make intention at the Miqat for Umrah, and witness Saudi rose water craft.',
    suggestedVehicles: ['GMC Yukon', 'BMW 7 Series', 'Mercedes Van'],
    priceEstimateSar: 450,
  },
  {
    id: 'ziyarat-badr',
    title: 'Battle of Badr Historical Journey',
    city: 'Badr',
    duration: '5 - 6 Hours',
    highlights: ['Battlefield of Badr', 'Martyrs Memorial Cemetery', 'Al-Udwat al-Dunya & al-Quswa Dunes', 'Al-Arish Mosque Site'],
    description: 'A deeply moving excursion from Madinah through the desert to the site of Islam’s most famous early defensive battle.',
    suggestedVehicles: ['GMC Yukon', 'Toyota Camry'],
    priceEstimateSar: 380,
  },
];

// FAQs matching Screenshot 6
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How do I book a vehicle?',
    answer: 'Select your pickup city, destination, travel date, pickup time, and preferred trip type (One-Way or Round-Trip) on our search bar. Browse verified transport companies, choose the vehicle that fits your group and luggage, and click "Book Now" or directly contact the agency via phone or WhatsApp. Once submitted, the company confirms your reservation directly.',
  },
  {
    question: 'How do companies get listed?',
    answer: 'Transport and rental companies must click "List your company" in the navigation bar, provide their Saudi Ministry of Transport commercial license (CR), commercial vehicle insurance, and operational fleet details. Our verification team audits credentials within 24 to 48 hours before issuing the verified badge.',
  },
  {
    question: 'How do I pay?',
    answer: 'FlyKaaba connects you directly with transport companies without middlemen or commission markups. You pay the company directly via cash upon arrival, credit/debit card, or electronic bank transfer according to the specific agency’s payment terms agreed upon booking.',
  },
  {
    question: 'Can I cancel a booking?',
    answer: 'Yes. Most partner companies offer free cancellation up to 12 to 24 hours prior to scheduled pickup. Specific cancellation terms and flexibility policies are clearly displayed on each vehicle’s detail card and in your booking confirmation.',
  },
];

// Blog Posts matching Screenshots 6 & 7
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: "How to Rent a Car in Saudi Arabia: A First-Timer's Guide",
    slug: 'how-to-rent-a-car-in-saudi-arabia',
    categories: ['Car Rental', 'Travel Tips'],
    excerpt: 'Documents, car choice, pricing, pickup and return — a simple step-by-step guide for anyone renting a car in Saudi Arabia for the first time.',
    content: `Renting a vehicle in Saudi Arabia has become remarkably straightforward thanks to recent transport modernization and tourist e-visas. Whether arriving at King Abdulaziz International Airport in Jeddah for Umrah or exploring Riyadh's commercial towers, having private wheels grants unparalleled freedom.

Key Documents Needed:
1. Valid Passport with tourist or Umrah entry stamp.
2. Valid International Driving Permit (IDP) along with your original national driver's license (or GCC driving license).
3. Major credit card for security pre-authorizations.
4. Active local or roaming phone number for GPS navigation and company communications.

Tips for First-Time Drivers:
- Highways are wide, modern, and heavily monitored with automated Saher speed cameras. Maintain speed limits strictly.
- When driving into Makkah, private non-Muslim drivers must use the Haramain bypass roads; only authorized Muslim pilgrims and transport providers may enter the central Haram zone.
- Fuel prices are very reasonable across Petromin, SASCO, and Aldrees stations. Keep credit cards or Apple Pay ready at fuel pumps.`,
    date: 'Fri Sep 18 2026',
    image: catEconomyImg,
    author: 'Tariq Al-Mansoor',
    readTime: '6 min read',
  },
  {
    id: 'blog-2',
    title: 'Airport Transfers With a Private Driver: What to Expect',
    slug: 'airport-transfers-with-a-private-driver',
    categories: ['Airport Transfers', 'Travel Tips'],
    excerpt: 'Landing in Jeddah, Riyadh or Madinah? Here is how a pre-booked private transfer works, what to confirm beforehand and how to find your driver.',
    content: `After a long flight from North America, Europe, or Asia, landing at King Abdulaziz International Airport (JED) or Prince Mohammad bin Abdulaziz Airport (MED) can be overwhelming with bags, Ihram garments, and family members. Pre-booking a verified private driver eliminates the taxi scrum and guarantees a calm, comfortable journey.

How Private Chauffeur Transfers Work:
1. Flight Tracking: Reliable drivers monitor your flight number and adjust pickup timings for gate delays or early arrivals.
2. Meet & Greet: Your driver will stand outside customs exit arrivals holding a clear FlyKaaba sign with your name.
3. Luggage Assistance: The chauffeur helps transport and securely load your heavy bags into spacious luggage compartments.
4. Direct Route to Hotel: Enjoy air conditioning, chilled water, and complimentary high-speed mobile Wi-Fi all the way to your hotel lobby.

What to Confirm Before Arrival:
- Share your WhatsApp number so the driver can send their live location pin.
- Confirm passenger count and total bags so the vehicle category (Sedan vs SUV vs Van) matches your load.`,
    date: 'Tue Sep 15 2026',
    image: catLuxuryImg,
    author: 'Samira Al-Zahrani',
    readTime: '5 min read',
  },
  {
    id: 'blog-3',
    title: 'Planning an SUV Road Trip in Saudi Arabia',
    slug: 'planning-an-suv-road-trip-in-saudi-arabia',
    categories: ['Car Rental', 'Road Trips', 'Safety & Rules'],
    excerpt: 'Long distances, hot weather and wide-open roads: how to plan the route, choose an SUV and drive safely on a Saudi road trip.',
    content: `Saudi Arabia offers some of the most dramatic landscapes in the world — from the cloud-shrouded peaks of Taif and Abha down to the sweeping red sand dunes of the Empty Quarter and the turquoise Red Sea coast.

Why Choose an SUV for Saudi Road Trips:
- Elevated Ride Height: Better visibility on desert highways and peace of mind during occasional sand drifts.
- Robust Tri-Zone Climate Control: Keeps all three rows cool during peak noon temperatures.
- Space for Everyone: 7 passengers can ride comfortably with room for coolers, prayer mats, and luggage.

Road Trip Essentials:
- Pre-download offline Google Maps or Waze, as cellular reception can fluctuate in deep mountain canyons.
- Keep ample water and dates in the vehicle at all times.
- Plan fuel stops whenever your gauge hits half-tank, especially along rural desert highways.`,
    date: 'Fri Sep 11 2026',
    image: catSuvImg,
    author: 'Faisal Al-Otaibi',
    readTime: '8 min read',
  },
];

export interface BookingRecord {
  id: string;
  referenceNumber: string;
  vehicleName: string;
  vehicleCategory: string;
  companyName: string;
  pickupCity: string;
  destinationCity: string;
  travelDate: string;
  pickupTime: string;
  returnDate?: string;
  tripType: 'one-way' | 'round-trip';
  passengers: number;
  totalPriceSar: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialRequests?: string;
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed';
  createdAt: string;
}
