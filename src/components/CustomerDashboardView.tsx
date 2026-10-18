import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Clock, 
  Phone, 
  Calendar, 
  QrCode, 
  Download, 
  Car, 
  CheckCircle2, 
  ArrowRight, 
  Share2,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import { BookingRecord, Vehicle, ZiyaratDestination } from '../data/mockData';

interface CustomerDashboardViewProps {
  currentUser: { name: string; email: string; role: string } | null;
  bookings: BookingRecord[];
  onGoHome: () => void;
  onOpenMakkahZiyarat: () => void;
  onOpenMadinaZiyarat: () => void;
  onOpenRoutes: () => void;
  onCancelBooking?: (bookingId: string) => void;
  onOpenInsForgeModal: () => void;
}

export const CustomerDashboardView: React.FC<CustomerDashboardViewProps> = ({
  currentUser,
  bookings,
  onGoHome,
  onOpenMakkahZiyarat,
  onOpenMadinaZiyarat,
  onOpenRoutes,
  onCancelBooking,
  onOpenInsForgeModal,
}) => {
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(bookings[0] || null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  const activeBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending Confirmation');
  const pastBookings = bookings.filter((b) => b.status === 'Completed');

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      
      {/* Top Banner */}
      <div className="bg-[#18181B] text-white border-b border-[#2D3139]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#C9A01B] text-white flex items-center justify-center font-bold text-lg shadow-md">
              {currentUser?.name?.[0]?.toUpperCase() || 'P'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair text-2xl font-bold text-white">
                  Welcome back, {currentUser?.name || 'Pilgrim'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  Verified Pilgrim
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {currentUser?.email || 'pilgrim@example.com'} · Saudi Arabia Pilgrimage Account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenInsForgeModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#27272A] hover:bg-[#323238] border border-[#3F3F46] text-xs font-medium text-gray-200 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#C9A01B]" />
              <span>InsForge Realtime Active</span>
            </button>
            <button
              onClick={onGoHome}
              className="px-4 py-1.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-xs text-white font-semibold shadow-xs"
            >
              Book Another Ride
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Quick Actions Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={onOpenMakkahZiyarat}
            className="p-4 rounded-2xl bg-white border border-[#E5E1D8] shadow-xs hover:border-[#C9A01B] hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9A01B]">
                Sacred Pilgrimage
              </div>
              <div className="font-bold text-sm text-[#111111]">
                Book Makkah Ziyarat Tour
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#C9A01B] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenMadinaZiyarat}
            className="p-4 rounded-2xl bg-white border border-[#E5E1D8] shadow-xs hover:border-[#C9A01B] hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9A01B]">
                Prophet's Heritage
              </div>
              <div className="font-bold text-sm text-[#111111]">
                Book Madina Ziyarat Tour
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#C9A01B] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenRoutes}
            className="p-4 rounded-2xl bg-white border border-[#E5E1D8] shadow-xs hover:border-[#C9A01B] hover:shadow-md transition-all text-left flex items-center justify-between group cursor-pointer"
          >
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9A01B]">
                Intercity Transfers
              </div>
              <div className="font-bold text-sm text-[#111111]">
                Browse Popular Routes
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#C9A01B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Main Content: Active Trip Voucher & Reservation History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Active Trips & Vouchers (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h2 className="font-playfair text-2xl font-bold text-[#111111]">
              Upcoming & Active Reservations
            </h2>

            {activeBookings.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#E5E1D8] p-8 text-center space-y-4">
                <Car className="w-12 h-12 text-[#C9A01B] mx-auto" />
                <h3 className="font-playfair text-xl font-bold text-[#111111]">
                  No upcoming trips scheduled
                </h3>
                <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                  Reserve a private vehicle with an included chauffeur for your Umrah airport transfer or historical Ziyarat tour.
                </p>
                <button
                  onClick={onOpenMakkahZiyarat}
                  className="px-6 py-2.5 rounded-full bg-[#C9A01B] text-white text-xs font-semibold"
                >
                  Explore Makkah Ziyarat
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-3xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all"
                  >
                    {/* Header banner */}
                    <div className="bg-[#FBF7EE] px-6 py-4 border-b border-[#EBE7DF] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-bold text-[#111111]">
                          Booking #{booking.referenceNumber}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full uppercase">
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#C9A01B]">
                          {booking.totalPriceSar} SAR
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-[#111111]">
                            {booking.vehicleName}
                          </h3>
                          <div className="text-xs text-[#6B7280]">
                            Chauffeur service by <span className="font-semibold text-[#111111]">{booking.companyName}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowVoucherModal(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-semibold shadow-xs cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#C9A01B]" />
                          <span>View Digital Voucher</span>
                        </button>
                      </div>

                      {/* Route Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C9A01B] shrink-0" />
                          <div>
                            <span className="text-[#6B7280] block text-[10px]">Pickup Location</span>
                            <span className="font-medium text-[#111111]">{booking.pickupCity}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <span className="text-[#6B7280] block text-[10px]">Destination / Tour</span>
                            <span className="font-medium text-[#111111]">{booking.destinationCity}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#6B7280] shrink-0" />
                          <div>
                            <span className="text-[#6B7280] block text-[10px]">Date</span>
                            <span className="font-medium text-[#111111]">{booking.travelDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#6B7280] shrink-0" />
                          <div>
                            <span className="text-[#6B7280] block text-[10px]">Pickup Time</span>
                            <span className="font-medium text-[#111111]">{booking.pickupTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Chauffeur details */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-2 text-[#4B5563]">
                          <Phone className="w-3.5 h-3.5 text-[#C9A01B]" />
                          <span>Chauffeur Support: +966 50 123 4567</span>
                        </div>
                        {onCancelBooking && (
                          <button
                            onClick={() => onCancelBooking(booking.id)}
                            className="text-xs text-red-600 hover:underline cursor-pointer"
                          >
                            Cancel Reservation
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Profile & Fast Assistance (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            
            {/* Chauffeur Guarantee Card */}
            <div className="bg-white rounded-3xl border border-[#E5E1D8] p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F5EED8] text-[#C9A01B] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#111111]">
                    Pilgrim Trust Guarantee
                  </h4>
                  <p className="text-[11px] text-[#6B7280]">
                    Verified Saudi Ministry of Transport
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#4B5563]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Fixed, guaranteed pricing with zero surge fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Door-to-door hotel and airport reception</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Multi-lingual driver waiting at sacred landmarks</span>
                </div>
              </div>
            </div>

            {/* Past Trips summary */}
            {pastBookings.length > 0 && (
              <div className="bg-white rounded-3xl border border-[#E5E1D8] p-6 space-y-3 shadow-xs">
                <h4 className="font-bold text-sm text-[#111111]">
                  Completed Trips ({pastBookings.length})
                </h4>
                <div className="space-y-2.5 text-xs">
                  {pastBookings.map((pb) => (
                    <div key={pb.id} className="p-2.5 rounded-xl bg-gray-50 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-[#111111]">{pb.vehicleName}</div>
                        <div className="text-[11px] text-[#6B7280]">{pb.pickupCity} → {pb.destinationCity}</div>
                      </div>
                      <span className="font-bold text-[#C9A01B]">{pb.totalPriceSar} SAR</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 24/7 Helpline */}
            <div className="bg-[#FBF7EE] rounded-3xl border border-[#EBE7DF] p-6 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#C9A01B]">
                24/7 Pilgrim Concierge
              </div>
              <h4 className="font-bold text-sm text-[#111111]">
                Need immediate route changes?
              </h4>
              <p className="text-xs text-[#4B5563]">
                Our dedicated support desk assists pilgrims with flight delays, terminal switches, and hotel changes.
              </p>
              <div className="pt-2 text-xs font-bold text-[#111111]">
                WhatsApp: +966 50 123 4567
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Digital Pilgrim Voucher Modal */}
      {showVoucherModal && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-[#E5E1D8] p-6 space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A01B]">
                Official Travel Voucher
              </span>
              <h3 className="font-playfair text-2xl font-bold text-[#111111]">
                FlyKaaba Boarding Pass
              </h3>
              <p className="text-xs text-[#6B7280]">
                Present this voucher to your chauffeur upon vehicle arrival
              </p>
            </div>

            {/* QR Mock code */}
            <div className="w-36 h-36 mx-auto bg-gray-50 border-2 border-dashed border-[#C9A01B] rounded-2xl flex flex-col items-center justify-center p-2">
              <QrCode className="w-24 h-24 text-[#111111]" />
              <span className="text-[9px] font-mono text-gray-500 mt-1">
                {selectedBooking.referenceNumber}
              </span>
            </div>

            <div className="space-y-2 text-xs border-t border-b border-gray-100 py-3">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Traveler:</span>
                <span className="font-semibold text-[#111111]">{selectedBooking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Vehicle Model:</span>
                <span className="font-semibold text-[#111111]">{selectedBooking.vehicleName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Route:</span>
                <span className="font-semibold text-[#111111]">{selectedBooking.pickupCity} → {selectedBooking.destinationCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Travel Date & Time:</span>
                <span className="font-semibold text-[#111111]">{selectedBooking.travelDate} ({selectedBooking.pickupTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Total Rate:</span>
                <span className="font-bold text-[#C9A01B]">{selectedBooking.totalPriceSar} SAR</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setShowVoucherModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Voucher</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
