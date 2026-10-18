import React, { useState } from 'react';
import { X, Search, MapPin, ShieldCheck, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { TravelAgency } from '../data/mockData';

interface AllAgenciesModalProps {
  agencies: TravelAgency[];
  onClose: () => void;
  onSelectAgency: (agency: TravelAgency) => void;
}

export const AllAgenciesModal: React.FC<AllAgenciesModalProps> = ({
  agencies,
  onClose,
  onSelectAgency,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const filtered = agencies.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          a.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || a.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  const cities = ['All', 'Madinah', 'Riyadh', 'Jeddah', 'Taif'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111]">
              Verified Travel Agencies in Saudi Arabia
            </h2>
            <p className="text-xs text-[#6B7280]">
              Browse licensed, background-checked transportation partners across Makkah, Madinah, Riyadh, Jeddah, and Taif.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-6 py-3 border-b border-[#E5E1D8] bg-[#F7F6F2] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search companies by name or city..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E5E1D8] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#C9A01B]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="font-semibold text-gray-600">City:</span>
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                  selectedCity === c
                    ? 'bg-[#C9A01B] text-white shadow-xs'
                    : 'bg-white border border-[#E5E1D8] text-gray-600 hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Agencies Grid */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FBF7E9]/15">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(agency => (
              <div
                key={agency.id}
                onClick={() => onSelectAgency(agency)}
                className="group bg-white rounded-xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-28 bg-neutral-100">
                  <img
                    src={agency.coverImage}
                    alt={agency.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {agency.isVerified && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#2563EB] text-white text-[10px] font-bold tracking-wider">
                      VERIFIED
                    </div>
                  )}
                </div>

                <div className="p-4 relative">
                  <div className="w-10 h-10 rounded-lg bg-white p-0.5 border border-[#E5E1D8] shadow-sm -mt-8 relative z-10 overflow-hidden mb-2">
                    <img src={agency.avatarImage} alt="" className="w-full h-full object-cover rounded-md" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <h3 className="font-playfair font-bold text-base text-[#111111] group-hover:text-[#C9A01B] transition-colors truncate">
                      {agency.name}
                    </h3>
                    {agency.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                    <span>{agency.city}</span>
                    <span>·</span>
                    <span>{agency.vehicleCount} vehicles</span>
                  </div>

                  <p className="text-xs text-[#4B5563] mt-2 line-clamp-2">
                    {agency.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#F5F2EA] flex items-center justify-between text-xs">
                    <div className="flex items-center text-[#C9A01B]">
                      <Star className="w-3.5 h-3.5 fill-[#C9A01B]" />
                      <span className="font-bold ml-1 text-gray-900">{agency.rating > 0 ? agency.rating.toFixed(1) : 'New'}</span>
                      <span className="text-gray-500 ml-1">({agency.reviewCount})</span>
                    </div>

                    <span className="text-[#C9A01B] font-semibold flex items-center gap-0.5">
                      View Fleet <ChevronRight className="w-3.5 h-3.5" />
                    </span>
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
