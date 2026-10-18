import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  ChevronDown,
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  Globe,
  Share2,
  Car, 
  Users, 
  Briefcase, 
  GitBranch,
  Package,
  Edit3,
  X,
  Send,
  Check,
  Calendar,
  Clock,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { TravelAgency, Vehicle, TRAVEL_AGENCIES } from '../data/mockData';

interface CompanyProfilePageViewProps {
  agency: TravelAgency;
  vehicles: Vehicle[];
  onBackToAgencies: () => void;
  onGoHome: () => void;
  onBookVehicle: (vehicle: Vehicle) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onSelectOtherAgency?: (agency: TravelAgency) => void;
  allAgencies?: TravelAgency[];
}

export const CompanyProfilePageView: React.FC<CompanyProfilePageViewProps> = ({
  agency,
  vehicles,
  onBackToAgencies,
  onGoHome,
  onBookVehicle,
  onSelectVehicle,
  onSelectOtherAgency,
  allAgencies = [],
}) => {
  // Navigation / Tab state within company profile card (Screenshot Capture.PNG)
  const [activeSubTab, setActiveSubTab] = useState<'Overview' | 'License Verification' | 'Contact Info'>('Overview');
  
  // Interactive button states matching Capture.PNG
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Expanded vehicle feature details matching Capture2.PNG
  const [expandedVehicles, setExpandedVehicles] = useState<{ [id: string]: boolean }>({});

  // Review states matching Capture3.PNG & Capture4.PNG
  const [reviewsList, setReviewsList] = useState<Array<{ name: string; rating: number; date: string; comment: string }>>([]);
  const [newRating, setNewRating] = useState(5);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmittedToast, setReviewSubmittedToast] = useState(false);

  // Inquire form state
  const [inquireName, setInquireName] = useState('');
  const [inquirePhone, setInquirePhone] = useState('');
  const [inquireDate, setInquireDate] = useState('');
  const [inquirePassengers, setInquirePassengers] = useState('4');
  const [inquireNotes, setInquireNotes] = useState('');
  const [inquireSubmitted, setInquireSubmitted] = useState(false);

  // Filter vehicles belonging to this agency
  const agencyVehicles = vehicles.filter(v => v.companyId === agency.id);
  // Fallback to display at least the GMC Yukon or relevant car if not strictly matched
  const displayVehicles = agencyVehicles.length > 0 
    ? agencyVehicles 
    : vehicles.filter(v => v.id === 'veh-gmc-yukon-2023' || v.name.includes('Yukon')).concat(vehicles.slice(0, 1));

  const toggleVehicleDetails = (vehId: string) => {
    setExpandedVehicles(prev => ({
      ...prev,
      [vehId]: !prev[vehId]
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;

    const newRev = {
      name: newReviewerName.trim() || 'Verified Pilgrim',
      rating: newRating,
      date: 'Just now',
      comment: newReviewComment.trim()
    };

    setReviewsList(prev => [newRev, ...prev]);
    setShowReviewModal(false);
    setNewReviewerName('');
    setNewReviewComment('');
    setReviewSubmittedToast(true);
    setTimeout(() => setReviewSubmittedToast(false), 3500);
  };

  const handleInquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquireSubmitted(true);
    setTimeout(() => {
      setShowInquireModal(false);
      setInquireSubmitted(false);
      setInquireName('');
      setInquirePhone('');
      setInquireNotes('');
    }, 2000);
  };

  // Full address display matching Capture.PNG
  const fullAddress = agency.address || `Office #2, 2nd Floor, Sindhu Trade Centre, Moon Market, Allama Iqbal Town, ${agency.city}`;

  // Calculate review stats
  const totalReviewsCount = agency.reviewCount + reviewsList.length;
  const currentRatingScore = totalReviewsCount > 0 
    ? (agency.rating * agency.reviewCount + reviewsList.reduce((acc, r) => acc + r.rating, 0)) / totalReviewsCount
    : 0;

  return (
    <div className="w-full bg-white pb-24 font-sans selection:bg-[#C9A01B]/20">
      
      {/* 1. Breadcrumbs Bar (Quick navigation back to home or travel agencies) */}
      <div className="w-full bg-[#FAF7EE] border-b border-[#EAE5D9] py-3">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <button
              onClick={onGoHome}
              className="flex items-center gap-1 hover:text-[#C9A01B] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#A0A5B1]" />
            <button
              onClick={onBackToAgencies}
              className="hover:text-[#C9A01B] transition-colors cursor-pointer"
            >
              Travel Agencies
            </button>
            <ChevronRight className="w-3 h-3 text-[#A0A5B1]" />
            <span className="font-semibold text-[#111111] truncate max-w-[200px] sm:max-w-none">
              {agency.name}
            </span>
          </nav>

          <button
            onClick={onBackToAgencies}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B7280] hover:text-[#111111] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Companies</span>
          </button>
        </div>
      </div>

      {/* 2. Panoramic Fleet Cover Photo Banner matching Screenshot Capture.PNG */}
      <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[380px] bg-neutral-900 overflow-hidden">
        <img
          src={agency.coverImage}
          alt={`${agency.name} fleet`}
          className="w-full h-full object-cover object-center brightness-95"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/src/assets/images/agency_riyadh_fleet_cover_1792229464185.jpg';
          }}
        />
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
      </div>

      {/* 3. Main Floating Profile Card matching Screenshot Capture.PNG & Capture1.PNG */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 relative -mt-20 sm:-mt-24 z-10">
        <div className="bg-white rounded-[24px] border border-[#E5E1D8] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-6 sm:p-8">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            {/* Avatar & Agency Details */}
            <div className="flex items-start gap-4 sm:gap-5">
              
              {/* Overlapping Company Avatar */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black p-1 border border-gray-200 overflow-hidden shrink-0 shadow-xs">
                <img
                  src={agency.avatarImage}
                  alt={agency.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=150&auto=format&fit=crop&q=80';
                  }}
                />
              </div>

              {/* Title, rating, vehicle count & location */}
              <div className="space-y-1.5">
                <h1 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] leading-tight">
                  {agency.name}
                </h1>

                {/* Rating badge & vehicle count pill matching Capture.PNG */}
                <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#D5D0C6] text-xs font-semibold text-[#111111] bg-white">
                    <Star className="w-3.5 h-3.5 text-[#C9A01B] fill-[#C9A01B]" />
                    <span>{currentRatingScore > 0 ? currentRatingScore.toFixed(0) : 0}</span>
                  </div>
                  
                  <span className="text-xs text-[#6B7280]">
                    {totalReviewsCount > 0 ? `${totalReviewsCount} reviews` : 'No reviews yet'}
                  </span>

                  <span className="text-xs text-[#6B7280]">·</span>

                  <span className="inline-flex items-center gap-1 text-xs text-[#6B7280]">
                    <Car className="w-3.5 h-3.5 text-[#6B7280]" />
                    <span>{displayVehicles.length} {displayVehicles.length === 1 ? 'vehicle' : 'vehicles'}</span>
                  </span>
                </div>

                {/* Location matching Capture.PNG */}
                <div className="flex items-start gap-1.5 text-xs text-[#4B5563] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#6B7280] shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    Location: {fullAddress}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Action Buttons Row matching Screenshot Capture.PNG */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mt-6 pt-2 border-t border-gray-100">
            
            {/* 1. Phone Button (Click to reveal) */}
            {phoneRevealed ? (
              <a
                href={`tel:${agency.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#C9A01B] bg-[#FAF7EE] text-[#C9A01B] text-xs font-bold transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A01B]" />
                <span>{agency.phone}</span>
              </a>
            ) : (
              <button
                onClick={() => setPhoneRevealed(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#C9A01B] text-[#C9A01B] bg-white hover:bg-[#FAF7EE] text-xs font-semibold transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A01B]" />
                <span>Click to reveal</span>
              </button>
            )}

            {/* 2. WhatsApp Button */}
            <a
              href={`https://wa.me/${agency.whatsapp.replace(/[^0-9]/g, '')}?text=Assalam%20Alaikum,%20I%20am%20inquiring%20about%20booking%20with%20${encodeURIComponent(agency.name)}%20via%20FlyKaaba`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#25D366] text-[#25D366] bg-white hover:bg-emerald-50 text-xs font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* 3. Website Button */}
            <a
              href={agency.website || `https://${agency.slug}.sa`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#C9A01B] text-[#C9A01B] bg-white hover:bg-[#FAF7EE] text-xs font-semibold transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#C9A01B]" />
              <span>Website</span>
            </a>

            {/* 4. Share Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-gray-600" />
              <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
            </button>

            {/* 5. Inquire Now Button */}
            <button
              onClick={() => setShowInquireModal(true)}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#B8860B] hover:brightness-105 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              Inquire Now
            </button>

          </div>

          {/* Sub Navigation Tabs matching Screenshot Capture.PNG */}
          <div className="mt-7">
            <div className="bg-[#F3F4F6] p-1 rounded-xl inline-flex items-center gap-1">
              {(['Overview', 'License Verification', 'Contact Info'] as const).map((tab) => {
                const isActive = activeSubTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveSubTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C9A01B] text-white shadow-xs'
                        : 'text-[#4B5563] hover:text-[#111111]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content 1: Overview matching Screenshot Capture.PNG & Capture1.PNG */}
          {activeSubTab === 'Overview' && (
            <div className="mt-8 space-y-7">
              <div>
                <h2 className="font-playfair text-xl font-bold text-[#111111] mb-2">
                  About Us
                </h2>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {agency.description || "This company hasn't added a description yet."}
                </p>
              </div>

              <div>
                <h2 className="font-playfair text-xl font-bold text-[#111111] mb-2">
                  Services
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280]">
                  No services listed yet.
                </p>
              </div>
            </div>
          )}

          {/* Tab Content 2: License Verification */}
          {activeSubTab === 'License Verification' && (
            <div className="mt-8 space-y-4">
              <h2 className="font-playfair text-xl font-bold text-[#111111] mb-2">
                Ministry of Transport License Verification
              </h2>
              <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9] max-w-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Commercial MOT Registration:</span>
                  <span className="font-bold text-gray-900">{agency.licenseNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Operating Authority:</span>
                  <span className="font-semibold text-gray-800">Transport General Authority (TGA) Saudi Arabia</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Passenger Liability Insurance:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fully Insured
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Driver Background Check:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Background Verified
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Contact Info */}
          {activeSubTab === 'Contact Info' && (
            <div className="mt-8 space-y-4">
              <h2 className="font-playfair text-xl font-bold text-[#111111] mb-2">
                Headquarters & Dispatch
              </h2>
              <div className="p-4 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9] max-w-xl text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Address:</span>
                  <span className="font-semibold text-gray-900 text-right">{fullAddress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-semibold text-gray-900">{agency.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-semibold text-gray-900">{agency.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Dispatch Support:</span>
                  <span className="font-semibold text-gray-900">24/7 Operations</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 4. Routes Section matching Screenshot Capture1.PNG */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mt-12">
        <h2 className="font-playfair text-2xl font-bold text-[#111111] mb-4">
          Routes
        </h2>
        <div className="bg-white rounded-[20px] border border-[#E5E1D8] p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF7EE] text-[#C9A01B] flex items-center justify-center mx-auto mb-3">
            <GitBranch className="w-6 h-6 text-[#C9A01B]" />
          </div>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            No routes listed yet — check back soon.
          </p>
        </div>
      </div>

      {/* 5. Our Vehicles Section matching Screenshot Capture2.PNG */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mt-12">
        <h2 className="font-playfair text-2xl font-bold text-[#111111] mb-5">
          Our Vehicles
        </h2>

        <div className="space-y-4">
          {displayVehicles.map((veh) => {
            const isExpanded = expandedVehicles[veh.id];

            return (
              <div
                key={veh.id}
                className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-sm transition-all flex flex-col md:flex-row"
              >
                {/* Vehicle Image on Left */}
                <div 
                  onClick={() => onSelectVehicle(veh)}
                  className="w-full md:w-72 lg:w-80 h-52 md:h-auto bg-neutral-100 overflow-hidden shrink-0 relative cursor-pointer"
                >
                  <img
                    src={veh.images[0]}
                    alt={veh.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Middle Details column matching Capture2.PNG */}
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[#8B6D12] text-[11px] font-bold uppercase tracking-wider block mb-1">
                      {veh.category}
                    </span>

                    <h3 
                      onClick={() => onSelectVehicle(veh)}
                      className="font-playfair text-xl font-bold text-[#111111] hover:text-[#C9A01B] transition-colors cursor-pointer"
                    >
                      {veh.name}
                    </h3>

                    {/* "by Riyadh Fleet Co" with avatar */}
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-1.5">
                      <img
                        src={agency.avatarImage}
                        alt=""
                        className="w-4 h-4 rounded-full object-cover border border-gray-200"
                      />
                      <span>by {agency.name}</span>
                    </div>

                    {/* Seats info */}
                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-2.5">
                      <Users className="w-3.5 h-3.5 text-gray-500" />
                      <span>{veh.passengerCapacity} seats</span>
                    </div>

                    {/* Features and price details collapsible toggle */}
                    <button
                      onClick={() => toggleVehicleDetails(veh.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B6D12] hover:text-[#C9A01B] mt-4 cursor-pointer select-none"
                    >
                      <span>Features and price details</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-4 pt-3 border-t border-[#F5F2EA] space-y-2 text-xs text-[#4B5563] animate-in fade-in-50">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-1">
                          <div><span className="text-gray-500">Luggage:</span> <span className="font-semibold text-gray-800">{veh.luggageCapacity} bags</span></div>
                          <div><span className="text-gray-500">Transmission:</span> <span className="font-semibold text-gray-800">{veh.transmission}</span></div>
                          <div><span className="text-gray-500">Climate:</span> <span className="font-semibold text-gray-800">Dual A/C</span></div>
                        </div>
                        <div className="flex items-center gap-1 text-green-700">
                          <Check className="w-3.5 h-3.5" />
                          <span>Includes professional driver, fuel, tolls, and Zamzam water</span>
                        </div>
                        <div className="flex items-center gap-1 text-green-700">
                          <Check className="w-3.5 h-3.5" />
                          <span>Free cancellation up to 24 hours prior</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Price and Book Now button matching Capture2.PNG */}
                <div className="p-5 md:p-6 md:border-l border-[#F0ECE1] flex flex-row md:flex-col items-center md:items-end justify-between min-w-[200px] bg-[#FAF7EE]/20">
                  <div className="text-left md:text-right">
                    <div className="text-2xl font-black text-[#111111] leading-none">
                      {veh.pricePerDay} SAR
                    </div>
                    <div className="text-xs text-[#6B7280] mt-1">
                      /day
                    </div>
                  </div>

                  <button
                    onClick={() => onBookVehicle(veh)}
                    className="px-7 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Two-Column Lower Section: "My Packages" & "Agency Highlights" matching Capture2.PNG */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Column 1: My Packages */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 font-playfair text-lg font-bold text-[#111111] mb-3">
              <Package className="w-4 h-4 text-[#C9A01B]" />
              <span>My Packages</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E1D8] p-12 text-center shadow-xs h-[180px] flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#FAF7EE] text-[#C9A01B] flex items-center justify-center mb-2.5">
                <Package className="w-5 h-5 text-[#C9A01B]" />
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280]">
                No packages listed yet — check back soon.
              </p>
            </div>
          </div>

          {/* Column 2: Agency Highlights */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 font-playfair text-lg font-bold text-[#111111] mb-3">
              <ShieldCheck className="w-4 h-4 text-[#C9A01B]" />
              <span>Agency Highlights</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-3.5 shadow-xs h-[180px] flex flex-col justify-center">
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 active package</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Based in {agency.city}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#111111]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Transport License</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 7. "What Our Users Say" Reviews Section matching Capture3.PNG & Capture4.PNG */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 mt-20 pt-4">
        
        {/* Section Heading matching Capture3.PNG */}
        <div className="text-center mb-10">
          <h2 className="font-playfair text-3xl sm:text-[34px] font-bold text-[#111111] mb-2 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto">
            Hear directly from our happy customers about their booking experience and service quality.
          </p>
        </div>

        {/* 2-Column Review Grid matching Capture3.PNG & Capture4.PNG */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Customer Reviews Breakdown & Share your thoughts */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h3 className="font-playfair text-xl font-bold text-[#111111] mb-2">
                Customer Reviews
              </h3>

              {/* Stars & Count */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-gray-300">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(currentRatingScore) && currentRatingScore > 0
                          ? 'fill-[#C9A01B] text-[#C9A01B]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-[#6B7280]">
                  Based on {totalReviewsCount} {totalReviewsCount === 1 ? 'review' : 'reviews'}
                </span>
              </div>

              {/* 5-Star Distribution Bars matching Capture3.PNG */}
              <div className="space-y-2 text-xs">
                {[1, 2, 3, 4, 5].map((starNum) => {
                  const percent = totalReviewsCount > 0 
                    ? (reviewsList.filter(r => r.rating === starNum).length / totalReviewsCount) * 100
                    : 0;

                  return (
                    <div key={starNum} className="flex items-center gap-2.5">
                      <span className="w-3 text-right font-medium text-gray-600">{starNum}</span>
                      <Star className="w-3.5 h-3.5 fill-[#C9A01B] text-[#C9A01B] shrink-0" />
                      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full bg-[#C9A01B] rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-[11px] text-gray-500 font-medium">
                        {Math.round(percent)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Share your thoughts block matching Screenshot Capture4.PNG */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="font-playfair text-base font-bold text-[#111111] mb-1">
                Share your thoughts
              </h4>
              <p className="text-xs text-[#6B7280] mb-3">
                If you've booked with this agency, share your thoughts with other customers
              </p>

              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full py-2.5 px-4 rounded-lg bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Write a review</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customer Reviews List or Empty Card matching Capture3.PNG */}
          <div className="md:col-span-8">
            {reviewsList.length > 0 ? (
              <div className="space-y-4">
                {reviewsList.map((rev, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-xs text-[#111111]">{rev.name}</span>
                      <span className="text-[11px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-[#C9A01B] mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-[#C9A01B] text-[#C9A01B]' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-8 text-center text-xs text-[#6B7280] shadow-xs">
                No reviews yet — customers can review this agency after a completed booking.
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 8. Other Verified Transport Companies in Saudi Arabia matching Screenshot Capture5.PNG */}
      {(() => {
        const otherCompanies = (allAgencies.length > 0 ? allAgencies : TRAVEL_AGENCIES).filter(
          (a) => a.id !== agency.id
        );

        if (otherCompanies.length === 0) return null;

        return (
          <div className="w-full bg-[#F7F6F2] py-14 sm:py-16 border-t border-[#E5E1D8] mt-20">
            <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
              
              <div className="text-center mb-10">
                <h2 className="font-playfair text-[#111111] text-2xl sm:text-[30px] font-bold tracking-tight mb-2">
                  Other Verified Transport Companies in Saudi Arabia
                </h2>
                <p className="text-[#6B7280] text-xs sm:text-sm font-normal">
                  Explore and compare other official licensed pilgrimage and executive transport operators.
                </p>
              </div>

              {/* Grid matching Screenshot Capture5.PNG */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {otherCompanies.slice(0, 4).map((other) => (
                  <div
                    key={other.id}
                    onClick={() => {
                      if (onSelectOtherAgency) {
                        onSelectOtherAgency(other);
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group bg-white rounded-[14px] border border-[#E5E1D8] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:border-[#C9A01B]/50 transition-all duration-300 flex flex-col cursor-pointer"
                  >
                    {/* Cover image */}
                    <div className="relative w-full h-[110px] sm:h-[115px] bg-neutral-200 overflow-hidden">
                      <img
                        src={other.coverImage}
                        alt={other.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/src/assets/images/agency_alfaisal_cover_1792229464259.jpg';
                        }}
                      />
                      {other.isVerified && (
                        <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#2563EB] text-white text-[10px] font-bold tracking-wider shadow-xs uppercase">
                          <ShieldCheck className="w-3 h-3 text-white" />
                          <span>VERIFIED</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Content Area */}
                    <div className="relative px-4 pt-5 pb-4 flex-1 flex flex-col justify-between">
                      {/* Overlapping Company Avatar */}
                      <div className="absolute -top-7 left-4 w-12 h-12 rounded-xl bg-white p-0.5 border border-[#E5E1D8] shadow-sm overflow-hidden">
                        <img
                          src={other.avatarImage}
                          alt={`${other.name} logo`}
                          className="w-full h-full object-cover rounded-[10px]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&auto=format&fit=crop&q=80';
                          }}
                        />
                      </div>

                      <div className="mt-2">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-playfair text-[#111111] text-[15px] font-bold group-hover:text-[#C9A01B] transition-colors truncate">
                            {other.name}
                          </h3>
                          {other.isVerified && (
                            <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-[#6B7280] mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                          <span>{other.city}</span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mt-3 pt-2.5 border-t border-[#F5F2EA] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-[#C9A01B] fill-[#C9A01B]" />
                          <span className="font-semibold text-[#111111]">
                            {other.rating > 0 ? other.rating.toFixed(1) : 'New'}
                          </span>
                          <span className="text-[#6B7280]">
                            ({other.reviewCount})
                          </span>
                        </div>
                        <span className="text-[#8B6D12] group-hover:text-[#C9A01B] font-semibold text-[11px] inline-flex items-center gap-0.5">
                          View Profile &rarr;
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* View all companies button */}
              <div className="text-center mt-9">
                <button
                  onClick={onBackToAgencies}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-[#F0ECE1] text-[#111111] border border-[#D5D0C6] text-xs font-semibold transition-all shadow-xs hover:shadow-sm cursor-pointer"
                >
                  View all transport companies
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Review Submitted Toast */}
      {reviewSubmittedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-medium animate-in fade-in-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Thank you! Your verified review has been published.</span>
        </div>
      )}

      {/* ================= MODAL 1: WRITE A REVIEW ================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E1D8] relative animate-in fade-in-50">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-playfair text-xl font-bold text-[#111111] mb-1">
              Write a Review for {agency.name}
            </h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Share details regarding driver punctuality, vehicle cleanliness, and overall experience.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= newRating ? 'fill-[#C9A01B] text-[#C9A01B]' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-gray-800 text-sm">{newRating} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewerName}
                  onChange={(e) => setNewReviewerName(e.target.value)}
                  placeholder="e.g. Haji Ahmad (UK) or Traveler"
                  className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Review Comments</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="The driver was very polite, car was clean and comfortable..."
                  className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C9A01B] text-white font-bold hover:bg-[#b89115]"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: INQUIRE NOW ================= */}
      {showInquireModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E1D8] relative animate-in fade-in-50">
            <button
              onClick={() => setShowInquireModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={agency.avatarImage}
                alt=""
                className="w-10 h-10 rounded-xl object-cover border border-gray-200"
              />
              <div>
                <h3 className="font-playfair text-lg font-bold text-[#111111]">
                  Inquire with {agency.name}
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Direct transport inquiry for transfers, customized trips, and group packages.
                </p>
              </div>
            </div>

            {inquireSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="font-playfair font-bold text-base text-gray-900">Inquiry Sent Successfully!</h4>
                <p className="text-xs text-gray-600">
                  {agency.name} has received your trip inquiry and will respond via WhatsApp or Phone shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquireSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={inquireName}
                      onChange={(e) => setInquireName(e.target.value)}
                      placeholder="e.g. Sara Al-Otaibi"
                      className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={inquirePhone}
                      onChange={(e) => setInquirePhone(e.target.value)}
                      placeholder="+966 5x xxx xxxx"
                      className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Planned Travel Date</label>
                    <input
                      type="date"
                      value={inquireDate}
                      onChange={(e) => setInquireDate(e.target.value)}
                      className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">Passengers</label>
                    <select
                      value={inquirePassengers}
                      onChange={(e) => setInquirePassengers(e.target.value)}
                      className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B] bg-white"
                    >
                      <option value="1-2">1-2 Passengers (Sedan)</option>
                      <option value="3-4">3-4 Passengers (Executive)</option>
                      <option value="5-7">5-7 Passengers (SUV / GMC)</option>
                      <option value="8-14">8-14 Passengers (Van)</option>
                      <option value="15+">15+ Group Delegation (Bus)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Route & Requirements</label>
                  <textarea
                    rows={3}
                    value={inquireNotes}
                    onChange={(e) => setInquireNotes(e.target.value)}
                    placeholder="e.g. Airport reception at KAIA Terminal 1 to Makkah Hotel, require baby seat and luggage assistance..."
                    className="w-full p-2.5 border border-[#D5D0C6] rounded-lg focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <a
                    href={`https://wa.me/${agency.whatsapp.replace(/[^0-9]/g, '')}?text=Assalam%20Alaikum,%20inquiry%20from%20FlyKaaba`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Directly</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowInquireModal(false)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D4A017] to-[#B8860B] text-white font-bold hover:brightness-105"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
