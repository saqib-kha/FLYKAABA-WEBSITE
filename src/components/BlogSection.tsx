import React from 'react';
import { BlogPost } from '../data/mockData';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onViewAllPosts: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  onSelectPost,
  onViewAllPosts,
}) => {
  return (
    <section className="w-full bg-white py-14 sm:py-16 border-b border-[#F0ECE1]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading & Subtitle matching Screenshot 6 & 7 */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-[#111111] text-3xl sm:text-[34px] font-bold tracking-tight mb-2">
            From Our Blog
          </h2>
          <p className="text-[#6B7280] text-sm sm:text-base font-normal font-sans">
            Guides, tips and news for your journey.
          </p>
        </div>

        {/* 3 Blog Cards Grid matching Screenshot 7 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group bg-white rounded-[14px] border border-[#E5E1D8] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-[#C9A01B]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Blog Image */}
                <div className="relative w-full h-[180px] sm:h-[195px] bg-[#F7F6F2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-5">
                  {/* Unboxed Categories with comma separators as shown in Screenshot 7 */}
                  <div className="text-xs text-[#6B7280] font-medium mb-2 flex items-center flex-wrap gap-1">
                    {post.categories.join(' , ')}
                  </div>

                  {/* Blog Title in Serif Font */}
                  <h3 className="font-playfair text-[#111111] text-[17px] sm:text-[18px] font-bold leading-snug group-hover:text-[#C9A01B] transition-colors mb-2.5">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-[13px] text-[#4B5563] leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Publication Date matching format in Screenshot 7 */}
              <div className="px-5 pb-4 pt-1 text-[11px] text-[#9CA3AF] border-t border-[#FAF7F0]">
                {post.date}
              </div>
            </article>
          ))}
        </div>

        {/* Read Our Latest Blog Posts Button matching Screenshot 7 */}
        <div className="text-center mt-9">
          <button
            onClick={onViewAllPosts}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-[#F0ECE1] text-[#111111] border border-[#D5D0C6] text-sm font-medium transition-all shadow-xs hover:shadow-sm cursor-pointer"
          >
            Read our latest blog posts
          </button>
        </div>

      </div>
    </section>
  );
};
