import React, { useState, useMemo } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';

interface CityItem {
  name: string;
  initial: string;
  image?: string;
  tagline?: string;
}

// Photorealistic generated city imagery matching FlyKaaba Saudi Arabian travel destinations
const FEATURED_CITIES: CityItem[] = [
  {
    name: 'Makkah',
    initial: 'M',
    image: '/src/assets/images/city_makkah_skyline_1792484908820.jpg',
    tagline: 'Holy City & Umrah Hub',
  },
  {
    name: 'Madinah',
    initial: 'M',
    image: '/src/assets/images/city_madinah_prophet_1792484908309.jpg',
    tagline: 'The Radiant City of the Prophet',
  },
  {
    name: 'Jeddah',
    initial: 'J',
    image: '/src/assets/images/city_jeddah_corniche_1792484910042.jpg',
    tagline: 'Red Sea Gateway & Waterfront',
  },
  {
    name: 'Riyadh',
    initial: 'R',
    image: '/src/assets/images/city_riyadh_skyline_1792484910006.jpg',
    tagline: 'Kingdom Capital & Metropole',
  },
  {
    name: 'Dammam',
    initial: 'D',
    image: '/src/assets/images/city_dammam_coastal_1792484909466.jpg',
    tagline: 'Arabian Gulf Promenade',
  },
  {
    name: 'Taif',
    initial: 'T',
    image: '/src/assets/images/city_taif_highlands_1792484910407.jpg',
    tagline: 'Al-Hada Mountain Highlands',
  },
];

const EXTENDED_CITIES: CityItem[] = [
  ...FEATURED_CITIES,
  { name: 'Al Khobar', initial: 'A', tagline: 'Corniche & Commercial Hub' },
  { name: 'Tabuk', initial: 'T', tagline: 'Historic Northern Oasis' },
  { name: 'Abha', initial: 'A', tagline: 'Asir Green Mountains' },
  { name: 'Yanbu', initial: 'Y', tagline: 'Coastal Heritage & Diving' },
  { name: 'AlUla', initial: 'A', tagline: 'Ancient Hegra & Sandstone' },
  { name: 'Jubail', initial: 'J', tagline: 'Gulf Coast Industrial City' },
];

interface CitiesPageViewProps {
  onSelectCity: (cityName: string) => void;
  onGoHome?: () => void;
}

export const CitiesPageView: React.FC<CitiesPageViewProps> = ({
  onSelectCity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const displayedCities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return FEATURED_CITIES;
    }
    return EXTENDED_CITIES.filter((city) =>
      city.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#FAF9F6] min-h-[calc(100vh-80px)] py-10 sm:py-12 font-sans selection:bg-[#B88722]/20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Header Section matching reference layout */}
        <div className="mb-6">
          <h1 className="font-playfair text-3xl sm:text-4xl font-normal text-[#111111] tracking-tight">
            Cities
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280] mt-1.5">
            Browse and search for vehicles by pickup city.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sm:mb-10 max-w-xs sm:max-w-sm">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cities..."
              className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#B88722] focus:ring-1 focus:ring-[#B88722] bg-white shadow-xs transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                aria-label="Clear search"
              >
                &times;
              </button>
            ) : null}
          </div>
        </div>

        {/* Cities Grid with High-Resolution Scenic Pictures */}
        {displayedCities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12 sm:pb-16">
            {displayedCities.map((city) => (
              <div
                key={city.name}
                onClick={() => onSelectCity(city.name)}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden flex flex-col hover:border-[#B88722] hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                {/* Upper Area with Image and Fallback */}
                <div className="relative bg-[#FAF6EC] h-48 sm:h-56 overflow-hidden flex items-center justify-center transition-colors">
                  {city.image ? (
                    <>
                      <img
                        src={city.image}
                        alt={`${city.name} city`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        onError={(e) => {
                          // Fallback to letter initial if image fails
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                      {/* Gentle bottom gradient for visual contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Location chip */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-medium text-white flex items-center gap-1 shadow-xs">
                        <MapPin className="w-3 h-3 text-[#E8B647]" />
                        <span>Saudi Arabia</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF6EC] to-[#F5EED8] group-hover:from-[#F5EED8] group-hover:to-[#EDE2C4] transition-colors">
                      <span className="font-sans font-black text-3xl sm:text-4xl text-[#B88722] tracking-wider select-none">
                        {city.initial}
                      </span>
                      <span className="text-xs text-[#8A7340] mt-1 font-medium">
                        {city.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom white strip with city name and quick action */}
                <div className="px-5 py-4 bg-white border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm sm:text-base font-semibold text-[#111111] group-hover:text-[#B88722] transition-colors block">
                      {city.name}
                    </span>
                    {city.tagline && (
                      <span className="text-[11px] text-[#6B7280] line-clamp-1">
                        {city.tagline}
                      </span>
                    )}
                  </div>
                  
                  <div className="w-7 h-7 rounded-full bg-[#FAF6EC] flex items-center justify-center text-[#B88722] group-hover:bg-[#B88722] group-hover:text-white transition-all transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200/90 p-10 text-center max-w-md mx-auto my-8">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-base text-[#111111] mb-1">No cities found</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] mb-4">
              We couldn&apos;t find any cities matching &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-full bg-[#FAF7EE] border border-[#E5E1D8] text-xs font-semibold text-[#111111] hover:bg-[#F3EEDD] transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
