import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-14 sm:py-16 border-b border-[#F0ECE1]">
      <div className="max-w-[760px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading matching Screenshot 6 */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-[#111111] text-3xl sm:text-[34px] font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* 4 Accordion Cards matching Screenshot 6 */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-[14px] border border-[#E5E1D8] overflow-hidden transition-all duration-200 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] sm:text-[16px] font-medium text-[#111111]">
                    {item.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF7F0] flex items-center justify-center shrink-0 ml-3 text-[#C9A01B]">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F5F2EA] animate-in fade-in-50 duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
