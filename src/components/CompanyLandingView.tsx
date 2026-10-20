import React from 'react';
import {
  Users,
  Tag,
  Clock,
  Headphones,
  LineChart,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

interface CompanyLandingViewProps {
  onRegisterCompany: () => void;
  onSeeHowItWorks: () => void;
}

const benefits: { icon: LucideIcon; title: string; text: string; tile: string; color: string }[] = [
  {
    icon: Users,
    title: 'Reach new customers',
    text: 'Be found by customers searching by city, route and dates.',
    tile: 'bg-emerald-100',
    color: 'text-emerald-600',
  },
  {
    icon: Tag,
    title: 'Set your own prices',
    text: 'Daily prices and route prices are yours to decide.',
    tile: 'bg-blue-100',
    color: 'text-blue-600',
  },
  {
    icon: Clock,
    title: 'Manage availability',
    text: 'Block dates for maintenance and see bookings on your calendar.',
    tile: 'bg-amber-100',
    color: 'text-orange-500',
  },
  {
    icon: Headphones,
    title: 'Chat with customers',
    text: 'Talk to customers about every booking, with photo attachments.',
    tile: 'bg-indigo-100',
    color: 'text-indigo-600',
  },
  {
    icon: LineChart,
    title: 'Track your earnings',
    text: 'See bookings and earnings on your dashboard.',
    tile: 'bg-teal-100',
    color: 'text-teal-600',
  },
  {
    icon: ShieldCheck,
    title: 'Verified badge',
    text: 'Approval by our team builds customer trust.',
    tile: 'bg-rose-100',
    color: 'text-rose-600',
  },
];

const steps = [
  { title: 'Register', text: 'Create your company account and confirm your email.' },
  { title: 'Upload documents', text: 'Submit the required licences and documents.' },
  { title: 'Get approved', text: 'Our team reviews your company — usually quickly.' },
  { title: 'Add vehicles', text: 'Create listings with photos, prices and routes.' },
  { title: 'Accept bookings', text: 'Accept requests and chat with customers.' },
];

export const CompanyLandingView: React.FC<CompanyLandingViewProps> = ({
  onRegisterCompany,
  onSeeHowItWorks,
}) => {
  return (
    <div className="bg-[#F7F7F5] text-[#111111]">
      <section className="px-6 pt-20 pb-24 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A01B] text-white text-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            For transport companies
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mt-8 text-balance">
            Reach More Customers With a{' '}
            <span className="italic text-[#C9A01B]">Trusted</span> Marketplace
          </h1>
          <p className="mt-6 text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl text-pretty">
            List your vehicles, set your own prices and manage bookings in one place — and stand out with a verified badge.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRegisterCompany}
              className="px-7 py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold shadow-[0_8px_20px_rgba(201,160,27,0.35)] transition-colors cursor-pointer"
            >
              List your company
            </button>
            <button
              type="button"
              onClick={onSeeHowItWorks}
              className="px-7 py-3.5 rounded-full bg-white border border-gray-200 hover:border-[#C9A01B] text-sm font-semibold transition-colors cursor-pointer"
            >
              How verification works
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-[1140px] mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A01B]">Why join</p>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold mt-2 mb-10">
            Everything You Need to <span className="italic text-[#C9A01B]">Grow</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, text, tile, color }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-7">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tile}`}>
                  <Icon className={`w-5 h-5 ${color}`} aria-hidden="true" />
                </div>
                <h3 className="font-playfair text-lg font-bold mt-5">{title}</h3>
                <p className="text-[#6B7280] text-[15px] leading-relaxed mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A01B]">Getting started</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold mt-3">
              How to Start Receiving <span className="italic text-[#C9A01B]">Bookings</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl shadow-sm p-7">
                <div className="w-11 h-11 rounded-full bg-[#C9A01B] text-white font-semibold flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="font-playfair text-lg font-bold mt-6">{step.title}</h3>
                <p className="text-[#6B7280] text-[15px] leading-relaxed mt-2">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FDFCFB] px-6 py-16">
        <div className="max-w-[1132px] mx-auto relative overflow-hidden rounded-[32px] bg-[#111316] px-6 py-20 text-center">
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#C9A01B]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative">
            <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-white">
              List Your Company <span className="italic text-[#C9A01B]">Today</span>
            </h2>
            <p className="text-white/70 mt-5 text-base">Join the marketplace and start reaching customers.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onRegisterCompany}
                className="px-7 py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold shadow-[0_8px_24px_rgba(201,160,27,0.35)] transition-colors cursor-pointer"
              >
                Register your company
              </button>
              <a
                href="mailto:info@flykaaba.com"
                className="px-7 py-3.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
