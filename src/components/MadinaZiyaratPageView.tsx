import React, { useState } from 'react';
import { Home, ChevronRight, Settings, Users, ChevronDown, ChevronUp, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { Vehicle, TravelAgency } from '../data/mockData';

interface MadinaZiyaratPageViewProps {
  onGoHome: () => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onSelectAgency?: (agency: TravelAgency) => void;
  allAgencies?: TravelAgency[];
  allVehicles?: Vehicle[];
}

export const MadinaZiyaratPageView: React.FC<MadinaZiyaratPageViewProps> = ({
  onGoHome,
  onBookVehicle,
  onSelectVehicle,
  onSelectAgency,
  allAgencies = [],
  allVehicles = [],
}) => {
  // Accordion state for vehicle details
  const [expandedVehicle, setExpandedVehicle] = useState<string | null>(null);

  // Accordion state for FAQ questions
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Scroll smoothly to available vehicles
  const scrollToVehicles = () => {
    const section = document.getElementById('available-vehicles');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 5 Main pilgrimage visit sites in Madina matching Screenshot 1 & 2
  const pilgrimageSites = [
    {
      id: 'masjid-an-nabawi',
      title: 'Masjid an-Nabawi',
      description: "The Prophet's Mosque and the blessed Rawdah.",
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'quba-mosque',
      title: 'Quba Mosque',
      description: 'The first mosque built in Islam.',
      image: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'masjid-al-qiblatayn',
      title: 'Masjid al-Qiblatayn',
      description: 'The mosque of the two Qiblas.',
      imagePlaceholderLetter: 'M',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'mount-uhud',
      title: 'Mount Uhud',
      description: "The site of the Battle of Uhud and the martyrs' cemetery.",
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'jannat-al-baqi',
      title: 'Jannat al-Baqi',
      description: 'The historic cemetery beside Masjid an-Nabawi.',
      imagePlaceholderLetter: 'J',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // Verified Ziyarat Fleet matching Screenshot 2 & 3
  const ziyaratVehicles = [
    {
      id: 'madina-hiace-2023',
      name: 'Toyota Hiace 2023',
      category: 'VAN',
      companyId: 'agency-9',
      companyName: 'Madinah Pilgrim Fleet',
      companyCode: 'MP',
      transmission: 'Automatic',
      seats: 13,
      priceSar: 600,
      vehicleType: 'van-yellow',
      description: 'High-capacity 13-passenger van tailored for larger families and group pilgrimage tours across Madinah.',
      features: [
        'Round-trip hotel pickup and return in Madinah',
        'Includes Quba Mosque, Mount Uhud, Martyrs Cemetery & Qiblatayn',
        'Dedicated chauffeur waits patiently at all sacred locations',
        'High-capacity roof AC vents and rear passenger cooling',
        'Generous luggage and stroller space',
        'Tour duration: approx 3.5 - 4.5 hours with full flexibility',
      ],
    },
    {
      id: 'madina-staria-2022',
      name: 'Hyundai Staria 2022',
      category: 'VAN',
      companyId: 'agency-9',
      companyName: 'Madinah Pilgrim Fleet',
      companyCode: 'MP',
      transmission: 'Automatic',
      seats: 9,
      priceSar: 550,
      vehicleType: 'van-silver',
      description: 'Modern 9-seater executive family van with comfortable captain seating, panoramic views, and dual climate control.',
      features: [
        '9 comfortable passenger seats with plush headrests',
        'Visit Quba, Mount Uhud, Masjid al-Qiblatayn & Khandaq (Seven Mosques)',
        'Experienced driver familiar with prayer hours and gate entrances',
        'Chilled bottled mineral water and mobile phone chargers onboard',
        'Flexible tour schedule tailored to your family pace',
      ],
    },
    {
      id: 'madina-camry-2022',
      name: 'Toyota Camry 2022',
      category: 'SEDAN',
      companyId: 'agency-9',
      companyName: 'Madinah Pilgrim Fleet',
      companyCode: 'MP',
      transmission: 'Automatic',
      seats: 4,
      priceSar: 350,
      vehicleType: 'sedan-white',
      description: 'Quiet, air-conditioned private executive sedan ideal for solo pilgrims, couples, and small families.',
      features: [
        'Private 4-passenger sedan (100% private, no shared passengers)',
        'Door-to-door hotel service in Madinah',
        'Covers all essential historic and sacred landmarks in comfort',
        'Free waiting time at Quba for two rakaat sunnah prayer',
        'Professional licensed Saudi chauffeur',
      ],
    },
  ];

  // Frequently Asked Questions matching Screenshot 4 & 5
  const faqs = [
    {
      question: 'What sites can I visit on a Madinah Ziyarat trip?',
      answer:
        "A typical Madinah Ziyarat tour includes Masjid Quba (where praying two rakaat holds the reward of an Umrah), Mount Uhud and the Archers' Hill (Jabal al-Rumat), the Martyrs' Cemetery (resting place of Sayyidna Hamza and companion martyrs), Masjid al-Qiblatayn (the mosque where the direction of prayer shifted), and the Seven Mosques at the Battle of the Trench (Khandaq). Your driver coordinates timing smoothly around daily prayers.",
    },
    {
      question: 'Do I need to book a return trip separately?',
      answer:
        'No. Every Ziyarat booking on FlyKaaba is a complete round-trip service. Your private vehicle and dedicated chauffeur will pick you up directly from your Madinah hotel, wait while you explore and pray at each landmark, and return you safely to your hotel when the tour concludes.',
    },
    {
      question: 'How do I know the price before booking?',
      answer:
        'All prices on FlyKaaba are completely fixed and transparent before you confirm. The rate displayed — 350 SAR for a Sedan, 550 SAR for a Staria, or 600 SAR for a 13-seat Hiace — is the total comprehensive fee covering the vehicle, professional driver, fuel, and landmark parking with zero unexpected surcharges.',
    },
    {
      question: 'Are the vehicles suitable for families or large groups?',
      answer:
        'Yes! We have vehicles customized for every group size: private executive sedans for couples and small families (4 seats), modern 9-seater MPVs (Hyundai Staria) for medium families, and 13-to-15 seater passenger vans (Toyota Hiace) with high-output air conditioning and spacious luggage room for strollers, wheelchairs, and family belongings.',
    },
    {
      question: 'What happens after I send a booking request?',
      answer:
        "Once your booking is submitted, you will receive an immediate confirmation with your trip reference. The verified transport provider assigns your licensed chauffeur and sends their name, phone number, and vehicle license plate directly via WhatsApp and SMS so you can coordinate with ease.",
    },
  ];

  const handleBookNow = (veh: typeof ziyaratVehicles[0]) => {
    const bookingVeh: Vehicle = {
      id: veh.id,
      name: veh.name,
      make: veh.name.split(' ')[0],
      model: veh.name.split(' ').slice(1).join(' '),
      year: parseInt(veh.name.match(/\d{4}/)?.[0] || '2022', 10),
      category: veh.category === 'SEDAN' ? 'Economy Car' : 'Van',
      companyId: veh.companyId,
      companyName: veh.companyName,
      companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
      city: 'Madinah',
      passengerCapacity: veh.seats,
      luggageCapacity: veh.seats > 8 ? 8 : 4,
      transmission: veh.transmission as 'Automatic' | 'Manual',
      pricePerDay: veh.priceSar,
      currency: 'SAR',
      images: ['https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80'],
      description: veh.description,
      amenities: ['Air Conditioning', 'Chauffeur Included', 'Bottled Water', 'Madinah Ziyarat Circuit'],
      isAvailable: true,
    };

    onBookVehicle(bookingVeh);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      
      {/* 1. Hero Banner matching Screenshot 1 */}
      <section className="bg-[#18181B] text-white pt-8 pb-14 px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-8">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <button
              onClick={onGoHome}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Ziyarat
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-white font-semibold">Madinah</span>
          </nav>

          {/* Centered Title & Description */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Ziyarat in Madina
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Visit the blessed sites of Madina with a comfortable, verified vehicle — with or without a driver.
            </p>

            {/* CTA Button */}
            <div className="pt-3">
              <button
                onClick={scrollToVehicles}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold transition-all shadow-[0_4px_12px_rgba(201,160,27,0.35)] cursor-pointer"
              >
                Find a vehicle
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-12 space-y-16">
        
        {/* 2. Places pilgrims commonly visit matching Screenshot 1 & 2 */}
        <section>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111111] mb-6">
            Places pilgrims commonly visit
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pilgrimageSites.map((site) => (
              <div
                key={site.id}
                className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Photo or Letter Card */}
                <div className="h-44 w-full overflow-hidden bg-[#FBF7EE] relative flex items-center justify-center">
                  {site.imagePlaceholderLetter ? (
                    <div className="w-full h-full bg-[#FBF7EE] flex items-center justify-center">
                      <span className="font-playfair text-5xl font-bold text-[#C9A01B]/80">
                        {site.imagePlaceholderLetter}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={site.image}
                      alt={site.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                </div>

                {/* Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-semibold text-base text-[#111111] mb-1.5 group-hover:text-[#C9A01B] transition-colors">
                      {site.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed line-clamp-3">
                      {site.description}
                    </p>
                  </div>

                  <button
                    onClick={scrollToVehicles}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C9A01B] hover:text-[#b89115] transition-colors cursor-pointer text-left pt-2"
                  >
                    <span>Find a vehicle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Available Vehicles for Ziyarat matching Screenshot 2 & 3 */}
        <section id="available-vehicles" className="scroll-mt-24 space-y-5">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111111]">
            Available Vehicles for Ziyarat
          </h2>

          <div className="space-y-4">
            {ziyaratVehicles.map((veh) => {
              const isExpanded = expandedVehicle === veh.id;

              return (
                <div
                  key={veh.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-[#E5E1D8] shadow-xs hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Left: Illustrated Demo Vehicle matching Screenshot 2 & 3 */}
                    <div className="w-full md:w-72 lg:w-80 h-48 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 relative bg-[#1E2024] select-none">
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 relative bg-gradient-to-br from-[#1E2024] to-[#121316]">
                        {/* Header Badges */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#C9A01B] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
                            DEMO PHOTO
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 text-white/70 hover:text-white cursor-pointer">
                          <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-[10px]">
                            ||
                          </div>
                        </div>

                        {/* Graphic based on vehicle type */}
                        {veh.vehicleType === 'van-yellow' ? (
                          /* Yellow / Gold Toyota Hiace Van */
                          <div className="w-48 h-24 bg-[#E0B940] rounded-2xl relative shadow-md flex items-center justify-center border-2 border-white/60">
                            <div className="flex gap-2">
                              <div className="w-9 h-7 bg-[#2E3138] rounded-sm"></div>
                              <div className="w-9 h-7 bg-[#2E3138] rounded-sm"></div>
                              <div className="w-9 h-7 bg-[#2E3138] rounded-sm"></div>
                            </div>
                            <div className="absolute -bottom-2 left-6 w-6 h-6 bg-black rounded-full border-2 border-gray-400"></div>
                            <div className="absolute -bottom-2 right-6 w-6 h-6 bg-black rounded-full border-2 border-gray-400"></div>
                          </div>
                        ) : veh.vehicleType === 'van-silver' ? (
                          /* Modern Silver Hyundai Staria Van */
                          <div className="w-48 h-24 bg-[#EBECEF] rounded-2xl relative shadow-md flex items-center justify-center border-2 border-white/60">
                            <div className="flex gap-2">
                              <div className="w-9 h-7 bg-[#C5CAD3] rounded-sm"></div>
                              <div className="w-9 h-7 bg-[#C5CAD3] rounded-sm"></div>
                              <div className="w-9 h-7 bg-[#C5CAD3] rounded-sm"></div>
                            </div>
                            <div className="absolute -bottom-2 left-6 w-6 h-6 bg-black rounded-full border-2 border-gray-400"></div>
                            <div className="absolute -bottom-2 right-6 w-6 h-6 bg-black rounded-full border-2 border-gray-400"></div>
                          </div>
                        ) : (
                          /* White Toyota Camry Sedan */
                          <div className="w-48 h-20 bg-[#F4F4F6] rounded-2xl relative shadow-md flex items-center justify-center border-2 border-white/60">
                            <div className="flex gap-2">
                              <div className="w-10 h-5 bg-[#C5CAD3] rounded-sm"></div>
                              <div className="w-10 h-5 bg-[#C5CAD3] rounded-sm"></div>
                            </div>
                            <div className="absolute -bottom-2 left-7 w-5 h-5 bg-black rounded-full border-2 border-gray-400"></div>
                            <div className="absolute -bottom-2 right-7 w-5 h-5 bg-black rounded-full border-2 border-gray-400"></div>
                          </div>
                        )}

                        <div className="text-[11px] font-medium text-white/80 mt-2">
                          {veh.category === 'VAN' ? 'Van' : 'Sedan'}
                        </div>

                        {/* Carousel Arrows */}
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center text-xs">
                          ‹
                        </div>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center text-xs">
                          ›
                        </div>
                      </div>
                    </div>

                    {/* Middle: Vehicle details */}
                    <div className="flex-1 space-y-2.5">
                      <div className="text-xs font-bold text-[#C9A01B] tracking-wider uppercase">
                        {veh.category}
                      </div>

                      <h3 className="text-xl font-bold text-[#111111]">
                        {veh.name}
                      </h3>

                      {/* Agency with MP Badge */}
                      <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                        <span className="w-5 h-5 rounded-full bg-[#F5E6B3] text-[#8C6D1F] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {veh.companyCode}
                        </span>
                        <span>by</span>
                        <span className="font-medium text-[#111111] hover:text-[#C9A01B] cursor-pointer">
                          {veh.companyName}
                        </span>
                      </div>

                      {/* Specs */}
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-[#6B7280] pt-1">
                        <span className="flex items-center gap-1.5">
                          <Settings className="w-4 h-4 text-[#C9A01B]" />
                          {veh.transmission}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#C9A01B]" />
                          {veh.seats} seats
                        </span>
                      </div>

                      {/* Expandable toggle */}
                      <div>
                        <button
                          onClick={() => setExpandedVehicle(isExpanded ? null : veh.id)}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#C9A01B] hover:text-[#b89115] transition-colors cursor-pointer pt-1"
                        >
                          <span>Features and price details</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right: Price & Book button */}
                    <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 shrink-0 gap-3">
                      <div className="text-left md:text-right">
                        <div className="text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums">
                          {veh.priceSar} SAR
                        </div>
                        <div className="text-xs text-[#6B7280]">
                          per trip
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookNow(veh)}
                        className="px-7 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer"
                      >
                        Book Now
                      </button>
                    </div>

                  </div>

                  {/* Expanded Features Drawer */}
                  {isExpanded && (
                    <div className="border-t border-[#F0ECE1] bg-[#FBF7EE]/40 p-5 sm:p-6 animate-in slide-in-from-top-1 duration-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
                        Included in this Madinah Ziyarat Tour
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#4B5563]">
                        {veh.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#C9A01B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Visiting Madinah's Historic Sites matching Screenshot 3 & 4 */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-[#E5E1D8] p-6 sm:p-8 md:p-10 shadow-xs">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111111] mb-6">
            Visiting Madinah's Historic Sites
          </h2>

          <div className="space-y-4 text-sm sm:text-[15px] text-[#4B5563] leading-relaxed">
            <p>
              Madinah's most-visited sites — Masjid an-Nabawi, Quba Mosque, Masjid al-Qiblatayn, Mount Uhud and Jannat al-Baqi — are spread across the city rather than clustered in one place, which is why most pilgrims arrange a car for the day rather than trying to walk between them. A vehicle also makes it easier to time your visit to Jannat al-Baqi or Mount Uhud around prayer times and opening hours, which can shift slightly through the week.
            </p>

            <p>
              If you're arriving through Madinah's airport, many companies can pick you up there directly and take you straight to your hotel before starting any Ziyarat stops, so you don't need to arrange separate transport for the airport leg. As with any trip, agree on the full list of stops and the price with the company before you set off, so everyone's clear on the plan for the day.
            </p>

            <p>
              Most hotels in Madinah sit within easy walking distance of Masjid an-Nabawi itself, so a vehicle isn't needed for the mosque — it's for reaching the sites further out, like Quba Mosque, Masjid al-Qiblatayn and Mount Uhud, which are a short drive rather than a walk. Group size works the same way as any trip here: a private car suits a couple or a small family, while a van or small bus — both listed on this page — fits larger groups travelling together, each with an included driver.
            </p>
          </div>
        </section>

        {/* 5. Frequently Asked Questions matching Screenshot 4 & 5 */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">
              Madinah Ziyarat — Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 pt-2">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#E5E1D8] shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FDFBF7] transition-colors"
                  >
                    <span className="font-semibold text-sm sm:text-base text-[#111111]">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#FBF7EE] text-[#C9A01B] flex items-center justify-center shrink-0 font-bold transition-transform">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F5F2EA] pt-3 animate-in fade-in-50 duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
