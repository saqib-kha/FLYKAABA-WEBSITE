import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  Mail, 
  Check, 
  Share2 
} from 'lucide-react';
import { BlogPost } from '../data/mockData';
import { FlyKaabaLogo } from './FlyKaabaLogo';

interface BlogPostDetailViewProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onBackToBlogs: () => void;
  onGoHome: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogPostDetailView: React.FC<BlogPostDetailViewProps> = ({
  post,
  allPosts,
  onBackToBlogs,
  onGoHome,
  onSelectPost,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareMail = () => {
    const subject = encodeURIComponent(post.title);
    const body = encodeURIComponent(`Check out this travel guide on FlyKaaba: ${window.location.href}\n\n${post.excerpt}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full bg-white min-h-[calc(100vh-72px)] py-8 sm:py-10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb matching Capture.PNG */}
        <nav className="flex items-center gap-2 text-xs sm:text-[13px] text-[#6B7280] mb-5 flex-wrap">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 hover:text-[#C9A01B] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#8C939E]" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
          <button
            onClick={onBackToBlogs}
            className="hover:text-[#C9A01B] transition-colors cursor-pointer"
          >
            Blogs
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
          <span className="text-[#111111] font-medium line-clamp-1">
            {post.title}
          </span>
        </nav>

        {/* Article Title matching Capture.PNG */}
        <h1 className="font-playfair text-[#111111] text-2xl sm:text-[34px] md:text-[38px] font-bold tracking-tight leading-[1.2] mb-2.5 max-w-[850px]">
          {post.title}
        </h1>

        {/* Date & Author Subtitle matching Capture.PNG */}
        <div className="text-xs sm:text-[13px] text-[#6B7280] mb-7">
          {post.dateFormatted || post.date} · by {post.author || 'FlyKaaba'}
        </div>

        {/* Main 2-Column Layout matching Capture.PNG to Capture5.PNG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Content Column (lg:col-span-8) */}
          <main className="lg:col-span-8">
            
            {/* Featured Image matching Capture.PNG */}
            <div className="w-full rounded-[14px] overflow-hidden mb-6 bg-[#F7F6F2] border border-[#EBE7DF]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto max-h-[460px] object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Share This Bar matching Capture1.PNG */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#F0ECE1]">
              <span className="text-xs sm:text-[13px] text-[#6B7280]">Share This:</span>
              <button
                onClick={handleShareMail}
                className="w-8 h-8 rounded-full bg-[#525B6A] hover:bg-[#C9A01B] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Share via Email"
                aria-label="Share via Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopyLink}
                className="w-8 h-8 rounded-full bg-[#EAE8E2] hover:bg-[#C9A01B] hover:text-white text-[#525B6A] flex items-center justify-center transition-colors cursor-pointer text-xs"
                title={copiedLink ? "Link Copied!" : "Copy Link"}
                aria-label="Copy Link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Article Body Content matching Capture1.PNG to Capture5.PNG */}
            <div className="text-sm sm:text-[15px] text-[#2D3139] leading-relaxed space-y-6">
              
              {/* Introduction Paragraphs */}
              <p>
                Renting a car is the easiest way to move at your own pace in Saudi Arabia, where cities are spread out and public transport does not reach every place you may want to visit. For a first-timer, though, the process can feel unfamiliar: which documents do you need, what does the price include, and how do you avoid surprises at pickup?
              </p>
              <p>
                This guide walks through the whole journey — from choosing a vehicle to handing back the keys — so you can book with confidence.
              </p>

              {/* Section 1: Before You Book */}
              <h2 className="font-playfair text-[#111111] text-2xl sm:text-[26px] font-bold pt-4 pb-1">
                Before You Book
              </h2>
              <p>
                A little preparation saves a lot of time at the counter. Decide the dates and the pickup and return cities first, because availability and prices depend on both. If you plan to drive between cities, tell the company up front so the right vehicle and terms are offered.
              </p>

              {/* Subsection: Documents to prepare */}
              <h3 className="font-playfair text-[#111111] text-xl font-bold pt-2">
                Documents to prepare
              </h3>
              <ul className="list-disc pl-5 space-y-3.5 text-sm sm:text-[14.5px] text-[#2D3139]">
                {post.documents ? (
                  post.documents.map((doc, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {doc}
                    </li>
                  ))
                ) : (
                  <>
                    <li className="leading-relaxed">Your passport and visa or residence permit.</li>
                    <li className="leading-relaxed">A valid driving licence from your home country. Whether an international driving permit is also needed depends on your licence and nationality, so check the current rules with the company you book with and with official sources before you travel.</li>
                    <li className="leading-relaxed">A payment method for the booking and any security deposit the company asks for.</li>
                    <li className="leading-relaxed">Your booking confirmation, saved on your phone.</li>
                  </>
                )}
              </ul>

              {/* Section 2: Choosing the Right Car */}
              <h2 className="font-playfair text-[#111111] text-2xl sm:text-[26px] font-bold pt-4 pb-1">
                Choosing the Right Car
              </h2>
              <p>
                Pick the smallest vehicle that fits your group and luggage comfortably. A bigger vehicle costs more per day and is harder to park in busy city centres. Use the table below as a rough starting point.
              </p>

              {/* Comparison Table matching Capture2.PNG */}
              <div className="overflow-x-auto my-6 rounded-[8px] border border-[#E5E1D8] shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#C9A01B] text-white">
                    <tr>
                      {(post.tableData?.headers || ['VEHICLE', 'BEST FOR', 'TYPICAL SEATS']).map((head, idx) => (
                        <th key={idx} className="py-3 px-4 sm:px-5 font-bold uppercase tracking-wider text-xs">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE7DF] bg-white">
                    {(post.tableData?.rows || [
                      ['Economy car', 'Solo travellers, couples, city driving', '4–5'],
                      ['Luxury sedan', 'Business trips and special occasions', '4–5'],
                      ['SUV', 'Families, longer drives, more luggage', '5–7'],
                      ['Van', 'Larger families and small groups', '7–12'],
                    ]).map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-[#FAF9F5] transition-colors">
                        <td className="py-3 px-4 sm:px-5 font-medium text-[#111111] whitespace-nowrap">
                          {row[0]}
                        </td>
                        <td className="py-3 px-4 sm:px-5 text-[#4B5563]">
                          {row[1]}
                        </td>
                        <td className="py-3 px-4 sm:px-5 text-[#4B5563] whitespace-nowrap">
                          {row[2]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Section 3: Understanding the Price */}
              <h2 className="font-playfair text-[#111111] text-2xl sm:text-[26px] font-bold pt-4 pb-1">
                Understanding the Price
              </h2>
              <p>
                On the marketplace the total is worked out when you send your booking request: the daily price multiplied by the number of days, plus any route price if the vehicle is booked with a driver for a specific route. The company then confirms or declines your request, and a private chat opens so you can agree pickup details directly.
              </p>
              <p>
                Always read what a listing says about the security deposit, the daily distance allowance, fuel policy and insurance. These are the details that change the real cost of a rental, and they are worth asking about in the chat before you confirm.
              </p>

              {/* Section 4: Pickup and Return Checklist */}
              <h2 className="font-playfair text-[#111111] text-2xl sm:text-[26px] font-bold pt-4 pb-1">
                Pickup and Return Checklist
              </h2>
              <ul className="list-disc pl-5 space-y-3.5 text-sm sm:text-[14.5px] text-[#2D3139]">
                {(post.checklist || [
                  'Walk around the car with the company representative and note existing scratches or dents — photograph them.',
                  'Check the fuel level, the tyres and that the air conditioning works.',
                  'Confirm the return time, place and fuel rule in writing (the booking chat counts).',
                  'Save the company\'s phone number in case you need help on the road.',
                  'Return the car on time and ask for a receipt or confirmation that it came back in good condition.',
                ]).map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Section 5: Conclusion */}
              <h2 className="font-playfair text-[#111111] text-2xl sm:text-[26px] font-bold pt-4 pb-1">
                Conclusion
              </h2>
              <p>
                Renting a car in Saudi Arabia is straightforward once you know what to prepare. Choose a verified company, compare vehicles side by side, ask questions in the booking chat, and inspect the car at pickup. Do that, and you can spend your energy on the trip instead of the paperwork.
              </p>

              {/* Section 6: Frequently Asked Questions matching Capture4.PNG & Capture5.PNG */}
              <div className="pt-8 border-t border-[#E5E1D8] mt-10">
                <h2 className="font-playfair text-[#111111] text-2xl sm:text-[26px] font-bold mb-6">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  {(post.faqs || [
                    {
                      question: 'Do I need to pay when I send a booking request?',
                      answer: 'Sending a request does not charge you. Payment is currently arranged directly with the company after your booking is accepted, so agree the method with them in the booking chat.',
                    },
                    {
                      question: 'Can I cancel a booking?',
                      answer: 'Yes, from your account dashboard. The cancellation terms are shown before you confirm a booking, so read them first.',
                    },
                    {
                      question: 'Can I take the car to another city?',
                      answer: 'Often yes, but it depends on the company. Tell them your route when you book so they can confirm the terms.',
                    },
                  ]).map((faq, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <h4 className="font-bold text-sm sm:text-[15px] text-[#111111]">
                        {faq.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </main>

          {/* Right Column: Author Sidebar matching Capture.PNG */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-[16px] border border-[#E5E1D8] p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              
              {/* "Author" Heading */}
              <h3 className="font-playfair text-[#111111] text-base font-bold mb-3.5">
                Author
              </h3>

              {/* FlyKaaba Brand Logo */}
              <div className="mb-4">
                <FlyKaabaLogo width="154" height="40" className="w-[154px] h-[40px]" />
              </div>

              {/* Author / Brand Bio */}
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed font-sans mb-6">
                FlyKaaba is a trusted vehicle and transport marketplace providing accurate, transparent, and up-to-date information to help travellers compare verified companies and plan their journey with confidence.
              </p>

              {/* "Follow Us" */}
              <h4 className="text-xs sm:text-[13px] font-bold text-[#111111] uppercase tracking-wider mb-3.5">
                Follow Us
              </h4>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.8C10.5 0 9 1.5 9 4.667V8z"/></svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="Pinterest"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.696-2.435-2.883-2.435-4.643 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Transport Helper */}
            <div className="bg-[#111111] text-white rounded-[16px] p-6 shadow-sm">
              <h4 className="font-playfair text-lg font-bold mb-2 text-[#C9A01B]">
                Find Verified Cars in Saudi Arabia
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Compare cars directly from licensed local transport operators across Makkah, Madinah, Jeddah & Riyadh.
              </p>
              <button
                onClick={onGoHome}
                className="w-full py-2.5 px-4 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-[#111111] font-semibold text-xs transition-all cursor-pointer shadow-xs"
              >
                Search Vehicles
              </button>
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
};
