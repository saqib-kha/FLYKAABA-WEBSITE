import React from 'react';
import { Star, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TravelAgency } from '../data/mockData';

interface VerifiedAgenciesSectionProps {
  agencies: TravelAgency[];
  onSelectAgency: (agency: TravelAgency) => void;
  onViewAllAgencies: () => void;
}

export const VerifiedAgenciesSection: React.FC<VerifiedAgenciesSectionProps> = ({
  agencies,
  onSelectAgency,
  onViewAllAgencies,
}) => {
  return (
    <section className="w-full bg-[#F7F6F2] py-14 sm:py-16 border-b border-[#E5E1D8]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading matching Screenshot 2 & 3 */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-[#111111] text-3xl sm:text-[34px] font-bold tracking-tight mb-2">
            Verified Travel Agencies
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base font-normal font-sans">
            Book with licensed, verified transport companies.
          </p>
        </div>

        {/* 4 Cards Grid on Desktop matching Screenshot 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {agencies.slice(0, 4).map((agency) => (
            <div
              key={agency.id}
              onClick={() => onSelectAgency(agency)}
              className="group bg-white rounded-[14px] border border-[#E5E1D8] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-[#C9A01B]/50 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Cover Image Container */}
              <div className="relative w-full h-[110px] sm:h-[115px] bg-neutral-200 overflow-hidden">
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
                
                {/* Verified Badge on top-left of cover (Screenshot 3) */}
                {agency.isVerified && (
                  <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#2563EB] text-white text-[10px] font-bold tracking-wider shadow-xs uppercase">
                    <ShieldCheck className="w-3 h-3 text-white" />
                    <span>VERIFIED</span>
                  </div>
                )}
              </div>

              {/* Bottom Content Area with Overlapping Avatar */}
              <div className="relative px-4 pt-5 pb-4 flex-1 flex flex-col justify-between">
                
                {/* Overlapping Company Avatar */}
                <div className="absolute -top-7 left-4 w-12 h-12 rounded-xl bg-white p-0.5 border border-[#E5E1D8] shadow-sm overflow-hidden">
                  <img
                    src={agency.avatarImage}
                    alt={`${agency.name} logo`}
                    className="w-full h-full object-cover rounded-[10px]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                {/* Company Name & Location */}
                <div className="mt-2">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-playfair text-[#111111] text-[15px] font-bold group-hover:text-[#C9A01B] transition-colors truncate">
                      {agency.name}
                    </h3>
                    {agency.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                    <span>{agency.city}</span>
                  </div>
                </div>

                {/* Star Rating & Review Count */}
                <div className="mt-3 pt-2.5 border-t border-[#F5F2EA] flex items-center gap-1.5 text-xs">
                  {agency.rating > 0 ? (
                    <>
                      <div className="flex items-center text-[#C9A01B]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(agency.rating)
                                ? 'fill-[#C9A01B] text-[#C9A01B]'
                                : i < agency.rating
                                ? 'fill-[#C9A01B]/50 text-[#C9A01B]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-[#111111] tabular-nums">
                        {agency.rating.toFixed(1)}
                      </span>
                      <span className="text-[#6B7280]">
                        ({agency.reviewCount})
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center text-gray-300">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-gray-300" />
                        ))}
                      </div>
                      <span className="text-[#6B7280]">N/A (0)</span>
                    </>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Companies Button matching Screenshot 3 */}
        <div className="text-center mt-9">
          <button
            onClick={onViewAllAgencies}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-[#F0ECE1] text-[#111111] border border-[#D5D0C6] text-sm font-medium transition-all shadow-xs hover:shadow-sm cursor-pointer"
          >
            View all companies
          </button>
        </div>

      </div>
    </section>
  );
};
