import { 
  ShieldCheck, 
  Eye, 
  Users, 
  Layers, 
  Globe, 
  ArrowRight 
} from 'lucide-react';
import pilgrimClockTowerImg from '../assets/images/pilgrim_clock_tower_1792229407039.jpg';

interface WhyPilgrimsTrustSectionProps {
  onHowItWorksClick: () => void;
}

export const WhyPilgrimsTrustSection: React.FC<WhyPilgrimsTrustSectionProps> = ({ onHowItWorksClick }) => {
  const steps = [
    {
      id: 1,
      title: 'Verified Agencies Only',
      description: 'We carefully review and verify travel agencies before they can list Umrah or Hajj packages on FlyKaaba.',
      icon: ShieldCheck,
      iconBg: 'bg-[#DCFCE7]',
      iconColor: 'text-[#16A34A]',
    },
    {
      id: 2,
      title: 'Transparent Listings',
      description: "Pilgrims can compare package details, hotels, durations, and pricing clearly before contacting an agency. Hotel names, itinerary, transport, meals, everything is listed clearly so you know exactly what you're getting.",
      icon: Eye,
      iconBg: 'bg-[#DBEAFE]',
      iconColor: 'text-[#2563EB]',
    },
    {
      id: 3,
      title: 'Direct Contact With Agencies',
      description: 'FlyKaaba connects pilgrims directly with verified travel agencies. We do not act as a middleman or inflate pricing. No middlemen, no hidden fees.',
      icon: Users,
      iconBg: 'bg-[#FEF3C7]',
      iconColor: 'text-[#D97706]',
    },
    {
      id: 4,
      title: 'All Packages in One Platform',
      description: 'No need to visit multiple travel websites, compare hundreds of packages in one place.',
      icon: Layers,
      iconBg: 'bg-[#EDE9FE]',
      iconColor: 'text-[#7C3AED]',
    },
    {
      id: 5,
      title: 'Designed for Global Pilgrims',
      description: "Whether you're traveling from USA, UK, Pakistan, India, or anywhere else, we've got packages for every country.",
      icon: Globe,
      iconBg: 'bg-[#CCFBF1]',
      iconColor: 'text-[#0D9488]',
    },
  ];

  return (
    <section className="w-full bg-white border-b border-[#F0ECE1] overflow-hidden">
      {/* 2-Column Split: Left Full-Bleed Gold, Right White */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Full-Bleed Mustard/Gold Container matching Screenshots 4 & 5 */}
        <div className="bg-[#C9A01B] relative overflow-hidden py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:pl-12 lg:pr-14 flex justify-end">
          
          {/* Subtle Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '28px 28px',
            }}
          />

          <div className="w-full max-w-[530px] relative z-10 text-white">
            <h2 className="font-playfair text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight mb-4 tracking-tight">
              Why Pilgrims Trust FlyKaaba
            </h2>
            
            <p className="text-white/90 text-sm sm:text-[15px] leading-relaxed mb-6 font-normal">
              At FlyKaaba, we are dedicated to making your sacred journey smooth, comfortable, and spiritually fulfilling. With years of experience, we offer carefully crafted packages and personalized support.
            </p>

            {/* Photo of Pilgrim overlooking Makkah Clock Tower */}
            <div className="w-full h-[280px] sm:h-[330px] rounded-2xl overflow-hidden shadow-lg border border-white/20 bg-black/20">
              <img
                src={pilgrimClockTowerImg}
                alt="Pilgrim at Makkah Clock Tower"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Clean White Timeline matching Screenshots 4 & 5 */}
        <div className="bg-white py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:pl-14 lg:pr-12 flex justify-start items-center">
          <div className="w-full max-w-[540px]">
            
            <div className="relative space-y-7 pl-2 sm:pl-4">
              {/* Connecting vertical line */}
              <div className="absolute left-[26px] sm:left-[34px] top-6 bottom-6 w-0.5 bg-[#E5E1D8] -z-0" />

              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.id} className="relative z-10 flex items-start gap-4 sm:gap-5">
                    {/* Circle Icon */}
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${step.iconBg} flex items-center justify-center shrink-0 border border-white shadow-xs`}>
                      <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${step.iconColor}`} />
                    </div>

                    {/* Step Content */}
                    <div className="pt-0.5 flex-1">
                      <h3 className="font-playfair text-[#111111] text-[17px] sm:text-[19px] font-bold tracking-tight mb-1">
                        {step.title}
                      </h3>
                      <p className="text-[#4B5563] text-xs sm:text-[13.5px] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* How FlyKaaba Works CTA Button matching Screenshot 5 */}
            <div className="mt-8 pl-2 sm:pl-4">
              <button
                onClick={onHowItWorksClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold transition-all shadow-[0_2px_8px_rgba(201,160,27,0.3)] hover:shadow-[0_4px_12px_rgba(201,160,27,0.45)] cursor-pointer"
              >
                <span>How FlyKaaba Works</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
