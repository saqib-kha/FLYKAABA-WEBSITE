import React from 'react';
import { X, MapPin, ArrowRight, Clock, Navigation, Compass } from 'lucide-react';
import { POPULAR_ROUTES, RouteInfo } from '../data/mockData';

interface RoutesModalProps {
  onClose: () => void;
  onSelectRoute: (fromCity: string, toCity: string) => void;
}

export const RoutesModal: React.FC<RoutesModalProps> = ({ onClose, onSelectRoute }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C9A01B]" />
            <div>
              <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111]">
                Popular Travel & Pilgrimage Routes
              </h2>
              <p className="text-xs text-[#6B7280]">
                Explore key intercity transit corridors connecting airports, holy sanctuaries, and mountain retreats.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Routes List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-[#FBF7E9]/15">
          {POPULAR_ROUTES.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-xl border border-[#E5E1D8] p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-lg">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A01B] uppercase tracking-wider">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{route.popularFor}</span>
                </div>

                <div className="font-playfair font-bold text-lg sm:text-xl text-[#111111] flex items-center gap-2.5">
                  <span>{route.fromCity}</span>
                  <span className="text-[#C9A01B]">→</span>
                  <span>{route.toCity}</span>
                </div>

                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {route.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#6B7280] pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {route.estimatedTime}
                  </span>
                  <span>·</span>
                  <span>{route.distanceKm} km highway</span>
                </div>
              </div>

              <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F5F2EA] gap-2">
                <div>
                  <div className="text-[11px] text-[#6B7280]">Starting from</div>
                  <div className="text-lg font-bold text-[#111111] tabular-nums">
                    {route.startingPriceSar} SAR
                  </div>
                </div>

                <button
                  onClick={() => onSelectRoute(route.fromCity, route.toCity)}
                  className="px-5 py-2 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                >
                  <span>Book This Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
