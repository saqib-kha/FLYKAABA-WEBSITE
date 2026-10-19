import React from 'react';
import { Users, Fuel, Gauge, ArrowRight } from 'lucide-react';
import { Vehicle, gmcYukonImg } from '../data/mockData';

interface FeaturedVehiclesSectionProps {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  onViewAllVehicles: () => void;
}

export const FeaturedVehiclesSection: React.FC<FeaturedVehiclesSectionProps> = ({
  vehicles,
  onSelectVehicle,
  onBookVehicle,
  onViewAllVehicles,
}) => {
  return (
    <section className="w-full bg-white py-14 sm:py-16 border-b border-[#F0ECE1]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading & Subtitle matching Screenshot 3 */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-[#111111] text-3xl sm:text-[34px] font-bold tracking-tight mb-2">
            Featured Vehicles
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base font-normal font-sans">
            Hand-picked vehicles from verified companies.
          </p>
        </div>

        {/* 3-Column Vehicle Grid matching Screenshot 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.slice(0, 3).map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-white rounded-[14px] border border-[#E5E1D8] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-[#C9A01B]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Vehicle Image */}
              <div 
                className="relative w-full h-[180px] sm:h-[195px] bg-[#F7F6F2] overflow-hidden select-none"
              >
                <img
                  src={vehicle.images[0]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = gmcYukonImg;
                  }}
                />
              </div>

              {/* Vehicle Content Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Vehicle Name */}
                  <h3 
                    className="font-playfair text-[#111111] text-[18px] sm:text-[19px] font-bold tracking-tight"
                  >
                    {vehicle.name}
                  </h3>

                  {/* Company Attribution with small Avatar */}
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-[#4B5563]">
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 border border-gray-300 shrink-0">
                      <img
                        src={vehicle.companyAvatar || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80'}
                        alt={vehicle.companyName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="truncate">
                      by <span className="font-medium text-[#111111]">{vehicle.companyName}</span> · {vehicle.category}
                    </span>
                  </div>

                  {/* Seats & Transmission Specs */}
                  <div className="mt-3 text-xs text-[#6B7280] flex items-center gap-3">
                    <span>{vehicle.passengerCapacity} seats</span>
                    {vehicle.transmission && (
                      <>
                        <span>·</span>
                        <span>{vehicle.transmission}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Price & Book Now Button matching Screenshot 4 */}
                <div className="mt-5 pt-3.5 border-t border-[#F5F2EA] flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-base sm:text-[17px] font-bold text-[#111111] tabular-nums">
                      {vehicle.pricePerDay} SAR
                    </span>
                    <span className="text-xs text-[#6B7280]">/day</span>
                  </div>

                  <button
                    onClick={() => onBookVehicle(vehicle)}
                    className="px-5 py-2 rounded-full bg-white hover:bg-[#FBF7E9] text-[#111111] hover:text-[#C9A01B] border border-[#D5D0C6] hover:border-[#C9A01B] text-xs font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Vehicles Button matching Screenshot 4 */}
        <div className="text-center mt-9">
          <button
            onClick={onViewAllVehicles}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-[#F0ECE1] text-[#111111] border border-[#D5D0C6] text-sm font-medium transition-all shadow-xs hover:shadow-sm cursor-pointer"
          >
            View all vehicles
          </button>
        </div>

      </div>
    </section>
  );
};
