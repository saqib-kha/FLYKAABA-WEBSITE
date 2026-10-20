import React from 'react';
import { Clock, Eye, Star } from 'lucide-react';

interface HowVerificationWorksPageViewProps {
  onGoHome?: () => void;
  onRegisterCompany?: () => void;
  onListCompany?: () => void;
  onBrowseVehicles?: () => void;
  onExploreVehicles?: () => void;
}

export const HowVerificationWorksPageView: React.FC<HowVerificationWorksPageViewProps> = ({
  onRegisterCompany,
  onListCompany,
  onBrowseVehicles,
  onExploreVehicles,
}) => {
  const handleBrowseVehicles = onBrowseVehicles || onExploreVehicles;
  const handleListCompany = onListCompany || onRegisterCompany;

  const verificationSteps = [
    {
      num: '1',
      title: 'Registration & email check',
      description: 'The company registers and confirms its email with a one-time code.',
    },
    {
      num: '2',
      title: 'Documents',
      description: 'Licences and identity documents are uploaded — the list depends on whether it is a business or an individual.',
    },
    {
      num: '3',
      title: 'Manual review',
      description: 'Our team checks every document and approves or rejects it with a reason.',
    },
    {
      num: '4',
      title: 'Approval',
      description: 'Only approved companies can create vehicle listings.',
    },
    {
      num: '5',
      title: 'Listing review',
      description: 'Each vehicle listing is reviewed before it appears on the marketplace.',
    },
  ];

  const ongoingTrustFeatures = [
    {
      icon: Clock,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Expiry reminders',
      description: 'Companies are reminded before their documents expire.',
    },
    {
      icon: Eye,
      iconBg: 'bg-blue-50 text-blue-600',
      title: 'Profile changes are reviewed',
      description: 'Important changes to a company profile go back for approval.',
    },
    {
      icon: Star,
      iconBg: 'bg-amber-50 text-[#C9A01B]',
      title: 'Customer reviews',
      description: 'Only customers who completed a booking can leave a review.',
    },
  ];

  return (
    <div className="bg-[#F7F7F5] text-[#111111] font-sans selection:bg-[#C9A01B]/20 min-h-screen">
      
      {/* 1. Hero Section matching Capture_20335318.PNG */}
      <section className="px-6 pt-16 sm:pt-20 pb-16 sm:pb-20 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Badge: Verification */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B88722] text-white text-xs sm:text-sm font-semibold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            Verification
          </span>

          {/* Heading */}
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mt-6 sm:mt-8 text-balance text-[#111111]">
            No Company Is Listed Without Being <span className="italic text-[#C9A01B]">Verified</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl mx-auto text-pretty">
            Every company passes the same review before customers can see its vehicles. No exceptions.
          </p>

          {/* Action Button: Browse vehicles */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleBrowseVehicles}
              className="px-7 py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold shadow-[0_8px_20px_rgba(201,160,27,0.35)] transition-colors cursor-pointer"
            >
              Browse vehicles
            </button>
          </div>
        </div>
      </section>

      {/* 2. Process Section matching Capture1_e9bf8b6c.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 py-12 sm:py-16">
        <span className="text-xs font-bold tracking-widest text-[#B88722] uppercase block text-center mb-2">
          THE PROCESS
        </span>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12 sm:mb-14">
          Our <span className="italic text-[#C9A01B]">Verification</span> Process
        </h2>

        {/* 5 Process Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verificationSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl border border-[#EBE7DF] p-7 shadow-xs flex flex-col items-start hover:border-[#C9A01B]/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#C9A01B] text-white font-bold flex items-center justify-center text-sm mb-5 shadow-xs">
                {step.num}
              </div>
              <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Ongoing Trust Section matching Capture2_6b8ffdb8.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 py-12 sm:py-16">
        <span className="text-xs font-bold tracking-widest text-[#B88722] uppercase block text-left mb-2">
          ONGOING TRUST
        </span>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#111111] text-left mb-10">
          Verification <span className="italic text-[#C9A01B]">Doesn't Stop</span> at Approval
        </h2>

        {/* 3 Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ongoingTrustFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EBE7DF] p-7 shadow-xs flex flex-col items-start hover:border-[#C9A01B]/40 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-playfair font-bold text-lg text-[#111111] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Book With Confidence CTA matching Capture3_c09a17c6.PNG */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20 pt-4">
        <div className="bg-[#141518] rounded-3xl p-10 sm:p-14 text-white relative overflow-hidden text-center shadow-lg">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C9A01B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#C9A01B]/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 relative z-10">
            Book With <span className="italic text-[#C9A01B]">Confidence</span>
          </h2>
          
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 relative z-10">
            Every company you see has been verified by our team.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <button
              type="button"
              onClick={handleBrowseVehicles}
              className="px-7 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(201,160,27,0.4)] transition-colors cursor-pointer"
            >
              Search vehicles
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
