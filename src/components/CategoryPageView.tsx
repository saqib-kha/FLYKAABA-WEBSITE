import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Users, 
  Settings, 
  ChevronLeft, 
  Pause, 
  Check, 
  Sparkles,
  Search
} from 'lucide-react';
import { Vehicle, TravelAgency, CAR_CATEGORIES } from '../data/mockData';

interface CategoryPageViewProps {
  currentCategory: string;
  onSelectCategory: (categoryTitle: string) => void;
  onGoHome: () => void;
  vehicles: Vehicle[];
  agencies: TravelAgency[];
  onBookVehicle: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenSearch: () => void;
  onViewAllCategories: () => void;
}

export const CategoryPageView: React.FC<CategoryPageViewProps> = ({
  currentCategory,
  onSelectCategory,
  onGoHome,
  vehicles,
  agencies,
  onBookVehicle,
  onSelectVehicle,
  onOpenSearch,
  onViewAllCategories,
}) => {
  // Track expanded features for each vehicle card
  const [expandedFeatures, setExpandedFeatures] = useState<{ [vehicleId: string]: boolean }>({});
  
  // Track current image slide for vehicles with multiple images
  const [imageSlideIndex, setImageSlideIndex] = useState<{ [vehicleId: string]: number }>({});

  const toggleFeatures = (vehicleId: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [vehicleId]: !prev[vehicleId],
    }));
  };

  const handleNextImage = (vehicleId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageSlideIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) + 1) % max,
    }));
  };

  const handlePrevImage = (vehicleId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageSlideIndex(prev => ({
      ...prev,
      [vehicleId]: ((prev[vehicleId] || 0) - 1 + max) % max,
    }));
  };

  // Filter vehicles by the selected category
  const categoryVehicles = vehicles.filter(
    v => v.category.toLowerCase() === currentCategory.toLowerCase()
  );

  // Available categories for the switcher pill bar
  const categoryPills = [
    { title: 'Economy Car', count: vehicles.filter(v => v.category === 'Economy Car').length },
    { title: 'Luxury Car', count: vehicles.filter(v => v.category === 'Luxury Car').length },
    { title: 'SUV', count: vehicles.filter(v => v.category === 'SUV').length },
    { title: 'Van', count: vehicles.filter(v => v.category === 'Van').length },
    { title: 'Bus', count: vehicles.filter(v => v.category === 'Bus').length },
    { title: 'Mazda', count: 0 },
  ];

  return (
    <div className="w-full bg-white pb-16">
      
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Clean Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-6">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1 hover:text-[#C9A01B] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-medium text-[#111111]">{currentCategory}</span>
        </nav>
        
        {/* 2. Browse another category Pill Bar matching Screenshot 1.PNG */}
        <div className="mb-10">
          <label className="block text-xs font-semibold text-[#111111] mb-2.5">
            Browse another category
          </label>
          <div className="flex items-center gap-2.5 flex-wrap">
            {categoryPills.map(cat => {
              const isActive = cat.title.toLowerCase() === currentCategory.toLowerCase();
              return (
                <button
                  key={cat.title}
                  onClick={() => onSelectCategory(cat.title)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#FBF7E9] border border-[#C9A01B] text-[#111111] shadow-xs'
                      : 'bg-white border border-[#E5E1D8] text-[#4B5563] hover:bg-[#F7F6F2]'
                  }`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    isActive ? 'border-[#C9A01B]' : 'border-gray-300'
                  }`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />}
                  </div>
                  <span>{cat.title}</span>
                  <span className="text-[#9CA3AF] text-[11px]">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Section Title matching Screenshot 1.PNG */}
        <div className="mb-6">
          <h2 className="font-playfair text-[#111111] text-2xl font-bold tracking-tight">
            {currentCategory}
          </h2>
        </div>

        {/* 4. Vehicle Grid matching Screenshots 2.PNG & 3.PNG */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categoryVehicles.length > 0 ? (
            categoryVehicles.map(vehicle => {
              const agency = agencies.find(a => a.id === vehicle.companyId);
              const isExpanded = !!expandedFeatures[vehicle.id];
              const currentImgIdx = imageSlideIndex[vehicle.id] || 0;
              const imgList = vehicle.images.length > 0 ? vehicle.images : ['/src/assets/images/toyota_camry_white_1792229409354.jpg'];

              return (
                <div
                  key={vehicle.id}
                  className="bg-[#FAF7F0]/60 rounded-2xl border border-[#EBE7DD] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all flex flex-col justify-between"
                >
                  {/* Top Image Carousel Area matching Screenshot 2.PNG */}
                  <div className="relative w-full h-[200px] sm:h-[215px] bg-[#222222] overflow-hidden group">
                    <img
                      src={imgList[currentImgIdx % imgList.length]}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Left & Right arrow controls */}
                    {imgList.length > 1 && (
                      <>
                        <button
                          onClick={(e) => handlePrevImage(vehicle.id, imgList.length, e)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-[#111111] flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleNextImage(vehicle.id, imgList.length, e)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-[#111111] flex items-center justify-center shadow-sm opacity-90 hover:opacity-100 transition-opacity"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Demo badge if applicable */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center text-[10px]">
                        <Pause className="w-2.5 h-2.5" />
                      </div>
                    </div>

                    {/* Carousel dot indicators */}
                    {imgList.length > 1 && (
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        {imgList.map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i === currentImgIdx % imgList.length ? 'bg-[#C9A01B] w-3' : 'bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Content matching Screenshots 2.PNG & 3.PNG */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-center">
                    
                    <div>
                      {/* Vehicle Name (Underlined / Golden style) */}
                      <h3
                        onClick={() => onSelectVehicle(vehicle)}
                        className="font-playfair text-[#856404] hover:text-[#C9A01B] text-[18px] sm:text-[19px] font-bold underline decoration-[#C9A01B]/50 hover:decoration-[#C9A01B] cursor-pointer transition-colors"
                      >
                        {vehicle.name}
                      </h3>

                      {/* Company Info with Avatar */}
                      <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-[#4B5563]">
                        <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
                          <img
                            src={vehicle.companyAvatar || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80'}
                            alt={vehicle.companyName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="truncate">
                          by <strong className="text-[#111111]">{vehicle.companyName}</strong>
                        </span>
                      </div>

                      {/* Review Rating if available */}
                      {agency && agency.rating > 0 && (
                        <div className="flex items-center justify-center gap-1 text-xs text-[#C9A01B] mt-1.5">
                          <Star className="w-3.5 h-3.5 fill-[#C9A01B]" />
                          <span className="font-semibold text-[#111111] tabular-nums">
                            {agency.rating.toFixed(1)}
                          </span>
                          <span className="text-[#6B7280]">
                            ({agency.reviewCount})
                          </span>
                        </div>
                      )}

                      {/* Specs Row */}
                      <div className="mt-2.5 flex items-center justify-center gap-3 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <Settings className="w-3.5 h-3.5 text-gray-400" />
                          {vehicle.transmission}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          {vehicle.passengerCapacity} seats
                        </span>
                      </div>

                      {/* Vehicle Features Toggle Accordion matching Screenshot 2.PNG */}
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => toggleFeatures(vehicle.id)}
                          className="inline-flex items-center gap-1 text-xs font-medium text-[#C9A01B] hover:underline cursor-pointer"
                        >
                          <span>Vehicle Features</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="mt-2.5 p-3 rounded-xl bg-white border border-[#EBE7DD] text-left text-[11px] text-[#4B5563] space-y-1.5 animate-in fade-in-50 duration-200">
                            {vehicle.amenities.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-[#C9A01B] shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price & Gold Book Now Button matching Screenshot 2.PNG */}
                    <div className="mt-6 pt-3 border-t border-[#EBE7DD]">
                      <div className="mb-3">
                        <span className="text-xl sm:text-2xl font-bold text-[#111111] tabular-nums">
                          {vehicle.pricePerDay} SAR
                        </span>
                        <span className="text-xs text-[#6B7280]">/day</span>
                      </div>

                      <button
                        onClick={() => onBookVehicle(vehicle)}
                        className="w-full py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-xs sm:text-sm shadow-[0_2px_6px_rgba(201,160,27,0.3)] hover:shadow-[0_4px_10px_rgba(201,160,27,0.45)] transition-all cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center bg-[#FAF7F0] rounded-2xl border border-[#EBE7DD]">
              <p className="text-sm text-[#6B7280]">
                No vehicles listed currently under {currentCategory}.
              </p>
              <button
                onClick={() => onSelectCategory('Economy Car')}
                className="mt-3 px-5 py-2 rounded-full bg-[#C9A01B] text-white text-xs font-semibold"
              >
                Browse Economy Cars
              </button>
            </div>
          )}
        </div>

        {/* 5. Informational & FAQ Cards matching Screenshot 4.PNG & 5.PNG */}
        <div className="space-y-6 mb-16">
          
          {/* Card 1: Book a [Category] */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 sm:p-8 shadow-xs">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111] mb-2.5">
              Book a {currentCategory}
            </h3>
            <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed">
              Booking a {currentCategory.toLowerCase()} on FlyKaaba takes a few minutes. Browse the vehicles above, pick one that fits your trip, choose your dates and send a booking request — the company confirms it directly, and payment is arranged with them once your trip is set.
            </p>
          </div>

          {/* Card 2: Why book a [Category] */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 sm:p-8 shadow-xs">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111] mb-2.5">
              Why book a {currentCategory.toLowerCase()}
            </h3>
            <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed">
              Every {currentCategory.toLowerCase()} listed here belongs to a verified company. Compare seats, transmission and price, then send a booking request — the company confirms it, and payment is arranged directly with them. Every {currentCategory.toLowerCase()} listed here belongs to a verified company. Compare seats, transmission and price, then send a booking request — the company confirms it, and payment is arranged directly with them. Every {currentCategory.toLowerCase()} listed here belongs to a verified company. Compare seats, transmission and price, then send a booking request — the company confirms it, and payment is arranged directly with them.
            </p>
          </div>

          {/* Card 3: Explore [Category] Rentals matching Screenshot 5.PNG */}
          <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 sm:p-8 shadow-xs">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111] mb-2.5">
              Explore {currentCategory} Rentals
            </h3>
            <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed">
              Every {currentCategory.toLowerCase()} on FlyKaaba comes from a verified transport company, with real photos, seats and transmission shown up front — so you know exactly what you're booking before you send a request.
            </p>
          </div>

        </div>

        {/* 6. Dark Call-to-Action Section matching Screenshot 5.PNG */}
        <div className="w-full bg-[#111111] rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden mb-6 shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold tracking-tight">
              Looking for something else?
            </h2>
            <p className="text-white/80 text-xs sm:text-sm font-normal pb-3">
              Browse every vehicle category, or search by city and dates.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              {/* All Categories Button */}
              <button
                onClick={onViewAllCategories}
                className="px-6 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_2px_8px_rgba(201,160,27,0.3)] hover:scale-105 cursor-pointer"
              >
                All categories
              </button>

              {/* Search vehicles Button */}
              <button
                onClick={onOpenSearch}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-medium transition-all hover:scale-105 cursor-pointer"
              >
                Search vehicles
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
