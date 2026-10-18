import React, { useState } from 'react';
import { X, LogIn, UserPlus, Lock, Mail, User, Shield } from 'lucide-react';

interface AuthModalProps {
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialMode,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const userName = mode === 'signup' && name.trim() ? name : email.split('@')[0];
    onLoginSuccess({
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: email.trim(),
      role: 'Pilgrim / Customer',
    });
    onClose();
  };

  const handleDemoLogin = (role: 'pilgrim' | 'agency') => {
    if (role === 'pilgrim') {
      onLoginSuccess({
        name: 'Zayd Al-Ansari',
        email: 'zayd.pilgrim@example.com',
        role: 'Verified Traveler',
      });
    } else {
      onLoginSuccess({
        name: 'Faisal Transport Admin',
        email: 'fleet@alfaisaltransport.sa',
        role: 'Transport Agency Operator',
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header Tabs */}
        <div className="relative border-b border-[#E5E1D8] bg-[#FBF7E9]/60 px-6 pt-5 pb-3">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1">
            <span className="font-playfair text-xl font-black text-[#111111]">FlyKaaba</span>
            <span className="text-xs text-[#6B7280]">Account</span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs font-semibold">
            <button
              onClick={() => setMode('login')}
              className={`pb-2 border-b-2 transition-colors ${
                mode === 'login' ? 'border-[#C9A01B] text-[#C9A01B]' : 'border-transparent text-gray-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`pb-2 border-b-2 transition-colors ${
                mode === 'signup' ? 'border-[#C9A01B] text-[#C9A01B]' : 'border-transparent text-gray-500'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Ibrahim Malik"
                    className="w-full h-10 pl-9 pr-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full h-10 pl-9 pr-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer mt-2"
            >
              {mode === 'login' ? 'Login to FlyKaaba' : 'Register Account'}
            </button>
          </form>

          {/* Quick Demo Logins for smooth evaluation */}
          <div className="mt-5 pt-4 border-t border-[#F0ECE1] text-center">
            <span className="text-[11px] text-[#6B7280] block mb-2 font-medium">
              Instant Demo Access:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('pilgrim')}
                className="flex-1 py-1.5 px-2 bg-[#F7F6F2] hover:bg-[#E5E1D8] rounded-lg text-[11px] font-medium text-gray-700 transition-colors"
              >
                👤 Pilgrim Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('agency')}
                className="flex-1 py-1.5 px-2 bg-[#F7F6F2] hover:bg-[#E5E1D8] rounded-lg text-[11px] font-medium text-gray-700 transition-colors"
              >
                🏢 Transport Co Demo
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
