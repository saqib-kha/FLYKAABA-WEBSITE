import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  ArrowRight, 
  Plus, 
  Minus, 
  ArrowLeft 
} from 'lucide-react';

interface RouteItem {
  id: string;
  fromCity: string;
  toCity: string;
  vehicleCount: number;
  startingPriceSar?: number;
  image: string;
}

interface RoutesPageViewProps {
  onGoHome: () => void;
  onBrowseAllVehicles: () => void;
  onSelectRoute: (fromCity: string, toCity: string) => void;
}

export const RoutesPageView: React.FC<RoutesPageViewProps> = ({
  onGoHome,
  onBrowseAllVehicles,
  onSelectRoute,
}) => {
  // Accordion state for FAQs (Screenshot Capture3.PNG & Capture4.PNG)
  const [openFaq, setOpenFaq] = useState<{ [index: number]: boolean }>({});

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // 11 Exact routes matching Screenshot Capture.PNG, Capture1.PNG, Capture2.PNG
  const routes: RouteItem[] = [
    {
      id: 'route-ruh-riyadh',
      fromCity: 'Riyadh Airport (RUH)',
      toCity: 'Riyadh',
      vehicleCount: 6,
      startingPriceSar: 290,
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-taif-makkah',
      fromCity: 'Taif',
      toCity: 'Makkah',
      vehicleCount: 5,
      startingPriceSar: 56,
      image: 'https://images.unsplash.com/photo-1565552684305-7e23f3630f5b?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-makkah-jeddah',
      fromCity: 'Makkah',
      toCity: 'Jeddah',
      vehicleCount: 4,
      startingPriceSar: 200,
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-makkah-madinah',
      fromCity: 'Makkah',
      toCity: 'Madinah',
      vehicleCount: 4,
      startingPriceSar: 650,
      image: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-jed-makkah',
      fromCity: 'Jeddah Airport (JED)',
      toCity: 'Makkah',
      vehicleCount: 3,
      startingPriceSar: 880,
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-jeddah-madinah',
      fromCity: 'Jeddah',
      toCity: 'Madinah',
      vehicleCount: 3,
      startingPriceSar: 1900,
      image: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-med-madinah',
      fromCity: 'Madinah Airport (MED)',
      toCity: 'Madinah',
      vehicleCount: 3,
      startingPriceSar: 150,
      image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-madinah-makkah',
      fromCity: 'Madinah',
      toCity: 'Makkah',
      vehicleCount: 3,
      startingPriceSar: 600,
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-riyadh-dammam',
      fromCity: 'Riyadh',
      toCity: 'Dammam',
      vehicleCount: 3,
      startingPriceSar: 1250,
      image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-makkah-dammam',
      fromCity: 'Makkah',
      toCity: 'Dammam',
      vehicleCount: 0,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80',
    },
    {
      id: 'route-makkah-med',
      fromCity: 'Makkah',
      toCity: 'Madinah Airport (MED)',
      vehicleCount: 0,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&auto=format&fit=crop&q=80',
    },
  ];

  // 4 FAQs matching Screenshot Capture3.PNG & Capture4.PNG
  const faqs = [
    {
      q: 'How is the price shown on a route calculated?',
      a: 'The price shown is the lowest starting rate from verified companies serving that specific route. It typically includes the vehicle, professional driver, fuel, highway toll passes (such as Makkah-Madinah expressway), and bottled water. The final price depends on the vehicle class (Sedan, Luxury SUV, Van, or Bus) selected.'
    },
    {
      q: 'Can I book a one-way trip, or only round trips?',
      a: 'You can book both one-way transfers (such as airport to hotel, or Makkah to Madinah) and round-trip transfers. For round trips, your chauffeur will coordinate return pickup timings directly with you.'
    },
    {
      q: "What if my route isn't listed?",
      a: "If your desired route isn't shown in our popular directory, you can use the main search bar on the homepage or reach out directly to any verified company to request a customized multi-city or Ziyarat itinerary."
    },
    {
      q: 'Who do I contact to confirm pickup details?',
      a: 'Once you submit a booking request on a route, a private direct chat opens between you and the transport company dispatch. You can share your flight number, gate arrival details, luggage count, and request child seats directly.'
    }
  ];

  return (
    <div className="w-full bg-white font-sans selection:bg-[#C9A01B]/20 pb-20">
      
      {/* 1. Header Banner & Breadcrumbs matching Screenshot Capture.PNG */}
      <div className="w-full bg-[#FAF7EE] border-b border-[#EAE5D9] pt-5 pb-10">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <div className="flex items-center justify-between mb-5">
            <nav className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <button
                onClick={onGoHome}
                className="flex items-center gap-1 hover:text-[#C9A01B] transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3 h-3 text-[#A0A5B1]" />
              <span className="font-semibold text-[#111111]">Routes</span>
            </nav>

            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B7280] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111111] tracking-tight mb-2">
            Routes
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl mb-6">
            Choose a route to see the vehicles that serve it, then book with a verified company.
          </p>

          {/* Browse all vehicles pill button */}
          <button
            onClick={onBrowseAllVehicles}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-white hover:bg-[#F0ECE1] text-[#111111] border border-[#D5D0C6] text-xs font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer"
          >
            Browse all vehicles
          </button>

        </div>
      </div>

      {/* 2. Routes 3-Column Grid matching Screenshot Capture.PNG, Capture1.PNG, Capture2.PNG */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route) => {
            const hasVehicles = route.vehicleCount > 0;

            return (
              <div
                key={route.id}
                onClick={() => onSelectRoute(route.fromCity, route.toCity)}
                className="group bg-white rounded-[20px] border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Route Image Container */}
                <div className="relative w-full h-[190px] sm:h-[200px] bg-neutral-100 overflow-hidden">
                  <img
                    src={route.image}
                    alt={`${route.fromCity} to ${route.toCity}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/src/assets/images/kaaba_makkah_hero_1792229406660.jpg';
                    }}
                  />
                </div>

                {/* Bottom Details Row */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  {/* Route Title with Arrow */}
                  <div className="mb-3">
                    <h2 className="font-playfair text-[#111111] text-[16px] sm:text-[17px] font-bold flex items-center gap-1.5 group-hover:text-[#C9A01B] transition-colors leading-snug">
                      <span>{route.fromCity}</span>
                      <span className="text-[#C9A01B]">→</span>
                      <span>{route.toCity}</span>
                    </h2>
                  </div>

                  {/* Route Vehicle Count & Price or "No vehicles yet" pill */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <div>
                      {hasVehicles ? (
                        <span className="text-[#6B7280]">
                          <strong className="font-semibold text-[#111111]">{route.vehicleCount} vehicles</strong> · From {route.startingPriceSar?.toLocaleString()} SAR
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280] text-[11px] font-medium">
                          No vehicles yet
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-semibold text-[#8B6D12] group-hover:text-[#C9A01B] inline-flex items-center gap-1 transition-colors select-none">
                      <span>View vehicles</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* 3. "How Route Booking Works" Card matching Screenshot Capture3.PNG */}
        <div className="mt-16 bg-white rounded-2xl border border-[#E5E1D8] p-7 sm:p-8 shadow-xs">
          <h2 className="font-playfair font-bold text-lg sm:text-xl text-[#111111] mb-2">
            How Route Booking Works
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Choose a route to see every verified company offering that trip, compare vehicle types and prices, then send a booking request directly to the company. There is no middleman and no hidden fees — you agree on payment with the company once your request is confirmed.
          </p>
        </div>

        {/* 4. "Routes — Frequently Asked Questions" matching Screenshot Capture3.PNG & Capture4.PNG */}
        <div className="mt-16 pt-4">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111111] text-center mb-8 tracking-tight">
            Routes — Frequently Asked Questions
          </h2>

          <div className="space-y-3.5 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = !!openFaq[idx];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-[18px] border border-[#E5E1D8] overflow-hidden shadow-xs hover:border-[#C9A01B]/50 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-playfair font-bold text-[15px] sm:text-base text-[#111111] hover:text-[#C9A01B] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF7EE] text-[#C9A01B] flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F5F2EA] pt-3 animate-in fade-in-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
