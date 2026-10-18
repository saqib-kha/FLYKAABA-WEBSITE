import React from 'react';
import { X, Search, CheckCircle2, ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
  initialTopic?: string;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ onClose, initialTopic = 'How It Works' }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-[#FBF7E9]/70">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A01B]">
              FlyKaaba Guide & Transparency
            </span>
            <h2 className="font-playfair text-xl font-bold text-[#111111]">
              {initialTopic}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-bold text-[#111111]">
              Connecting Sacred Travelers Directly to Licensed Transporters
            </h3>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              FlyKaaba is a dedicated marketplace engineered to bring absolute transparency to ground transportation in the Kingdom of Saudi Arabia. Historically, pilgrims faced inflated middleman markups, unverified drivers, or confusing price quotes upon airport arrival. FlyKaaba provides a verified digital ecosystem where licensed transport companies publish authentic fleet photographs, exact vehicle specifications, and transparent rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E5E1D8] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h4 className="font-playfair font-bold text-sm text-[#111111]">Search & Compare</h4>
              <p className="text-xs text-[#4B5563]">
                Enter pickup and drop-off cities (e.g. Jeddah to Makkah or Madinah Ziyarat) and compare vetted companies side-by-side.
              </p>
            </div>

            <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E5E1D8] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h4 className="font-playfair font-bold text-sm text-[#111111]">Direct Contact</h4>
              <p className="text-xs text-[#4B5563]">
                Call or WhatsApp the transport company directly. Confirm flight details, child seat requirements, or luggage capacity without middlemen.
              </p>
            </div>

            <div className="p-4 bg-[#F7F6F2] rounded-xl border border-[#E5E1D8] space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h4 className="font-playfair font-bold text-sm text-[#111111]">Seamless Journey</h4>
              <p className="text-xs text-[#4B5563]">
                Your driver greets you at the terminal or hotel lobby with a sign, takes care of your luggage, and ensures comfortable travel.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#E6D28C] flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#C9A01B] shrink-0" />
            <div>
              <h5 className="font-bold text-xs text-[#111111]">100% Commercial Licensing Guarantee</h5>
              <p className="text-[11px] text-[#4B5563] mt-0.5">
                Every verified company holds a valid Saudi Ministry of Transport commercial registration (CR) and full passenger insurance.
              </p>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold shadow-xs"
            >
              Back to Marketplace
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
