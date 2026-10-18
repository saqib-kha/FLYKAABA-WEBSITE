import React, { useState } from 'react';
import { Home, ChevronRight, Settings, Users, ChevronDown, ChevronUp, Plus, Minus, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Vehicle, TravelAgency } from '../data/mockData';

interface MakkahZiyaratPageViewProps {
  onGoHome: () => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onSelectAgency?: (agency: TravelAgency) => void;
  allAgencies?: TravelAgency[];
  allVehicles?: Vehicle[];
}

export const MakkahZiyaratPageView: React.FC<MakkahZiyaratPageViewProps> = ({
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

  // 4 Main pilgrimage visit sites matching Screenshot 1 & 2
  const pilgrimageSites = [
    {
      id: 'masjid-al-haram',
      title: 'Masjid al-Haram',
      description: 'The Sacred Mosque and the Kaaba — the heart of Umrah and Hajj.',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'jabal-al-noor',
      title: 'Jabal al-Noor & Cave Hira',
      description: 'The mountain and cave where the first revelation was received.',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'jabal-thawr',
      title: 'Jabal Thawr',
      description: 'The cave where the Prophet ﷺ and Abu Bakr (RA) took refuge during the Hijrah.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'mina-arafat',
      title: 'Mina, Arafat & Muzdalifah',
      description: 'The sacred sites of Hajj, visited by many pilgrims throughout the year.',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // Verified Ziyarat Fleet matching Screenshot 2 & 3
  const ziyaratVehicles = [
    {
      id: 'makkah-camry-2023',
      name: 'Toyota Camry 2023',
      category: 'SEDAN',
      companyId: 'agency-5',
      companyName: 'Al Haramain Ride Co',
      companyCode: 'AH',
      transmission: 'Automatic',
      seats: 4,
      priceSar: 400,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80',
      description: 'Comfortable air-conditioned executive sedan with professional chauffeur for private family Ziyarat in Makkah.',
      features: [
        'Door-to-door hotel pickup & return in Makkah',
        'Includes Cave of Hira, Jabal Thawr, Mina & Arafat',
        'Chauffeur waits at each site for contemplation & prayers',
        'Cold bottled water and phone charging cables included',
        'Full flexible duration: approx 3 - 4 hours',
      ],
    },
    {
      id: 'makkah-staria-2023',
      name: 'Hyundai Staria 2023',
      category: 'VAN',
      companyId: 'agency-5',
      companyName: 'Al Haramain Ride Co',
      companyCode: 'AH',
      transmission: 'Automatic',
      seats: 9,
      priceSar: 550,
      isDemoVan: true,
      image: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?w=800&auto=format&fit=crop&q=80',
      description: 'Spacious 9-seater modern family van with panoramic windows and dual high-output AC for maximum desert comfort.',
      features: [
        'Dedicated 9-seat capacity for medium family pilgrimage groups',
        'Includes visits to all Makkah historic and Hajj ritual stations',
        'Spacious legroom and large trunk space for luggage and strollers',
        'Licensed local chauffeur with deep historical site knowledge',
        'Complimentary ice-cold mineral water & tissue boxes',
      ],
    },
    {
      id: 'makkah-hiace-2022',
      name: 'Toyota Hiace 2022',
      category: 'VAN',
      companyId: 'agency-5',
      companyName: 'Al Haramain Ride Co',
      companyCode: 'AH',
      transmission: 'Automatic',
      seats: 13,
      priceSar: 700,
      isDemoVan: true,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      description: 'High-capacity 13-seater passenger van designed for larger families, Umrah groups, and shared delegation tours.',
      features: [
        'Accommodates up to 13 passengers with air-conditioned roof vents',
        'Complete itinerary: Jabal al-Noor, Thawr, Mina, Muzdalifah, Mount Arafat',
        'Chauffeur coordination with hotel bell desk for swift pickup',
        'Safe, reliable commercial operator with full MOT licensing',
        'Flexible schedule: spend up to 4 - 5 hours across all destinations',
      ],
    },
  ];

  // Frequently Asked Questions matching Screenshot 4 & 5
  const faqs = [
    {
      question: 'How do I know a travel agency is verified?',
      answer:
        'All verified transport operators on FlyKaaba hold active commercial passenger licenses issued by the Saudi Ministry of Transport and General Authority of Civil Aviation. We personally inspect fleet registration records, comprehensive passenger insurance policies, and professional chauffeur permits so you can travel with complete peace of mind.',
    },
    {
      question: 'Can I book transport for just myself, or does it need a group?',
      answer:
        'You can book private transport for any party size — whether you are a solo pilgrim, a couple, or a large family group. When you book on FlyKaaba, the vehicle is 100% private to you with no outside passengers sharing your ride.',
    },
    {
      question: 'How far in advance should I book for Ziyarat in Makkah?',
      answer:
        'During standard pilgrimage periods, reserving 1 to 2 days in advance is ideal. However, during the holy month of Ramadan and peak Hajj periods, we strongly advise booking at least 1 to 2 weeks ahead to secure your preferred vehicle model and departure time.',
    },
    {
      question: 'Is payment handled through FlyKaaba?',
      answer:
        'FlyKaaba allows you to lock in guaranteed fixed prices upfront. Depending on your preference and the verified agency’s terms, payment can be completed securely online or paid directly to the chauffeur upon hotel arrival.',
    },
    {
      question: 'Can my driver take me to multiple sites in one trip?',
      answer:
        'Yes, absolutely! Every Makkah Ziyarat package includes a comprehensive circuit covering the foremost sacred sites: Jabal al-Noor (Cave of Hira), Jabal Thawr, Mina, Muzdalifah, and Jabal al-Rahmah at Mount Arafat. The chauffeur waits patiently at each stop while you pray, contemplate, and take photos.',
    },
  ];

  const handleBookNow = (veh: typeof ziyaratVehicles[0]) => {
    // Build a complete vehicle object compatible with the booking engine
    const bookingVeh: Vehicle = {
      id: veh.id,
      name: veh.name,
      make: veh.name.split(' ')[0],
      model: veh.name.split(' ').slice(1).join(' '),
      year: parseInt(veh.name.match(/\d{4}/)?.[0] || '2023', 10),
      category: veh.category === 'SEDAN' ? 'Economy Car' : 'Van',
      companyId: veh.companyId,
      companyName: veh.companyName,
      companyAvatar: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80',
      city: 'Makkah',
      passengerCapacity: veh.seats,
      luggageCapacity: veh.seats > 8 ? 8 : 4,
      transmission: veh.transmission as 'Automatic' | 'Manual',
      pricePerDay: veh.priceSar,
      currency: 'SAR',
      images: [veh.image],
      description: veh.description,
      amenities: ['Air Conditioning', 'Chauffeur Included', 'Bottled Water', 'Ziyarat Tour Circuit'],
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
            <span className="text-white font-semibold">Makkah</span>
          </nav>

          {/* Centered Title & Description */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Ziyarat in Makkah
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Visit the blessed sites of Makkah with a comfortable, verified vehicle — with or without a driver.
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
                {/* Photo */}
                <div className="h-44 w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={site.image}
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
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
                    
                    {/* Left: Image or Illustrated Demo Van */}
                    <div className="w-full md:w-72 lg:w-80 h-48 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 relative bg-[#1E2024]">
                      {veh.isDemoVan ? (
                        /* Styled Illustrated Demo Van Card matching Screenshot 2 & 3 */
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 relative bg-gradient-to-br from-[#1E2024] to-[#121316] select-none">
                          {/* Badges Header */}
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

                          {/* Van Graphic */}
                          <div className="w-48 h-24 bg-[#EBECEF] rounded-2xl relative shadow-md flex items-center justify-center border-2 border-white/60">
                            <div className="flex gap-2">
                              <div className="w-9 h-7 bg-[#C5CAD3] rounded-sm"></div>
                              <div className="w-9 h-7 bg-[#C5CAD3] rounded-sm"></div>
                              <div className="w-9 h-7 bg-[#C5CAD3] rounded-sm"></div>
                            </div>
                            {/* Wheels */}
                            <div className="absolute -bottom-2 left-6 w-6 h-6 bg-black rounded-full border-2 border-gray-400"></div>
                            <div className="absolute -bottom-2 right-6 w-6 h-6 bg-black rounded-full border-2 border-gray-400"></div>
                          </div>

                          <div className="text-[11px] font-medium text-white/80 mt-3">
                            {veh.name}
                          </div>

                          {/* Arrows */}
                          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center text-xs">
                            ‹
                          </div>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center text-xs">
                            ›
                          </div>
                        </div>
                      ) : (
                        <img
                          src={veh.image}
                          alt={veh.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Middle: Vehicle details */}
                    <div className="flex-1 space-y-2.5">
                      <div className="text-xs font-bold text-[#C9A01B] tracking-wider uppercase">
                        {veh.category}
                      </div>

                      <h3 className="text-xl font-bold text-[#111111]">
                        {veh.name}
                      </h3>

                      {/* Agency with AH Badge */}
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
                        Included in this Makkah Ziyarat Tour
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

        {/* 4. Making the Most of Your Makkah Ziyarat matching Screenshot 3 & 4 */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-[#E5E1D8] p-6 sm:p-8 md:p-10 shadow-xs">
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111111] mb-6">
            Making the Most of Your Makkah Ziyarat
          </h2>

          <div className="space-y-4 text-sm sm:text-[15px] text-[#4B5563] leading-relaxed">
            <p>
              Makkah's Ziyarat sites are spread across the city and its surrounding valleys, from Jabal al-Noor on the outskirts to Jabal Thawr south of the Haram, so most pilgrims find it far easier to move between them by car than on foot, especially in the heat. A private vehicle also means you're not tied to a fixed group schedule — you can spend as long as you like at each site and skip the ones that don't interest you.
            </p>

            <p>
              Because demand for transport rises sharply during Ramadan, Hajj and other peak periods, it helps to send your booking request a day or two ahead rather than on the morning you want to travel. Outside those busy weeks, same-day bookings are usually straightforward. Whichever company you choose, confirm the stops, the waiting time at each site and the total price before your trip begins, so there are no surprises once you're on the road.
            </p>

            <p>
              Group size is worth planning around too — a private car suits a couple or a small family, while larger groups travelling together often do better with a van or small bus, both listed alongside the standard cars on this page. Every vehicle shown here comes with an air-conditioned cabin and an included driver, so there's nothing extra to arrange once you've picked one and sent a request.
            </p>
          </div>
        </section>

        {/* 5. Frequently Asked Questions matching Screenshot 4 & 5 */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">
              Makkah Ziyarat — Frequently Asked Questions
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
