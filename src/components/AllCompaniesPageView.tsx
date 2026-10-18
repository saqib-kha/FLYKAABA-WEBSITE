import React, { useState, useMemo } from 'react';
import { 
  Home, 
  ChevronRight, 
  Search, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Building2, 
  Car, 
  Filter, 
  Sparkles,
  SlidersHorizontal,
  Calendar,
  X
} from 'lucide-react';
import { TravelAgency, Vehicle } from '../data/mockData';

interface AllCompaniesPageViewProps {
  agencies: TravelAgency[];
  vehicles: Vehicle[];
  onSelectAgency: (agency: TravelAgency) => void;
  onGoHome: () => void;
  onOpenListCompany: () => void;
}

export const AllCompaniesPageView: React.FC<AllCompaniesPageViewProps> = ({
  agencies,
  vehicles,
  onSelectAgency,
  onGoHome,
  onOpenListCompany,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'fleet' | 'name'>('rating');

  const saudiCities = ['All', 'Makkah', 'Madinah', 'Jeddah', 'Riyadh', 'Taif'];

  // Filter and sort agencies
  const filteredAgencies = useMemo(() => {
    return agencies
      .filter((agency) => {
        const matchesCity = selectedCity === 'All' || agency.city.toLowerCase() === selectedCity.toLowerCase();
        const matchesVerified = !verifiedOnly || agency.isVerified;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          !query || 
          agency.name.toLowerCase().includes(query) ||
          agency.city.toLowerCase().includes(query) ||
          agency.description.toLowerCase().includes(query) ||
          (agency.licenseNumber && agency.licenseNumber.toLowerCase().includes(query));
        return matchesCity && matchesVerified && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        } else if (sortBy === 'reviews') {
          return b.reviewCount - a.reviewCount;
        } else if (sortBy === 'fleet') {
          return b.vehicleCount - a.vehicleCount;
        } else {
          return a.name.localeCompare(b.name);
        }
      });
  }, [agencies, selectedCity, verifiedOnly, searchQuery, sortBy]);

  // Helper to get vehicle count in app for this agency
  const getAppVehicleCount = (agencyId: string) => {
    return vehicles.filter(v => v.companyId === agencyId).length;
  };

  return (
    <div className="w-full bg-white pb-20">
      
      {/* 1. Header Banner & Breadcrumbs matching reference aesthetic */}
      <div className="w-full bg-[#FAF7EE] border-b border-[#EAE5D9] py-8 sm:py-12">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-4">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 hover:text-[#C9A01B] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#A0A5B1]" />
            <span className="font-semibold text-[#111111]">Travel Agencies</span>
          </nav>

          {/* Page Title & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EEDD] border border-[#E5DEC7] text-xs font-semibold text-[#8B6D12] mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A01B]" />
                <span>Ministry of Transport Verified Directory</span>
              </div>
              <h1 className="font-playfair text-[#111111] text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight">
                Verified Travel Agencies
              </h1>
              <p className="text-[#6B7280] text-sm sm:text-base font-normal mt-2 max-w-2xl">
                Browse licensed transportation companies across Makkah, Madinah, Jeddah, Riyadh, and Taif. Compare fleets, verified pilgrim reviews, and book directly.
              </p>
            </div>

            {/* List Company CTA for vendors */}
            <div className="shrink-0">
              <button
                onClick={onOpenListCompany}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white hover:bg-[#252525] text-xs font-semibold transition-all shadow-sm hover:shadow"
              >
                <Building2 className="w-4 h-4 text-[#C9A01B]" />
                <span>Register Your Agency</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-2xl">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name, city, or license number..."
              className="w-full pl-11 pr-10 py-3.5 bg-white border border-[#D5D0C6] rounded-xl text-sm text-[#111111] shadow-xs focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* City Filter Pills */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {saudiCities.map((city) => {
              const count = city === 'All' 
                ? agencies.length 
                : agencies.filter(a => a.city.toLowerCase() === city.toLowerCase()).length;
              const isSelected = selectedCity.toLowerCase() === city.toLowerCase();

              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#111111] text-white shadow-xs font-semibold'
                      : 'bg-white text-[#4B5563] border border-[#D5D0C6] hover:bg-[#F0ECE1]'
                  }`}
                >
                  <span>{city}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#EFECE4] text-[#6B7280]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1D8]">
          
          <div className="flex items-center gap-2 text-sm text-[#4B5563]">
            <span className="font-semibold text-[#111111]">{filteredAgencies.length}</span>
            <span>transport {filteredAgencies.length === 1 ? 'company' : 'companies'} available</span>
            {selectedCity !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F3EEDD] text-[#8B6D12] text-xs font-medium">
                in {selectedCity}
                <button onClick={() => setSelectedCity('All')} className="hover:text-black">
                  <X className="w-3 h-3 ml-0.5" />
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Verified toggle */}
            <label className="inline-flex items-center gap-2 text-xs font-medium text-[#4B5563] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#C9A01B] border-[#D5D0C6] focus:ring-[#C9A01B]"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
                Verified Only
              </span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#6B7280] hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort companies"
                className="bg-white border border-[#D5D0C6] rounded-lg px-3 py-1.5 text-xs text-[#111111] focus:outline-none focus:border-[#C9A01B]"
              >
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviews</option>
                <option value="fleet">Fleet Size</option>
                <option value="name">Company Name (A-Z)</option>
              </select>
            </div>
          </div>

        </div>

        {/* 3. Companies Grid matching Screenshot 2 & 3 */}
        {filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredAgencies.map((agency) => {
              const appVehiclesCount = getAppVehicleCount(agency.id);
              
              return (
                <div
                  key={agency.id}
                  className="group bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:border-[#C9A01B]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Top: Cover Photo */}
                  <div>
                    <div 
                      onClick={() => onSelectAgency(agency)}
                      className="relative w-full h-40 bg-neutral-100 overflow-hidden cursor-pointer"
                    >
                      <img
                        src={agency.coverImage}
                        alt={agency.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/src/assets/images/agency_alfaisal_cover_1792229464259.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Verified Badge on top-left of cover */}
                      {agency.isVerified && (
                        <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#2563EB] text-white text-[11px] font-bold tracking-wider shadow-sm uppercase">
                          <ShieldCheck className="w-3.5 h-3.5 text-white" />
                          <span>VERIFIED</span>
                        </div>
                      )}

                      {/* Total Fleet Count Badge */}
                      <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-[11px] font-medium">
                        <Car className="w-3.5 h-3.5 text-[#C9A01B]" />
                        <span>{agency.vehicleCount} Vehicles</span>
                      </div>

                      {/* Operating City Badge */}
                      <div className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 text-[#111111] text-xs font-semibold shadow-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                        <span>{agency.city}</span>
                      </div>
                    </div>

                    {/* Bottom Area with Avatar & Content */}
                    <div className="px-5 pt-6 pb-4 relative">
                      
                      {/* Overlapping Company Avatar */}
                      <div 
                        onClick={() => onSelectAgency(agency)}
                        className="absolute -top-7 left-5 w-14 h-14 rounded-xl bg-white p-1 border-2 border-white shadow-md overflow-hidden cursor-pointer"
                      >
                        <img
                          src={agency.avatarImage}
                          alt={`${agency.name} logo`}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>

                      {/* Title & Verification */}
                      <div className="mt-2">
                        <div 
                          onClick={() => onSelectAgency(agency)}
                          className="flex items-center gap-1.5 cursor-pointer"
                        >
                          <h3 className="font-playfair text-[#111111] text-lg font-bold group-hover:text-[#C9A01B] transition-colors truncate">
                            {agency.name}
                          </h3>
                          {agency.isVerified && (
                            <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                          )}
                        </div>

                        {/* License & Year */}
                        <div className="flex items-center gap-2 text-[11px] text-[#6B7280] mt-1">
                          <span className="font-medium text-[#4B5563]">MOT Reg: {agency.licenseNumber}</span>
                          <span>·</span>
                          <span>Est. {agency.foundedYear}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#4B5563] mt-3 line-clamp-2 leading-relaxed">
                        {agency.description}
                      </p>

                      {/* Rating & Review Bar */}
                      <div className="mt-4 pt-3 border-t border-[#F5F2EA] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          {agency.rating > 0 ? (
                            <>
                              <div className="flex items-center text-[#C9A01B]">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < Math.floor(agency.rating)
                                        ? 'fill-[#C9A01B] text-[#C9A01B]'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="font-bold text-[#111111] ml-0.5">
                                {agency.rating.toFixed(1)}
                              </span>
                              <span className="text-[#6B7280]">
                                ({agency.reviewCount} {agency.reviewCount === 1 ? 'review' : 'reviews'})
                              </span>
                            </>
                          ) : (
                            <span className="text-[#6B7280] italic">New Agency Partner</span>
                          )}
                        </div>

                        <span className="text-[11px] font-medium text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded">
                          24/7 Dispatch
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Card Footer: Action Buttons matching reference style */}
                  <div className="px-5 py-3.5 bg-[#FAF7EE]/60 border-t border-[#E5E1D8] flex items-center justify-between gap-2">
                    
                    {/* Quick WhatsApp & Call links */}
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`https://wa.me/${agency.whatsapp.replace(/[^0-9]/g, '')}?text=Assalam%20Alaikum,%20I%20am%20inquiring%20about%20booking%20transportation%20via%20FlyKaaba`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white border border-[#D5D0C6] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${agency.phone}`}
                        className="p-2 rounded-lg bg-white border border-[#D5D0C6] text-[#4B5563] hover:text-[#111111] hover:bg-[#F0ECE1] transition-colors"
                        title="Direct Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Primary Button: View Fleet & Profile */}
                    <button
                      onClick={() => onSelectAgency(agency)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#111111] hover:bg-[#C9A01B] text-white text-xs font-semibold transition-all cursor-pointer shadow-xs"
                    >
                      <span>View Fleet & Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center bg-[#FAF7EE]/40 rounded-2xl border border-dashed border-[#D5D0C6] mt-8">
            <Building2 className="w-12 h-12 text-[#9CA3AF] mx-auto mb-3" />
            <h3 className="font-playfair text-lg font-bold text-[#111111] mb-1">
              No transport companies found
            </h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto mb-5">
              We couldn't find any companies matching your search or filters. Try resetting the filters or searching for another city.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCity('All');
                setVerifiedOnly(false);
              }}
              className="px-5 py-2 rounded-full bg-[#C9A01B] text-white text-xs font-semibold hover:bg-[#b89115] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 4. Bottom Vendor Registration Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#111111] to-[#252525] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] font-bold tracking-wider text-[#C9A01B] uppercase">Partner With Us</span>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold">
              Are you a licensed Saudi transportation operator?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              List your fleet on FlyKaaba and connect directly with thousands of Umrah and Hajj pilgrims seeking reliable, verified airport transfers and intercity rides.
            </p>
          </div>
          <button
            onClick={onOpenListCompany}
            className="shrink-0 px-6 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-[#111111] font-bold text-xs sm:text-sm transition-all shadow-sm"
          >
            Register Your Fleet
          </button>
        </div>

      </div>

    </div>
  );
};
