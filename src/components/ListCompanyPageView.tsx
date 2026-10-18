import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  UserPlus, 
  ShieldCheck, 
  Lock, 
  Zap, 
  CheckCircle2, 
  Globe, 
  Wallet, 
  Package, 
  ClipboardCheck,
  Check
} from 'lucide-react';
import { insforgeService } from '../lib/insforge';

interface ListCompanyPageViewProps {
  onGoHome: () => void;
  onCompanyRegistered?: (companyName: string) => void;
  onSeeHowItWorks?: () => void;
  onOpenLogin?: () => void;
}

export const ListCompanyPageView: React.FC<ListCompanyPageViewProps> = ({
  onGoHome,
  onCompanyRegistered,
  onSeeHowItWorks,
  onOpenLogin,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim()) {
      setError('Please enter your first name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid business email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    const regName = companyName.trim() || `${firstName} ${lastName} Transport`.trim();
    try {
      await insforgeService.registerAgency({
        name: regName,
        email: email.trim(),
        description: `Registered partner agency by ${firstName} ${lastName}`,
        city: 'Makkah',
      });
      await insforgeService.signUp({
        email: email.trim(),
        password,
        name: `${firstName} ${lastName}`.trim(),
      });
    } catch (err) {
      console.warn('Agency account registration note:', err);
    }

    if (onCompanyRegistered) {
      onCompanyRegistered(regName);
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-white flex flex-col justify-between">
      
      {/* Split Hero / Form Section matching Screenshots 1, 2, 3 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* ================= LEFT COLUMN: REGISTRATION FORM ================= */}
        <div className="lg:col-span-6 xl:col-span-5 px-6 sm:px-10 md:px-14 py-10 sm:py-14 flex flex-col justify-center">
          <div className="max-w-[460px] mx-auto w-full">
            
            {/* Acceptance Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5EED8] text-[#8C6D1F] text-xs font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Now accepting new agencies</span>
            </div>

            {/* Heading */}
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight mb-2">
              Register Your Agency
            </h1>

            <p className="text-[#4B5563] text-xs sm:text-[13.5px] leading-relaxed mb-7">
              Fill in your details below. Our verification team will review your application and get you live as quickly as possible.
            </p>

            {submitted ? (
              <div className="bg-[#F5FBF6] border border-[#C5E8CE] rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in fade-in-50">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#111111]">
                  Application Received!
                </h3>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  Thank you for submitting your agency details. Our transport verification officer in Saudi Arabia will review your license and activate your fleet listings within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onGoHome}
                    className="px-6 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    Return to Marketplace
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
                    {error}
                  </div>
                )}

                {/* First Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-colors"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-colors"
                  />
                </div>

                {/* Password with Eye toggle */}
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 pr-11 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-gray-400 focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms and Privacy Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 text-xs text-[#4B5563] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#C9A01B] focus:ring-[#C9A01B] cursor-pointer"
                    />
                    <span>
                      I agree to the{' '}
                      <span className="text-[#C9A01B] hover:underline font-medium">Terms of Service</span>{' '}
                      and{' '}
                      <span className="text-[#C9A01B] hover:underline font-medium">Privacy Policy</span>
                    </span>
                  </label>
                </div>

                {/* Submit Sign Up Button matching Screenshot 1 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-white text-sm font-semibold transition-all shadow-[0_2px_4px_rgba(201,160,27,0.25)] hover:shadow-[0_4px_8px_rgba(201,160,27,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </div>

                {/* Sign In link */}
                <div className="text-center pt-2">
                  <span className="text-xs text-[#6B7280]">
                    Already have an account?{' '}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="text-xs font-semibold text-[#C9A01B] hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>

                {/* 3 Trust Badges matching Screenshot 2 */}
                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between text-[11px] sm:text-xs text-[#4B5563]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🔒</span>
                    <span>Secure & Confidential</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">⚡</span>
                    <span>24hr Review Time</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base text-emerald-600">✅</span>
                    <span>Free to Join</span>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>

        {/* ================= RIGHT COLUMN: GOLDEN FEATURE PANEL ================= */}
        <div className="lg:col-span-6 xl:col-span-7 bg-[#C9A01B] text-[#111111] px-6 sm:px-10 md:px-16 py-10 sm:py-14 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Concentric Rings Graphic Decoration matching Screenshot 1 */}
          <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full border-[28px] border-white/15 pointer-events-none"></div>
          <div className="absolute -top-6 -right-6 w-56 h-56 rounded-full border-[20px] border-white/10 pointer-events-none"></div>

          <div className="relative z-10 max-w-xl">
            {/* Top kicker */}
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#111111]/70 mb-2.5">
              PARTNER WITH FLYKAABA
            </div>

            {/* Headline */}
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111111] leading-tight mb-3">
              Reach Customers Ready to Book.
            </h2>

            {/* Paragraph */}
            <p className="text-[#111111]/85 text-xs sm:text-[13.5px] leading-relaxed mb-6">
              Customers across Saudi Arabia search FlyKaaba for verified transport companies. List your vehicles and packages, and let them send booking requests straight to you.
            </p>

            {/* 3 Pills matching Screenshot 1 */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="px-3.5 py-1 rounded-full bg-white/90 text-[#111111] text-xs font-semibold shadow-xs">
                Verified badge
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/90 text-[#111111] text-xs font-semibold shadow-xs">
                All of Saudi Arabia
              </span>
              <span className="px-3.5 py-1 rounded-full bg-white/90 text-[#111111] text-xs font-semibold shadow-xs">
                Free to list
              </span>
            </div>

            {/* 5 Feature Bullet Items with White Circles matching Screenshots 1 & 2 */}
            <div className="space-y-5">
              
              {/* 1. Reach Customers Ready to Book */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white text-[#C9A01B] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Globe className="w-4 h-4 text-[#C9A01B]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    Reach Customers Ready to Book
                  </h4>
                  <p className="text-xs text-[#111111]/85 leading-relaxed mt-0.5">
                    Your vehicles and packages appear to customers searching for verified transport companies across the marketplace.
                  </p>
                </div>
              </div>

              {/* 2. The Verified Badge That Builds Trust */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white text-[#C9A01B] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A01B]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    The Verified Badge That Builds Trust
                  </h4>
                  <p className="text-xs text-[#111111]/85 leading-relaxed mt-0.5">
                    Our review team checks every company's documents before it goes live, so customers can book with confidence.
                  </p>
                </div>
              </div>

              {/* 3. You Set Your Own Prices */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white text-[#C9A01B] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Wallet className="w-4 h-4 text-[#C9A01B]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    You Set Your Own Prices
                  </h4>
                  <p className="text-xs text-[#111111]/85 leading-relaxed mt-0.5">
                    Whole-vehicle or per-seat, one-way trips, Ziyarat tours or hourly hire — you decide what every vehicle and package charges.
                  </p>
                </div>
              </div>

              {/* 4. List Unlimited Vehicles & Packages */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white text-[#C9A01B] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <Package className="w-4 h-4 text-[#C9A01B]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    List Unlimited Vehicles & Packages
                  </h4>
                  <p className="text-xs text-[#111111]/85 leading-relaxed mt-0.5">
                    Publish everything you offer, with photos, seats, transmission and pricing, and switch listings on or off any time.
                  </p>
                </div>
              </div>

              {/* 5. Go Live After Verification */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-white text-[#C9A01B] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <ClipboardCheck className="w-4 h-4 text-[#C9A01B]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    Go Live After Verification
                  </h4>
                  <p className="text-xs text-[#111111]/85 leading-relaxed mt-0.5">
                    Submit your details and documents; once our team approves your company, your listings become visible to customers.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Card matching Screenshot 2 */}
          <div className="relative z-10 mt-8 pt-4">
            <div className="bg-[#FDF8EB]/90 border border-black/5 rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-[#111111] shadow-xs">
              <span>Not ready to register yet? </span>
              <button
                type="button"
                onClick={onSeeHowItWorks}
                className="font-semibold underline hover:text-black cursor-pointer"
              >
                See how FlyKaaba works for companies.
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
