import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Home, ChevronRight, ShieldCheck } from 'lucide-react';

interface ContactUsPageViewProps {
  onGoHome: () => void;
}

export const ContactUsPageView: React.FC<ContactUsPageViewProps> = ({ onGoHome }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen py-10 font-sans selection:bg-[#C9A01B]/20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-6">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1 hover:text-[#C9A01B] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="font-semibold text-[#111111]">Contact Us</span>
        </nav>

        {/* Header Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EED8] text-[#8C6D1F] text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-[#C9A01B]" />
            <span>24/7 Pilgrim Support & Dispatch Assistance</span>
          </span>
          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-[#111111] tracking-tight">
            Get in <span className="italic text-[#C9A01B]">Touch</span>
          </h1>
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
            Have questions about an upcoming airport transfer, custom multi-city itinerary, or partner agency registration? Our team is here to support you.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl border border-[#EBE7DF] p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="font-playfair text-xl font-bold text-[#111111]">
                Direct Contacts
              </h2>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FBF7E9] border border-[#E6D28C] text-[#C9A01B] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#6B7280] uppercase tracking-wider">Phone Support</h4>
                    <a href="tel:+19452661929" className="text-sm font-semibold text-[#111111] hover:text-[#C9A01B] transition-colors">
                      +1 (945) 266-1929
                    </a>
                    <p className="text-xs text-[#8C939E] mt-0.5">English, Arabic, Urdu, French</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FBF7E9] border border-[#E6D28C] text-[#C9A01B] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#6B7280] uppercase tracking-wider">Official Email</h4>
                    <a href="mailto:info@flykaaba.com" className="text-sm font-semibold text-[#111111] hover:text-[#C9A01B] transition-colors">
                      info@flykaaba.com
                    </a>
                    <p className="text-xs text-[#8C939E] mt-0.5">Average reply within 30 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FBF7E9] border border-[#E6D28C] text-[#C9A01B] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#6B7280] uppercase tracking-wider">Operations Centers</h4>
                    <p className="text-xs font-semibold text-[#111111]">Makkah al-Mukarramah & Jeddah</p>
                    <p className="text-xs text-[#6B7280]">Kingdom of Saudi Arabia</p>
                    <p className="text-xs text-[#8C939E] mt-1">International office: Dallas, Texas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FBF7E9] border border-[#E6D28C] text-[#C9A01B] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-[#6B7280] uppercase tracking-wider">Operating Hours</h4>
                    <p className="text-xs font-semibold text-[#111111]">24 Hours a Day • 7 Days a Week</p>
                    <p className="text-xs text-[#8C939E] mt-0.5">Live airport terminal dispatch assistance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111316] text-white rounded-3xl p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-[#C9A01B] text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Instant WhatsApp Dispatch</span>
              </div>
              <h3 className="font-playfair text-lg font-bold">Have an Active Booking?</h3>
              <p className="text-xs text-white/80 leading-relaxed">
                If your flight is landing soon or you need urgent luggage coordination, mention your Booking Reference code for priority airport liaison.
              </p>
            </div>

          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EBE7DF] p-6 sm:p-10 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in-50">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-playfair text-2xl font-bold text-[#111111]">Message Sent!</h3>
                <p className="text-xs sm:text-sm text-[#4B5563] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#111111]">{name}</strong>. Our team has received your message and will respond to <strong className="text-[#111111]">{email}</strong> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
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
                <div className="space-y-1">
                  <h2 className="font-playfair text-2xl font-bold text-[#111111]">Send a Message</h2>
                  <p className="text-xs text-[#6B7280]">We typically respond within 30 minutes.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sara Al-Husseini"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5D0C6] focus:border-[#C9A01B] focus:ring-2 focus:ring-[#C9A01B]/20 text-xs sm:text-sm text-[#111111] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sara@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5D0C6] focus:border-[#C9A01B] focus:ring-2 focus:ring-[#C9A01B]/20 text-xs sm:text-sm text-[#111111] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                      Phone Number (with Country Code)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 50 123 4567"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5D0C6] focus:border-[#C9A01B] focus:ring-2 focus:ring-[#C9A01B]/20 text-xs sm:text-sm text-[#111111] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D5D0C6] focus:border-[#C9A01B] focus:ring-2 focus:ring-[#C9A01B]/20 text-xs sm:text-sm text-[#111111] outline-none bg-white"
                    >
                      <option>General Inquiry</option>
                      <option>Booking Confirmation / Update</option>
                      <option>Airport Flight Delay Coordination</option>
                      <option>Agency Registration & Verification</option>
                      <option>Custom Group / Bus Fleet Request</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your travel dates, vehicle requirements, or questions..."
                    className="w-full px-4 py-3 rounded-xl border border-[#D5D0C6] focus:border-[#C9A01B] focus:ring-2 focus:ring-[#C9A01B]/20 text-xs sm:text-sm text-[#111111] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
