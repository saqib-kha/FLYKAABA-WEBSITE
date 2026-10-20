import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Heart,
  Globe,
  Lightbulb,
  TrendingUp,
  Car,
  MapPin,
  CreditCard,
  Sparkles,
  User,
} from 'lucide-react';

interface AboutUsPageViewProps {
  onGoHome?: () => void;
  onExploreVehicles?: () => void;
  onBrowseVehicles?: () => void;
  onListCompany?: () => void;
  onRegisterCompany?: () => void;
  onContactUs?: () => void;
}

export const AboutUsPageView: React.FC<AboutUsPageViewProps> = ({
  onExploreVehicles,
  onBrowseVehicles,
  onListCompany,
  onRegisterCompany,
}) => {
  const handleBrowseVehicles = onBrowseVehicles || onExploreVehicles;
  const handleListCompany = onListCompany || onRegisterCompany;

  const coreValues = [
    {
      num: '01',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Trust',
      description: 'Customers trust us with their plans. We protect that trust in every decision.',
    },
    {
      num: '02',
      icon: CheckCircle2,
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Verification without exception',
      description: 'No company is listed without passing the full verification process.',
    },
    {
      num: '03',
      icon: Heart,
      iconBg: 'bg-amber-50 text-[#C9A01B]',
      title: 'Honest partners',
      description: 'We help honest transport companies stand out and be rewarded for their integrity.',
    },
    {
      num: '04',
      icon: Globe,
      iconBg: 'bg-purple-50 text-purple-600',
      title: 'Serving every traveller',
      description: 'Residents, pilgrims and visitors all deserve dependable transport.',
    },
    {
      num: '05',
      icon: Lightbulb,
      iconBg: 'bg-teal-50 text-teal-600',
      title: 'Technology for good',
      description: 'We use technology to make booking simpler, safer and more transparent.',
    },
    {
      num: '06',
      icon: TrendingUp,
      iconBg: 'bg-rose-50 text-rose-600',
      title: 'Continuous improvement',
      description: 'We listen, measure and keep improving the marketplace.',
    },
  ];

  const roadmapItems = [
    {
      icon: Car,
      iconBg: 'bg-emerald-50 text-emerald-600',
      badge: 'Live',
      badgeClass: 'bg-emerald-50 text-emerald-700',
      title: 'Vehicle marketplace',
      description: 'Cars, vans and buses from verified companies, with or without a driver.',
    },
    {
      icon: MapPin,
      iconBg: 'bg-blue-50 text-blue-600',
      badge: 'Next',
      badgeClass: 'bg-amber-50 text-amber-700',
      title: 'More cities & routes',
      description: 'New pickup cities and popular routes across the Kingdom.',
    },
    {
      icon: CreditCard,
      iconBg: 'bg-amber-50 text-[#C9A01B]',
      badge: 'Soon',
      badgeClass: 'bg-orange-50 text-orange-700',
      title: 'Online payments',
      description: 'Secure card payments alongside offline payment.',
    },
    {
      icon: Sparkles,
      iconBg: 'bg-purple-50 text-purple-600',
      badge: 'Planned',
      badgeClass: 'bg-purple-50 text-purple-700',
      title: 'Extra services',
      description: 'More travel services from the same trusted marketplace.',
    },
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#111111] font-sans selection:bg-[#C9A01B]/20 min-h-screen">
      
      {/* 1. Full-width Split Hero Section exactly matching Capture.PNG */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 border-b border-[#EBE7DF]">
        
        {/* Left Dark Column with Checkerboard Pattern */}
        <div
          className="text-white px-8 sm:px-12 lg:px-20 py-16 sm:py-24 flex flex-col justify-between relative"
          style={{
            backgroundColor: '#0c0d10',
            backgroundImage:
              'conic-gradient(#15171c 90deg, #090a0c 90deg 180deg, #15171c 180deg 270deg, #090a0c 270deg)',
            backgroundSize: '48px 48px',
          }}
        >
          <div className="max-w-xl">
            {/* Gold bar + OUR STORY */}
            <div className="flex items-center gap-2.5 text-[#C9A01B] font-semibold text-xs tracking-widest uppercase mb-8">
              <span className="w-6 h-0.5 bg-[#C9A01B]" />
              <span>OUR STORY</span>
            </div>

            {/* Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-[54px] font-bold text-white leading-[1.12] mb-8 tracking-tight">
              Built on <span className="italic text-[#C9A01B]">Trust.</span> Driven<br className="hidden sm:inline" /> by Service.
            </h1>

            {/* Subtext */}
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg mb-12">
              We started with a simple belief — that booking a vehicle or a transfer in Saudi Arabia should feel safe, clear and easy for every traveller, resident and visitor.
            </p>
          </div>

          {/* Year Founded */}
          <div className="pt-8 border-t border-white/10 flex items-center gap-6 max-w-xl">
            <span className="font-playfair text-5xl sm:text-6xl font-bold text-[#C9A01B] tracking-tight">
              2026
            </span>
            <div>
              <div className="text-white font-bold text-sm sm:text-base">Year founded</div>
              <div className="text-white/60 text-xs sm:text-sm mt-0.5">
                Saudi Arabia • Vehicle & transport marketplace
              </div>
            </div>
          </div>
        </div>

        {/* Right Light Column */}
        <div className="bg-[#FAF9F6] text-[#111111] px-8 sm:px-12 lg:px-20 py-16 sm:py-24 flex flex-col justify-between">
          <div className="max-w-xl">
            <div className="text-[#C9A01B] font-semibold text-xs tracking-widest uppercase mb-8">
              OUR MISSION
            </div>

            <blockquote className="border-l-4 border-[#111111] pl-6 my-8">
              <h2 className="font-playfair text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111111] leading-[1.25]">
                &ldquo;To be the most trusted way to find and book vehicles and transport across Saudi Arabia.&rdquo;
              </h2>
            </blockquote>

            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed mb-8">
              We exist to protect customers, help honest transport companies grow, and make every journey start with confidence — not uncertainty.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-[#4B5563]">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-[2px] bg-[#C9A01B] shrink-0 mt-1.5" />
                <p>
                  <strong className="text-[#111111] font-bold">Trust first</strong> — Every company is verified before it can list a vehicle.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-[2px] bg-[#C9A01B] shrink-0 mt-1.5" />
                <p>
                  <strong className="text-[#111111] font-bold">Customer protection</strong> — Clear prices, clear dates and a private chat for every booking.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-[2px] bg-[#C9A01B] shrink-0 mt-1.5" />
                <p>
                  <strong className="text-[#111111] font-bold">Fair for companies</strong> — Honest companies get visibility and a simple way to manage bookings.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. The Story Behind Us matching Capture1_a128a345.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#C9A01B] uppercase block">
              THE STORY BEHIND US
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight">
              A Problem We <span className="italic text-[#C9A01B]">Couldn't Ignore</span>
            </h2>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              Finding a reliable vehicle used to mean phone calls, screenshots and hoping for the best. Prices changed, availability was unclear and it was hard to know which company to trust.
            </p>
            <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
              We built this marketplace to fix that: one place to compare verified companies, see real availability and book with a clear record of what was agreed.
            </p>

            <div className="p-5 bg-[#FAF6EC] border-l-4 border-[#C9A01B] rounded-r-xl">
              <p className="font-serif italic text-sm sm:text-base text-[#111111] leading-relaxed">
                &ldquo;Trust is not a feature we added. It is the reason this marketplace exists.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Dark Card with Milestones */}
          <div className="lg:col-span-5 bg-[#121417] text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-6">
            <p className="font-serif italic text-base sm:text-lg text-white/90 leading-relaxed">
              &ldquo;We want every booking — a short transfer or a long trip — to feel as simple and safe as it should be.&rdquo;
            </p>
            
            <div className="border-b border-white/10 pb-4">
              <div className="font-semibold text-sm text-white">Founder name</div>
              <div className="text-xs text-white/60">Founder, FlyKaaba</div>
            </div>

            <div className="space-y-4 pt-1">
              <div className="text-xs sm:text-sm">
                <span className="text-[#C9A01B] font-bold mr-2">2026</span>
                <strong className="text-white font-semibold">Marketplace launched</strong>
                <span className="text-white/70"> — Verified companies, real availability and booking chat.</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-[#C9A01B] font-bold mr-2">Next</span>
                <strong className="text-white font-semibold">More cities and routes</strong>
                <span className="text-white/70"> — Wider coverage across the Kingdom.</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-[#C9A01B] font-bold mr-2">Soon</span>
                <strong className="text-white font-semibold">Online payments</strong>
                <span className="text-white/70"> — Pay securely inside the marketplace.</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-[#C9A01B] font-bold mr-2">Future</span>
                <strong className="text-white font-semibold">Complete travel ecosystem</strong>
                <span className="text-white/70"> — More services for every journey.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Our Core Values matching Capture2_da2421c8.PNG & Capture3_26cf3f86.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 py-16 sm:py-20 border-t border-[#EBE7DF]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#C9A01B] uppercase block mb-2">
              WHAT WE STAND FOR
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#111111]">
              Our Core <span className="italic text-[#C9A01B]">Values</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563] max-w-md">
            These are not marketing words — they are how we make decisions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.num}
                className="bg-white rounded-2xl border border-[#EBE7DF] p-7 shadow-xs relative flex flex-col justify-between hover:border-[#C9A01B]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl ${val.iconBg} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-playfair text-3xl sm:text-4xl font-bold text-[#E5E0D5] select-none">
                      {val.num}
                    </span>
                  </div>
                  <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. A Small Team with a Big Mission matching Capture3_26cf3f86.PNG & Capture4_b30981d9.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 py-16 sm:py-20 border-t border-[#EBE7DF]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#111111] mb-4">
            A Small Team with a <span className="italic text-[#C9A01B]">Big Mission</span>
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
            We are a lean, passionate team united by a shared belief — that the Muslim American community deserves better when it comes to planning their most sacred journey.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#EBE7DF] overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
          
          {/* Founder Profile */}
          <div className="lg:col-span-5 bg-[#121417] p-8 sm:p-10 text-white flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-[#C9A01B]/40 flex items-center justify-center mb-4 text-[#C9A01B]">
              <User className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-xl text-white mb-1">Sagheer Uddin</h3>
            <p className="text-xs text-white/70 mb-5">Founder & CEO</p>

            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-white/90">
                Tech & Software
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-white/90">
                Entrepreneur
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-white/90">
                Travel Industry
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-white/90">
                Dallas, TX
              </span>
            </div>
          </div>

          {/* Bio Story */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <h4 className="font-playfair font-bold text-xl text-[#111111]">
                The Team Who Built FlyKaaba
              </h4>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                The team behind FlyKaaba is a tech entrepreneur, travel industry professional, and lifelong Muslim with deep roots in the American Muslim community. They bring together a rare combination of software expertise, business acumen, and an unshakeable personal connection to Islamic values.
              </p>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                Having witnessed firsthand the trust gap in the Hajj and Umrah travel market — pilgrims being misled, money lost, dreams broken — our team set out to build the platform we wished had existed. FlyKaaba is the product of that frustration, that faith, and that determination.
              </p>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                We carefully oversee the agency verification process and are directly reachable to every agent and pilgrim who reaches out. For us, FlyKaaba is not just a business — it is a contribution to the Ummah.
              </p>
            </div>

            <div className="border-t border-[#F0ECE1] pt-4 flex items-center justify-between">
              <span className="font-playfair italic font-bold text-base text-[#111111]">
                FlyKaaba
              </span>
              <span className="text-xs font-semibold text-[#C9A01B]">
                Dallas, Texas
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Our Roadmap matching Capture4_b30981d9.PNG & Capture5_1e312af4.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 py-16 sm:py-20 border-t border-[#EBE7DF]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#C9A01B] uppercase block mb-2">
              WHAT'S NEXT
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#111111]">
              Our <span className="italic text-[#C9A01B]">Roadmap</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4B5563]">
            Where the marketplace is heading.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EBE7DF] p-7 shadow-xs flex flex-col justify-between hover:border-[#C9A01B]/40 transition-colors"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                  <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Join the Community CTA matching Capture6_3f4ac4cc.PNG & Capture7_e5a7ec7e.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20 pt-4">
        <div className="bg-[#141518] rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden text-center shadow-lg">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C9A01B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#C9A01B]/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 relative z-10">
            Join the <span className="italic text-[#C9A01B]">Community</span>
          </h2>

          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 relative z-10">
            Whether you are booking a vehicle or running a transport company, you are welcome here.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              type="button"
              onClick={handleBrowseVehicles}
              className="px-7 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(201,160,27,0.4)] transition-colors cursor-pointer"
            >
              Browse vehicles
            </button>
            <button
              type="button"
              onClick={handleListCompany}
              className="px-7 py-3 rounded-full bg-transparent border border-white/25 hover:border-white/50 text-white font-medium text-sm transition-colors cursor-pointer"
            >
              List your company
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
