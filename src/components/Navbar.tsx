import React, { useState, useRef, useEffect } from 'react';
import { LogIn, UserPlus, ChevronDown, Menu, X, Building2, MapPin, Compass, User, LogOut, CheckCircle2 } from 'lucide-react';
import { ZIYARAT_DESTINATIONS, ZiyaratDestination } from '../data/mockData';
import { FlyKaabaLogo } from './FlyKaabaLogo';

interface NavbarProps {
  onOpenAgencies: () => void;
  onOpenRoutes: () => void;
  onSelectZiyarat: (ziyarat: ZiyaratDestination) => void;
  onOpenMakkahZiyarat: () => void;
  onOpenMadinaZiyarat: () => void;
  onOpenListCompany: () => void;
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  currentUser: { name: string; email: string; role: string } | null;
  onLogout: () => void;
  onOpenMyBookings: () => void;
  activeView: string;
  onGoHome: () => void;
  onOpenAgencyDashboard?: () => void;
  onOpenAdminDashboard?: () => void;
  onOpenCustomerDashboard?: () => void;
  onOpenInsForgeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAgencies,
  onOpenRoutes,
  onSelectZiyarat,
  onOpenMakkahZiyarat,
  onOpenMadinaZiyarat,
  onOpenListCompany,
  onOpenLogin,
  onOpenSignup,
  currentUser,
  onLogout,
  onOpenMyBookings,
  activeView,
  onGoHome,
  onOpenAgencyDashboard,
  onOpenAdminDashboard,
  onOpenCustomerDashboard,
  onOpenInsForgeModal,
}) => {
  const [ziyaratOpen, setZiyaratOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setZiyaratOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E1D8] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        
        {/* Left: FlyKaaba Official Logo matching exact user upload */}
        <button
          onClick={onGoHome}
          className="flex items-center focus:outline-none cursor-pointer hover:opacity-90 transition-opacity"
          aria-label="FlyKaaba Home"
        >
          <FlyKaabaLogo className="h-10 sm:h-11 w-auto" />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onOpenAgencies}
            className={`text-[15px] font-medium transition-colors hover:text-[#C9A01B] ${
              activeView === 'agencies' ? 'text-[#C9A01B] font-semibold' : 'text-[#2D3139]'
            }`}
          >
            Travel Agencies
          </button>

          <button
            onClick={onOpenRoutes}
            className={`text-[15px] font-medium transition-colors hover:text-[#C9A01B] ${
              activeView === 'routes' ? 'text-[#C9A01B] font-semibold' : 'text-[#2D3139]'
            }`}
          >
            Routes
          </button>

          {/* Ziyarat Dropdown matching user reference */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setZiyaratOpen(!ziyaratOpen)}
              className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors cursor-pointer select-none ${
                ziyaratOpen || activeView === 'ziyarat-makkah' || activeView === 'ziyarat-madina'
                  ? 'text-[#C9A01B] font-semibold'
                  : 'text-[#2D3139] hover:text-[#C9A01B]'
              }`}
              aria-expanded={ziyaratOpen}
            >
              <span>Ziyarat</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.5] ${
                  ziyaratOpen
                    ? 'rotate-180 text-[#C9A01B]'
                    : activeView === 'ziyarat-makkah' || activeView === 'ziyarat-madina'
                    ? 'text-[#C9A01B]'
                    : 'text-[#6B7280]'
                }`}
              />
            </button>

            {ziyaratOpen && (
              <div className="absolute left-0 mt-2.5 w-44 bg-white rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-[#EBE7DF] py-2 px-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    onOpenMakkahZiyarat();
                    setZiyaratOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors cursor-pointer ${
                    activeView === 'ziyarat-makkah'
                      ? 'bg-[#FBF7EE] text-[#C9A01B] font-semibold'
                      : 'text-[#22252A] hover:bg-[#F9F8F5] hover:text-[#C9A01B]'
                  }`}
                >
                  Makkah
                </button>
                <button
                  onClick={() => {
                    onOpenMadinaZiyarat();
                    setZiyaratOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors cursor-pointer ${
                    activeView === 'ziyarat-madina'
                      ? 'bg-[#FBF7EE] text-[#C9A01B] font-semibold'
                      : 'text-[#22252A] hover:bg-[#F9F8F5] hover:text-[#C9A01B]'
                  }`}
                >
                  Madina
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Right Side: CTAs & Auth */}
        <div className="hidden md:flex items-center gap-3.5">
          <button
            onClick={onOpenListCompany}
            className={`text-[14px] font-medium transition-colors cursor-pointer ${
              activeView === 'list-company' ? 'text-[#C9A01B] font-semibold' : 'text-[#2D3139] hover:text-[#C9A01B]'
            }`}
          >
            List your company
          </button>

          <button
            onClick={onOpenListCompany}
            className={`text-[14px] font-medium transition-colors cursor-pointer ${
              activeView === 'list-company' ? 'text-[#C9A01B] font-semibold' : 'text-[#2D3139] hover:text-[#C9A01B]'
            }`}
          >
            List your company
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenMyBookings}
                className="text-[13px] font-semibold text-[#111111] hover:text-[#C9A01B] transition-colors"
                title="View My Bookings"
              >
                Hi, {currentUser.name}
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F7F6F2] border border-[#D1CDC5] text-xs font-medium text-[#111111] transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Golden Login Button matching reference */}
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-[14px] font-semibold transition-all shadow-[0_2px_4px_rgba(201,160,27,0.25)] hover:shadow-[0_4px_8px_rgba(201,160,27,0.35)] cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>

              {/* White Outlined Signup Button matching reference */}
              <button
                onClick={onOpenSignup}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-[#F7F6F2] text-[#111111] border border-[#D1CDC5] text-[14px] font-medium transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4 text-[#4B5563]" />
                <span>Signup</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {!currentUser && (
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-full bg-[#C9A01B] text-white text-xs font-semibold"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#111111] hover:bg-[#F7F6F2] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E1D8] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenAgencies();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 py-2 text-left text-sm font-medium text-[#111111] border-b border-gray-100"
            >
              <Building2 className="w-4 h-4 text-[#C9A01B]" />
              Travel Agencies
            </button>

            <button
              onClick={() => {
                onOpenRoutes();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 py-2 text-left text-sm font-medium text-[#111111] border-b border-gray-100"
            >
              <MapPin className="w-4 h-4 text-[#C9A01B]" />
              Routes
            </button>

            <div className="py-2 border-b border-gray-100">
              <div className="flex items-center gap-3 text-sm font-medium text-[#111111] mb-2">
                <Compass className="w-4 h-4 text-[#C9A01B]" />
                Ziyarat
              </div>
              <div className="pl-7 space-y-1">
                <button
                  onClick={() => {
                    onOpenMakkahZiyarat();
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-sm font-medium py-1.5 ${
                    activeView === 'ziyarat-makkah' ? 'text-[#C9A01B] font-semibold' : 'text-[#2D3139] hover:text-[#C9A01B]'
                  }`}
                >
                  Makkah
                </button>
                <button
                  onClick={() => {
                    onOpenMadinaZiyarat();
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left text-sm font-medium py-1.5 ${
                    activeView === 'ziyarat-madina' ? 'text-[#C9A01B] font-semibold' : 'text-[#2D3139] hover:text-[#C9A01B]'
                  }`}
                >
                  Madina
                </button>
              </div>
            </div>


            <button
              onClick={() => {
                onOpenListCompany();
                setMobileMenuOpen(false);
              }}
              className="py-2 text-left text-sm font-medium text-[#C9A01B] border-b border-gray-100"
            >
              List your company
            </button>

            {currentUser ? (
              <div className="pt-2">
                <button
                  onClick={() => {
                    onOpenMyBookings();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-left text-sm text-[#111111] font-medium"
                >
                  My Bookings
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-left text-sm text-red-600 font-medium"
                >
                  Sign Out ({currentUser.name})
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#C9A01B] text-white text-xs font-semibold text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenSignup();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-white border border-[#D1CDC5] text-[#111111] text-xs font-medium text-center"
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
