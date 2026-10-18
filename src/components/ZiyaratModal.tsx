import React from 'react';
import { X, Compass, MapPin, Clock, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ZIYARAT_DESTINATIONS, ZiyaratDestination } from '../data/mockData';

interface ZiyaratModalProps {
  destination: ZiyaratDestination | null;
  onClose: () => void;
  onBookZiyarat: (dest: ZiyaratDestination) => void;
}

export const ZiyaratModal: React.FC<ZiyaratModalProps> = ({
  destination,
  onClose,
  onBookZiyarat,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-[#FBF7E9]/70">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#C9A01B]" />
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A01B]">
                Sacred Heritage Tour
              </span>
              <h2 className="font-playfair text-xl font-bold text-[#111111]">
                {destination.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div className="flex items-center gap-4 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
              {destination.city}, Saudi Arabia
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              Duration: {destination.duration}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            {destination.description}
          </p>

          {/* Highlights checklist */}
          <div className="bg-[#F7F6F2] p-4 rounded-xl border border-[#E5E1D8]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
              Key Historical Landmarks Included
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#111111]">
                  <Check className="w-4 h-4 text-[#C9A01B] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Vehicles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
              Recommended Fleet
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {destination.suggestedVehicles.map((v, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-[#E5E1D8] rounded-full text-[#4B5563]">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#6B7280]">Private Tour Rate</span>
              <div className="text-xl font-bold text-[#111111] tabular-nums">
                From {destination.priceEstimateSar} SAR
              </div>
            </div>

            <button
              onClick={() => onBookZiyarat(destination)}
              className="px-6 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>Book This Ziyarat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
