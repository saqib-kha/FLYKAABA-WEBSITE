import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Search, 
  X, 
  ChevronRight, 
  Calendar, 
  Clock, 
  ArrowLeft,
  Share2
} from 'lucide-react';
import { BlogPost } from '../data/mockData';
import { FlyKaabaLogo } from './FlyKaabaLogo';

interface BlogsPageViewProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onGoHome: () => void;
}

export const BlogsPageView: React.FC<BlogsPageViewProps> = ({
  posts,
  onSelectPost,
  onGoHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract all unique categories
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach(p => p.categories.forEach(c => set.add(c)));
    return ['All', ...Array.from(set)];
  }, [posts]);

  // Filter posts based on search input and active category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.categories.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = 
        selectedCategory === 'All' || 
        post.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="w-full bg-[#FAF9F5] min-h-[calc(100vh-72px)] py-8 sm:py-10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb matching Capture.PNG */}
        <nav className="flex items-center gap-2 text-xs sm:text-[13px] text-[#6B7280] mb-6">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1.5 hover:text-[#C9A01B] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#8C939E]" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
          <span className="text-[#111111] font-medium">Blogs</span>
        </nav>

        {/* Header Bar matching Capture.PNG */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-8 border-b border-[#E8E4DA] mb-9">
          <div>
            <h1 className="font-playfair text-[#111111] text-3xl sm:text-[38px] font-bold tracking-tight mb-2">
              Blogs
            </h1>
            <p className="text-[#6B7280] text-sm sm:text-[15px] font-normal font-sans">
              Compare verified vehicles and transport companies across Saudi Arabia.
            </p>
          </div>

          {/* Search Blogs Input matching Capture.PNG */}
          <div className="relative w-full sm:w-[300px] md:w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#D5D0C6] focus:border-[#C9A01B] focus:ring-2 focus:ring-[#C9A01B]/20 text-xs sm:text-sm text-[#111111] placeholder-[#9CA3AF] shadow-2xs transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Main 2-Column Layout matching Capture.PNG, Capture1.PNG, Capture2.PNG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: 2-Column Grid of Blog Cards (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Category filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#111111] text-white font-medium shadow-xs'
                      : 'bg-white border border-[#E0DCD3] text-[#555] hover:border-[#C9A01B] hover:text-[#C9A01B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E5E1D8]">
                <p className="text-sm text-gray-600 mb-3">No articles found matching "{searchQuery}".</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                  className="px-4 py-2 bg-[#C9A01B] text-white text-xs font-semibold rounded-full hover:bg-[#b89115] transition-colors"
                >
                  Clear search & filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onSelectPost(post)}
                    className="group bg-white rounded-[14px] border border-[#E5E1D8] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.08)] hover:border-[#C9A01B]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Card Image */}
                      <div className="relative w-full h-[190px] sm:h-[210px] bg-[#F7F6F2] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Card Content Area */}
                      <div className="p-5 sm:p-6">
                        {/* Categories matching Capture.PNG */}
                        <div className="text-xs font-semibold text-[#B7891B] tracking-wide mb-2 flex items-center flex-wrap gap-1">
                          {post.categories.join(' , ')}
                        </div>

                        {/* Title in Serif bold font */}
                        <h2 className="font-playfair text-[#111111] text-[17px] sm:text-[18px] font-bold leading-snug group-hover:text-[#C9A01B] transition-colors mb-3">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed line-clamp-3 mb-5 font-sans">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Publication Date */}
                    <div className="px-5 sm:px-6 pb-5 pt-0 text-[12px] text-[#8C939E] font-normal border-t border-[#F8F6F0]/80">
                      {post.date}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Author Sidebar matching Capture.PNG (lg:col-span-4) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-[16px] border border-[#E5E1D8] p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
              
              {/* "Author" Heading */}
              <h3 className="font-playfair text-[#111111] text-lg font-bold mb-3.5">
                Author
              </h3>

              {/* FlyKaaba Brand Logo */}
              <div className="mb-4">
                <FlyKaabaLogo width="154" height="40" className="w-[154px] h-[40px]" />
              </div>

              {/* Author / Brand Bio matching Capture.PNG */}
              <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed font-sans mb-6">
                FlyKaaba is a trusted vehicle and transport marketplace providing accurate, transparent, and up-to-date information to help travellers compare verified companies and plan their journey with confidence.
              </p>

              {/* "Follow Us" Section */}
              <h4 className="text-xs sm:text-[13px] font-bold text-[#111111] uppercase tracking-wider mb-3.5">
                Follow Us
              </h4>

              {/* Social Media Circular Buttons matching Capture.PNG */}
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.8C10.5 0 9 1.5 9 4.667V8z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="X (Twitter)"
                  title="X (Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* Pinterest */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#EAE8E2] text-[#4B5563] hover:bg-[#C9A01B] hover:text-white flex items-center justify-center transition-all cursor-pointer font-bold text-sm"
                  aria-label="Pinterest"
                  title="Pinterest"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.696-2.435-2.883-2.435-4.643 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Transport Assistance Banner */}
            <div className="bg-[#111111] text-white rounded-[16px] p-6 shadow-sm">
              <h4 className="font-playfair text-lg font-bold mb-2 text-[#C9A01B]">
                Need Reliable Transport?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                Compare direct pricing from verified transport operators for Makkah, Madinah, Jeddah & Riyadh.
              </p>
              <button
                onClick={onGoHome}
                className="w-full py-2.5 px-4 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-[#111111] font-semibold text-xs transition-all shadow-xs"
              >
                Find & Compare Vehicles
              </button>
            </div>
          </aside>

        </div>

      </div>
    </div>
  );
};
