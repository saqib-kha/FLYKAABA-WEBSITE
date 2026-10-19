import React, { useState } from 'react';
import { 
  Home, 
  ChevronRight, 
  ChevronDown,
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Vehicle, TravelAgency, BookingRecord, SAUDI_CITIES } from '../data/mockData';

interface BookingFlowViewProps {
  vehicle: Vehicle;
  agency?: TravelAgency;
  onGoHome: () => void;
  onBackToCategory: (category: string) => void;
  onConfirmBooking: (booking: BookingRecord) => void;
  currentUser?: { name: string; email: string; role: string } | null;
  initialBookingDetails?: {
    pickupCity: string;
    destinationCity: string;
    travelDate: string;
    pickupTime: string;
    tripType: 'one-way' | 'round-trip';
    serviceType?: 'point-to-point' | 'hourly' | 'ziyarat';
    priceSar?: number;
    hours?: number;
  };
}

export const BookingFlowView: React.FC<BookingFlowViewProps> = ({
  vehicle,
  agency,
  onGoHome,
  onBackToCategory,
  onConfirmBooking,
  currentUser,
  initialBookingDetails,
}) => {
  // If coming directly from route search, start on Step 2 (Passenger Details & Review & Reserve)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(initialBookingDetails ? 2 : 1);

  // Form Fields
  const [startDate, setStartDate] = useState(initialBookingDetails?.travelDate || '');
  const [endDate, setEndDate] = useState(initialBookingDetails?.travelDate || '');
  const [pickupTime, setPickupTime] = useState(initialBookingDetails?.pickupTime || '');
  const [returnTime, setReturnTime] = useState('');
  const [pickupCity, setPickupCity] = useState(initialBookingDetails?.pickupCity || '');
  const [dropoffCity, setDropoffCity] = useState(initialBookingDetails?.destinationCity || 'No drop-off city');

  // Passenger Details
  const [customerName, setCustomerName] = useState(currentUser?.name || 'Sara');
  const [customerPhone, setCustomerPhone] = useState('+966 50 123 4567');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || 'sara@example.com');
  const [specialNotes, setSpecialNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Calculate days & total price
  const calculateDays = () => {
    if (!startDate) return 1;
    if (!endDate || startDate === endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const daysCount = calculateDays();
  const totalPrice = initialBookingDetails?.priceSar 
    ? initialBookingDetails.priceSar 
    : vehicle.pricePerDay * daysCount;

  // Validate Step 1
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!startDate) {
      setErrorMessage('Please select a Start Date.');
      return;
    }
    if (!endDate) {
      setErrorMessage('Please select an End Date.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setErrorMessage('End Date cannot be earlier than Start Date.');
      return;
    }
    if (!pickupCity || pickupCity === 'Choose a pick-up city') {
      setErrorMessage('Please choose a pick-up city.');
      return;
    }

    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final confirmation
  const handleFinalReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMessage('Please fill in all primary passenger contact fields.');
      return;
    }

    const refNumber = 'FK-' + Math.floor(100000 + Math.random() * 900000);
    const newBooking: BookingRecord = {
      id: 'book-' + Date.now(),
      referenceNumber: refNumber,
      vehicleName: vehicle.name,
      vehicleCategory: vehicle.category,
      companyName: vehicle.companyName,
      pickupCity: pickupCity,
      destinationCity: dropoffCity === 'No drop-off city' ? pickupCity : dropoffCity,
      travelDate: startDate,
      pickupTime: pickupTime || '10:00',
      returnDate: endDate !== startDate ? endDate : undefined,
      tripType: endDate !== startDate ? 'round-trip' : 'one-way',
      passengers: vehicle.passengerCapacity,
      totalPriceSar: totalPrice,
      customerName,
      customerPhone,
      customerEmail,
      specialRequests: specialNotes,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    setConfirmedBooking(newBooking);
    onConfirmBooking(newBooking);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full bg-white pb-20">
      
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-6">
        
        {/* Breadcrumb matching Capture.PNG */}
        <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-4">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1 hover:text-[#C9A01B] transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button
            onClick={() => onBackToCategory(vehicle.category)}
            className="hover:text-[#C9A01B] transition-colors cursor-pointer"
          >
            {vehicle.name}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="font-medium text-[#111111]">Book</span>
        </nav>

        {/* Heading matching Capture.PNG */}
        <h1 className="font-playfair text-[#111111] text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          {vehicle.name}
        </h1>

        {/* Multi-Step Indicator Bar matching Capture.PNG */}
        <div className="w-full bg-white rounded-2xl border border-[#E5E1D8] p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 sm:gap-8 text-xs">
            
            {/* Step 1: Rental details */}
            <div className="flex items-center gap-2.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep === 1 ? 'bg-black text-white' : 'bg-[#DCFCE7] text-[#16A34A]'
              }`}>
                {currentStep > 1 ? <Check className="w-3.5 h-3.5" /> : '1'}
              </div>
              <span className={`font-bold tracking-wider uppercase text-xs ${
                currentStep === 1 ? 'text-[#111111]' : 'text-gray-500'
              }`}>
                RENTAL DETAILS
              </span>
            </div>

            <span className="hidden sm:inline text-gray-300 text-sm">→</span>

            {/* Step 2: Vehicle */}
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full border border-[#856404] flex items-center justify-center text-xs font-bold text-[#856404] bg-white">
                <Check className="w-3.5 h-3.5 text-[#856404]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold uppercase text-xs text-[#111111]">
                  <span>VEHICLE</span>
                  <button 
                    type="button" 
                    onClick={() => onBackToCategory(vehicle.category)}
                    className="underline text-[#856404] hover:text-[#C9A01B] font-normal cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <div 
                  className="text-xs text-[#856404] font-semibold underline hover:text-[#C9A01B] cursor-pointer" 
                  onClick={() => onBackToCategory(vehicle.category)}
                >
                  {vehicle.name}
                </div>
                <div className="text-xs text-gray-500">
                  {vehicle.companyName}
                </div>
              </div>
            </div>

            <span className="hidden sm:inline text-gray-300 text-sm">→</span>

            {/* Step 3: Review & Reserve */}
            <div className="flex items-center gap-2.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep === 3 ? 'bg-black text-white' : 'border border-gray-300 text-gray-400 bg-white'
              }`}>
                3
              </div>
              <span className={`font-bold tracking-wider uppercase text-xs ${
                currentStep >= 2 ? 'text-[#111111]' : 'text-gray-400'
              }`}>
                REVIEW & RESERVE
              </span>
            </div>

          </div>
        </div>

        {/* Two-Column Grid: Trip Summary (Left) + Rental Details Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Trip Summary Card matching Capture.PNG & Capture1.PNG */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs">
              
              <h2 className="font-semibold text-base text-[#111111] mb-4">
                Trip summary
              </h2>

              {/* Rental Details Sub-block */}
              <div className="pb-4 border-b border-[#F0ECE1]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-xs text-[#111111]">Rental details</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-3 py-0.5 rounded-full border border-gray-300 text-[11px] font-normal text-[#111111] hover:bg-gray-50 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Start Date</span>
                    <span className="font-semibold text-[#111111]">{startDate || 'Not set yet'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">End Date</span>
                    <span className="font-semibold text-[#111111]">{endDate || 'Not set yet'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Pickup time</span>
                    <span className="font-semibold text-[#111111]">{pickupTime || 'Not set yet'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Return time</span>
                    <span className="font-semibold text-[#111111]">{returnTime || 'Not set yet'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Pick-up city</span>
                    <span className="font-semibold text-[#111111]">{pickupCity || 'Not set yet'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Drop-off city (optional)</span>
                    <span className="font-semibold text-[#111111]">{dropoffCity || 'No drop-off city'}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Sub-block matching Capture.PNG & Capture1.PNG */}
              <div className="py-4 border-b border-[#F0ECE1]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-xs text-[#111111]">Vehicle</span>
                  <button
                    type="button"
                    onClick={() => onBackToCategory(vehicle.category)}
                    className="px-3 py-0.5 rounded-full border border-gray-300 text-[11px] font-normal text-[#111111] hover:bg-gray-50 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* Vehicle Thumbnail */}
                <div className="w-full h-36 rounded-xl overflow-hidden bg-neutral-100 border border-[#E5E1D8] mb-3">
                  <img
                    src={vehicle.images[0] || '/src/assets/images/bmw_7_series_dark_1792229408256.jpg'}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Vehicle</span>
                    <span 
                      onClick={() => onBackToCategory(vehicle.category)}
                      className="font-semibold text-[#856404] underline hover:text-[#C9A01B] cursor-pointer"
                    >
                      {vehicle.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Company</span>
                    <span className="font-bold text-[#111111]">{vehicle.companyName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B7280]">Seats</span>
                    <span className="font-semibold text-[#111111]">{vehicle.passengerCapacity}</span>
                  </div>
                </div>
              </div>

              {/* Total Price Block matching Capture1.PNG */}
              <div className="pt-4">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-sm text-[#111111]">Total</span>
                  <span className="font-bold text-lg text-[#111111] tabular-nums">
                    {startDate && endDate ? `${totalPrice} SAR` : '—'}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7280]">
                  {startDate && endDate ? `${daysCount} day(s) · ` : ''}Final price is confirmed at checkout.
                </p>
              </div>

            </div>

            {/* Back link matching Capture1.PNG */}
            <button
              onClick={() => onBackToCategory(vehicle.category)}
              className="text-xs font-semibold text-[#856404] hover:underline flex items-center gap-1 cursor-pointer pt-1"
            >
              ← Change vehicle
            </button>
          </div>

          {/* RIGHT COLUMN: Rental details Form matching Capture.PNG & Capture1.PNG */}
          <div className="lg:col-span-8">
            
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 sm:p-8 shadow-xs">
                
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111] mb-1.5">
                  Rental details
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mb-6">
                  Choose the dates, pickup time and pickup/drop-off city you need the vehicle.
                </p>

                {errorMessage && (
                  <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleProceedToReview} className="space-y-6">
                  
                  {/* Row 1: Start Date & End Date matching Capture.PNG */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                        Start Date
                      </label>
                      <div className="relative">
                        <div className="w-full h-12 px-4 bg-white border border-[#E5E1D8] rounded-xl flex items-center gap-2.5 text-xs sm:text-sm hover:border-[#C9A01B] transition-colors cursor-pointer">
                          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className={startDate ? 'text-[#111111] font-medium' : 'text-gray-400'}>
                            {startDate || 'Select date'}
                          </span>
                        </div>
                        <input
                          type="date"
                          min={todayStr}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                        End Date
                      </label>
                      <div className="relative">
                        <div className="w-full h-12 px-4 bg-white border border-[#E5E1D8] rounded-xl flex items-center gap-2.5 text-xs sm:text-sm hover:border-[#C9A01B] transition-colors cursor-pointer">
                          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className={endDate ? 'text-[#111111] font-medium' : 'text-gray-400'}>
                            {endDate || 'Select date'}
                          </span>
                        </div>
                        <input
                          type="date"
                          min={startDate || todayStr}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          required
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Pickup time & Return time matching Capture.PNG */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                        Pickup time
                      </label>
                      <div className="relative">
                        <div className="w-full h-12 px-4 bg-white border border-[#E5E1D8] rounded-xl flex items-center justify-between text-xs sm:text-sm hover:border-[#C9A01B] transition-colors cursor-pointer">
                          <span className={pickupTime ? 'text-[#111111] font-medium' : 'text-gray-400 font-mono tracking-wider'}>
                            {pickupTime || '--:-- --'}
                          </span>
                          <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                        </div>
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                        Return time
                      </label>
                      <div className="relative">
                        <div className="w-full h-12 px-4 bg-white border border-[#E5E1D8] rounded-xl flex items-center justify-between text-xs sm:text-sm hover:border-[#C9A01B] transition-colors cursor-pointer">
                          <span className={returnTime ? 'text-[#111111] font-medium' : 'text-gray-400 font-mono tracking-wider'}>
                            {returnTime || '--:-- --'}
                          </span>
                          <Clock className="w-4 h-4 text-gray-500 shrink-0" />
                        </div>
                        <input
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section: Where should the vehicle take you? matching Capture1.PNG */}
                  <div className="pt-2">
                    <h3 className="font-semibold text-xs sm:text-sm text-[#111111] mb-3">
                      Where should the vehicle take you?
                    </h3>

                    {/* Pick-up city */}
                    <div className="mb-4">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#111111] mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                        <span>Pick-up city</span>
                      </label>
                      <div className="relative">
                        <select
                          value={pickupCity}
                          onChange={(e) => setPickupCity(e.target.value)}
                          required
                          className="w-full h-12 px-4 bg-white border border-[#E5E1D8] rounded-xl text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-all cursor-pointer appearance-none pr-10"
                        >
                          <option value="">Choose a pick-up city</option>
                          {SAUDI_CITIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Drop-off city (optional) */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-[#111111] mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                        <span>Drop-off city (optional)</span>
                      </label>
                      <div className="relative">
                        <select
                          value={dropoffCity}
                          onChange={(e) => setDropoffCity(e.target.value)}
                          className="w-full h-12 px-4 bg-white border border-[#E5E1D8] rounded-xl text-xs sm:text-sm text-[#111111] focus:outline-none focus:border-[#C9A01B] focus:ring-1 focus:ring-[#C9A01B] transition-all cursor-pointer appearance-none pr-10"
                        >
                          <option value="No drop-off city">No drop-off city</option>
                          {SAUDI_CITIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Continue Button matching Capture1.PNG */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_2px_8px_rgba(201,160,27,0.35)] hover:shadow-[0_4px_12px_rgba(201,160,27,0.45)] cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>

              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 sm:p-8 shadow-xs">
                
                <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#111111] mb-1">
                  Primary Passenger Details
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7280] mb-6">
                  Provide contact information so {vehicle.companyName} can coordinate your pickup directly.
                </p>

                {errorMessage && (
                  <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleFinalReserve} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Full Passenger Name *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        placeholder="e.g. Sara Malik"
                        className="w-full h-11 px-3 border border-[#E5E1D8] rounded-xl text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        WhatsApp Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        placeholder="+966 50 123 4567"
                        className="w-full h-11 px-3 border border-[#E5E1D8] rounded-xl text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Email Address for Reservation Receipt *
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                        placeholder="sara@example.com"
                        className="w-full h-11 px-3 border border-[#E5E1D8] rounded-xl text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        Flight Number or Terminal Pickup Notes (Optional)
                      </label>
                      <textarea
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        rows={2}
                        placeholder="e.g. Flight SV102 arriving at 2:30 PM, need 1 baby car seat."
                        className="w-full p-2.5 border border-[#E5E1D8] rounded-xl text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-[#FAF7EE] rounded-xl border border-[#EBE7DD] flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
                    <div>
                      <div className="text-xs font-bold text-[#111111]">Pay directly upon arrival</div>
                      <div className="text-[11px] text-[#6B7280]">No middleman deposit or credit card charge right now.</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">Estimated Total:</div>
                      <div className="text-xl font-bold text-[#111111] tabular-nums">{totalPrice} SAR</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-7 py-2.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                    >
                      Confirm Reservation Request
                    </button>
                  </div>
                </form>

              </div>
            )}

            {currentStep === 3 && confirmedBooking && (
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-8 text-center shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                    Booking Request Sent
                  </span>
                  <h3 className="font-playfair text-2xl font-bold text-[#111111] mt-1">
                    Reference: #{confirmedBooking.referenceNumber}
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1 max-w-md mx-auto">
                    Your reservation for {vehicle.name} has been routed directly to {vehicle.companyName}. They will contact you shortly on WhatsApp at {confirmedBooking.customerPhone}.
                  </p>
                </div>

                <div className="max-w-md mx-auto bg-[#F7F6F2] rounded-xl p-4 border border-[#E5E1D8] text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                    <span className="text-gray-500">Vehicle:</span>
                    <span className="font-semibold text-gray-900">{confirmedBooking.vehicleName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                    <span className="text-gray-500">Dates:</span>
                    <span className="font-semibold text-gray-900">{confirmedBooking.travelDate} {confirmedBooking.returnDate ? `to ${confirmedBooking.returnDate}` : ''}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                    <span className="text-gray-500">Route:</span>
                    <span className="font-semibold text-gray-900">{confirmedBooking.pickupCity} → {confirmedBooking.destinationCity}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E5E1D8] pb-1.5">
                    <span className="text-gray-500">Passenger:</span>
                    <span className="font-semibold text-gray-900">{confirmedBooking.customerName}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-bold">
                    <span>Total Rate:</span>
                    <span className="text-[#C9A01B]">{confirmedBooking.totalPriceSar} SAR</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    onClick={onGoHome}
                    className="px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-semibold hover:bg-black cursor-pointer"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => onBackToCategory(vehicle.category)}
                    className="px-6 py-2.5 rounded-full bg-white border border-[#D1CDC5] text-xs font-semibold text-[#111111] hover:bg-gray-50 cursor-pointer"
                  >
                    Browse More Vehicles
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
