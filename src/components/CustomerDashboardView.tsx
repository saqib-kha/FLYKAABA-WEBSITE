import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Ticket, 
  Heart, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Search, 
  Volume2, 
  ChevronDown, 
  MapPin, 
  Clock, 
  Calendar, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Share2, 
  Download, 
  QrCode,
  ShieldCheck,
  Send,
  Car,
  Mic
} from 'lucide-react';
import { BookingRecord, Vehicle, FEATURED_VEHICLES } from '../data/mockData';
import { FlyKaabaLogo } from './FlyKaabaLogo';

interface CustomerDashboardViewProps {
  currentUser: { name: string; email: string; role: string } | null;
  bookings: BookingRecord[];
  onGoHome: () => void;
  onLogout?: () => void;
  onFindVehicle?: () => void;
  onCancelBooking?: (bookingId: string) => void;
  onOpenInsForgeModal?: () => void;
}

export const CustomerDashboardView: React.FC<CustomerDashboardViewProps> = ({
  currentUser,
  bookings,
  onGoHome,
  onLogout,
  onFindVehicle,
  onCancelBooking,
  onOpenInsForgeModal,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'saved' | 'messages' | 'notifications' | 'profile' | 'settings'>('dashboard');
  const [accountSubmenuOpen, setAccountSubmenuOpen] = useState(true);
  const [selectedBookingForVoucher, setSelectedBookingForVoucher] = useState<BookingRecord | null>(null);
  const [bookingFilter, setBookingFilter] = useState<'Pending' | 'Upcoming' | 'Traveling' | 'Needs your confirmation' | 'Completed' | 'Cancelled'>('Pending');
  
  // Dedicated Booking Detail State matching screenshots 1_730fe0fb.PNG and 2_a7e170a4.PNG
  const [selectedBookingDetail, setSelectedBookingDetail] = useState<BookingRecord | null>(null);
  const [bookingTimeline, setBookingTimeline] = useState<Array<{ title: string; time: string; color: string }>>([
    { title: 'Booking request sent', time: '10/23/2026, 6:22:25 AM', color: '#D97706' }
  ]);
  const [bookingThread, setBookingThread] = useState<Array<{ sender: string; text: string; time: string; isCompany: boolean }>>([]);
  const [bookingMessageInput, setBookingMessageInput] = useState('');

  // Dedicated Chat Conversation State for Messages tab (independent from bookings)
  const [selectedChatConv, setSelectedChatConv] = useState<{
    id: string;
    companyName: string;
    bookingRef: string;
    vehicleName: string;
    booking: BookingRecord;
  } | null>(null);

  // Message input state for general direct messages tab
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Najd Premier Cars Dispatcher', text: 'Salam alaykum Sara! We have received your booking request for the BMW 7 Series. Our driver Mohammad will coordinate pickup at Terminal 1.', time: '10:45 AM', isCompany: true },
    { sender: 'You', text: 'Wa alaykum assalam. Please confirm if 2 large suitcases can fit comfortably in the trunk.', time: '11:10 AM', isCompany: false },
    { sender: 'Najd Premier Cars Dispatcher', text: 'Yes, the BMW 7 Series executive trunk accommodates 3 full-size bags and 2 carry-ons easily.', time: '11:15 AM', isCompany: true }
  ]);

  // Profile Form state
  const [profileName, setProfileName] = useState(currentUser?.name || 'Sara Al Qahtani');
  const [profilePhone, setProfilePhone] = useState('+966 50 123 4567');
  const [profileEmail, setProfileEmail] = useState(currentUser?.email || 'sara@example.com');
  const [profileCity, setProfileCity] = useState('Riyadh');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);
  const [audioActive, setAudioActive] = useState(true);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', title: 'Booking Request Submitted', desc: 'Your reservation for BMW 7 Series 2023 with Najd Premier Cars is waiting for company confirmation.', time: '2 hours ago', read: false },
    { id: 'notif-2', title: 'New Message from Dispatcher', desc: 'Najd Premier Cars sent a message regarding baggage capacity.', time: '5 hours ago', read: true },
    { id: 'notif-3', title: 'Welcome to FlyKaaba', desc: 'Your pilgrim travel profile is verified. Enjoy luxury transport across Saudi Arabia.', time: '1 day ago', read: true }
  ]);

  // User display name & initials
  const fullName = currentUser?.name || 'Sara Al Qahtani';
  const firstName = fullName.split(' ')[0] || 'Sara';
  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('') || 'SA';

  // Seed sample BMW booking matching user screenshot image_2df764b7.png exactly
  const defaultSampleBooking: BookingRecord = {
    id: 'sample-bmw-1',
    referenceNumber: 'BK92',
    vehicleName: 'BMW 7 Series 2023',
    vehicleCategory: 'Luxury Sedan',
    companyName: 'Najd Premier Cars',
    pickupCity: 'Riyadh Airport (RUH)',
    destinationCity: 'Buraydah',
    travelDate: '28 Oct 2026',
    returnDate: '29 Oct 2026',
    pickupTime: '11:25',
    tripType: 'one-way' as any,
    passengers: 1,
    totalPriceSar: 900,
    customerName: fullName,
    customerPhone: '+966 50 123 4567',
    customerEmail: currentUser?.email || 'sara@example.com',
    specialRequests: 'VIP executive terminal reception requested.',
    status: 'Pending' as any,
    createdAt: '10/23/2026, 6:22:25 AM',
  };

  const allBookings = bookings.length > 0 ? bookings : [defaultSampleBooking];
  const waitingBooking = allBookings.find(b => (b.status as any) === 'Pending' || b.status === 'Pending Confirmation') || defaultSampleBooking;
  const recentBooking = allBookings[0] || defaultSampleBooking;

  // Stats calculation matching Screenshot image_052cefce.png & image_2df764b7.png
  const pendingCount = allBookings.filter(b => (b.status as any) === 'Pending' || b.status === 'Pending Confirmation').length || 1;
  const waitingForReplyCount = pendingCount;
  const upcomingCount = allBookings.filter(b => b.status === 'Confirmed').length;
  const completedCount = allBookings.filter(b => b.status === 'Completed').length;
  const cancelledCount = allBookings.filter(b => b.status === 'Cancelled').length;
  const travelingNowCount = 0;
  const needsConfirmationCount = 0;
  const savedVehiclesCount = 0;

  const filteredBookings = allBookings.filter(b => {
    if (bookingFilter === 'Pending') return (b.status as any) === 'Pending' || b.status === 'Pending Confirmation';
    if (bookingFilter === 'Upcoming') return b.status === 'Confirmed';
    if (bookingFilter === 'Traveling') return false;
    if (bookingFilter === 'Needs your confirmation') return false;
    if (bookingFilter === 'Completed') return b.status === 'Completed';
    if (bookingFilter === 'Cancelled') return b.status === 'Cancelled';
    return true;
  });

  // Conversations list for Messages tab matching image_5550bb5f.png
  const conversations = allBookings.map((b) => ({
    id: b.id,
    companyName: b.companyName,
    bookingRef: b.referenceNumber,
    lastMessage: bookingThread.length > 0 
      ? bookingThread[bookingThread.length - 1].text 
      : 'No messages yet',
    booking: b,
  }));

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'You', text: messageInput.trim(), time: 'Just now', isCompany: false }
    ]);
    setMessageInput('');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccessMsg(true);
    setTimeout(() => setProfileSuccessMsg(false), 3000);
  };

  const handleCancelCurrentBooking = () => {
    if (!selectedBookingDetail || selectedBookingDetail.status === 'Cancelled') return;
    const now = new Date().toLocaleString();
    setBookingTimeline(prev => [
      ...prev,
      { title: 'Booking cancelled by customer', time: now, color: '#DC2626' }
    ]);
    setSelectedBookingDetail(prev => prev ? { ...prev, status: 'Cancelled' as any } : null);
    if (onCancelBooking) {
      onCancelBooking(selectedBookingDetail.id);
    }
  };

  const handleSendBookingDetailMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingMessageInput.trim()) return;
    const text = bookingMessageInput.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setBookingThread(prev => [
      ...prev,
      { sender: fullName, text, time, isCompany: false }
    ]);
    setBookingMessageInput('');

    // Simulated company acknowledgment
    setTimeout(() => {
      setBookingThread(prev => [
        ...prev,
        {
          sender: `${selectedBookingDetail?.companyName || selectedChatConv?.companyName || 'Najd Premier Cars'} Dispatcher`,
          text: 'Salam! We received your message and our dispatch team has noted it on your booking record.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isCompany: true
        }
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col md:flex-row font-sans selection:bg-[#C9A01B]/20 selection:text-[#111111]">
      
      {/* ================= LEFT SIDEBAR (Fixed) matching image_052cefce.png & screenshots ================= */}
      <aside className="w-full md:fixed md:top-0 md:left-0 md:bottom-0 md:w-60 lg:w-64 md:h-screen bg-[#141416] text-white shrink-0 flex flex-col justify-between p-4 sm:p-5 border-r border-[#26262A] z-30 overflow-y-auto">
        
        <div>
          {/* Logo & "My Account" Brand Header */}
          <div className="flex items-center gap-3 mb-7 pt-1 px-1">
            <div className="bg-white rounded-xl px-2.5 py-1.5 flex items-center justify-center shrink-0 shadow-xs">
              <FlyKaabaLogo width="84" height="22" className="w-[84px] h-[22px]" />
            </div>
            <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
              My Account
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs sm:text-sm font-medium">
            
            {/* 1. Dashboard */}
            <button
              onClick={() => {
                setSelectedBookingDetail(null);
                setSelectedChatConv(null);
                setActiveTab('dashboard');
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#C9A01B] text-[#111111] font-bold shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
              <span>Dashboard</span>
            </button>

            {/* 2. My bookings */}
            <button
              onClick={() => {
                setSelectedBookingDetail(null);
                setSelectedChatConv(null);
                setActiveTab('bookings');
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-[#C9A01B] text-[#111111] font-bold shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Ticket className="w-4 h-4 shrink-0" />
              <span>My bookings</span>
            </button>

            {/* 3. Saved vehicles */}
            <button
              onClick={() => {
                setSelectedBookingDetail(null);
                setSelectedChatConv(null);
                setActiveTab('saved');
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-[#C9A01B] text-[#111111] font-bold shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className="w-4 h-4 shrink-0" />
              <span>Saved vehicles</span>
            </button>

            {/* 4. Messages */}
            <button
              onClick={() => {
                setSelectedBookingDetail(null);
                setSelectedChatConv(null);
                setActiveTab('messages');
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-[#C9A01B] text-[#111111] font-bold shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Messages</span>
            </button>

            {/* 5. Notifications with gold badge "1" */}
            <button
              onClick={() => {
                setSelectedBookingDetail(null);
                setSelectedChatConv(null);
                setActiveTab('notifications');
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-[#C9A01B] text-[#111111] font-bold shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 shrink-0" />
                <span>Notifications</span>
              </div>
              <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 ${
                activeTab === 'notifications'
                  ? 'bg-[#111111] text-[#C9A01B]'
                  : 'bg-[#C9A01B] text-[#111111]'
              }`}>
                1
              </span>
            </button>

            {/* Section Heading: MY ACCOUNT with chevron toggle */}
            <div className="pt-5">
              <button
                type="button"
                onClick={() => setAccountSubmenuOpen(!accountSubmenuOpen)}
                className="w-full flex items-center justify-between px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-200 cursor-pointer"
              >
                <span>MY ACCOUNT</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${accountSubmenuOpen ? '' : '-rotate-90'}`} />
              </button>

              {accountSubmenuOpen && (
                <div className="mt-1 space-y-1">
                  {/* Profile */}
                  <button
                    onClick={() => {
                      setSelectedBookingDetail(null);
                      setActiveTab('profile');
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'profile' && !selectedBookingDetail
                        ? 'bg-[#C9A01B] text-[#111111] font-bold shadow-xs'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <User className="w-4 h-4 shrink-0" />
                    <span>Profile</span>
                  </button>

                  {/* Settings */}
                  <button
                    onClick={() => {
                      setSelectedBookingDetail(null);
                      setActiveTab('settings');
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      activeTab === 'settings' && !selectedBookingDetail
                        ? 'bg-[#C9A01B] text-[#111111] font-bold shadow-xs'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Settings className="w-4 h-4 shrink-0" />
                    <span>Settings</span>
                  </button>
                </div>
              )}
            </div>

          </nav>
        </div>

        {/* Sidebar Bottom Actions matching image_052cefce.png */}
        <div className="pt-6 border-t border-[#26262A] space-y-1 text-xs sm:text-sm font-medium">
          <button
            onClick={onGoHome}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
            <span>View website</span>
          </button>

          <button
            onClick={onLogout || onGoHome}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-gray-400 shrink-0" />
            <span>Log out</span>
          </button>
        </div>

      </aside>

      {/* ================= RIGHT MAIN AREA matching image_052cefce.png ================= */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-60 lg:ml-64 min-h-screen">
        
        {/* Top Navbar matching image_052cefce.png (Sticky) */}
        <header className="h-16 bg-white/95 backdrop-blur-xs border-b border-[#E5E1D8] px-6 sm:px-8 flex items-center justify-end gap-5 shrink-0 sticky top-0 z-20">
          
          {/* Notification Bell with red badge 1 */}
          <button
            onClick={() => setActiveTab('notifications')}
            className="relative text-gray-600 hover:text-black transition-colors cursor-pointer p-1"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
              1
            </span>
          </button>

          {/* Volume / Speaker Icon */}
          <button
            onClick={() => setAudioActive(!audioActive)}
            className={`transition-colors cursor-pointer p-1 ${audioActive ? 'text-[#C9A01B] hover:text-[#b89115]' : 'text-gray-400 hover:text-gray-600'}`}
            title={audioActive ? "Audio Announcements: Active" : "Audio Announcements: Muted"}
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* User Profile Pill matching image_052cefce.png */}
          <div 
            onClick={() => setActiveTab('profile')}
            className="flex items-center gap-2 pl-3 border-l border-gray-200 cursor-pointer select-none"
            title="View Profile"
          >
            <div className="w-8 h-8 rounded-full bg-[#F5EEDC] text-[#9A7019] font-bold text-xs flex items-center justify-center font-sans">
              {initials}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#111111]">
              {fullName}
            </span>
          </div>

        </header>

        {/* Content Body */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-[1280px] w-full">
          
          {/* ================= DASHBOARD TAB ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              
              {/* Welcome Header & "Find a vehicle" Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                    Welcome back, {firstName}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Your trips at a glance.
                  </p>
                </div>

                <button
                  onClick={onFindVehicle || onGoHome}
                  className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-[#111111] font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Find a vehicle</span>
                </button>
              </div>

              {/* Section 1: "Waiting for the company" Card matching image_052cefce.png */}
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-[#111111] mb-2.5">
                  Waiting for the company
                </h2>
                
                <div 
                  onClick={() => {
                    setSelectedBookingDetail(waitingBooking);
                    setActiveTab('bookings');
                  }}
                  className="w-full bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#C9A01B] transition-all cursor-pointer group"
                >
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                      {waitingBooking.vehicleName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {waitingBooking.companyName} · {waitingBooking.travelDate} {waitingBooking.returnDate ? `– ${waitingBooking.returnDate}` : ''}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-[#B88722]">
                      No reply yet. Expires in 47 h
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Stats Cards Grid (6 cards) matching image_052cefce.png */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                
                {/* 1. Upcoming trips */}
                <div 
                  onClick={() => {
                    setSelectedBookingDetail(null);
                    setBookingFilter('Upcoming');
                    setActiveTab('bookings');
                  }}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[100px] hover:border-[#C9A01B] hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                  title="View upcoming confirmed trips"
                >
                  <span className="text-xs text-gray-500 group-hover:text-[#111111] font-medium leading-tight transition-colors">
                    Upcoming trips
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                    {upcomingCount}
                  </span>
                </div>

                {/* 2. Traveling now */}
                <div 
                  onClick={() => {
                    setSelectedBookingDetail(null);
                    setBookingFilter('Traveling');
                    setActiveTab('bookings');
                  }}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[100px] hover:border-[#C9A01B] hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                  title="View active trips traveling right now"
                >
                  <span className="text-xs text-gray-500 group-hover:text-[#111111] font-medium leading-tight transition-colors">
                    Traveling now
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                    {travelingNowCount}
                  </span>
                </div>

                {/* 3. Needs your confirmation */}
                <div 
                  onClick={() => {
                    setSelectedBookingDetail(null);
                    setBookingFilter('Needs your confirmation');
                    setActiveTab('bookings');
                  }}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[100px] hover:border-[#C9A01B] hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                  title="View trips needing your confirmation"
                >
                  <span className="text-xs text-gray-500 group-hover:text-[#111111] font-medium leading-tight transition-colors">
                    Needs your confirmation
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                    {needsConfirmationCount}
                  </span>
                </div>

                {/* 4. Waiting for reply (Highlighted in gold in screenshot) */}
                <div 
                  onClick={() => {
                    setSelectedBookingDetail(waitingBooking);
                    setActiveTab('bookings');
                  }}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[100px] hover:border-[#C9A01B] hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                  title="View booking waiting for company reply"
                >
                  <span className="text-xs text-gray-500 group-hover:text-[#111111] font-medium leading-tight transition-colors">
                    Waiting for reply
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#C9A01B] group-hover:scale-105 transition-transform origin-left">
                    {waitingForReplyCount}
                  </span>
                </div>

                {/* 5. Completed trips */}
                <div 
                  onClick={() => {
                    setSelectedBookingDetail(null);
                    setBookingFilter('Completed');
                    setActiveTab('bookings');
                  }}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[100px] hover:border-[#C9A01B] hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                  title="View completed trips history"
                >
                  <span className="text-xs text-gray-500 group-hover:text-[#111111] font-medium leading-tight transition-colors">
                    Completed trips
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                    {completedCount}
                  </span>
                </div>

                {/* 6. Saved vehicles */}
                <div 
                  onClick={() => {
                    setSelectedBookingDetail(null);
                    setActiveTab('saved');
                  }}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 shadow-xs flex flex-col justify-between min-h-[100px] hover:border-[#C9A01B] hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                  title="View your saved and bookmarked vehicles"
                >
                  <span className="text-xs text-gray-500 group-hover:text-[#111111] font-medium leading-tight transition-colors">
                    Saved vehicles
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                    {savedVehiclesCount}
                  </span>
                </div>

              </div>

              {/* Section 3: "Recent bookings" Card matching image_052cefce.png */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-xs sm:text-sm font-bold text-[#111111]">
                    Recent bookings
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedBookingDetail(null);
                      setActiveTab('bookings');
                    }}
                    className="text-xs font-semibold text-gray-500 hover:text-black transition-colors cursor-pointer"
                  >
                    View all
                  </button>
                </div>

                <div 
                  onClick={() => {
                    setSelectedBookingDetail(recentBooking);
                    setActiveTab('bookings');
                  }}
                  className="w-full bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between gap-3 hover:border-[#C9A01B] transition-all cursor-pointer group"
                >
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                      {recentBooking.vehicleName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {recentBooking.companyName} · {recentBooking.travelDate} {recentBooking.returnDate ? `– ${recentBooking.returnDate}` : ''}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <span className="px-3.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-semibold tracking-wide border border-[#FDE68A]/60">
                      {recentBooking.status === 'Confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================= MY BOOKINGS TAB matching image_2df764b7.png & detail in 1_730fe0fb.PNG ================= */}
          {activeTab === 'bookings' && (
            selectedBookingDetail ? (
              /* Booking Detail View matching 1_730fe0fb.PNG & 2_a7e170a4.PNG */
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {/* Breadcrumb matching 1_730fe0fb.PNG */}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <button
                    onClick={() => setSelectedBookingDetail(null)}
                    className="text-gray-500 hover:text-black cursor-pointer font-medium"
                  >
                    My bookings
                  </button>
                  <span className="text-gray-400">›</span>
                  <span className="text-gray-800 font-semibold">{selectedBookingDetail.referenceNumber}</span>
                </div>

                {/* Light blue banner matching 1_730fe0fb.PNG */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl px-5 py-4 text-xs sm:text-sm text-[#1E3A8A] flex items-center justify-between shadow-xs">
                  <span>
                    <strong className="font-semibold text-[#1E40AF]">What happens next:</strong> Waiting for {selectedBookingDetail.companyName} to reply. If nobody replies, the request expires in 47 h.
                  </span>
                </div>

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (8 cols): Booking Details Card & Activity Timeline */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Main Booking Details Card matching 1_730fe0fb.PNG */}
                    <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
                      <div className="flex items-center justify-between pb-5 border-b border-gray-100">
                        <h2 className="text-lg sm:text-xl font-bold text-[#111111]">
                          Booking {selectedBookingDetail.referenceNumber}
                        </h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedBookingDetail.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : selectedBookingDetail.status === 'Cancelled'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]/70'
                        }`}>
                          {selectedBookingDetail.status === 'Confirmed' ? 'Confirmed' : selectedBookingDetail.status === 'Cancelled' ? 'Cancelled' : 'Pending'}
                        </span>
                      </div>

                      {/* Attributes Grid (3 Columns) */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-5 gap-x-6 py-6 border-b border-gray-100 text-xs sm:text-sm">
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Vehicle</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.vehicleName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Company</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.companyName}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Customer</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.customerName}</p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs font-normal">Pickup</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.pickupCity}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Destination</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.destinationCity}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Trip Type</p>
                          <p className="text-[#111111] font-medium mt-0.5 capitalize">
                            {selectedBookingDetail.tripType === 'one-way' ? 'One Way' : 'Round Trip'}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs font-normal">Start</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.travelDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">End</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.returnDate || selectedBookingDetail.travelDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Pickup time</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.pickupTime || '11:25'}</p>
                        </div>

                        <div>
                          <p className="text-gray-400 text-xs font-normal">Return time</p>
                          <p className="text-[#111111] font-medium mt-0.5">04:20</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Duration</p>
                          <p className="text-[#111111] font-medium mt-0.5">1 day(s)</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs font-normal">Passengers</p>
                          <p className="text-[#111111] font-medium mt-0.5">{selectedBookingDetail.passengers || 1}</p>
                        </div>
                      </div>

                      {/* Pricing Details Box */}
                      <div className="bg-[#FAF9F6] rounded-xl p-4.5 mt-5 space-y-2 border border-[#EBE7DF]">
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                          <span>Base price</span>
                          <span className="font-semibold text-gray-900">{selectedBookingDetail.totalPriceSar.toFixed(2)} SAR</span>
                        </div>
                        <div className="flex items-center justify-between text-sm sm:text-base font-bold text-[#111111] pt-1.5 border-t border-gray-200/70">
                          <span>Total</span>
                          <span>{selectedBookingDetail.totalPriceSar.toFixed(2)} SAR</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-0.5">
                          <span>Payment</span>
                          <span className="font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">Unpaid</span>
                        </div>
                      </div>
                    </div>

                    {/* Activity Timeline Card matching 1_730fe0fb.PNG */}
                    <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
                      <h3 className="text-sm sm:text-base font-bold text-[#111111] mb-4">
                        Activity Timeline
                      </h3>
                      <div className="space-y-4">
                        {bookingTimeline.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C9A01B] mt-1 shrink-0" />
                            <div>
                              <p className="text-xs sm:text-sm font-semibold text-[#111111]">{item.title}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Right Column (4 cols): Actions & Messages */}
                  <div className="lg:col-span-4 space-y-6">
                    
                    {/* Actions Card matching 1_730fe0fb.PNG */}
                    <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs">
                      <h3 className="text-sm sm:text-base font-bold text-[#111111] mb-3.5">
                        Actions
                      </h3>
                      <button
                        onClick={handleCancelCurrentBooking}
                        disabled={selectedBookingDetail.status === 'Cancelled'}
                        className="w-full py-2.5 px-4 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
                      >
                        {selectedBookingDetail.status === 'Cancelled' ? 'Booking Cancelled' : 'Cancel Booking'}
                      </button>
                    </div>

                    {/* Messages Card matching 1_730fe0fb.PNG */}
                    <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 shadow-xs flex flex-col min-h-[300px]">
                      <h3 className="text-sm sm:text-base font-bold text-[#111111] mb-2">
                        Messages
                      </h3>
                      
                      <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[300px]">
                        {bookingThread.length === 0 ? (
                          <p className="text-xs text-gray-400">No messages yet.</p>
                        ) : (
                          bookingThread.map((msg, i) => (
                            <div key={i} className={`flex flex-col ${msg.isCompany ? 'items-start' : 'items-end'}`}>
                              <span className="text-[10px] text-gray-400 mb-0.5">{msg.sender} · {msg.time}</span>
                              <div className={`px-3.5 py-2 rounded-2xl text-xs max-w-[85%] ${
                                msg.isCompany 
                                  ? 'bg-gray-100 text-[#111111]' 
                                  : 'bg-[#C9A01B] text-[#111111] font-medium'
                              }`}>
                                {msg.text}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Input Bar */}
                      <form onSubmit={handleSendBookingDetailMessage} className="pt-3 border-t border-gray-100 flex items-center gap-2">
                        <input
                          type="text"
                          value={bookingMessageInput}
                          onChange={(e) => setBookingMessageInput(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 h-10 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#C9A01B]"
                        />
                        <button
                          type="button"
                          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-gray-300 transition-colors cursor-pointer shrink-0"
                          title="Voice message"
                        >
                          <Mic className="w-4 h-4" />
                        </button>
                        <button
                          type="submit"
                          className="h-10 px-4 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-[#111111] font-bold text-xs transition-colors cursor-pointer shrink-0"
                        >
                          Send
                        </button>
                      </form>
                    </div>

                  </div>

                </div>
              </div>
            ) : (
              /* My Bookings List matching image_2df764b7.png */
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                
                {/* Header Title and Subtitle */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                    My bookings
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Your requests and trips, and what happens next. When a company finishes your ride, confirm it here.
                  </p>
                </div>

                {/* Filter Pills matching image_2df764b7.png */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
                  {[
                    { key: 'Pending', label: 'Pending', count: pendingCount },
                    { key: 'Upcoming', label: 'Upcoming', count: upcomingCount },
                    { key: 'Traveling', label: 'Traveling', count: travelingNowCount },
                    { key: 'Needs your confirmation', label: 'Needs your confirmation', count: needsConfirmationCount },
                    { key: 'Completed', label: 'Completed', count: completedCount },
                    { key: 'Cancelled', label: 'Cancelled', count: cancelledCount },
                  ].map(tab => {
                    const isActive = bookingFilter === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setBookingFilter(tab.key as any)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-[#C9A01B] text-[#111111] shadow-xs'
                            : 'bg-[#EFECE6] text-gray-700 hover:text-black hover:bg-[#E5E1D7]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className={`text-[11px] font-bold ${
                          isActive ? 'text-[#111111]' : 'text-gray-500'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Booking Cards List */}
                <div className="space-y-3.5 pt-1">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBookingDetail(b)}
                        className="w-full bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#C9A01B] transition-all cursor-pointer group"
                      >
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                            {b.vehicleName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {b.companyName} · {b.travelDate} {b.returnDate ? `– ${b.returnDate}` : ''}
                          </p>
                          <p className="text-xs font-semibold text-[#B88722] mt-1">
                            {b.status === 'Cancelled'
                              ? 'Booking cancelled.'
                              : b.status === 'Confirmed'
                              ? 'Booking confirmed by the transport company.'
                              : 'Waiting for the company. This request expires in 46 h.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <span className="font-bold text-sm sm:text-base text-[#111111]">
                            {b.totalPriceSar} SAR
                          </span>
                          <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : b.status === 'Cancelled'
                              ? 'bg-red-100 text-red-700 border-red-200'
                              : 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]/70'
                          }`}>
                            {b.status === 'Confirmed' ? 'Confirmed' : b.status === 'Cancelled' ? 'Cancelled' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-2xl border border-[#E5E1D8] p-12 text-center text-gray-400 space-y-2">
                      <p className="text-sm">No bookings found for "{bookingFilter}".</p>
                      <button
                        onClick={onFindVehicle || onGoHome}
                        className="px-4 py-2 rounded-xl bg-[#C9A01B] text-[#111111] font-bold text-xs cursor-pointer shadow-xs"
                      >
                        Find a vehicle
                      </button>
                    </div>
                  )}

                  {filteredBookings.length > 0 && (
                    <p className="text-xs text-gray-400 pt-1">
                      Showing 1–{filteredBookings.length} of {filteredBookings.length} bookings
                    </p>
                  )}
                </div>

              </div>
            )
          )}

          {/* ================= SAVED VEHICLES TAB ================= */}
          {activeTab === 'saved' && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div>
                <h1 className="text-2xl font-bold text-[#111111]">Saved Vehicles</h1>
                <p className="text-xs text-gray-500 mt-0.5">Quickly access vehicles you bookmarked for your pilgrimage.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {FEATURED_VEHICLES.slice(0, 3).map((v) => (
                  <div key={v.id} className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs group">
                    <img src={v.images[0] || ''} alt={v.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-4 space-y-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#C9A01B]">{v.category}</div>
                      <h3 className="font-bold text-sm text-[#111111]">{v.name}</h3>
                      <p className="text-xs text-gray-500">{v.companyName}</p>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="font-bold text-sm text-[#111111]">{v.pricePerDay} SAR <span className="text-gray-400 text-xs font-normal">/ day</span></span>
                        <button
                          onClick={onFindVehicle || onGoHome}
                          className="px-3 py-1 rounded-lg bg-[#C9A01B] text-white text-xs font-semibold cursor-pointer"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= MESSAGES TAB matching image_5550bb5f.png & dedicated chat ================= */}
          {activeTab === 'messages' && (
            selectedChatConv ? (
              /* Dedicated Chat Window inside Messages tab */
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                {/* Breadcrumb back to Messages */}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <button
                    onClick={() => setSelectedChatConv(null)}
                    className="text-gray-500 hover:text-black cursor-pointer font-medium"
                  >
                    Messages
                  </button>
                  <span className="text-gray-400">›</span>
                  <span className="text-gray-800 font-semibold">{selectedChatConv.companyName} ({selectedChatConv.bookingRef})</span>
                </div>

                {/* Main Chat Box */}
                <div className="bg-white rounded-2xl border border-[#E5E1D8] shadow-xs overflow-hidden flex flex-col h-[600px]">
                  {/* Chat Header */}
                  <div className="p-4 sm:p-5 border-b border-[#E5E1D8] bg-[#FAF8F5] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#141416] text-[#C9A01B] font-bold text-sm flex items-center justify-center">
                        {selectedChatConv.companyName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="font-bold text-sm sm:text-base text-[#111111]">{selectedChatConv.companyName}</h2>
                        <p className="text-xs text-gray-500">Booking {selectedChatConv.bookingRef} · {selectedChatConv.vehicleName || 'Vehicle Reservation'}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                      Active Dispatcher
                    </span>
                  </div>

                  {/* Chat Messages Body */}
                  <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-4">
                    {bookingThread.length === 0 ? (
                      <div className="text-center py-16 text-gray-400 space-y-2">
                        <MessageSquare className="w-8 h-8 mx-auto text-gray-300" />
                        <p className="text-sm font-medium">No messages in this conversation yet.</p>
                        <p className="text-xs text-gray-400 max-w-sm mx-auto">
                          Ask {selectedChatConv.companyName} about flight arrival tracking, luggage capacity, child seats, or route preferences.
                        </p>
                      </div>
                    ) : (
                      bookingThread.map((msg, i) => (
                        <div key={i} className={`flex flex-col ${msg.isCompany ? 'items-start' : 'items-end'}`}>
                          <span className="text-[11px] text-gray-400 mb-1 font-medium">{msg.sender} · {msg.time}</span>
                          <div className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm max-w-[75%] leading-relaxed ${
                            msg.isCompany 
                              ? 'bg-[#F2EFE9] text-[#111111] rounded-tl-sm' 
                              : 'bg-[#C9A01B] text-[#111111] font-medium rounded-tr-sm shadow-xs'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input Bar */}
                  <form onSubmit={handleSendBookingDetailMessage} className="p-4 bg-white border-t border-[#E5E1D8] flex items-center gap-2">
                    <input
                      type="text"
                      value={bookingMessageInput}
                      onChange={(e) => setBookingMessageInput(e.target.value)}
                      placeholder={`Message ${selectedChatConv.companyName}...`}
                      className="flex-1 h-11 px-4 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#C9A01B]"
                    />
                    <button
                      type="button"
                      className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-gray-300 transition-colors cursor-pointer shrink-0"
                      title="Voice message"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      className="h-11 px-5 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-[#111111] font-bold text-xs sm:text-sm transition-colors cursor-pointer shrink-0"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Conversations List matching image_5550bb5f.png */
              <div className="space-y-6 animate-in fade-in-50 duration-200">
                
                {/* Header Title and Subtitle matching image_5550bb5f.png */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                    Messages
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Your chats with companies about your bookings.
                  </p>
                </div>

                {/* Conversations List matching image_5550bb5f.png */}
                <div className="space-y-3.5 pt-1">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedChatConv({
                        id: conv.id,
                        companyName: conv.companyName,
                        bookingRef: conv.bookingRef,
                        vehicleName: conv.booking.vehicleName,
                        booking: conv.booking
                      })}
                      className="w-full bg-white rounded-2xl border border-[#E5E1D8] p-5 sm:p-6 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:border-[#C9A01B] transition-all cursor-pointer group"
                    >
                      <h3 className="font-bold text-base sm:text-lg text-[#111111] group-hover:text-[#C9A01B] transition-colors">
                        {conv.companyName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {conv.bookingRef} · {conv.lastMessage}
                      </p>
                    </div>
                  ))}

                  <p className="text-xs text-gray-400 pt-1">
                    Showing 1–{conversations.length} of {conversations.length} conversations
                  </p>
                </div>

              </div>
            )
          )}

          {/* ================= NOTIFICATIONS TAB ================= */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[#111111]">Notifications</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Stay updated with instant trip updates and quotes.</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                  className="text-xs text-[#B88722] font-semibold hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 rounded-2xl border transition-all ${
                    n.read ? 'bg-white border-[#E5E1D8]' : 'bg-[#FAF7EE] border-[#C9A01B]/40 shadow-xs'
                  }`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#111111]">{n.title}</h3>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.desc}</p>
                      </div>
                      <span className="text-[11px] text-gray-400 shrink-0 font-medium">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= PROFILE TAB ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl animate-in fade-in-50 duration-200">
              <div>
                <h1 className="text-2xl font-bold text-[#111111]">Customer Profile</h1>
                <p className="text-xs text-gray-500 mt-0.5">Manage your personal information and contact preferences.</p>
              </div>

              {profileSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Profile changes saved successfully!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-4 shadow-xs">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#C9A01B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#C9A01B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1.5">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#C9A01B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1.5">Primary Travel City</label>
                  <select
                    value={profileCity}
                    onChange={(e) => setProfileCity(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#C9A01B] bg-white cursor-pointer"
                  >
                    <option value="Riyadh">Riyadh</option>
                    <option value="Makkah">Makkah</option>
                    <option value="Madinah">Madinah</option>
                    <option value="Jeddah">Jeddah</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= SETTINGS TAB ================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl animate-in fade-in-50 duration-200">
              <div>
                <h1 className="text-2xl font-bold text-[#111111]">Account Settings</h1>
                <p className="text-xs text-gray-500 mt-0.5">Control communication, notifications, and security options.</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-5 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#111111]">WhatsApp Reservation Alerts</h3>
                    <p className="text-xs text-gray-500">Receive booking updates and driver arrival pins directly on WhatsApp.</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#C9A01B] cursor-pointer" />
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#111111]">Currency & Localization</h3>
                    <p className="text-xs text-gray-500">Default currency for quotes and vehicle listings.</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#111111] bg-gray-100 px-3 py-1 rounded-lg">SAR (Saudi Riyal)</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#111111]">InsForge Cloud BaaS Sync</h3>
                    <p className="text-xs text-gray-500">Persistent realtime database linkage with project oss-project.</p>
                  </div>
                  <button
                    onClick={onOpenInsForgeModal}
                    className="px-3.5 py-1.5 rounded-lg border border-[#E5E1D8] bg-[#FAF7EE] hover:bg-[#F3EEDD] text-xs font-semibold text-[#111111] cursor-pointer"
                  >
                    Test Sync
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

      {/* ================= VOUCHER DETAILS MODAL ================= */}
      {selectedBookingForVoucher && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in-50">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#E5E1D8]">
            <div className="p-6 bg-[#18181B] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A01B]">Official Voucher</span>
                <h2 className="font-playfair text-xl font-bold">Booking #{selectedBookingForVoucher.referenceNumber}</h2>
              </div>
              <button 
                onClick={() => setSelectedBookingForVoucher(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 bg-[#FAF7EE] rounded-2xl border border-[#EBE7DD] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#111111]">{selectedBookingForVoucher.vehicleName}</h3>
                  <p className="text-xs text-gray-500">{selectedBookingForVoucher.companyName}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                  {selectedBookingForVoucher.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Dates:</span>
                  <span className="font-semibold text-gray-900">{selectedBookingForVoucher.travelDate} – {selectedBookingForVoucher.returnDate || 'Same Day'}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Pickup Time:</span>
                  <span className="font-semibold text-gray-900">{selectedBookingForVoucher.pickupTime}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Passenger:</span>
                  <span className="font-semibold text-gray-900">{selectedBookingForVoucher.customerName}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-400 block">Total Rate:</span>
                  <span className="font-bold text-[#C9A01B]">{selectedBookingForVoucher.totalPriceSar} SAR</span>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setSelectedBookingForVoucher(null)}
                  className="flex-1 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-bold hover:bg-black cursor-pointer"
                >
                  Close
                </button>
                {onCancelBooking && (
                  <button
                    onClick={() => {
                      onCancelBooking(selectedBookingForVoucher.id);
                      setSelectedBookingForVoucher(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
