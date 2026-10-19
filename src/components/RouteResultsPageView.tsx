import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  MapPin, 
  Check, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  SlidersHorizontal, 
  X, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { Vehicle, TravelAgency, VehicleRoutePrice, SAUDI_CITIES } from '../data/mockData';
import { SearchParams } from './HeroSection';

interface RouteResultsPageViewProps {
  searchParams: SearchParams;
  allVehicles: Vehicle[];
  agencies: TravelAgency[];
  onGoHome: () => void;
  onGoToRoutes: () => void;
  onBookVehicle: (vehicle: Vehicle, routeDetails?: {
    pickupCity: string;
    destinationCity: string;
    travelDate: string;
    pickupTime: string;
    tripType: 'one-way' | 'round-trip';
    serviceType: 'point-to-point' | 'hourly' | 'ziyarat';
    priceSar: number;
    hours?: number;
  }) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onUpdateSearch: (params: SearchParams) => void;
}

export const RouteResultsPageView: React.FC<RouteResultsPageViewProps> = ({
  searchParams,
  allVehicles,
  agencies,
  onGoHome,
  onGoToRoutes,
  onBookVehicle,
  onSelectVehicle,
  onUpdateSearch,
}) => {
  // Service Type: 'point-to-point' | 'ziyarat' | 'hourly'
  const [serviceType, setServiceType] = useState<'point-to-point' | 'ziyarat' | 'hourly'>('point-to-point');

  // Filters State matching Screenshots Capture1.PNG, Capture4.PNG, Capture5.PNG
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [passengerFilter, setPassengerFilter] = useState<number>(0);
  const [transmissionFilter, setTransmissionFilter] = useState<'any' | 'automatic'>('any');

  // Hourly duration selector for vehicles in hourly mode
  const [selectedHours, setSelectedHours] = useState<{ [vehicleId: string]: number }>({});

  // Expanded features details accordions
  const [expandedDetails, setExpandedDetails] = useState<{ [vehicleId: string]: boolean }>({});

  // Image carousel slide tracker for vehicle cards
  const [activeImageIndex, setActiveImageIndex] = useState<{ [vehicleId: string]: number }>({});

  // Mobile Filter Drawer Toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Quick Edit Modals for Steps 1 & 2 in the Stepper
  const [editingRentalDetails, setEditingRentalDetails] = useState(false);
  const [editingRouteDetails, setEditingRouteDetails] = useState(false);

  // Modal when user tries to book an alternative vehicle on an unsupported route
  const [unsupportedBookingPrompt, setUnsupportedBookingPrompt] = useState<{
    vehicle: Vehicle;
    priceInfo: any;
  } | null>(null);

  // Temporary Edit Form states
  const [editDate, setEditDate] = useState(searchParams.travelDate);
  const [editTime, setEditTime] = useState(searchParams.pickupTime || '13:30');
  const [editPickup, setEditPickup] = useState(searchParams.pickupCity);
  const [editDestination, setEditDestination] = useState(searchParams.dropoffCity);
  const [editTripType, setEditTripType] = useState<'one-way' | 'round-trip'>(searchParams.tripType);
  const [editError, setEditError] = useState('');

  // Normalize city names for route matching
  const pickupCityClean = searchParams.pickupCity.trim();
  const destinationCityClean = searchParams.dropoffCity.trim();

  // Helper to format date and time nicely: "Mon, Oct 19, 1:36 PM"
  const formattedDateTime = useMemo(() => {
    try {
      const datePart = searchParams.travelDate || new Date().toISOString().split('T')[0];
      const timePart = searchParams.pickupTime || '13:30';
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
      const d = new Date(year, (month || 1) - 1, day || 1, hours || 12, minutes || 0);

      const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthStr = d.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = d.getDate();

      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 === 0 ? 12 : hours % 12;
      const displayMinutes = (minutes || 0).toString().padStart(2, '0');

      return `${weekday}, ${monthStr} ${dayNum}, ${displayHours}:${displayMinutes} ${period}`;
    } catch {
      return `${searchParams.travelDate || 'Selected Date'}, ${searchParams.pickupTime || '12:00 PM'}`;
    }
  }, [searchParams.travelDate, searchParams.pickupTime]);

  // Identify direct exact route matches
  const exactRouteMatches = useMemo(() => {
    return allVehicles.filter(v => {
      if (!v.isAvailable) return false;

      // Check if vehicle has an active route assignment between pickup and destination
      const hasRoute = v.supportedRoutes?.some(r => {
        const matchesFrom = r.fromCity.toLowerCase() === pickupCityClean.toLowerCase();
        const matchesTo = r.toCity.toLowerCase() === destinationCityClean.toLowerCase();
        return matchesFrom && matchesTo && (r.isAvailable !== false);
      });

      return !!hasRoute;
    });
  }, [allVehicles, pickupCityClean, destinationCityClean]);

  // Identify pickup city alternative vehicles (when exact route is not available or as fallback)
  const pickupCityAlternatives = useMemo(() => {
    return allVehicles.filter(v => {
      if (!v.isAvailable) return false;
      // Vehicle based in or covering the pickup city
      const matchesCity = v.city.toLowerCase() === pickupCityClean.toLowerCase() ||
        (v.coversCity && v.coversCity.toLowerCase() === pickupCityClean.toLowerCase());
      return matchesCity;
    });
  }, [allVehicles, pickupCityClean]);

  // Determine whether exact route is available
  const isExactRouteAvailable = exactRouteMatches.length > 0;

  // Base list of vehicles to consider:
  // If exact route is available, use exact matches; otherwise use vehicles available from pickup city as alternatives
  const baseVehiclePool = useMemo(() => {
    if (isExactRouteAvailable) {
      return exactRouteMatches;
    }
    return pickupCityAlternatives.length > 0 ? pickupCityAlternatives : allVehicles;
  }, [isExactRouteAvailable, exactRouteMatches, pickupCityAlternatives, allVehicles]);

  // Helper to determine price for a vehicle given current search & service mode
  const getVehiclePriceInfo = (vehicle: Vehicle) => {
    const hours = selectedHours[vehicle.id] || 1;

    if (serviceType === 'hourly') {
      const perHour = vehicle.hourlyRateSar || Math.round(vehicle.pricePerDay / 3.5);
      return {
        unitPrice: perHour,
        totalPrice: perHour * hours,
        label: 'per hour',
        detailLabel: `${hours} hours: ${perHour * hours} SAR`,
        isHourly: true,
      };
    }

    if (serviceType === 'ziyarat') {
      const dailyPrice = vehicle.pricePerDay || 450;
      return {
        unitPrice: dailyPrice,
        totalPrice: dailyPrice,
        label: 'per day',
        detailLabel: 'You choose the dates on the vehicle page.',
        isHourly: false,
      };
    }

    // Point-to-Point Mode:
    // Look for exact route pricing
    const route = vehicle.supportedRoutes?.find(r => 
      r.fromCity.toLowerCase() === pickupCityClean.toLowerCase() &&
      r.toCity.toLowerCase() === destinationCityClean.toLowerCase()
    );

    if (route) {
      const price = searchParams.tripType === 'round-trip' 
        ? (route.roundTripPriceSar || Math.round(route.oneWayPriceSar * 1.85))
        : route.oneWayPriceSar;
      return {
        unitPrice: price,
        totalPrice: price,
        label: 'for the whole vehicle',
        detailLabel: searchParams.tripType === 'round-trip' ? 'Round-Way Private Transfer' : 'One-Way Private Transfer',
        routeBadge: `Route: ${route.fromCity} to ${route.toCity}`,
        isHourly: false,
        isExactRoute: true,
        supportedRoute: route,
      };
    }

    // If alternative vehicle without exact route, display its primary configured route or fallback
    const firstRoute = vehicle.supportedRoutes?.[0];
    const fallbackPrice = firstRoute 
      ? (searchParams.tripType === 'round-trip' ? (firstRoute.roundTripPriceSar || firstRoute.oneWayPriceSar * 1.85) : firstRoute.oneWayPriceSar)
      : vehicle.pricePerDay;

    return {
      unitPrice: Math.round(fallbackPrice),
      totalPrice: Math.round(fallbackPrice),
      label: 'for the whole vehicle',
      detailLabel: firstRoute ? `Route: ${firstRoute.fromCity} to ${firstRoute.toCity}` : 'Private Transfer',
      routeBadge: firstRoute ? `Alternative Route: ${firstRoute.fromCity} to ${firstRoute.toCity}` : `Transfer from ${vehicle.city}`,
      isHourly: false,
      isExactRoute: false,
      supportedRoute: firstRoute,
    };
  };

  // Calculate dynamic vehicle counts and minimum starting price for each vehicle class
  const classStats = useMemo(() => {
    const classes = ['Economy Car', 'Sedan', 'SUV', 'Van'];
    const stats: { [cat: string]: { count: number; minPrice: number } } = {};

    classes.forEach(cls => {
      const inClass = baseVehiclePool.filter(v => {
        const catNorm = v.category.toLowerCase();
        if (cls === 'Sedan') return catNorm === 'sedan' || (catNorm.includes('economy') && v.model.toLowerCase().includes('camry'));
        if (cls === 'Economy Car') return catNorm.includes('economy') && !v.model.toLowerCase().includes('camry');
        return catNorm.includes(cls.toLowerCase());
      });

      const prices = inClass.map(v => getVehiclePriceInfo(v).unitPrice);
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      stats[cls] = { count: inClass.length, minPrice };
    });

    return stats;
  }, [baseVehiclePool, serviceType, searchParams.tripType, selectedHours]);

  // Count automatic transmissions
  const automaticCount = useMemo(() => {
    return baseVehiclePool.filter(v => v.transmission === 'Automatic').length;
  }, [baseVehiclePool]);

  // Filtered and Sorted Vehicles List
  const displayedVehicles = useMemo(() => {
    let result = [...baseVehiclePool];

    // Vehicle Class filter
    if (selectedClasses.length > 0) {
      result = result.filter(v => {
        const catNorm = v.category.toLowerCase();
        return selectedClasses.some(cls => {
          if (cls === 'Sedan') return catNorm === 'sedan' || (catNorm.includes('economy') && v.model.toLowerCase().includes('camry'));
          if (cls === 'Economy Car') return catNorm.includes('economy') && !v.model.toLowerCase().includes('camry');
          return catNorm.includes(cls.toLowerCase());
        });
      });
    }

    // Passenger Capacity filter
    if (passengerFilter > 0) {
      result = result.filter(v => v.passengerCapacity >= passengerFilter);
    }

    // Transmission filter
    if (transmissionFilter === 'automatic') {
      result = result.filter(v => v.transmission === 'Automatic');
    }

    // Sorting
    result.sort((a, b) => {
      const priceA = getVehiclePriceInfo(a).totalPrice;
      const priceB = getVehiclePriceInfo(b).totalPrice;

      if (sortBy === 'price-asc') {
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        return priceB - priceA;
      }
      // Featured: prioritize exact route if available, then verified companies, then model year
      return b.year - a.year;
    });

    return result;
  }, [baseVehiclePool, selectedClasses, passengerFilter, transmissionFilter, sortBy, serviceType, searchParams.tripType, selectedHours]);

  // Toggle vehicle class in filter
  const toggleClass = (cls: string) => {
    setSelectedClasses(prev => 
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedClasses([]);
    setPassengerFilter(0);
    setTransmissionFilter('any');
    setSortBy('featured');
  };

  // Save Step 1 Rental Details
  const handleSaveRentalDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDate) {
      setEditError('Please select a travel date.');
      return;
    }
    onUpdateSearch({
      ...searchParams,
      travelDate: editDate,
      pickupTime: editTime,
    });
    setEditingRentalDetails(false);
    setEditError('');
  };

  // Save Step 2 Route Details
  const handleSaveRouteDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPickup.trim() || !editDestination.trim()) {
      setEditError('Please specify both pickup and destination cities.');
      return;
    }
    if (editPickup.trim().toLowerCase() === editDestination.trim().toLowerCase()) {
      setEditError('Pickup and destination must be different cities.');
      return;
    }
    onUpdateSearch({
      ...searchParams,
      pickupCity: editPickup.trim(),
      dropoffCity: editDestination.trim(),
      tripType: editTripType,
    });
    setEditingRouteDetails(false);
    setEditError('');
  };

  // Next image in card carousel
  const handleNextImage = (e: React.MouseEvent, vehicleId: string, maxImages: number) => {
    e.stopPropagation();
    setActiveImageIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) + 1) % maxImages,
    }));
  };

  // Prev image in card carousel
  const handlePrevImage = (e: React.MouseEvent, vehicleId: string, maxImages: number) => {
    e.stopPropagation();
    setActiveImageIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) - 1 + maxImages) % maxImages,
    }));
  };

  // Handle Book Click
  const handleBookClick = (vehicle: Vehicle) => {
    const priceInfo = getVehiclePriceInfo(vehicle);
    const hours = selectedHours[vehicle.id] || 1;

    // Requirement 5: Do not allow a user to book an alternative vehicle for the original route
    // unless that route is confirmed as supported.
    if (serviceType === 'point-to-point' && !priceInfo.isExactRoute) {
      setUnsupportedBookingPrompt({
        vehicle,
        priceInfo,
      });
      return;
    }

    onBookVehicle(vehicle, {
      pickupCity: pickupCityClean,
      destinationCity: destinationCityClean,
      travelDate: searchParams.travelDate,
      pickupTime: searchParams.pickupTime || '13:30',
      tripType: searchParams.tripType,
      serviceType,
      priceSar: priceInfo.totalPrice,
      hours: serviceType === 'hourly' ? hours : undefined,
    });
  };

  return (
    <div className="w-full bg-[#FCFBF8] min-h-screen text-[#111111] pb-24 font-sans">
      
      {/* =========================================================================
          TOP BANNER & BREADCRUMB SECTION (Exact match to Capture.PNG)
         ========================================================================= */}
      <div className="bg-[#FAF7EE] border-b border-[#EAE6DC] pt-6 pb-8">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-3">
            <button 
              onClick={onGoHome} 
              className="flex items-center gap-1 hover:text-[#111111] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <button 
              onClick={onGoToRoutes} 
              className="hover:text-[#111111] transition-colors cursor-pointer"
            >
              Routes
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#111111] font-medium">
              {pickupCityClean} to {destinationCityClean}
            </span>
          </nav>

          {/* Service Badge Pill */}
          <div className="inline-block px-3 py-1 rounded-full bg-white border border-[#E5E1D8] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3 shadow-xs">
            {serviceType === 'point-to-point' ? 'POINT TO POINT' : serviceType === 'ziyarat' ? 'ZIYARAT & DAILY RENTAL' : 'HOURLY RATE'}
          </div>

          {/* Dynamic Route Heading */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] mb-2">
            {pickupCityClean} to {destinationCityClean}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#4B5563] mb-5">
            Compare vehicles and prices for a private transfer from {pickupCityClean} to {destinationCityClean}.
          </p>

          {/* Route Summary Pill */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E5E1D8] shadow-xs text-xs sm:text-sm font-semibold text-[#111111]">
            <MapPin className="w-4 h-4 text-[#C9A01B]" />
            <span>{pickupCityClean}</span>
            <span className="text-gray-400 mx-1">→</span>
            <MapPin className="w-4 h-4 text-[#C9A01B]" />
            <span>{destinationCityClean}</span>
          </div>

        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-6">

        {/* =========================================================================
            WARNING BANNER: Exact route not available yet (Requirement 5)
           ========================================================================= */}
        {!isExactRouteAvailable && (
          <div className="mb-6 bg-[#FEF6EC] border border-[#FAD7B2] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs animate-in fade-in-50">
            <div className="flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#F59E0B]/20 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="text-xs sm:text-sm text-[#92400E]">
                <div className="font-bold text-[#78350F] text-sm sm:text-base mb-1">
                  This exact route is not available yet.
                </div>
                <div className="text-[#92400E]/90 leading-relaxed">
                  Currently, there are no vehicles available for this route. Please try another route or contact a travel company.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:self-center shrink-0 pl-10 sm:pl-0">
              <button
                type="button"
                onClick={() => {
                  setEditPickup(searchParams.pickupCity);
                  setEditDestination(searchParams.dropoffCity);
                  setEditTripType(searchParams.tripType);
                  setEditingRouteDetails(true);
                }}
                className="px-4 py-2 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Change Route
              </button>
              <button
                type="button"
                onClick={onGoHome}
                className="px-4 py-2 rounded-full border border-[#D97706]/40 text-[#78350F] hover:bg-[#FDF2E2] text-xs font-semibold transition-all cursor-pointer bg-white/70"
              >
                Return to Search
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEPPER / PROGRESS BAR (Exact match to Capture.PNG)
           ========================================================================= */}
        <div className="bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            {/* Step 1: Rental Details */}
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    RENTAL DETAILS
                  </span>
                  <button 
                    onClick={() => {
                      setEditDate(searchParams.travelDate);
                      setEditTime(searchParams.pickupTime || '13:30');
                      setEditingRentalDetails(true);
                    }}
                    className="text-xs text-[#C9A01B] hover:underline font-semibold cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-[#4B5563] mt-0.5 font-medium">
                  {formattedDateTime}
                </div>
              </div>
            </div>

            {/* Step 2: Pick-Up & Return */}
            <div className="flex items-start gap-3 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
              <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    PICK-UP & RETURN
                  </span>
                  <button 
                    onClick={() => {
                      setEditPickup(searchParams.pickupCity);
                      setEditDestination(searchParams.dropoffCity);
                      setEditTripType(searchParams.tripType);
                      setEditingRouteDetails(true);
                    }}
                    className="text-xs text-[#C9A01B] hover:underline font-semibold cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-[#111111] font-medium mt-0.5">
                  {pickupCityClean} to {destinationCityClean}
                </div>
                <div className="text-xs text-[#6B7280]">
                  {searchParams.tripType === 'round-trip' ? 'Round-Way Trip' : 'One-Way Trip'}
                </div>
              </div>
            </div>

            {/* Step 3: Vehicle (ACTIVE STEP) */}
            <div className="flex items-start gap-3 border-t lg:border-t-0 lg:border-l border-gray-200 pt-3 lg:pt-0 lg:pl-4">
              <div className="w-5 h-5 rounded-full bg-[#111111] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  VEHICLE
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#111111] mt-0.5">
                  Select
                </div>
              </div>
            </div>

            {/* Step 4: Review & Reserve */}
            <div className="flex items-start gap-3 border-t lg:border-t-0 lg:border-l border-gray-200 pt-3 lg:pt-0 lg:pl-4 opacity-60">
              <div className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                4
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#4B5563]">
                  REVIEW & RESERVE
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            SECTION HEADER: Choose a vehicle & Count (Capture.PNG)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111111]">
              {isExactRouteAvailable ? 'Choose a vehicle' : `Alternative Vehicles from ${pickupCityClean}`}
            </h2>
            <div className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
              {isExactRouteAvailable 
                ? `Vehicles available specifically for ${pickupCityClean} to ${destinationCityClean}` 
                : `These vehicles operate on other routes from ${pickupCityClean}. They are not confirmed for ${pickupCityClean} to ${destinationCityClean}.`}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold text-[#111111]">
              {displayedVehicles.length} vehicles available
            </span>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E1D8] bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C9A01B]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TWO-COLUMN LAYOUT: SIDEBAR FILTERS + VEHICLE LISTING CARDS
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= SIDEBAR: SORT & FILTER (Capture1.PNG) ================= */}
          <aside className={`w-full lg:w-64 xl:w-72 shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="space-y-6 bg-transparent">
              
              {/* Type of service Box */}
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                  Type of service
                </h3>
                <div className="space-y-2">
                  <label 
                    onClick={() => setServiceType('point-to-point')}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-xs sm:text-sm font-medium transition-all ${
                      serviceType === 'point-to-point'
                        ? 'bg-[#FBF7E9] text-[#111111] font-semibold border border-[#E6D28C]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="serviceType" 
                      checked={serviceType === 'point-to-point'} 
                      onChange={() => setServiceType('point-to-point')} 
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      serviceType === 'point-to-point' ? 'border-[#C9A01B]' : 'border-gray-300'
                    }`}>
                      {serviceType === 'point-to-point' && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                    </div>
                    <span>Point-to-Point</span>
                  </label>

                  <label 
                    onClick={() => setServiceType('ziyarat')}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-xs sm:text-sm font-medium transition-all ${
                      serviceType === 'ziyarat'
                        ? 'bg-[#FBF7E9] text-[#111111] font-semibold border border-[#E6D28C]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="serviceType" 
                      checked={serviceType === 'ziyarat'} 
                      onChange={() => setServiceType('ziyarat')} 
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      serviceType === 'ziyarat' ? 'border-[#C9A01B]' : 'border-gray-300'
                    }`}>
                      {serviceType === 'ziyarat' && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                    </div>
                    <span>Ziyarat</span>
                  </label>

                  <label 
                    onClick={() => setServiceType('hourly')}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-xs sm:text-sm font-medium transition-all ${
                      serviceType === 'hourly'
                        ? 'bg-[#FBF7E9] text-[#111111] font-semibold border border-[#E6D28C]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="serviceType" 
                      checked={serviceType === 'hourly'} 
                      onChange={() => setServiceType('hourly')} 
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      serviceType === 'hourly' ? 'border-[#C9A01B]' : 'border-gray-300'
                    }`}>
                      {serviceType === 'hourly' && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                    </div>
                    <span>Hourly Rate</span>
                  </label>
                </div>
              </div>

              {/* Sort & Filter Main Box */}
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs space-y-6">
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                    Sort & filter
                  </h3>
                  {(selectedClasses.length > 0 || passengerFilter > 0 || transmissionFilter !== 'any' || sortBy !== 'featured') && (
                    <button
                      onClick={handleResetFilters}
                      className="text-[11px] text-[#C9A01B] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                {/* Sort By Radios */}
                <div>
                  <div className="text-xs font-bold text-[#111111] mb-2.5">
                    Sort by
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    {[
                      { id: 'featured', label: 'Featured' },
                      { id: 'price-asc', label: 'Price: low to high' },
                      { id: 'price-desc', label: 'Price: high to low' },
                    ].map((s) => (
                      <label 
                        key={s.id} 
                        className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-[#111111]"
                      >
                        <input
                          type="radio"
                          name="sortBy"
                          checked={sortBy === s.id}
                          onChange={() => setSortBy(s.id as any)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          sortBy === s.id ? 'border-[#C9A01B]' : 'border-gray-300'
                        }`}>
                          {sortBy === s.id && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                        </div>
                        <span>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Vehicle Class Checkboxes (with exact counts and from ... SAR) */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="text-xs font-bold text-[#111111] mb-2.5">
                    Vehicle class
                  </div>
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    {[
                      { key: 'Economy Car', label: 'Economy Car', stat: classStats['Economy Car'] },
                      { key: 'Sedan', label: 'Sedan', stat: classStats['Sedan'] },
                      { key: 'SUV', label: 'SUV', stat: classStats['SUV'] },
                      { key: 'Van', label: 'Van', stat: classStats['Van'] },
                    ].map((cls) => {
                      const isChecked = selectedClasses.includes(cls.key);
                      return (
                        <label 
                          key={cls.key} 
                          className="flex items-center justify-between cursor-pointer group text-gray-700 hover:text-[#111111]"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleClass(cls.key)}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                              isChecked ? 'bg-[#C9A01B] border-[#C9A01B] text-white' : 'border-gray-300 bg-white group-hover:border-gray-400'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="font-medium">{cls.label}</span>
                            <span className="text-xs text-gray-400">({cls.stat?.count || 0})</span>
                          </div>

                          {cls.stat && cls.stat.minPrice > 0 && (
                            <span className="text-xs text-[#6B7280]">
                              from {cls.stat.minPrice} SAR
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Passengers Filter */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="text-xs font-bold text-[#111111] mb-2.5">
                    Passengers
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    {[
                      { count: 0, label: 'Any' },
                      { count: 2, label: '2+' },
                      { count: 4, label: '4+' },
                      { count: 5, label: '5+' },
                      { count: 7, label: '7+' },
                      { count: 10, label: '10+' },
                    ].map((p) => (
                      <label 
                        key={p.count} 
                        className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-[#111111]"
                      >
                        <input
                          type="radio"
                          name="passengerFilter"
                          checked={passengerFilter === p.count}
                          onChange={() => setPassengerFilter(p.count)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          passengerFilter === p.count ? 'border-[#C9A01B]' : 'border-gray-300'
                        }`}>
                          {passengerFilter === p.count && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                        </div>
                        <span>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transmission Filter */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="text-xs font-bold text-[#111111] mb-2.5">
                    Transmission
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-[#111111]">
                      <input
                        type="radio"
                        name="transmissionFilter"
                        checked={transmissionFilter === 'any'}
                        onChange={() => setTransmissionFilter('any')}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        transmissionFilter === 'any' ? 'border-[#C9A01B]' : 'border-gray-300'
                      }`}>
                        {transmissionFilter === 'any' && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                      </div>
                      <span>Any</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-[#111111]">
                      <input
                        type="radio"
                        name="transmissionFilter"
                        checked={transmissionFilter === 'automatic'}
                        onChange={() => setTransmissionFilter('automatic')}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        transmissionFilter === 'automatic' ? 'border-[#C9A01B]' : 'border-gray-300'
                      }`}>
                        {transmissionFilter === 'automatic' && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                      </div>
                      <span>Automatic ({automaticCount})</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* ================= RIGHT COLUMN: VEHICLE LISTING CARDS ================= */}
          <main className="flex-1 w-full space-y-4">
            
            {displayedVehicles.length > 0 ? (
              displayedVehicles.map((vehicle) => {
                const agency = agencies.find(a => a.id === vehicle.companyId);
                const priceInfo = getVehiclePriceInfo(vehicle);
                const currentImgIdx = activeImageIndex[vehicle.id] || 0;
                const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.images?.[0] || ''];
                const isExpanded = !!expandedDetails[vehicle.id];
                const hours = selectedHours[vehicle.id] || 1;

                // Company initials avatar
                const initials = vehicle.companyInitials || 
                  (vehicle.companyName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase());

                return (
                  <div 
                    key={vehicle.id}
                    className="bg-white rounded-2xl border border-[#E5E1D8] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row"
                  >
                    
                    {/* 1. Image Carousel Container (Left) */}
                    <div className="relative w-full md:w-[320px] lg:w-[340px] h-[220px] md:h-auto bg-[#18181B] shrink-0 overflow-hidden group">
                      <img 
                        src={images[currentImgIdx]} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover"
                      />

                      {/* Demo photo tag */}
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                        DEMO PHOTO
                      </div>

                      {/* Top Right Pause / Gallery Indicator */}
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/50 text-white/90 flex items-center justify-center text-[10px] backdrop-blur-xs">
                        ❚❚
                      </div>

                      {/* Carousel Arrow Controls */}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => handlePrevImage(e, vehicle.id, images.length)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-white transition-opacity opacity-80 group-hover:opacity-100 cursor-pointer"
                            aria-label="Previous photo"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleNextImage(e, vehicle.id, images.length)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 text-gray-800 flex items-center justify-center shadow-md hover:bg-white transition-opacity opacity-80 group-hover:opacity-100 cursor-pointer"
                            aria-label="Next photo"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Slide Indicator Dots */}
                      {images.length > 1 && (
                        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
                          {images.map((_, idx) => (
                            <span 
                              key={idx} 
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                currentImgIdx === idx ? 'bg-white w-3' : 'bg-white/50'
                              }`} 
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 2. Middle Column: Specs & Features */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100">
                      <div>
                        
                        {/* Category Uppercase */}
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9A01B] mb-1">
                          {vehicle.category}
                        </div>

                        {/* Vehicle Title & Year */}
                        <h3 className="font-playfair text-xl font-bold text-[#111111] hover:text-[#C9A01B] transition-colors cursor-pointer"
                          onClick={() => onSelectVehicle(vehicle)}
                        >
                          {vehicle.name}
                        </h3>

                        {/* Route / Service Badge (Cream colored pill) */}
                        <div className="mt-2 mb-2 inline-flex items-center px-3 py-1 rounded-full bg-[#FAF5E6] text-[#8C6D15] text-xs font-semibold border border-[#EEDB9F]">
                          {serviceType === 'point-to-point' ? (
                            priceInfo.routeBadge || `Route: ${pickupCityClean} to ${destinationCityClean}`
                          ) : serviceType === 'hourly' ? (
                            `Hourly rate in ${pickupCityClean}`
                          ) : (
                            `Daily rental from ${pickupCityClean}`
                          )}
                        </div>

                        {/* Subtitle / Coverage details */}
                        {serviceType === 'hourly' && (
                          <div className="text-xs text-[#6B7280] mb-2 font-medium">
                            Hourly hire in {pickupCityClean} • Covers: {pickupCityClean}
                          </div>
                        )}

                        {/* Company Credit line with Avatar/Initials */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-[#EAE6DC] text-[#4B5563] text-[10px] font-bold flex items-center justify-center">
                            {initials}
                          </div>
                          <span className="text-xs text-gray-500">by</span>
                          <span className="text-xs font-bold text-[#111111] hover:underline cursor-pointer">
                            {vehicle.companyName}
                          </span>
                        </div>

                        {/* Specs Row */}
                        <div className="flex items-center gap-4 text-xs text-[#4B5563]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">⚙️</span>
                            <span>{vehicle.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-gray-400" />
                            <span>{vehicle.passengerCapacity} seats</span>
                          </div>
                        </div>

                      </div>

                      {/* Expandable Features and price details accordion */}
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => setExpandedDetails(prev => ({ ...prev, [vehicle.id]: !prev[vehicle.id] }))}
                          className="text-xs font-semibold text-[#8C6D15] hover:text-[#C9A01B] flex items-center gap-1 cursor-pointer"
                        >
                          <span>Features and price details</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-3 p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EAE6DC] text-xs text-[#4B5563] space-y-2 animate-in fade-in-50">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="font-semibold text-[#111111]">Luggage Capacity:</span> {vehicle.luggageCapacity} large bags
                              </div>
                              <div>
                                <span className="font-semibold text-[#111111]">Tolls & Permits:</span> All included
                              </div>
                              <div>
                                <span className="font-semibold text-[#111111]">Cancellation:</span> Free up to 24h before
                              </div>
                              <div>
                                <span className="font-semibold text-[#111111]">Driver:</span> Professional & licensed
                              </div>
                            </div>
                            <div className="pt-1.5 border-t border-gray-200/60 text-[11px] text-gray-500">
                              Direct chauffeur greeting at designated pick-up location with bottled water and air conditioning guaranteed.
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* 3. Right Column: Pricing & Book Action */}
                    <div className="w-full md:w-[220px] p-5 sm:p-6 flex flex-col justify-between items-end bg-white shrink-0">
                      
                      <div className="text-right w-full">
                        {/* Main Price */}
                        <div className="font-sans text-3xl font-extrabold text-[#111111] tracking-tight">
                          {priceInfo.unitPrice} SAR
                        </div>

                        {/* Price Subtitle */}
                        <div className="text-xs text-[#6B7280] font-medium mt-0.5">
                          {priceInfo.label}
                        </div>

                        {/* Duration Selector in Hourly Mode */}
                        {serviceType === 'hourly' && (
                          <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[11px] text-gray-500">Duration:</span>
                            <select
                              value={hours}
                              onChange={(e) => setSelectedHours(prev => ({ ...prev, [vehicle.id]: Number(e.target.value) }))}
                              className="px-2 py-1 rounded-md border border-gray-200 text-xs font-semibold text-[#111111] bg-gray-50 focus:outline-none"
                            >
                              {[1, 2, 3, 4, 5, 8, 12].map(h => (
                                <option key={h} value={h}>{h} h</option>
                              ))}
                            </select>
                          </div>
                        )}

                        {serviceType === 'hourly' && (
                          <div className="text-[11px] text-[#C9A01B] font-semibold mt-1">
                            {priceInfo.detailLabel}
                          </div>
                        )}

                        {serviceType === 'ziyarat' && (
                          <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                            You choose the dates on the vehicle page.
                          </div>
                        )}
                      </div>

                      {/* Book Button */}
                      <button
                        onClick={() => handleBookClick(vehicle)}
                        className="w-full mt-5 py-2.5 px-6 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Book</span>
                      </button>

                    </div>

                  </div>
                );
              })
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-10 text-center shadow-xs">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#111111] mb-1">
                  No vehicles match the selected criteria
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] max-w-md mx-auto mb-5">
                  Try adjusting your passenger count, vehicle category, or clearing your active filters to see available transport options.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-full bg-[#C9A01B] text-white text-xs font-semibold hover:bg-[#b89115] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Bottom Disclaimer matching Capture6.PNG */}
            <div className="pt-4 text-center text-xs text-[#6B7280]">
              Prices are set by each company. You arrange payment directly with the company after it accepts your booking.
            </div>

          </main>

        </div>

      </div>

      {/* =========================================================================
          QUICK EDIT MODAL: Step 1 Rental Details (Date & Time)
         ========================================================================= */}
      {editingRentalDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-[#E5E1D8]">
            <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-[#FAF7EE]">
              <h3 className="font-playfair text-lg font-bold text-[#111111]">
                Edit Rental Date & Time
              </h3>
              <button 
                onClick={() => setEditingRentalDetails(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveRentalDetails} className="p-6 space-y-4">
              {editError && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  {editError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1.5">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={editDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C9A01B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1.5">
                  Pickup Time
                </label>
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C9A01B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRentalDetails(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save & Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          QUICK EDIT MODAL: Step 2 Route Details (Pickup, Destination, Trip Type)
         ========================================================================= */}
      {editingRouteDetails && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-[#E5E1D8]">
            <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-[#FAF7EE]">
              <h3 className="font-playfair text-lg font-bold text-[#111111]">
                Edit Route & Trip Type
              </h3>
              <button 
                onClick={() => setEditingRouteDetails(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSaveRouteDetails} className="p-6 space-y-4">
              {editError && (
                <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  {editError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1.5">
                  Pickup City
                </label>
                <select
                  value={editPickup}
                  onChange={(e) => setEditPickup(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C9A01B] bg-white"
                >
                  {SAUDI_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1.5">
                  Destination City
                </label>
                <select
                  value={editDestination}
                  onChange={(e) => setEditDestination(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#C9A01B] bg-white"
                >
                  {SAUDI_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] mb-1.5">
                  Trip Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditTripType('one-way')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      editTripType === 'one-way'
                        ? 'bg-[#FBF7E9] border-[#C9A01B] text-[#111111]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    One-Way Trip
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditTripType('round-trip')}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      editTripType === 'round-trip'
                        ? 'bg-[#FBF7E9] border-[#C9A01B] text-[#111111]'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Round-Way Trip
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRouteDetails(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Update Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          UNSUPPORTED ROUTE BOOKING MODAL (Requirement 5 Guard)
         ========================================================================= */}
      {unsupportedBookingPrompt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-[#E5E1D8]">
            <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-[#FEF6EC]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#F59E0B]/20 text-[#D97706] flex items-center justify-center shrink-0">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#78350F]">
                  Alternative Route Notice
                </h3>
              </div>
              <button 
                onClick={() => setUnsupportedBookingPrompt(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-xs sm:text-sm text-[#4B5563]">
              <p>
                <strong>{unsupportedBookingPrompt.vehicle.name}</strong> operates on the confirmed route:{' '}
                <span className="font-bold text-[#111111]">
                  {unsupportedBookingPrompt.priceInfo.supportedRoute?.fromCity || unsupportedBookingPrompt.vehicle.city} to{' '}
                  {unsupportedBookingPrompt.priceInfo.supportedRoute?.toCity || 'Supported City'}
                </span>.
              </p>
              
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                To prevent misleading reservations, this vehicle cannot be booked for{' '}
                <span className="font-bold">{pickupCityClean} to {destinationCityClean}</span>.
              </div>

              <p className="text-xs text-gray-500">
                You can either switch your route to book this vehicle on its supported journey, or change your search to find other routes.
              </p>

              <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                {unsupportedBookingPrompt.priceInfo.supportedRoute && (
                  <button
                    type="button"
                    onClick={() => {
                      const targetRoute = unsupportedBookingPrompt.priceInfo.supportedRoute;
                      const veh = unsupportedBookingPrompt.vehicle;
                      setUnsupportedBookingPrompt(null);
                      
                      // Update search params to the supported route
                      onUpdateSearch({
                        ...searchParams,
                        pickupCity: targetRoute.fromCity,
                        dropoffCity: targetRoute.toCity,
                      });

                      // Proceed with booking for supported route
                      onBookVehicle(veh, {
                        pickupCity: targetRoute.fromCity,
                        destinationCity: targetRoute.toCity,
                        travelDate: searchParams.travelDate,
                        pickupTime: searchParams.pickupTime || '13:30',
                        tripType: searchParams.tripType,
                        serviceType: 'point-to-point',
                        priceSar: searchParams.tripType === 'round-trip' 
                          ? (targetRoute.roundTripPriceSar || targetRoute.oneWayPriceSar * 1.85)
                          : targetRoute.oneWayPriceSar,
                      });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-bold transition-all shadow-xs text-center cursor-pointer"
                  >
                    Switch to {unsupportedBookingPrompt.priceInfo.supportedRoute.fromCity} → {unsupportedBookingPrompt.priceInfo.supportedRoute.toCity} & Book ({unsupportedBookingPrompt.priceInfo.totalPrice} SAR)
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setUnsupportedBookingPrompt(null);
                    setEditingRouteDetails(true);
                  }}
                  className="w-full py-2 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-all text-center cursor-pointer"
                >
                  Change Search Route
                </button>

                <button
                  type="button"
                  onClick={() => setUnsupportedBookingPrompt(null)}
                  className="w-full py-1 text-xs text-gray-400 hover:text-gray-600 text-center cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
