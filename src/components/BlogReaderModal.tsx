import React from 'react';
import { X, Calendar, Clock, User, Share2 } from 'lucide-react';
import { BlogPost } from '../data/mockData';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header with image */}
        <div className="relative h-56 sm:h-64 bg-neutral-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="text-xs text-[#E6D28C] font-semibold mb-1">
              {post.categories.join(' , ')}
            </div>
            <h2 className="font-playfair text-xl sm:text-2xl font-bold leading-tight">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Article Meta */}
        <div className="px-6 py-3 border-b border-[#E5E1D8] bg-[#F7F6F2] flex items-center justify-between text-xs text-[#6B7280]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-gray-400" />
              {post.author}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {post.date}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <p className="text-sm sm:text-base font-medium text-[#111111] italic border-l-2 border-[#C9A01B] pl-3 py-0.5">
            {post.excerpt}
          </p>

          <div className="prose prose-sm max-w-none text-[#2D3139] leading-relaxed whitespace-pre-line text-xs sm:text-sm">
            {post.content}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#E5E1D8] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#111111] text-white text-xs font-semibold hover:bg-black"
          >
            Close Article
          </button>
        </div>

      </div>
    </div>
  );
};
