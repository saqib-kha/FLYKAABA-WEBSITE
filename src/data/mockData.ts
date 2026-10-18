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

export interface Vehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  category: 'Economy Car' | 'Luxury Car' | 'SUV' | 'Van' | 'Bus';
  companyId: string;
  companyName: string;
  companyAvatar?: string;
  city: string;
  passengerCapacity: number;
  luggageCapacity: number;
  transmission: 'Automatic' | 'Manual';
  pricePerDay: number;
  currency: string;
  images: string[];
  description: string;
  amenities: string[];
  isAvailable: boolean;
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
];


// Featured & Category Vehicles matching Screenshots 1, 2, 3, and 4
export const FEATURED_VEHICLES: Vehicle[] = [
  // --- ECONOMY CARS matching screenshots 1.PNG, 2.PNG, 3.PNG ---
  {
    id: 'veh-camry-2024',
    name: 'Toyota Camry 2024',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    category: 'Economy Car',
    companyId: 'agency-1',
    companyName: 'Al Faisal Transport Co',
    companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
    city: 'Madinah',
    passengerCapacity: 5,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 150,
    currency: 'SAR',
    images: [
      toyotaCamryImg,
      catEconomyImg,
    ],
    description: 'Latest model Toyota Camry sedan with spacious 5-passenger interior, dual AC cooling, and smooth highway transmission.',
    amenities: ['Dual Climate AC', 'Fast Mobile Phone Charger', 'Bottled Mineral Water', 'Child Seat On Request'],
    isAvailable: true,
  },
  {
    id: 'veh-camry-2022',
    name: 'Toyota Camry 2022',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    category: 'Economy Car',
    companyId: 'agency-2',
    companyName: 'Madinah Pilgrim Fleet',
    companyAvatar: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&auto=format&fit=crop&q=80',
    city: 'Madinah',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 200,
    currency: 'SAR',
    images: [
      catEconomyImg,
      toyotaCamryImg,
    ],
    description: 'Clean, dependable automatic sedan for inter-hotel transfers, airport pickups, and local errands.',
    amenities: ['Air Conditioning', 'AM/FM Bluetooth Audio', 'Luggage Assistance', 'English/Arabic Driver'],
    isAvailable: true,
  },
  {
    id: 'veh-accord-2022',
    name: 'Honda Accord 2022',
    make: 'Honda',
    model: 'Accord',
    year: 2022,
    category: 'Economy Car',
    companyId: 'agency-3',
    companyName: 'Taif Highlands Transfers',
    companyAvatar: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&auto=format&fit=crop&q=80',
    city: 'Taif',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 300,
    currency: 'SAR',
    images: [
      catEconomyImg,
      toyotaCamryImg,
    ],
    description: 'Comfortable Japanese mid-size sedan with quiet cabin insulation and balanced suspension, well suited for mountain roads.',
    amenities: ['High Output AC', 'Bluetooth Sound', 'Tinted Heat-Shield Windows', 'Clean Interior'],
    isAvailable: true,
  },
  {
    id: 'veh-camry-2023',
    name: 'Toyota Camry 2023',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    category: 'Economy Car',
    companyId: 'agency-5',
    companyName: 'Al Haramain Ride Co',
    companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
    city: 'Jeddah',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 300,
    currency: 'SAR',
    images: [
      toyotaCamryImg,
      catEconomyImg,
    ],
    description: 'The gold standard for comfortable city and airport transfers in Saudi Arabia. Reliable, clean, air-conditioned, and driven by punctual licensed drivers.',
    amenities: ['Air Conditioning', 'Fast Mobile Charger', 'Complimentary Water', 'Ample Trunk Space'],
    isAvailable: true,
  },

  // --- LUXURY CARS ---
  {
    id: 'veh-bmw-7-2023',
    name: 'BMW 7 Series 2023',
    make: 'BMW',
    model: '7 Series',
    year: 2023,
    category: 'Luxury Car',
    companyId: 'agency-4',
    companyName: 'Najd Premier Cars',
    companyAvatar: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&auto=format&fit=crop&q=80',
    city: 'Riyadh',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 900,
    currency: 'SAR',
    images: [
      bmw7Img,
      catLuxuryImg,
    ],
    description: 'Unmatched luxury executive transport. Reclining leather seating, whisper-quiet cabin acoustics, panoramic sky lounge roof, and discrete professional VIP driver service.',
    amenities: ['Executive Leather Interior', 'On-board Wi-Fi', 'Complimentary Zamzam & Refreshments', 'Rear Seat Entertainment Screens', 'Chauffeur in Uniform'],
    isAvailable: true,
  },
  {
    id: 'veh-mercedes-s-2023',
    name: 'Mercedes-Benz S-Class 2023',
    make: 'Mercedes-Benz',
    model: 'S 500',
    year: 2023,
    category: 'Luxury Car',
    companyId: 'agency-1',
    companyName: 'Al Faisal Transport Co',
    companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
    city: 'Madinah',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 1100,
    currency: 'SAR',
    images: [
      catLuxuryImg,
      bmw7Img,
    ],
    description: 'The pinnacle of luxury automotive comfort. Soft-close doors, air suspension, ambient lighting, and executive VIP escort.',
    amenities: ['Burmester 3D Sound', 'Rear Executive Lounger', 'Chilled Refreshments', 'VIP Fast-track coordination'],
    isAvailable: true,
  },
  {
    id: 'veh-lexus-es-2023',
    name: 'Lexus ES 350 2023',
    make: 'Lexus',
    model: 'ES 350',
    year: 2023,
    category: 'Luxury Car',
    companyId: 'agency-4',
    companyName: 'Najd Premier Cars',
    companyAvatar: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&auto=format&fit=crop&q=80',
    city: 'Riyadh',
    passengerCapacity: 4,
    luggageCapacity: 3,
    transmission: 'Automatic',
    pricePerDay: 650,
    currency: 'SAR',
    images: [
      catLuxuryImg,
      bmw7Img,
    ],
    description: 'Quiet, silky-smooth V6 Japanese luxury sedan. Refined leather appointments, sunshades, and supreme reliability.',
    amenities: ['Mark Levinson Audio', 'Power Rear Sunshade', 'Cold Bottled Water', 'Leather Seating'],
    isAvailable: true,
  },

  // --- SUVS ---
  {
    id: 'veh-gmc-yukon-2023',
    name: 'GMC Yukon 2023',
    make: 'GMC',
    model: 'Yukon',
    year: 2023,
    category: 'SUV',
    companyId: 'agency-2',
    companyName: 'Riyadh Fleet Co',
    companyAvatar: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&auto=format&fit=crop&q=80',
    city: 'Riyadh',
    passengerCapacity: 7,
    luggageCapacity: 5,
    transmission: 'Automatic',
    pricePerDay: 450,
    currency: 'SAR',
    images: [
      gmcYukonImg,
      catSuvImg,
    ],
    description: 'The GMC Yukon 2023 offers first-class travel for up to 7 passengers with expansive luggage room, tri-zone automatic climate control, and powerful V8 highway stability.',
    amenities: ['Air Conditioning', 'Free Wi-Fi', 'Bottled Water', 'USB Charging Ports', 'Tinted Windows', 'Child Safety Seat Available'],
    isAvailable: true,
  },
  {
    id: 'veh-hyundai-palisade-2024',
    name: 'Hyundai Palisade 2024',
    make: 'Hyundai',
    model: 'Palisade',
    year: 2024,
    category: 'SUV',
    companyId: 'agency-1',
    companyName: 'Al Faisal Transport Co',
    companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
    city: 'Madinah',
    passengerCapacity: 8,
    luggageCapacity: 5,
    transmission: 'Automatic',
    pricePerDay: 480,
    currency: 'SAR',
    images: [
      catSuvImg,
      gmcYukonImg,
    ],
    description: 'Modern 3-row family SUV with captain chairs, multiple USB-C ports in every row, and superior cabin soundproofing.',
    amenities: ['Tri-Zone Climate Control', 'Wireless Phone Charger', 'Roof Luggage Rails', 'Driver Safety Package'],
    isAvailable: true,
  },
  {
    id: 'veh-toyota-landcruiser-2023',
    name: 'Toyota Land Cruiser 300 2023',
    make: 'Toyota',
    model: 'Land Cruiser',
    year: 2023,
    category: 'SUV',
    companyId: 'agency-4',
    companyName: 'Najd Premier Cars',
    companyAvatar: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&auto=format&fit=crop&q=80',
    city: 'Riyadh',
    passengerCapacity: 7,
    luggageCapacity: 5,
    transmission: 'Automatic',
    pricePerDay: 700,
    currency: 'SAR',
    images: [
      catSuvImg,
      gmcYukonImg,
    ],
    description: 'The undisputed King of the Arabian Desert. Built for extreme comfort and highway long-distance cruising between provinces.',
    amenities: ['Coolbox Mini-Fridge', 'JBL Premium Audio', 'Leather Captain Seating', 'Rear Climate Control'],
    isAvailable: true,
  },

  // --- VANS ---
  {
    id: 'veh-mercedes-sprinter-2024',
    name: 'Mercedes-Benz Sprinter VIP 2024',
    make: 'Mercedes-Benz',
    model: 'Sprinter VIP',
    year: 2024,
    category: 'Van',
    companyId: 'agency-3',
    companyName: 'Taif Highlands Transfers',
    companyAvatar: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=100&auto=format&fit=crop&q=80',
    city: 'Taif',
    passengerCapacity: 12,
    luggageCapacity: 10,
    transmission: 'Automatic',
    pricePerDay: 750,
    currency: 'SAR',
    images: [
      catVanImg,
      agencyTaifCover,
    ],
    description: 'High-roof VIP luxury van built for extended family pilgrimage groups. Individual captain chairs, overhead luggage racks, and smooth suspension.',
    amenities: ['High Roof Standing Room', 'Air Conditioning & Climate Ducting', 'Captain Leather Seats', 'Wi-Fi Hotspot', 'PA Audio System for Ziyarat Guides'],
    isAvailable: true,
  },
  {
    id: 'veh-toyota-hiace-2024',
    name: 'Toyota HiAce Grand Cabin 2024',
    make: 'Toyota',
    model: 'HiAce',
    year: 2024,
    category: 'Van',
    companyId: 'agency-5',
    companyName: 'Al Haramain Ride Co',
    companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
    city: 'Jeddah',
    passengerCapacity: 10,
    luggageCapacity: 8,
    transmission: 'Automatic',
    pricePerDay: 500,
    currency: 'SAR',
    images: [
      catVanImg,
      gmcYukonImg,
    ],
    description: 'The most popular passenger van in Saudi Arabia for Umrah groups arriving at Jeddah airport with extensive luggage.',
    amenities: ['Individual AC Vents', 'Ample Luggage Bay', 'Easy Step Access', 'Courteous Driver'],
    isAvailable: true,
  },

  // --- BUSES ---
  {
    id: 'veh-toyota-coaster-2024',
    name: 'Toyota Coaster Tourist Coach 2024',
    make: 'Toyota',
    model: 'Coaster',
    year: 2024,
    category: 'Bus',
    companyId: 'agency-1',
    companyName: 'Al Faisal Transport Co',
    companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
    city: 'Madinah',
    passengerCapacity: 30,
    luggageCapacity: 25,
    transmission: 'Manual',
    pricePerDay: 1350,
    currency: 'SAR',
    images: [
      catBusImg,
    ],
    description: 'The preferred mid-size bus for Umrah and Ziyarat delegation groups traveling between Makkah, Madinah, and historical battlefield sites with experienced route drivers.',
    amenities: ['Heavy Duty AC System', 'Microphone System', 'Overhead Luggage Bins', 'Emergency First Aid Kit', 'Licensed Commercial Operator'],
    isAvailable: true,
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
