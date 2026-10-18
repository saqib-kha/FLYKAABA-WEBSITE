import React, { useState } from 'react';
import { X, Filter, ArrowUpDown, MapPin, Calendar, Clock, Users, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Vehicle, TravelAgency, CAR_CATEGORIES } from '../data/mockData';
import { SearchParams } from './HeroSection';

interface SearchResultsModalProps {
  searchParams: SearchParams;
  allVehicles: Vehicle[];
  agencies: TravelAgency[];
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  onModifySearch: () => void;
}

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  searchParams,
  allVehicles,
  agencies,
  onClose,
  onSelectVehicle,
  onBookVehicle,
  onModifySearch,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'capacity'>('recommended');
  const [minSeats, setMinSeats] = useState<number>(0);

  // Filter vehicles
  let filtered = allVehicles.filter(v => {
    // Category filter
    if (selectedCategory !== 'All' && v.category !== selectedCategory) {
      return false;
    }
    // Capacity filter
    if (minSeats > 0 && v.passengerCapacity < minSeats) {
      return false;
    }
    return true;
  });

  // Sort vehicles
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
    if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
    if (sortBy === 'capacity') return b.passengerCapacity - a.passengerCapacity;
    return 0; // recommended
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-[#FBF7E9]/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A01B]">
                Search Results
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white border border-[#E5E1D8] text-[#4B5563]">
                {filtered.length} vehicles available
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold text-[#111111] font-playfair flex items-center gap-2 mt-0.5">
              <span>{searchParams.pickupCity}</span>
              <span className="text-[#C9A01B]">→</span>
              <span>{searchParams.dropoffCity}</span>
              <span className="text-xs font-normal text-[#6B7280] ml-2">
                ({searchParams.tripType === 'round-trip' ? 'Round-Way' : 'One-Way'})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onModifySearch}
              className="text-xs font-semibold text-[#C9A01B] hover:underline px-3 py-1.5 rounded-lg border border-[#C9A01B]/40 hover:bg-[#FBF7E9]"
            >
              Modify Search
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="px-6 py-3 border-b border-[#E5E1D8] bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="font-semibold text-gray-700 mr-1">Category:</span>
            {['All', 'Economy Car', 'Luxury Car', 'SUV', 'Van', 'Bus'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                  selectedCategory === cat
                    ? 'bg-[#C9A01B] text-white shadow-xs'
                    : 'bg-[#F7F6F2] text-[#4B5563] hover:bg-[#E5E1D8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-700">Min Seats:</span>
              <select
                value={minSeats}
                onChange={(e) => setMinSeats(Number(e.target.value))}
                className="bg-[#F7F6F2] border border-[#E5E1D8] rounded-md px-2 py-1 text-xs text-[#111111] focus:outline-none"
              >
                <option value={0}>Any</option>
                <option value={4}>4+ Seats</option>
                <option value={7}>7+ Seats</option>
                <option value={10}>10+ Seats</option>
                <option value={20}>20+ Seats</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#6B7280]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F7F6F2] border border-[#E5E1D8] rounded-md px-2 py-1 text-xs text-[#111111] focus:outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="capacity">Passenger Capacity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Results Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FBF7E9]/20">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((vehicle) => {
                const agency = agencies.find(a => a.id === vehicle.companyId);
                return (
                  <div
                    key={vehicle.id}
                    className="bg-white rounded-xl border border-[#E5E1D8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div 
                      onClick={() => onSelectVehicle(vehicle)}
                      className="relative h-44 bg-neutral-100 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
                        {vehicle.category}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => onSelectVehicle(vehicle)}
                            className="font-playfair font-bold text-base text-[#111111] hover:text-[#C9A01B] cursor-pointer"
                          >
                            {vehicle.name}
                          </h4>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-1">
                          <span>by {vehicle.companyName}</span>
                          {agency?.isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          )}
                        </div>

                        <div className="mt-3 flex items-center gap-3 text-xs text-[#4B5563]">
                          <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-[#C9A01B]" />
                            {vehicle.passengerCapacity} seats
                          </span>
                          <span>·</span>
                          <span>{vehicle.transmission}</span>
                        </div>

                        <div className="mt-2 text-[11px] text-[#6B7280] line-clamp-2">
                          {vehicle.description}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#F5F2EA] flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-[#111111] tabular-nums">
                            {vehicle.pricePerDay} SAR
                          </span>
                          <span className="text-xs text-[#6B7280]">/day</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectVehicle(vehicle)}
                            className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium hover:bg-gray-50"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onBookVehicle(vehicle)}
                            className="px-4 py-1.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold shadow-xs"
                          >
                            Book
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#C9A01B] flex items-center justify-center mx-auto mb-3">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="font-playfair text-lg font-bold text-[#111111]">
                No vehicles matched your filter
              </h3>
              <p className="text-xs text-[#6B7280] mt-1 max-w-sm mx-auto">
                Try selecting a different car category or lowering the minimum seating capacity.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setMinSeats(0); }}
                className="mt-4 px-4 py-2 rounded-full bg-[#C9A01B] text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
