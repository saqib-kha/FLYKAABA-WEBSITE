import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Banknote, 
  Flag, 
  Search, 
  ShieldCheck, 
  Headphones, 
  Tag, 
  MapPin, 
  Car, 
  Plus, 
  Minus, 
  CheckCircle2,
  X
} from 'lucide-react';

interface HowItWorksPageViewProps {
  onGoHome: () => void;
  onBrowseVehicles: () => void;
  onOpenContact?: () => void;
}

export const HowItWorksPageView: React.FC<HowItWorksPageViewProps> = ({
  onGoHome,
  onBrowseVehicles,
}) => {
  // Accordion state for FAQs (Screenshot Capture5.PNG)
  const [openFaq, setOpenFaq] = useState<{ [index: number]: boolean }>({});

  // Contact us modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const scrollToVerification = () => {
    const elem = document.getElementById('our-verification-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setShowContactModal(false);
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 2200);
  };

  const faqs = [
    {
      q: 'Are all companies verified?',
      a: 'Yes, every transport company on FlyKaaba undergoes a rigorous vetting process. We verify commercial registration with the Saudi Transport General Authority (TGA), valid operating permits, commercial passenger liability insurance, and driver background checks before any listings can be published.'
    },
    {
      q: 'Are prices final?',
      a: 'Yes. The rates shown on FlyKaaba are completely transparent with no hidden platform fees or surprise airport surcharges. Any route tolls, fuel, and standard chauffeur service are clearly detailed on each vehicle listing.'
    },
    {
      q: 'Can I contact the company directly?',
      a: 'Yes. Once you submit a booking request or inquiry, a secure direct messaging chat is opened between you and the transport operator. You can coordinate flight arrival times, child seats, luggage space, and special route preferences.'
    },
    {
      q: 'How do I pay?',
      a: 'Payment options depend on your selected verified transport operator. Many operators offer cash on pickup, bank transfer, or secure online card payment. All available payment methods are clearly shown before you confirm your reservation.'
    },
    {
      q: 'Can I cancel a booking?',
      a: 'Most verified operators offer free cancellation up to 24 or 48 hours prior to your scheduled pickup time with a 100% full refund. Specific cancellation policies are displayed on each vehicle profile.'
    }
  ];

  return (
    <div className="w-full bg-white font-sans selection:bg-[#C9A01B]/20">
      {/* 2. Hero Section matching Screenshot Capture.PNG */}
      <section className="w-full bg-white py-14 sm:py-20 border-b border-[#F5F2EA]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 text-center">
          
          {/* Gold pill badge: • The trusted marketplace for vehicles */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B78822] text-white text-xs font-semibold shadow-xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>The trusted marketplace for vehicles</span>
          </div>

          {/* Main Title with Italic Gold "Trusted" matching Capture.PNG */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[58px] font-bold text-[#111111] leading-[1.12] tracking-tight mb-5 max-w-4xl mx-auto">
            Your Journey Deserves a{' '}
            <span className="italic text-[#C9A01B] font-serif font-bold">Trusted</span> Partner
          </h1>

          {/* Subtitle matching Capture.PNG */}
          <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed max-w-2xl mx-auto mb-9">
            Compare vehicles from verified transport companies, see clear prices and book with confidence — with a private chat for every booking.
          </p>

          {/* Two CTA Buttons matching Capture.PNG */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={onBrowseVehicles}
              className="px-8 py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-sm shadow-[0_2px_10px_rgba(201,160,27,0.3)] hover:shadow-[0_4px_14px_rgba(201,160,27,0.45)] transition-all cursor-pointer"
            >
              Browse vehicles
            </button>
            <button
              onClick={scrollToVerification}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-[#F9F7F2] text-[#111111] border border-[#D5D0C6] font-semibold text-sm shadow-xs transition-all cursor-pointer"
            >
              How verification works
            </button>
          </div>

        </div>
      </section>

      {/* 3. "THE PROBLEM" Section matching Screenshot Capture1.PNG */}
      <section className="w-full bg-white py-16 sm:py-20 border-b border-[#F0ECE1]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          <div className="mb-10 text-left">
            <span className="text-[#B78822] tracking-widest text-xs font-bold uppercase mb-2 block">
              THE PROBLEM
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[38px] font-bold text-[#111111] tracking-tight">
              Booking Transport Should Feel{' '}
              <span className="italic text-[#C9A01B] font-serif font-bold">Easy</span>, Not Stressful
            </h2>
          </div>

          {/* 4 Problem Cards matching Capture1.PNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Unverified operators */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5">
                <AlertTriangle className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Unverified operators
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                It is hard to know who is genuine and who is not.
              </p>
            </div>

            {/* Card 2: Unclear prices */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-5">
                <Banknote className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Unclear prices
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Quotes change and extra charges appear late.
              </p>
            </div>

            {/* Card 3: Broken promises */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-[#EA580C] flex items-center justify-center mb-5">
                <Flag className="w-6 h-6 text-[#EA580C]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Broken promises
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Cancellations and no-shows with no record of what was agreed.
              </p>
            </div>

            {/* Card 4: No easy way to compare */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center mb-5">
                <Search className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                No easy way to compare
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Calling around takes time and makes comparing almost impossible.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. "OUR VERIFICATION" Section matching Screenshot Capture2.PNG */}
      <section id="our-verification-section" className="w-full bg-[#F7F6F2] py-16 sm:py-20 border-b border-[#E5E1D8]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#B78822] tracking-widest text-xs font-bold uppercase mb-2 block">
              OUR VERIFICATION
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] tracking-tight mb-3">
              We <span className="italic text-[#C9A01B] font-serif font-bold">Verify</span> Every Company Before You Ever See Them
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Only companies that pass every step below can list vehicles.
            </p>
          </div>

          {/* 4 Verification Step Cards matching Capture2.PNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1: Registration */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                1
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Registration
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                The company registers and confirms its email.
              </p>
            </div>

            {/* Step 2: Document review */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                2
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Document review
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Licences and identity documents are uploaded and checked by our team.
              </p>
            </div>

            {/* Step 3: Approval */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                3
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Approval
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Only approved companies can add vehicles.
              </p>
            </div>

            {/* Step 4: Listing review */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                4
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Listing review
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Every vehicle listing is reviewed before it is published.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. "WHY CUSTOMERS CHOOSE US" Section matching Screenshot Capture3.PNG */}
      <section className="w-full bg-white py-16 sm:py-20 border-b border-[#F0ECE1]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          <div className="mb-10 text-left">
            <span className="text-[#B78822] tracking-widest text-xs font-bold uppercase mb-2 block">
              WHY CUSTOMERS CHOOSE US
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[38px] font-bold text-[#111111] tracking-tight">
              Everything You Need for a{' '}
              <span className="italic text-[#C9A01B] font-serif font-bold">Smooth</span> Journey
            </h2>
          </div>

          {/* 6 Feature Cards in 2 rows of 3 matching Capture3.PNG */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Verified trust */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Verified trust
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Every company is reviewed and approved by our team.
              </p>
            </div>

            {/* Card 2: Chat with the company */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center mb-5">
                <Headphones className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Chat with the company
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                A private chat opens with every booking request.
              </p>
            </div>

            {/* Card 3: Transparent pricing */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] text-[#CA8A04] flex items-center justify-center mb-5">
                <Tag className="w-6 h-6 text-[#CA8A04]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Transparent pricing
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                See the daily price and route price up front.
              </p>
            </div>

            {/* Card 4: Compare real vehicles */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center mb-5">
                <Search className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Compare real vehicles
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Filter by city, dates, seats, transmission and more.
              </p>
            </div>

            {/* Card 5: Cities across the Kingdom */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6 text-[#0D9488]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Cities across the Kingdom
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Choose your pickup city and destination.
              </p>
            </div>

            {/* Card 6: Cars, vans and buses */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center mb-5">
                <Car className="w-6 h-6 text-[#E11D48]" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Cars, vans and buses
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Self-drive or with a driver — you choose.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. "GETTING STARTED" Section matching Screenshot Capture4.PNG */}
      <section className="w-full bg-[#F7F6F2] py-16 sm:py-20 border-b border-[#E5E1D8]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#B78822] tracking-widest text-xs font-bold uppercase mb-2 block">
              GETTING STARTED
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] tracking-tight">
              How to Find Your <span className="italic text-[#C9A01B] font-serif font-bold">Perfect</span> Vehicle
            </h2>
          </div>

          {/* 4 Numbered Steps matching Capture4.PNG */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1: Search */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                1
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Search
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Choose your pickup city, destination and dates.
              </p>
            </div>

            {/* Step 2: Compare */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                2
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Compare
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Look at vehicles, companies, ratings and prices.
              </p>
            </div>

            {/* Step 3: Book */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                3
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Book
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Send a booking request — the company accepts or declines.
              </p>
            </div>

            {/* Step 4: Travel */}
            <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-7 shadow-xs">
              <div className="w-9 h-9 rounded-full bg-[#B78822] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
                4
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                Travel
              </h3>
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                Agree pickup details in the chat and enjoy your trip.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. "Frequently Asked Questions" matching Screenshot Capture5.PNG */}
      <section className="w-full bg-white py-16 sm:py-20 border-b border-[#F0ECE1]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-10 tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = !!openFaq[idx];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-[18px] border border-[#E5E1D8] overflow-hidden shadow-xs hover:border-[#C9A01B]/50 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-playfair font-bold text-[15px] sm:text-base text-[#111111] hover:text-[#C9A01B] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className="w-7 h-7 rounded-full bg-[#FAF7EE] text-[#C9A01B] flex items-center justify-center shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#4B5563] leading-relaxed border-t border-[#F5F2EA] pt-4 animate-in fade-in-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. Dark CTA Banner matching Screenshot Capture6.PNG */}
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6">
          <div className="bg-[#111111] text-white rounded-[28px] sm:rounded-[36px] p-10 sm:p-16 text-center shadow-xl relative overflow-hidden">
            
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C9A01B]/15 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight mb-3 relative z-10 leading-tight">
              Your Journey <span className="italic text-[#C9A01B] font-serif font-bold">Begins</span> Here
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-md mx-auto mb-8 relative z-10">
              Find a vehicle from a verified company.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap relative z-10">
              <button
                onClick={onBrowseVehicles}
                className="px-8 py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-sm shadow-[0_2px_12px_rgba(201,160,27,0.4)] hover:shadow-[0_4px_16px_rgba(201,160,27,0.6)] transition-all cursor-pointer"
              >
                Browse vehicles
              </button>

              <button
                onClick={() => setShowContactModal(true)}
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm shadow-xs transition-all cursor-pointer"
              >
                Contact us
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTACT US MODAL ================= */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E1D8] relative animate-in fade-in-50">
            <button
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-playfair text-xl font-bold text-[#111111] mb-1">
              Contact FlyKaaba Support
            </h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Need assistance with vehicle verification, specialized itineraries, or agency support? Reach out 24/7.
            </p>

            {contactSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-playfair font-bold text-base text-gray-900">Message Received</h4>
                <p className="text-xs text-gray-600">
                  Our pilgrim support team will contact you shortly via email or phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Sara or Tariq"
                    className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Your Inquiry</label>
                  <textarea
                    required
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us what you need help with..."
                    className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
