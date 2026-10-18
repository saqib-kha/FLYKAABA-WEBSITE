import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Tag, 
  MessageSquare, 
  Globe, 
  BookOpen, 
  Maximize2, 
  Play, 
  Pause,
  ArrowRight,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { SAUDI_CITIES } from '../data/mockData';
import kaabaHeroImg from '../assets/images/kaaba_makkah_hero_1792229406660.jpg';

export interface SearchParams {
  tripType: 'one-way' | 'round-trip';
  pickupCity: string;
  dropoffCity: string;
  travelDate: string;
  returnDate?: string;
  pickupTime: string;
}

interface HeroSectionProps {
  onSearch: (params: SearchParams) => void;
  onNavigateToBlog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch, onNavigateToBlog }) => {
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [pickupCity, setPickupCity] = useState('');
  const [dropoffCity, setDropoffCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Autocomplete state
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);

  // Audio / Ambience state for the small hero controls
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!pickupCity.trim()) {
      setErrorMessage('Please specify a pickup city.');
      return;
    }
    if (!dropoffCity.trim()) {
      setErrorMessage('Please specify a destination / drop-off city.');
      return;
    }
    if (pickupCity.trim().toLowerCase() === dropoffCity.trim().toLowerCase()) {
      setErrorMessage('Pickup city and destination cannot be the same city.');
      return;
    }
    if (!travelDate) {
      setErrorMessage('Please select a travel date.');
      return;
    }
    if (tripType === 'round-trip') {
      if (!returnDate) {
        setErrorMessage('Please select a return date for your round trip.');
        return;
      }
      if (new Date(returnDate) < new Date(travelDate)) {
        setErrorMessage('Return date cannot be earlier than your departure date.');
        return;
      }
    }

    onSearch({
      tripType,
      pickupCity: pickupCity.trim(),
      dropoffCity: dropoffCity.trim(),
      travelDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      pickupTime: pickupTime || '10:00',
    });
  };

  const filteredPickupCities = SAUDI_CITIES.filter(city => 
    city.toLowerCase().includes(pickupCity.toLowerCase())
  );

  const filteredDropoffCities = SAUDI_CITIES.filter(city => 
    city.toLowerCase().includes(dropoffCity.toLowerCase())
  );

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <section className="relative w-full min-h-[660px] lg:min-h-[700px] flex flex-col justify-between py-12 md:py-16 overflow-hidden">
      {/* Background Image of Kaaba with Pilgrims */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 transform scale-100"
        style={{
          backgroundImage: `url(${kaabaHeroImg})`,
        }}
      />

      {/* Dark Black Overlay (65–75% opacity) */}
      <div className="absolute inset-0 bg-black/70 backdrop-brightness-95" />

      {/* Subtle top ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col items-center justify-center">
        
        {/* Small Hero Controls (Top Center) matching Screenshot 1 */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
            title="Expand View"
            aria-label="Expand View"
          >
            <Maximize2 className="w-3.5 h-3.5 text-white/90" />
          </button>
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
            title={isPlayingAudio ? "Pause Ambient Sound" : "Play Holy Haramain Ambience"}
            aria-label="Toggle Ambience"
          >
            {isPlayingAudio ? (
              <Pause className="w-3.5 h-3.5 text-white/90" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white/90 ml-0.5" />
            )}
          </button>
        </div>

        {/* Hero Heading: Exact text from prompt */}
        <h1 className="font-playfair text-white text-center text-3xl sm:text-4xl lg:text-[42px] leading-[1.2] font-bold max-w-[850px] mb-3 tracking-normal drop-shadow-md">
          Find and book vehicles across Saudi Arabia
        </h1>

        {/* Hero Subtitle */}
        <p className="text-white/85 text-center text-sm sm:text-base font-normal max-w-[620px] mb-8 font-sans">
          Search by city or route, compare trusted companies, and book with confidence.
        </p>

        {/* Main Search Panel Card matching Screenshot 1 */}
        <div className="w-full max-w-[1065px] bg-white rounded-[14px] p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.22)] border border-[#E5E1D8]">
          <form onSubmit={handleSearchSubmit}>
            
            {/* Trip Type Radio Selection */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#111111] mb-2 uppercase tracking-wider">
                Trip type
              </label>
              <div className="flex items-center gap-3">
                {/* One-Way Trip Option */}
                <label 
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all border text-xs sm:text-sm font-medium ${
                    tripType === 'one-way'
                      ? 'bg-[#FBF7E9] border-[#C9A01B] text-[#111111] shadow-xs'
                      : 'bg-white border-[#E5E1D8] text-[#4B5563] hover:bg-[#F7F6F2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={tripType === 'one-way'}
                    onChange={() => setTripType('one-way')}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    tripType === 'one-way' ? 'border-[#C9A01B]' : 'border-[#9CA3AF]'
                  }`}>
                    {tripType === 'one-way' && (
                      <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />
                    )}
                  </div>
                  <span>One-Way Trip</span>
                </label>

                {/* Round-Way Trip Option */}
                <label 
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all border text-xs sm:text-sm font-medium ${
                    tripType === 'round-trip'
                      ? 'bg-[#FBF7E9] border-[#C9A01B] text-[#111111] shadow-xs'
                      : 'bg-white border-[#E5E1D8] text-[#4B5563] hover:bg-[#F7F6F2]'
                  }`}
                >
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={tripType === 'round-trip'}
                    onChange={() => setTripType('round-trip')}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    tripType === 'round-trip' ? 'border-[#C9A01B]' : 'border-[#9CA3AF]'
                  }`}>
                    {tripType === 'round-trip' && (
                      <div className="w-2 h-2 rounded-full bg-[#C9A01B]" />
                    )}
                  </div>
                  <span>Round-Way Trip</span>
                </label>
              </div>
            </div>

            {/* Error Message banner if any */}
            {errorMessage && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Search Input Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              
              {/* Field 1: Pickup City */}
              <div className="relative" ref={pickupRef}>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Pickup City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickupCity}
                    onChange={(e) => {
                      setPickupCity(e.target.value);
                      setShowPickupSuggestions(true);
                      setErrorMessage('');
                    }}
                    onFocus={() => setShowPickupSuggestions(true)}
                    placeholder="Type a city..."
                    className="w-full h-11 px-3.5 bg-white border border-[#E5E1D8] rounded-[10px] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-all"
                  />
                  {pickupCity && (
                    <button
                      type="button"
                      onClick={() => setPickupCity('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Pickup Suggestions Dropdown */}
                {showPickupSuggestions && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg border border-[#E5E1D8] shadow-lg max-h-48 overflow-y-auto z-50 py-1">
                    {filteredPickupCities.length > 0 ? (
                      filteredPickupCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setPickupCity(city);
                            setShowPickupSuggestions(false);
                          }}
                          className="w-full px-3 py-2 text-left text-xs text-[#111111] hover:bg-[#FBF7E9] hover:text-[#C9A01B] flex items-center gap-2"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                          <span>{city}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-gray-400">No Saudi city matched</div>
                    )}
                  </div>
                )}
              </div>

              {/* Field 2: Destination / Drop-off City */}
              <div className="relative" ref={dropoffRef}>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Destination / Drop-off City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={dropoffCity}
                    onChange={(e) => {
                      setDropoffCity(e.target.value);
                      setShowDropoffSuggestions(true);
                      setErrorMessage('');
                    }}
                    onFocus={() => setShowDropoffSuggestions(true)}
                    placeholder="Type a city..."
                    className="w-full h-11 px-3.5 bg-white border border-[#E5E1D8] rounded-[10px] text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-all"
                  />
                  {dropoffCity && (
                    <button
                      type="button"
                      onClick={() => setDropoffCity('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Dropoff Suggestions Dropdown */}
                {showDropoffSuggestions && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg border border-[#E5E1D8] shadow-lg max-h-48 overflow-y-auto z-50 py-1">
                    {filteredDropoffCities.length > 0 ? (
                      filteredDropoffCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setDropoffCity(city);
                            setShowDropoffSuggestions(false);
                          }}
                          className="w-full px-3 py-2 text-left text-xs text-[#111111] hover:bg-[#FBF7E9] hover:text-[#C9A01B] flex items-center gap-2"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                          <span>{city}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-xs text-gray-400">No Saudi city matched</div>
                    )}
                  </div>
                )}
              </div>

              {/* Field 3: Travel Date */}
              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                  Travel date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={today}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-[#E5E1D8] rounded-[10px] text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-all cursor-pointer"
                  />
                </div>
              </div>

              {/* Field 4: Return Date (if Round-Way) OR Pickup Time */}
              {tripType === 'round-trip' ? (
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Return date
                  </label>
                  <input
                    type="date"
                    min={travelDate || today}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full h-11 px-3 bg-white border border-[#E5E1D8] rounded-[10px] text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-all cursor-pointer"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                    Pickup time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="--:-- --"
                      className="w-full h-11 px-3 bg-white border border-[#E5E1D8] rounded-[10px] text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Search Button */}
              <div>
                <button
                  type="submit"
                  className="w-full h-11 bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-sm sm:text-base rounded-full shadow-[0_2px_6px_rgba(201,160,27,0.3)] hover:shadow-[0_4px_10px_rgba(201,160,27,0.45)] transition-all flex items-center justify-center cursor-pointer"
                >
                  Search
                </button>
              </div>

            </div>

            {/* Quick popular routes pill shortcuts */}
            <div className="mt-3.5 pt-3 border-t border-[#F0ECE1] flex items-center flex-wrap gap-2 text-xs text-[#6B7280]">
              <span className="font-medium text-[#111111]">Popular:</span>
              <button
                type="button"
                onClick={() => {
                  setPickupCity('Jeddah');
                  setDropoffCity('Makkah');
                }}
                className="hover:text-[#C9A01B] hover:underline"
              >
                Jeddah → Makkah
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setPickupCity('Makkah');
                  setDropoffCity('Madinah');
                }}
                className="hover:text-[#C9A01B] hover:underline"
              >
                Makkah → Madinah
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setPickupCity('Riyadh');
                  setDropoffCity('Dammam');
                }}
                className="hover:text-[#C9A01B] hover:underline"
              >
                Riyadh → Dammam
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => {
                  setPickupCity('Makkah');
                  setDropoffCity('Taif');
                }}
                className="hover:text-[#C9A01B] hover:underline"
              >
                Makkah → Taif
              </button>
            </div>

          </form>
        </div>

        {/* Trust & Benefits Row matching Screenshot 1 */}
        <div className="mt-8 flex items-center justify-center flex-wrap gap-4 sm:gap-8 max-w-[1000px] text-white">
          
          {/* Benefit 1 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Verified Companies
            </span>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Transparent Pricing
            </span>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Direct Contact — No Middleman
            </span>
          </div>

          {/* Benefit 4 */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide">
              Cities Across Saudi Arabia
            </span>
          </div>

        </div>

        {/* Read Our Latest Blog Posts Pill Button matching Screenshot 1 */}
        <div className="mt-6">
          <button
            onClick={onNavigateToBlog}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white text-xs sm:text-sm font-medium transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C9A01B]" />
            <span>Read Our Latest Blog Posts</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>

      </div>
    </section>
  );
};
