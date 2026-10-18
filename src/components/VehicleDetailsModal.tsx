import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Luggage, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Clock, 
  MapPin, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Vehicle, TravelAgency, BookingRecord } from '../data/mockData';

interface VehicleDetailsModalProps {
  vehicle: Vehicle;
  agency?: TravelAgency;
  onClose: () => void;
  onConfirmBooking: (booking: BookingRecord) => void;
  defaultPickupCity?: string;
  defaultDropoffCity?: string;
  defaultDate?: string;
  defaultTime?: string;
  initialStep?: 'details' | 'booking-form';
  onProceedToBookingPage?: (vehicle: Vehicle) => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  agency,
  onClose,
  onConfirmBooking,
  defaultPickupCity = 'Jeddah',
  defaultDropoffCity = 'Makkah',
  defaultDate = '',
  defaultTime = '10:00',
  initialStep = 'details',
  onProceedToBookingPage,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [step, setStep] = useState<'details' | 'booking-form' | 'success'>(initialStep);

  // Booking Form State
  const [pickupCity, setPickupCity] = useState(defaultPickupCity);
  const [dropoffCity, setDropoffCity] = useState(defaultDropoffCity);
  const [travelDate, setTravelDate] = useState(defaultDate || new Date().toISOString().split('T')[0]);
  const [pickupTime, setPickupTime] = useState(defaultTime);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');
  const [returnDate, setReturnDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(2);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [confirmedRecord, setConfirmedRecord] = useState<BookingRecord | null>(null);

  // Price calculation
  const calculateTotal = () => {
    let multiplier = 1;
    if (tripType === 'round-trip') multiplier = 1.85; // slight discount for return
    return Math.round(vehicle.pricePerDay * multiplier);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Please enter a valid WhatsApp or contact phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (tripType === 'round-trip' && !returnDate) {
      setFormError('Please choose a return date for round-trip booking.');
      return;
    }

    const refNum = 'FK-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: BookingRecord = {
      id: 'book-' + Date.now(),
      referenceNumber: refNum,
      vehicleName: vehicle.name,
      vehicleCategory: vehicle.category,
      companyName: vehicle.companyName,
      pickupCity,
      destinationCity: dropoffCity,
      travelDate,
      pickupTime,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      tripType,
      passengers: passengerCount,
      totalPriceSar: calculateTotal(),
      customerName: fullName,
      customerPhone: phone,
      customerEmail: email,
      specialRequests: notes,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setConfirmedRecord(newBooking);
    onConfirmBooking(newBooking);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Modal Header */}
        <div className="px-6 py-3.5 border-b border-[#E5E1D8] flex items-center justify-between bg-white gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FBF7E9] text-[#C9A01B] border border-[#E6D28C]">
              {vehicle.category}
            </span>
            <span className="text-xs text-[#6B7280]">
              {vehicle.year} Model
            </span>
          </div>

          {step !== 'success' && (
            <div className="flex items-center bg-[#F7F6F2] p-1 rounded-full border border-[#E5E1D8] text-xs font-medium">
              <button
                type="button"
                onClick={() => setStep('details')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  step === 'details'
                    ? 'bg-[#C9A01B] text-white shadow-xs font-semibold'
                    : 'text-[#4B5563] hover:text-[#111111]'
                }`}
              >
                Details & Specs
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onProceedToBookingPage) {
                    onClose();
                    onProceedToBookingPage(vehicle);
                  } else {
                    setStep('booking-form');
                  }
                }}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  step === 'booking-form'
                    ? 'bg-[#C9A01B] text-white shadow-xs font-semibold'
                    : 'text-[#4B5563] hover:text-[#111111]'
                }`}
              >
                Book Now ({vehicle.pricePerDay} SAR)
              </button>
            </div>
          )}

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-6">
          
          {step === 'details' && (
            <div className="space-y-6">
              
              {/* Image Gallery */}
              <div className="space-y-2">
                <div className="relative w-full h-[260px] sm:h-[340px] rounded-xl overflow-hidden bg-neutral-100 border border-[#E5E1D8]">
                  <img
                    src={vehicle.images[activeImageIndex] || vehicle.images[0]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {vehicle.images.length > 1 && (
                  <div className="flex items-center gap-2">
                    {vehicle.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageIndex === i ? 'border-[#C9A01B] scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title, Specs & Price Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0ECE1]">
                <div>
                  <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#111111]">
                    {vehicle.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#4B5563]">
                    <span>Managed by <strong className="text-[#111111]">{vehicle.companyName}</strong></span>
                    {agency?.isVerified && (
                      <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-baseline gap-1 text-right">
                  <span className="text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums">
                    {vehicle.pricePerDay} SAR
                  </span>
                  <span className="text-sm text-[#6B7280]">/day</span>
                </div>
              </div>

              {/* Vehicle Key Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F7F6F2] p-4 rounded-xl border border-[#E5E1D8]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#C9A01B] shadow-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#6B7280]">Capacity</div>
                    <div className="text-xs font-bold text-[#111111]">{vehicle.passengerCapacity} Seats</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#C9A01B] shadow-xs">
                    <Luggage className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#6B7280]">Luggage</div>
                    <div className="text-xs font-bold text-[#111111]">{vehicle.luggageCapacity} Bags</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#C9A01B] shadow-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#6B7280]">Transmission</div>
                    <div className="text-xs font-bold text-[#111111]">{vehicle.transmission}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#C9A01B] shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#6B7280]">Base Hub</div>
                    <div className="text-xs font-bold text-[#111111]">{vehicle.city}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
                  About this vehicle
                </h4>
                <p className="text-sm text-[#4B5563] leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                  Included Amenities & Service
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#2D3139]">
                      <Check className="w-4 h-4 text-[#C9A01B] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Direct Contact Box */}
              {agency && (
                <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#E6D28C] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={agency.avatarImage}
                      alt={agency.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E5E1D8]"
                    />
                    <div>
                      <div className="font-playfair font-bold text-sm text-[#111111] flex items-center gap-1.5">
                        {agency.name}
                        {agency.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="text-xs text-[#6B7280]">{agency.city} · License: {agency.licenseNumber}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={`tel:${agency.phone}`}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-[#D5D0C6] text-xs font-semibold text-[#111111] hover:bg-gray-50"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C9A01B]" />
                      <span>Call Agency</span>
                    </a>
                    <a
                      href={`https://wa.me/${agency.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Proceed to Booking Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (onProceedToBookingPage) {
                      onClose();
                      onProceedToBookingPage(vehicle);
                    } else {
                      setStep('booking-form');
                    }
                  }}
                  className="w-full py-3.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-sm sm:text-base transition-all shadow-[0_4px_12px_rgba(201,160,27,0.35)] cursor-pointer"
                >
                  Request Reservation for {vehicle.name}
                </button>
              </div>

            </div>
          )}

          {step === 'booking-form' && (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="border-b border-[#F0ECE1] pb-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-[#C9A01B] hover:underline mb-1"
                >
                  ← Back to vehicle details
                </button>
                <h3 className="font-playfair text-xl font-bold text-[#111111]">
                  Complete Reservation Request
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Direct booking with {vehicle.companyName}. No upfront charges; confirm directly with driver.
                </p>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Trip Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Pickup Location / Airport
                  </label>
                  <input
                    type="text"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                    placeholder="e.g. Jeddah Airport Terminal 1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Destination / Hotel
                  </label>
                  <input
                    type="text"
                    value={dropoffCity}
                    onChange={(e) => setDropoffCity(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                    placeholder="e.g. Makkah Clock Royal Tower Hotel"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    required
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Customer Contact */}
              <div className="space-y-3 pt-2 border-t border-[#F0ECE1]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Primary Passenger Contact
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder="e.g. Tariq Ahmad"
                      className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      WhatsApp / Mobile Phone (with Country Code)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+966 50 123 4567 or +1 212 555 0199"
                      className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Email Address (for booking confirmation)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="pilgrim@example.com"
                      className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#111111] mb-1">
                      Flight Number / Special Notes (Optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      placeholder="e.g. Flight SV102 arriving at 2:30 PM, need 1 baby car seat."
                      className="w-full p-2.5 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#E6D28C] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#6B7280]">Estimated Total</div>
                  <div className="text-xl font-bold text-[#111111] tabular-nums">
                    {calculateTotal()} SAR
                  </div>
                  <div className="text-[11px] text-[#6B7280]">Pay upon arrival to driver or agency</div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-sm shadow-md cursor-pointer"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          )}

          {step === 'success' && confirmedRecord && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  Reservation Confirmed
                </span>
                <h3 className="font-playfair text-2xl font-bold text-[#111111] mt-1">
                  Reference: #{confirmedRecord.referenceNumber}
                </h3>
                <p className="text-xs text-[#6B7280] mt-1 max-w-md mx-auto">
                  Your booking request for {vehicle.name} has been received and routed directly to {vehicle.companyName}.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto bg-[#F7F6F2] rounded-xl p-4 border border-[#E5E1D8] text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                  <span className="text-gray-500">Route:</span>
                  <span className="font-semibold text-gray-900">{confirmedRecord.pickupCity} → {confirmedRecord.destinationCity}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                  <span className="text-gray-500">Date & Time:</span>
                  <span className="font-semibold text-gray-900">{confirmedRecord.travelDate} at {confirmedRecord.pickupTime}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                  <span className="text-gray-500">Lead Passenger:</span>
                  <span className="font-semibold text-gray-900">{confirmedRecord.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-semibold text-gray-900">{confirmedRecord.customerPhone}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span>Total Amount:</span>
                  <span className="text-[#C9A01B]">{confirmedRecord.totalPriceSar} SAR</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold hover:bg-black"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
