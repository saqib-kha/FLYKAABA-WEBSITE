import React from 'react';
import { ShieldCheck, Eye, Headphones } from 'lucide-react';

interface BrandStoryPageViewProps {
  onGoHome?: () => void;
  onExploreVehicles?: () => void;
  onListCompany?: () => void;
  onAboutUs?: () => void;
  onHowVerificationWorks?: () => void;
}

export const BrandStoryPageView: React.FC<BrandStoryPageViewProps> = ({
  onExploreVehicles,
  onAboutUs,
  onHowVerificationWorks,
}) => {
  return (
    <div className="bg-[#F7F7F5] text-[#111111] font-sans selection:bg-[#C9A01B]/20">
      
      {/* 1. Hero Section matching Capture_6592c4d5.PNG */}
      <section className="px-6 pt-16 sm:pt-20 pb-20 sm:pb-24 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Badge: Our brand story */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B88722] text-white text-xs sm:text-sm font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            Our brand story
          </span>

          {/* Heading */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mt-6 sm:mt-8 text-balance text-[#111111]">
            A Name Built on <span className="italic text-[#C9A01B]">Trust</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl mx-auto text-pretty">
            Every brand starts with a reason. Ours is to make booking transport across Saudi Arabia dependable for everyone.
          </p>

          {/* Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onAboutUs}
              className="px-7 py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold shadow-[0_8px_20px_rgba(201,160,27,0.35)] transition-colors cursor-pointer"
            >
              About us
            </button>
            <button
              type="button"
              onClick={onHowVerificationWorks}
              className="px-7 py-3.5 rounded-full bg-white border border-gray-200 hover:border-[#C9A01B] text-[#111111] text-sm font-semibold transition-colors cursor-pointer"
            >
              How verification works
            </button>
          </div>

        </div>
      </section>

      {/* 2. Why We Exist Section matching Capture_6592c4d5.PNG & Capture1_3fbac937.PNG */}
      <section className="px-6 pb-20">
        <div className="max-w-[1140px] mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A01B]">
            WHY WE EXIST
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mt-2 text-[#111111]">
            The <span className="italic text-[#C9A01B]">Idea</span> Behind the Brand
          </h2>

          <p className="mt-6 text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-4xl">
            Write the story of your brand here: how the idea started, what problem you saw and the promise you make to customers and partner companies.
          </p>

          {/* Quote Callout Box */}
          <div className="mt-8 p-6 sm:p-7 rounded-r-xl bg-[#FAF7EE] border-l-4 border-[#C9A01B]">
            <p className="font-playfair italic text-[#111111] text-base sm:text-lg leading-relaxed">
              “Our promise: clear prices, verified companies and a booking you can rely on.”
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Promise Section matching Capture1_3fbac937.PNG */}
      <section className="px-6 pb-24">
        <div className="max-w-[1140px] mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A01B]">
            THE PROMISE
          </p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mt-2 text-[#111111]">
            What Our Brand <span className="italic text-[#C9A01B]">Promises</span>
          </h2>

          {/* 3 Promise Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            
            {/* Card 1: Verified companies */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-7">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#111111] mt-5">Verified companies</h3>
              <p className="text-[#6B7280] text-sm sm:text-[15px] leading-relaxed mt-2">
                Only approved companies can list vehicles.
              </p>
            </div>

            {/* Card 2: Transparent pricing */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-7">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <Eye className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#111111] mt-5">Transparent pricing</h3>
              <p className="text-[#6B7280] text-sm sm:text-[15px] leading-relaxed mt-2">
                You see the price before you send a request.
              </p>
            </div>

            {/* Card 3: Direct communication */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-7">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Headphones className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#111111] mt-5">Direct communication</h3>
              <p className="text-[#6B7280] text-sm sm:text-[15px] leading-relaxed mt-2">
                Chat with the company about every booking.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Ready to Book Section matching Capture2_80172e0d.PNG */}
      <section className="bg-[#FDFCFB] px-6 py-16 sm:py-20">
        <div className="max-w-[1140px] mx-auto relative overflow-hidden rounded-[32px] bg-[#111316] px-6 py-20 text-center">
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C9A01B]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-white">
              Ready to <span className="italic text-[#C9A01B]">Book</span>?
            </h2>
            <p className="text-white/70 mt-5 text-base">
              Find a vehicle from a verified company today.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onExploreVehicles}
                className="px-7 py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold shadow-[0_8px_24px_rgba(201,160,27,0.35)] transition-colors cursor-pointer"
              >
                Search vehicles
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
