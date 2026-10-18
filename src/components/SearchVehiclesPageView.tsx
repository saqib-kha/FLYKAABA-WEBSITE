import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  ChevronDown, 
  Calendar, 
  Users, 
  Check, 
  Car, 
  Search, 
  ArrowLeft,
  X,
  Filter,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { Vehicle, TravelAgency } from '../data/mockData';

interface SearchVehiclesPageViewProps {
  vehicles: Vehicle[];
  agencies: TravelAgency[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  onGoHome: () => void;
  initialCategory?: string;
  initialPickupCity?: string;
}

export const SearchVehiclesPageView: React.FC<SearchVehiclesPageViewProps> = ({
  vehicles,
  agencies,
  onSelectVehicle,
  onBookVehicle,
  onGoHome,
  initialCategory = 'Luxury Car',
  initialPickupCity = 'Makkah',
}) => {
  // Filter form states matching Screenshot image_2026-10-18_124341448.png exactly
  const [pickupCity, setPickupCity] = useState(initialPickupCity !== 'Select city' ? initialPickupCity : 'Makkah');
  const [destination, setDestination] = useState('Riyadh Airport (RUH)');
  const [startDate, setStartDate] = useState('2026-11-11');
  const [endDate, setEndDate] = useState('2026-12-08');
  const [tripType, setTripType] = useState('Return offered');
  const [category, setCategory] = useState(initialCategory !== 'All' ? initialCategory : 'Luxury Car');
  const [service, setService] = useState('Any');
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSeats, setMinSeats] = useState('1');
  const [transmission, setTransmission] = useState('Automatic');
  const [fuel, setFuel] = useState('Diesel');
  const [company, setCompany] = useState('Red Sea Coaches');
  const [sortBy, setSortBy] = useState('Price: low to high');

  // Track active search state
  const [hasSearched, setHasSearched] = useState(true);

  // Collapsible vehicle feature details
  const [expandedVehicles, setExpandedVehicles] = useState<{ [id: string]: boolean }>({});

  const toggleVehicleDetails = (vehId: string) => {
    setExpandedVehicles(prev => ({
      ...prev,
      [vehId]: !prev[vehId]
    }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  const handleResetFilters = () => {
    setPickupCity('All');
    setDestination('Any');
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setMinSeats('');
    setTransmission('Any');
    setFuel('Any');
    setCompany('All');
    setSortBy('Recommended');
    setHasSearched(true);
  };

  // Helper to calculate days and formatted dates matching image_2026-10-18_124341448.png
  const dateRangeInfo = useMemo(() => {
    if (!startDate || !endDate) {
      return { 
        dates: 'Wed, Nov 11 — Tue, Dec 8', 
        days: 27, 
        rawRange: '2026-11-11 — 2026-12-08' 
      };
    }
    try {
      const d1 = new Date(startDate);
      const d2 = new Date(endDate);
      const diffTime = Math.max(0, d2.getTime() - d1.getTime());
      const diffDays = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
      const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
      const startStr = d1.toLocaleDateString('en-US', options);
      const endStr = d2.toLocaleDateString('en-US', options);
      return { 
        dates: `${startStr} — ${endStr}`, 
        days: diffDays, 
        rawRange: `${startDate} — ${endDate}` 
      };
    } catch {
      return { 
        dates: 'Wed, Nov 11 — Tue, Dec 8', 
        days: 27, 
        rawRange: '2026-11-11 — 2026-12-08' 
      };
    }
  }, [startDate, endDate]);

  // Filter & sort matching vehicles
  const filteredVehicles = useMemo(() => {
    if (!hasSearched) return [];

    return vehicles
      .filter((v) => {
        // Pickup city filter
        if (pickupCity !== 'Select city' && pickupCity !== 'Any' && pickupCity !== 'All') {
          if (v.city.toLowerCase() !== pickupCity.toLowerCase()) {
            return false;
          }
        }

        // Category filter
        if (category !== 'All') {
          if (v.category.toLowerCase() !== category.toLowerCase()) {
            return false;
          }
        }

        // Price range
        if (minPrice && v.pricePerDay < Number(minPrice)) {
          return false;
        }
        if (maxPrice && v.pricePerDay > Number(maxPrice)) {
          return false;
        }

        // Min seats
        if (minSeats && v.passengerCapacity < Number(minSeats)) {
          return false;
        }

        // Transmission
        if (transmission !== 'Any') {
          if (v.transmission.toLowerCase() !== transmission.toLowerCase()) {
            return false;
          }
        }

        // Fuel
        if (fuel !== 'Any') {
          // Diesel filter matches diesel or heavy transport; if car is petrol it won't match diesel
          if (fuel === 'Diesel' && !v.description.toLowerCase().includes('diesel') && v.category !== 'Bus') {
            return false;
          }
        }

        // Company
        if (company !== 'All') {
          if (v.companyName.toLowerCase() !== company.toLowerCase() && v.companyId !== company) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: low to high' || sortBy === 'Price: Low to High') {
          return a.pricePerDay - b.pricePerDay;
        } else if (sortBy === 'Price: high to low' || sortBy === 'Price: High to Low') {
          return b.pricePerDay - a.pricePerDay;
        } else if (sortBy === 'Capacity') {
          return b.passengerCapacity - a.passengerCapacity;
        }
        return 0; // Recommended default
      });
  }, [
    vehicles,
    hasSearched,
    pickupCity,
    category,
    minPrice,
    maxPrice,
    minSeats,
    transmission,
    fuel,
    company,
    sortBy,
  ]);

  // Dynamic Page Title & Subtitle matching image_2026-10-18_124341448.png
  const displayTitle = destination && destination !== 'Any'
    ? `Vehicles from ${pickupCity === 'Select city' ? 'Makkah' : pickupCity} to ${destination}`
    : `Vehicles in ${pickupCity === 'Select city' ? 'Makkah' : pickupCity}`;

  return (
    <div className="w-full bg-white min-h-screen pb-24 font-sans selection:bg-[#C9A01B]/20">
      
      {/* 1. Header & Breadcrumb */}
      <div className="w-full bg-[#FAF7EE] border-b border-[#EAE5D9] py-3.5 mb-8">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 hover:text-[#C9A01B] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#A0A5B1]" />
            <span className="font-semibold text-[#111111]">Search Vehicles</span>
          </nav>

          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B7280] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Main Title matching Screenshot image_2026-10-18_124341448.png */}
        <h1 className="font-playfair text-2xl sm:text-[30px] font-bold text-[#111111] tracking-tight mb-1">
          {displayTitle}
        </h1>

        {/* Subtitle matching Screenshot image_2026-10-18_124341448.png */}
        <p className="text-xs sm:text-[13px] text-[#6B7280] mb-6">
          {dateRangeInfo.rawRange} ({dateRangeInfo.days} days) — only vehicles free for these dates
        </p>

        {/* 2. Step Tracker Banner matching Screenshot image_2026-10-18_124341448.png */}
        <div className="bg-[#FAF7EE] border border-[#EAE5D9] rounded-2xl p-4 sm:p-5 mb-8 flex items-center justify-between flex-wrap gap-4 text-xs">
          
          {/* Step 1: RENTAL DETAILS */}
          <div className="flex items-start gap-2.5 min-w-[170px]">
            <CheckCircle2 className="w-4 h-4 text-[#C9A01B] shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#111111] uppercase tracking-wider text-[11px]">
                <span>RENTAL DETAILS</span>
                <button
                  type="button"
                  onClick={() => document.getElementById('search-start-date')?.focus()}
                  className="underline text-[#8B6D12] lowercase font-normal hover:text-[#111111] cursor-pointer"
                >
                  Edit
                </button>
              </div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">
                {dateRangeInfo.dates}
              </div>
              <div className="text-[11px] text-[#6B7280]">
                {dateRangeInfo.days} days
              </div>
            </div>
          </div>

          <div className="text-gray-300 hidden md:block">→</div>

          {/* Step 2: PICK-UP & RETURN */}
          <div className="flex items-start gap-2.5 min-w-[200px]">
            <CheckCircle2 className="w-4 h-4 text-[#C9A01B] shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#111111] uppercase tracking-wider text-[11px]">
                <span>PICK-UP & RETURN</span>
                <button
                  type="button"
                  onClick={() => document.getElementById('search-pickup-city')?.focus()}
                  className="underline text-[#8B6D12] lowercase font-normal hover:text-[#111111] cursor-pointer"
                >
                  Edit
                </button>
              </div>
              <div className="text-[11px] text-[#6B7280] mt-0.5">
                {pickupCity === 'Select city' ? 'Makkah' : pickupCity} → {destination === 'Any' ? 'Riyadh Airport (RUH)' : destination}
              </div>
            </div>
          </div>

          <div className="text-gray-300 hidden md:block">→</div>

          {/* Step 3: VEHICLE (Active step) */}
          <div className="flex items-start gap-2.5 min-w-[120px]">
            <div className="w-4 h-4 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              3
            </div>
            <div>
              <div className="font-bold text-[#111111] uppercase tracking-wider text-[11px]">
                VEHICLE
              </div>
              <div className="text-[11px] font-semibold text-[#111111] mt-0.5">
                Select
              </div>
            </div>
          </div>

          <div className="text-gray-300 hidden md:block">→</div>

          {/* Step 4: REVIEW & RESERVE */}
          <div className="flex items-start gap-2.5 min-w-[140px]">
            <div className="w-4 h-4 rounded-full border border-gray-400 text-gray-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
              4
            </div>
            <div>
              <div className="font-bold text-gray-400 uppercase tracking-wider text-[11px]">
                REVIEW & RESERVE
              </div>
            </div>
          </div>

        </div>

        {/* 3. 2-Column Search Layout matching Screenshot image_2026-10-18_124341448.png */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Filter Card matching image_2026-10-18_124341448.png */}
          <div className="w-full lg:w-[320px] bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs shrink-0">
            <form onSubmit={handleSearchSubmit}>
              
              {/* Field 1: Pickup City */}
              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Pickup City
                </label>
                <select
                  id="search-pickup-city"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Makkah">Makkah</option>
                  <option value="Jeddah">Jeddah</option>
                  <option value="Madinah">Madinah</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Taif">Taif</option>
                  <option value="Select city">Select city</option>
                </select>
              </div>

              {/* Field 2: Destination */}
              <div className="mt-3.5">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Riyadh Airport (RUH)">Riyadh Airport (RUH)</option>
                  <option value="Jeddah Airport (KAIA / JED)">Jeddah Airport (KAIA / JED)</option>
                  <option value="Madinah Airport (MED)">Madinah Airport (MED)</option>
                  <option value="Makkah">Makkah</option>
                  <option value="Madinah">Madinah</option>
                  <option value="Jeddah">Jeddah</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Taif">Taif</option>
                  <option value="Any">Any</option>
                </select>
              </div>

              {/* Field 3: Start & End in 2 columns */}
              <div className="grid grid-cols-2 gap-2 mt-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Start
                  </label>
                  <div className="relative">
                    <input
                      id="search-start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-2.5 pr-7 py-2 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                    />
                    <Calendar className="w-3.5 h-3.5 text-[#C9A01B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    End
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-2.5 pr-7 py-2 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                    />
                    <Calendar className="w-3.5 h-3.5 text-[#C9A01B] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Field 4: Trip */}
              <div className="mt-3.5">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Trip
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Return offered">Return offered</option>
                  <option value="One way or return">One way or return</option>
                  <option value="One way">One way</option>
                  <option value="Return">Return</option>
                </select>
              </div>

              {/* Field 5: Category */}
              <div className="mt-3.5">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Luxury Car">Luxury Car</option>
                  <option value="Economy Car">Economy Car</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="All">All</option>
                </select>
              </div>

              {/* Field 6: Service */}
              <div className="mt-3.5">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Service
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Any">Any</option>
                  <option value="Chauffeur / Private Driver">Chauffeur / Private Driver</option>
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Self Drive">Self Drive</option>
                  <option value="Intercity Express">Intercity Express</option>
                </select>
              </div>

              {/* Field 7: Min SAR/day & Max SAR/day */}
              <div className="grid grid-cols-2 gap-2 mt-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Min SAR/day
                  </label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Max SAR/day
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder=""
                    className="w-full px-3 py-2 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>
              </div>

              {/* Field 8: Min seats & Transmission */}
              <div className="grid grid-cols-2 gap-2 mt-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Min seats
                  </label>
                  <input
                    type="number"
                    value={minSeats}
                    onChange={(e) => setMinSeats(e.target.value)}
                    placeholder="1"
                    className="w-full px-3 py-2 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Transmission
                  </label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                    <option value="Any">Any</option>
                  </select>
                </div>
              </div>

              {/* Field 9: Fuel */}
              <div className="mt-3.5">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Fuel
                </label>
                <select
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Any">Any</option>
                </select>
              </div>

              {/* Field 10: Company */}
              <div className="mt-3.5">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Company
                </label>
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Red Sea Coaches">Red Sea Coaches</option>
                  <option value="All">All Companies</option>
                  {agencies.map((agency) => (
                    <option key={agency.id} value={agency.name}>
                      {agency.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 11: Sort by */}
              <div className="mt-3.5">
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#D5D0C6] text-xs text-[#111111] bg-white focus:outline-none focus:border-[#C9A01B]"
                >
                  <option value="Price: low to high">Price: low to high</option>
                  <option value="Price: high to low">Price: high to low</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Capacity">Capacity</option>
                  <option value="Rating">Rating</option>
                </select>
              </div>

              {/* Submit Search Button (Target of Focus Mode Selector) */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-xs shadow-xs mt-5 transition-all cursor-pointer"
              >
                Search
              </button>

            </form>
          </div>

          {/* Right Column: Search Results matching Screenshot image_2026-10-18_124341448.png */}
          <div className="flex-1 w-full">
            
            {/* Result count line matching image_2026-10-18_124341448.png */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-[#6B7280]">
                {filteredVehicles.length} result(s)
              </div>

              {filteredVehicles.length === 0 && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#C9A01B] hover:underline font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Show all available vehicles</span>
                </button>
              )}
            </div>

            {/* Empty State Card matching Screenshot image_2026-10-18_124341448.png */}
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-12 sm:p-16 text-center text-xs sm:text-sm text-[#6B7280] shadow-xs">
                No vehicles match your search. Try different dates or fewer filters.
              </div>
            ) : (
              /* Vehicle Cards List */
              <div className="space-y-4">
                {filteredVehicles.map((veh) => {
                  const isExpanded = expandedVehicles[veh.id];
                  const agency = agencies.find(a => a.id === veh.companyId);

                  return (
                    <div
                      key={veh.id}
                      className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-sm transition-all flex flex-col md:flex-row"
                    >
                      {/* Vehicle Image */}
                      <div 
                        onClick={() => onSelectVehicle(veh)}
                        className="w-full md:w-72 lg:w-80 h-52 md:h-auto bg-neutral-100 overflow-hidden shrink-0 relative cursor-pointer"
                      >
                        <img
                          src={veh.images[0]}
                          alt={veh.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Middle Details */}
                      <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[#8B6D12] text-[11px] font-bold uppercase tracking-wider block mb-1">
                            {veh.category}
                          </span>

                          <h3 
                            onClick={() => onSelectVehicle(veh)}
                            className="font-playfair text-xl font-bold text-[#111111] hover:text-[#C9A01B] transition-colors cursor-pointer"
                          >
                            {veh.name}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-1.5">
                            {agency?.avatarImage && (
                              <img
                                src={agency.avatarImage}
                                alt=""
                                className="w-4 h-4 rounded-full object-cover border border-gray-200"
                              />
                            )}
                            <span>by {veh.companyName}</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-2.5">
                            <Users className="w-3.5 h-3.5 text-gray-500" />
                            <span>{veh.passengerCapacity} seats</span>
                          </div>

                          {/* Features and price details toggle */}
                          <button
                            onClick={() => toggleVehicleDetails(veh.id)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B6D12] hover:text-[#C9A01B] mt-4 cursor-pointer select-none"
                          >
                            <span>Features and price details</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="mt-4 pt-3 border-t border-[#F5F2EA] space-y-2 text-xs text-[#4B5563] animate-in fade-in-50">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
                                <div><span className="text-gray-500">Luggage:</span> <span className="font-semibold text-gray-800">{veh.luggageCapacity} bags</span></div>
                                <div><span className="text-gray-500">Transmission:</span> <span className="font-semibold text-gray-800">{veh.transmission}</span></div>
                                <div><span className="text-gray-500">Climate:</span> <span className="font-semibold text-gray-800">Dual A/C</span></div>
                              </div>
                              <div className="flex items-center gap-1 text-green-700">
                                <Check className="w-3.5 h-3.5" />
                                <span>Includes professional driver, fuel, tolls, and Zamzam water</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Price & Book Now */}
                      <div className="p-5 md:p-6 md:border-l border-[#F0ECE1] flex flex-row md:flex-col items-center md:items-end justify-between min-w-[200px] bg-[#FAF7EE]/20">
                        <div className="text-left md:text-right">
                          <div className="text-2xl font-black text-[#111111] leading-none">
                            {veh.pricePerDay} SAR
                          </div>
                          <div className="text-xs text-[#6B7280] mt-1">
                            /day
                          </div>
                        </div>

                        <button
                          onClick={() => onBookVehicle(veh)}
                          className="px-7 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
