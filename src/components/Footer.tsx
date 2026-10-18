import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Share2
} from 'lucide-react';
import { FlyKaabaLogo } from './FlyKaabaLogo';

interface FooterProps {
  onQuickLinkClick: (link: string) => void;
  onOpenInsForgeModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onQuickLinkClick, onOpenInsForgeModal }) => {
  const quickLinks = [
    'How It Works for Customers',
    'How It Works for Companies',
    'Privacy Policy',
    'Brand Story',
    'Terms and Conditions',
    'How Verification Works',
    'About Us',
    'Contact Us',
    'Blogs',
    'Cities',
  ];

  return (
    <footer className="w-full bg-[#C9A01B] text-white pt-14 pb-8">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* 3-Column Footer Grid matching Screenshot 8 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12">
          
          {/* Column 1: Brand & Socials (md:col-span-4) */}
          <div className="md:col-span-5 lg:col-span-5">
            <div className="mb-3">
              <FlyKaabaLogo variant="light" className="h-8 sm:h-9 w-auto" />
            </div>
            <p className="text-white/90 text-xs sm:text-[13.5px] leading-relaxed max-w-[360px] mb-6">
              Your trusted partner for vehicle and transport journeys across Saudi Arabia. Connecting customers with verified transport companies.
            </p>

            {/* 6 Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#facebook"
                onClick={(e) => { e.preventDefault(); }}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#C9A01B] flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); }}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#C9A01B] flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); }}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#C9A01B] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="#linkedin"
                onClick={(e) => { e.preventDefault(); }}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#C9A01B] flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => { e.preventDefault(); }}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#C9A01B] flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="#pinterest"
                onClick={(e) => { e.preventDefault(); }}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#C9A01B] flex items-center justify-center transition-all"
                aria-label="Pinterest"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (md:col-span-4) */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-base font-bold font-sans tracking-tight mb-4 text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-white/90">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => onQuickLinkClick(link)}
                    className="hover:text-white hover:underline transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support (md:col-span-3) */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-base font-bold font-sans tracking-tight mb-4 text-white">
              Support
            </h4>
            <div className="space-y-3 text-xs sm:text-[13px] text-white/90">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-white/80" />
                <a href="tel:+19452661929" className="hover:underline">
                  +1 (945) 266-1929
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-white/80" />
                <a href="mailto:info@flykaaba.com" className="hover:underline">
                  info@flykaaba.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-white/80" />
                <span>Dallas, Texas</span>
              </div>
            </div>
          </div>

        </div>

        {/* Horizontal Divider Line matching Screenshot 8 */}
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/80 gap-3">
          <p>© 2026 FlyKaaba. All rights reserved.</p>
          {onOpenInsForgeModal && (
            <button
              onClick={onOpenInsForgeModal}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-[11px] font-medium transition-colors cursor-pointer"
              title="Inspect InsForge Backend Connection"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>InsForge BaaS Connected</span>
            </button>
          )}
        </div>

      </div>
    </footer>
  );
};
