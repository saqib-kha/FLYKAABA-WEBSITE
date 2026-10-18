import React, { useState } from 'react';
import { X, Search, Users, Luggage, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
import { Vehicle } from '../data/mockData';

interface AllVehiclesModalProps {
  vehicles: Vehicle[];
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  initialCategory?: string;
}

export const AllVehiclesModal: React.FC<AllVehiclesModalProps> = ({
  vehicles,
  onClose,
  onSelectVehicle,
  onBookVehicle,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Economy Car', 'Luxury Car', 'SUV', 'Van', 'Bus'];

  const filtered = vehicles.filter(v => {
    const matchesCat = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111]">
              Explore Complete Vehicle Fleet
            </h2>
            <p className="text-xs text-[#6B7280]">
              Browse luxury sedans, family SUVs, pilgrim vans, and group buses available across Saudi Arabia.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="px-6 py-3 border-b border-[#E5E1D8] bg-[#F7F6F2] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search vehicles by make, model, or company..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E5E1D8] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#C9A01B]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#C9A01B] text-white shadow-xs'
                    : 'bg-white border border-[#E5E1D8] text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FBF7E9]/15">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(veh => (
              <div
                key={veh.id}
                className="bg-white rounded-xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div 
                  onClick={() => onSelectVehicle(veh)}
                  className="relative h-44 bg-neutral-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={veh.images[0]}
                    alt={veh.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium backdrop-blur-xs">
                    {veh.category}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onSelectVehicle(veh)}
                      className="font-playfair font-bold text-base text-[#111111] hover:text-[#C9A01B] cursor-pointer"
                    >
                      {veh.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1 text-xs text-[#4B5563]">
                      <span>by <strong>{veh.companyName}</strong></span>
                      <span>·</span>
                      <span>{veh.city}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#C9A01B]" />
                        {veh.passengerCapacity} seats
                      </span>
                      <span>·</span>
                      <span>{veh.transmission}</span>
                    </div>

                    <p className="mt-2 text-[11px] text-[#6B7280] line-clamp-2">
                      {veh.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F5F2EA] flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-[#111111] tabular-nums">
                        {veh.pricePerDay} SAR
                      </span>
                      <span className="text-xs text-[#6B7280]">/day</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectVehicle(veh)}
                        className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium hover:bg-gray-50"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onBookVehicle(veh)}
                        className="px-4 py-1.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold shadow-xs"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
