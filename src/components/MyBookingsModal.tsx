import React from 'react';
import { X, Calendar, MapPin, Clock, Trash2, CheckCircle2 } from 'lucide-react';
import { BookingRecord } from '../data/mockData';

interface MyBookingsModalProps {
  bookings: BookingRecord[];
  onClose: () => void;
  onCancelBooking: (id: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  bookings,
  onClose,
  onCancelBooking,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-playfair text-xl font-bold text-[#111111]">
              My Vehicle Bookings
            </h2>
            <p className="text-xs text-[#6B7280]">
              Review your scheduled transfers, airport pickups, and Ziyarat journeys.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-[#FBF7E9]/15">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl border border-[#E5E1D8] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C9A01B] font-mono">
                      #{booking.referenceNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="font-playfair font-bold text-base text-[#111111]">
                    {booking.vehicleName} ({booking.vehicleCategory})
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#2D3139]">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                    <span>{booking.pickupCity} → {booking.destinationCity}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {booking.travelDate}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {booking.pickupTime}
                    </span>
                    <span>·</span>
                    <span>Provider: {booking.companyName}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 gap-2">
                  <div className="sm:text-right">
                    <div className="text-[11px] text-gray-500">Pay on pickup</div>
                    <div className="text-base font-bold text-[#111111] tabular-nums">
                      {booking.totalPriceSar} SAR
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Cancel reservation #${booking.referenceNumber}?`)) {
                        onCancelBooking(booking.id);
                      }
                    }}
                    className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 hover:underline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-[#6B7280]">
                You have no active vehicle reservations yet.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2 rounded-full bg-[#C9A01B] text-white text-xs font-semibold"
              >
                Search Vehicles
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
