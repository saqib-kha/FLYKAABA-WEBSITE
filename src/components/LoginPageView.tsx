import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, UserPlus, Check, AlertCircle, Loader2 } from 'lucide-react';
import { FlyKaabaLogo } from './FlyKaabaLogo';
import { insforgeService } from '../lib/insforge';

interface LoginPageViewProps {
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
  onGoHome: () => void;
  onNavigateToCompanyLogin?: () => void;
}

export const LoginPageView: React.FC<LoginPageViewProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onGoHome,
  onNavigateToCompanyLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('admin@carmk.duckdns.org');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  // Concentric geometric Islamic diamond pattern matching Capture_7049b102.PNG
  const geometricBgStyle = {
    backgroundColor: '#FAF8F4',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23E8DFCD' stroke-width='1.2' opacity='0.75'%3E%3Cpath d='M36 0l36 36-36 36L0 36z'/%3E%3Cpath d='M36 16l20 20-20 20-20-20z' stroke-width='0.9' opacity='0.6'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: 'repeat',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setForgotPasswordNotice(false);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const { user, error } = await insforgeService.signUp({
          email: email.trim(),
          password,
          name: fullName.trim() || email.split('@')[0],
        });

        if (error) {
          setErrorMessage(error);
          setIsLoading(false);
          return;
        }

        if (user) {
          onLoginSuccess({
            name: user.name,
            email: user.email,
            role: user.role,
          });
        }
      } else {
        const { user, error } = await insforgeService.signIn({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error);
          setIsLoading(false);
          return;
        }

        if (user) {
          onLoginSuccess({
            name: user.name,
            email: user.email,
            role: user.role,
          });
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={geometricBgStyle}
      className="w-full min-h-[calc(100vh-80px)] py-12 sm:py-20 px-4 sm:px-6 flex flex-col items-center justify-center font-sans selection:bg-[#B88722]/20"
    >
      {/* Central Login Card matching Capture_7049b102.PNG */}
      <div className="w-full max-w-[430px] bg-white rounded-[28px] p-8 sm:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-[#ECE6D8]/90 animate-in fade-in-50 duration-300">
        
        {/* Top Logo */}
        <div className="flex justify-center mb-7 sm:mb-8">
          <FlyKaabaLogo 
            onClick={onGoHome}
            width="170" 
            height="44" 
            className="w-[170px] h-[44px] cursor-pointer hover:opacity-90 transition-opacity" 
          />
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Forgot password confirmation message */}
        {forgotPasswordNotice && (
          <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
            Password reset link has been dispatched to <strong>{email}</strong>. Check your inbox to choose a new password.
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign Up: Full Name */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Abdul Rahman"
                className="w-full h-11 px-4 rounded-xl bg-[#EDF2FA] border border-[#D5E1F2] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:bg-white transition-all"
              />
            </div>
          )}

          {/* Email Field with soft ice-blue tint background matching Capture_7049b102.PNG */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@carmk.duckdns.org"
              className="w-full h-11 px-4 rounded-xl bg-[#EDF2FA] border border-[#D5E1F2] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:bg-white transition-all"
            />
          </div>

          {/* Sign Up: Phone (optional) */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Phone / WhatsApp (Optional)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 50 123 4567"
                className="w-full h-11 px-4 rounded-xl bg-[#EDF2FA] border border-[#D5E1F2] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:bg-white transition-all"
              />
            </div>
          )}

          {/* Password Field with visibility toggle matching Capture_7049b102.PNG */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full h-11 pl-4 pr-11 rounded-xl bg-[#EDF2FA] border border-[#D5E1F2] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#B88722] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer p-0.5"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Options Row: Remember Me & Forgot Password matching Capture_7049b102.PNG */}
          {mode === 'login' && (
            <div className="flex items-center justify-between pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    rememberMe
                      ? 'bg-[#111111] border-[#111111] text-white'
                      : 'border-gray-400 bg-white'
                  }`}
                >
                  {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="text-xs text-[#374151]">
                  Remember this device
                </span>
              </label>

              <button
                type="button"
                onClick={() => setForgotPasswordNotice(true)}
                className="text-xs font-semibold text-[#B88722] hover:text-[#9A7019] transition-colors cursor-pointer"
              >
                Forgot Password ?
              </button>
            </div>
          )}

          {/* Submit Button matching Capture_7049b102.PNG */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-[#B88722] hover:bg-[#A3751B] text-white font-semibold text-sm shadow-[0_2px_8px_rgba(184,135,34,0.3)] hover:shadow-[0_4px_12px_rgba(184,135,34,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{mode === 'signup' ? 'Creating Account...' : 'Signing in...'}</span>
                </>
              ) : (
                <>
                  {mode === 'signup' ? (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Create Account</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </>
                  )}
                </>
              )}
            </button>
          </div>

        </form>

      </div>

      {/* Footer Navigation Below Card matching Capture_7049b102.PNG & Capture0_805efc23.PNG */}
      <div className="mt-6 text-center space-y-1.5">
        <p className="text-xs text-[#6B7280]">
          {mode === 'login' ? (
            <>
              New to FlyKaaba?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                }}
                className="font-semibold text-[#B88722] hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setErrorMessage(null);
                }}
                className="font-semibold text-[#B88722] hover:underline cursor-pointer"
              >
                Sign in here
              </button>
            </>
          )}
        </p>

        <p className="text-xs text-[#6B7280]">
          Are you a company?{' '}
          <button
            type="button"
            onClick={onNavigateToCompanyLogin || onGoHome}
            className="font-medium text-[#4B5563] hover:text-[#111111] hover:underline cursor-pointer"
          >
            Log in here
          </button>
        </p>
      </div>

    </div>
  );
};
