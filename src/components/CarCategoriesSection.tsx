import React, { useState, useEffect } from 'react';
import { CAR_CATEGORIES, gmcYukonImg } from '../data/mockData';

interface CarCategoriesSectionProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export const CarCategoriesSection: React.FC<CarCategoriesSectionProps> = ({ onSelectCategory }) => {
  useEffect(() => {
    try {
      localStorage.removeItem('flykaaba_category_images');
    } catch {}
  }, []);

  return (
    <section className="w-full bg-white py-14 sm:py-16 border-b border-[#F0ECE1]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading & Subtitle matching Screenshot 2 */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-[#111111] text-3xl sm:text-[34px] font-bold tracking-tight mb-2">
            Car Categories
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base font-normal font-sans">
            Choose the kind of vehicle that suits your journey.
          </p>
        </div>

        {/* 5 Category Cards in a Row on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.title)}
              className="group bg-white rounded-[14px] border border-[#E5E1D8] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-[#C9A01B]/60 transition-all duration-300 flex flex-col text-left focus:outline-none focus:ring-2 focus:ring-[#C9A01B]/40 cursor-pointer"
            >
              {/* Category Image */}
              <div className="relative w-full h-[145px] sm:h-[158px] bg-[#F7F6F2] overflow-hidden">
                <img
                  src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = gmcYukonImg;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Category Title Area */}
                <div className="p-3.5 sm:p-4 text-center bg-white flex-1 flex flex-col items-center justify-center border-t border-[#F0ECE1]">
                  <h3 className="font-playfair text-[#111111] text-[15px] sm:text-[16px] font-semibold group-hover:text-[#C9A01B] transition-colors">
                    {cat.title}
                  </h3>
                </div>
              </button>
          ))}
        </div>

      </div>
    </section>
  );
};
