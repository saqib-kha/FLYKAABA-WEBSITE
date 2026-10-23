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

export interface BlogTableData {
  headers: string[];
  rows: string[][];
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  categories: string[];
  excerpt: string;
  content: string;
  date: string;
  dateFormatted?: string;
  image: string;
  author: string;
  readTime: string;
  tableData?: BlogTableData;
  faqs?: BlogFaqItem[];
  checklist?: string[];
  documents?: string[];
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

// Blog Posts matching Screenshots 6 & 7 & User Uploaded Blog Pages
export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: "How to Rent a Car in Saudi Arabia: A First-Timer's Guide",
    slug: 'how-to-rent-a-car-in-saudi-arabia-a-first-timers-guide',
    categories: ['Car Rental', 'Travel Tips'],
    excerpt: 'Documents, car choice, pricing, pickup and return — a simple step-by-step guide for anyone renting a car in Saudi Arabia for the first time.',
    content: `Renting a car is the easiest way to move at your own pace in Saudi Arabia, where cities are spread out and public transport does not reach every place you may want to visit. For a first-timer, though, the process can feel unfamiliar: which documents do you need, what does the price include, and how do you avoid surprises at pickup?

This guide walks through the whole journey — from choosing a vehicle to handing back the keys — so you can book with confidence.

### Before You Book
A little preparation saves a lot of time at the counter. Decide the dates and the pickup and return cities first, because availability and prices depend on both. If you plan to drive between cities, tell the company up front so the right vehicle and terms are offered.

### Documents to prepare
- Your passport and visa or residence permit.
- A valid driving licence from your home country. Whether an international driving permit is also needed depends on your licence and nationality, so check the current rules with the company you book with and with official sources before you travel.
- A payment method for the booking and any security deposit the company asks for.
- Your booking confirmation, saved on your phone.

### Choosing the Right Car
Pick the smallest vehicle that fits your group and luggage comfortably. A bigger vehicle costs more per day and is harder to park in busy city centres. Use the table below as a rough starting point.

### Understanding the Price
On the marketplace the total is worked out when you send your booking request: the daily price multiplied by the number of days, plus any route price if the vehicle is booked with a driver for a specific route. The company then confirms or declines your request, and a private chat opens so you can agree pickup details directly.

Always read what a listing says about the security deposit, the daily distance allowance, fuel policy and insurance. These are the details that change the real cost of a rental, and they are worth asking about in the chat before you confirm.

### Pickup and Return Checklist
- Walk around the car with the company representative and note existing scratches or dents — photograph them.
- Check the fuel level, the tyres and that the air conditioning works.
- Confirm the return time, place and fuel rule in writing (the booking chat counts).
- Save the company's phone number in case you need help on the road.
- Return the car on time and ask for a receipt or confirmation that it came back in good condition.

### Conclusion
Renting a car in Saudi Arabia is straightforward once you know what to prepare. Choose a verified company, compare vehicles side by side, ask questions in the booking chat, and inspect the car at pickup. Do that, and you can spend your energy on the trip instead of the paperwork.`,
    date: 'Fri Sep 18 2026',
    dateFormatted: 'September 18, 2026',
    image: catEconomyImg,
    author: 'FlyKaaba',
    readTime: '6 min read',
    tableData: {
      headers: ['VEHICLE', 'BEST FOR', 'TYPICAL SEATS'],
      rows: [
        ['Economy car', 'Solo travellers, couples, city driving', '4–5'],
        ['Luxury sedan', 'Business trips and special occasions', '4–5'],
        ['SUV', 'Families, longer drives, more luggage', '5–7'],
        ['Van', 'Larger families and small groups', '7–12'],
      ],
    },
    documents: [
      'Your passport and visa or residence permit.',
      'A valid driving licence from your home country. Whether an international driving permit is also needed depends on your licence and nationality, so check the current rules with the company you book with and with official sources before you travel.',
      'A payment method for the booking and any security deposit the company asks for.',
      'Your booking confirmation, saved on your phone.',
    ],
    checklist: [
      'Walk around the car with the company representative and note existing scratches or dents — photograph them.',
      'Check the fuel level, the tyres and that the air conditioning works.',
      'Confirm the return time, place and fuel rule in writing (the booking chat counts).',
      'Save the company\'s phone number in case you need help on the road.',
      'Return the car on time and ask for a receipt or confirmation that it came back in good condition.',
    ],
    faqs: [
      {
        question: 'Do I need to pay when I send a booking request?',
        answer: 'Sending a request does not charge you. Payment is currently arranged directly with the company after your booking is accepted, so agree the method with them in the booking chat.',
      },
      {
        question: 'Can I cancel a booking?',
        answer: 'Yes, from your account dashboard. The cancellation terms are shown before you confirm a booking, so read them first.',
      },
      {
        question: 'Can I take the car to another city?',
        answer: 'Often yes, but it depends on the company. Tell them your route when you book so they can confirm the terms.',
      },
    ],
  },
  {
    id: 'blog-2',
    title: 'Airport Transfers With a Private Driver: What to Expect',
    slug: 'airport-transfers-with-a-private-driver-what-to-expect',
    categories: ['Airport Transfers', 'Travel Tips'],
    excerpt: 'Landing in Jeddah, Riyadh or Madinah? Here is how a pre-booked private transfer works, what to confirm beforehand and how to find your driver.',
    content: `After an exhausting long-haul flight into King Abdulaziz International Airport (JED) or Prince Mohammad bin Abdulaziz Airport (MED), navigating airport taxi queues with heavy bags, Ihram garments, and tired family members can be challenging. Pre-booking a verified private chauffeur ensures a seamless, serene transition directly to your hotel.

### How Private Transfers Work with FlyKaaba
1. **Live Flight Tracking**: Verified drivers track your flight status in real time and automatically adjust pickup times if your flight arrives early or encounters baggage delays.
2. **Terminal Meet & Greet**: Your chauffeur waits in the arrivals hall holding an identifiable FlyKaaba placard with your name.
3. **Luggage Handling**: Professional drivers assist with bags and load them securely into your designated vehicle.
4. **Direct, Air-Conditioned Route**: Enjoy refreshing chilled water, onboard Wi-Fi, and a tranquil ride directly to your hotel doorstep.

### Key Details to Confirm Before Departing
- Ensure your WhatsApp number is active so your driver can send their live GPS location and vehicle license plate number before you exit customs.
- Specify passenger count and large luggage pieces so the appropriate vehicle category (Executive Sedan, Luxury SUV, or 12-seater Van) is dispatched.`,
    date: 'Tue Sep 15 2026',
    image: bmw7Img,
    author: 'FlyKaaba Editorial Team',
    readTime: '5 min read',
  },
  {
    id: 'blog-3',
    title: 'Planning an SUV Road Trip in Saudi Arabia',
    slug: 'planning-an-suv-road-trip-in-saudi-arabia',
    categories: ['Car Rental', 'Road Trips', 'Safety & Rules'],
    excerpt: 'Long distances, hot weather and wide-open roads: how to plan the route, choose an SUV and drive safely on a Saudi road trip.',
    content: `From the historic UNESCO rock art in AlUla to the dramatic escarpment of the Edge of the World in Riyadh and the cool mountainous serpentine roads of Taif and Asir, Saudi Arabia is a premier road trip destination.

### Why an SUV is Essential
- **Ground Clearance**: Essential for navigating scenic viewpoints, unpaved heritage trails, and occasional desert sand drifts.
- **Tri-Zone Climate Control**: Multi-zone high-output air conditioning ensures back-row passengers remain perfectly cool during daytime desert crossings.
- **Luggage & Gear Capacity**: Generous trunk volume for extra suitcases, Zamzam water containers, coolers, and travel supplies.

### Highway Tips for Desert Driving
- Never let your fuel tank drop below a quarter-full; service stations can be 60 to 80 km apart in remote stretches.
- Carry bottled water, dates, and a portable tire inflator for emergency peace of mind.
- Download offline navigation maps before setting off into dramatic mountain ranges where cellular signals can dip.`,
    date: 'Fri Sep 11 2026',
    image: catSuvImg,
    author: 'FlyKaaba Editorial Team',
    readTime: '7 min read',
  },
  {
    id: 'blog-4',
    title: 'Family Travel by Van: Comfort, Space and Simple Planning',
    slug: 'family-travel-by-van-comfort-space-and-simple-planning',
    categories: ['Family & Groups', 'Travel Tips'],
    excerpt: 'Travelling with children, grandparents and lots of luggage? Here is why a van is often the easiest choice — and how to book the right one.',
    content: `When travelling as an extended family for Umrah or summer holidays, splitting into multiple standard sedan taxis creates coordination headaches, higher costs, and unnecessary stress. A dedicated 7-to-14 seater passenger van keeps everyone united and comfortable throughout the journey.

### Benefits of Booking a Dedicated Van
- **Togetherness**: Grandparents, parents, and children travel together without worrying about losing sight of a second vehicle in heavy Makkah or Madinah traffic.
- **Luggage Without Compromise**: Modern vans such as the Toyota HiAce, Hyundai Staria, or Mercedes Vito offer dedicated rear luggage bays that easily hold 8 to 12 full-sized suitcases plus strollers and wheelchairs.
- **Cost Effective**: One van booking is significantly more affordable than paying for 3 separate taxis or multiple rideshares for every transfer and Ziyarat visit.

### Booking Advice
- Request child seats and wheelchair-accessible sliding door options in advance through FlyKaaba partner notes.
- Clarify whether you require an hourly chauffeur for city sightseeing or a point-to-point intercity transfer.`,
    date: 'Tue Sep 08 2026',
    image: catVanImg,
    author: 'FlyKaaba Editorial Team',
    readTime: '5 min read',
  },
  {
    id: 'blog-5',
    title: 'Group Travel by Bus: Ziyarat, Events and Family Gatherings',
    slug: 'group-travel-by-bus-for-ziyarat-and-events',
    categories: ['Family & Groups', 'Ziyarat Travel'],
    excerpt: 'Booking a minibus or bus for a group? How to choose the size, agree the route and keep a big group on schedule.',
    content: `Organizing group transport for Umrah delegations, school educational trips, wedding parties, or multi-family Ziyarat excursions requires reliable scheduling and certified commercial vehicles.

### Choosing the Right Coach Size
- **Minibuses (15–23 Seats)**: Ideal for mid-sized delegations visiting sacred historical sites like Cave Hira, Mount Uhud, Masjid Quba, and the Battle of Badr.
- **Full-Size Coaches (30–50 Seats)**: Perfect for international pilgrim groups traveling the 440 km Makkah–Madinah intercity highway with onboard restrooms and underfloor luggage holds.

### Keeping Your Itinerary Smooth
- Agree on scheduled pickup times and dedicated meeting locations outside busy hotel lobbies.
- Ensure the transport company has active Saudi Ministry of Transport commercial operation permits for intercity transit.
- FlyKaaba verifies all fleet licenses, vehicle insurance, and driver credentials so your group travels with complete confidence.`,
    date: 'Fri Sep 04 2026',
    image: catBusImg,
    author: 'FlyKaaba Editorial Team',
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
  status: 'Pending Confirmation' | 'Confirmed' | 'Completed' | 'Pending' | 'Cancelled';
  createdAt: string;
}
