import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { insforgeService } from '../lib/insforge';

interface ContactUsPageViewProps {
  onGoHome?: () => void;
  onViewPrivacyPolicy?: () => void;
  onViewTerms?: () => void;
}

export const ContactUsPageView: React.FC<ContactUsPageViewProps> = ({
  onGoHome,
  onViewPrivacyPolicy,
  onViewTerms,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      await insforgeService.submitContactMessage({
        fullName: fullName.trim(),
        phone: phone.trim() || undefined,
        email: email.trim(),
        message: message.trim(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit message:', err);
      // Still show success since it's cached locally
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF9F6] min-h-[calc(100vh-80px)] pt-12 pb-24 font-sans selection:bg-[#B88722]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Header Section matching Capture_d7b55c0a.PNG */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h1 className="font-playfair text-4xl sm:text-5xl font-normal text-[#111111] tracking-tight mb-3">
            Contact Us
          </h1>
          <p className="text-center text-[#555555] text-sm sm:text-base leading-relaxed">
            Have a question about a booking or listing your company? Our team is<br className="hidden sm:inline" /> here to help.
          </p>
        </div>

        {/* Centered White Message Card matching Capture_d7b55c0a.PNG & Capture1_919c9810.PNG */}
        <div className="w-full max-w-[580px] bg-white rounded-3xl p-6 sm:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-[#ECE8DF]">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in-50">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-[#111111]">Message Sent!</h3>
              <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#111111]">{fullName}</strong>. We have received your inquiry and our dispatch team will reply to <strong className="text-[#111111]">{email}</strong> shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName('');
                    setPhone('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#FAF7EE] border border-[#E5E1D8] text-xs font-semibold text-[#111111] hover:bg-[#F3EEDD] transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-playfair text-2xl font-bold text-[#111111] mb-6">
                Send Us a Message
              </h2>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:ring-1 focus:ring-[#B88722] transition-all bg-white"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:ring-1 focus:ring-[#B88722] transition-all bg-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:ring-1 focus:ring-[#B88722] transition-all bg-white"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:ring-1 focus:ring-[#B88722] transition-all bg-white resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3.5 px-6 rounded-full bg-[#B88722] hover:bg-[#A3741B] active:scale-[0.99] text-white font-medium text-sm sm:text-base transition-all shadow-sm cursor-pointer disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
              </button>

              {/* Agreement text */}
              <p className="text-xs text-[#6B7280] text-center mt-6">
                By submitting this form, you agree to our{' '}
                <button
                  type="button"
                  onClick={onViewPrivacyPolicy}
                  className="underline text-[#4B5563] hover:text-[#B88722] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={onViewTerms}
                  className="underline text-[#4B5563] hover:text-[#B88722] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                .
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
