import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  Car, 
  Award,
  Send
} from 'lucide-react';
import { TravelAgency, Vehicle } from '../data/mockData';

interface AgencyDetailsModalProps {
  agency: TravelAgency;
  agencyVehicles: Vehicle[];
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onAddReview: (agencyId: string, rating: number, comment: string) => void;
}

export const AgencyDetailsModal: React.FC<AgencyDetailsModalProps> = ({
  agency,
  agencyVehicles,
  onClose,
  onSelectVehicle,
  onAddReview,
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'about' | 'reviews'>('fleet');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userComment.trim()) return;
    onAddReview(agency.id, userRating, userComment);
    setReviewSubmitted(true);
    setUserComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Cover Photo & Header */}
        <div className="relative h-44 sm:h-52 bg-neutral-200">
          <img
            src={agency.coverImage}
            alt={agency.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Agency Badge */}
          {agency.isVerified && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2563EB] text-white text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Operator</span>
            </div>
          )}

          {/* Overlapping Avatar & Info in Cover */}
          <div className="absolute -bottom-6 left-6 flex items-end gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white p-1 border-2 border-white shadow-md overflow-hidden">
              <img
                src={agency.avatarImage}
                alt={agency.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Agency Title and Action Bar */}
        <div className="px-6 pt-9 pb-4 border-b border-[#E5E1D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-playfair text-2xl font-bold text-[#111111]">
                {agency.name}
              </h2>
              {agency.isVerified && (
                <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-[#6B7280] mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                {agency.city}, Saudi Arabia
              </span>
              <span>·</span>
              <span>License: {agency.licenseNumber}</span>
              <span>·</span>
              <span className="flex items-center text-[#C9A01B] font-semibold">
                ★ {agency.rating > 0 ? agency.rating.toFixed(1) : 'New'} ({agency.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Direct Contact Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${agency.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#D5D0C6] text-xs font-semibold text-[#111111] hover:bg-[#F7F6F2]"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A01B]" />
              <span>Call</span>
            </a>
            <a
              href={`https://wa.me/${agency.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-[#E5E1D8] flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('fleet')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'fleet'
                ? 'border-[#C9A01B] text-[#C9A01B]'
                : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicles Fleet ({agencyVehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'border-[#C9A01B] text-[#C9A01B]'
                : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>About & Verification</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-[#C9A01B] text-[#C9A01B]'
                : 'border-transparent text-[#6B7280] hover:text-[#111111]'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({agency.reviewCount})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FBF7E9]/20">
          
          {/* Tab 1: Fleet */}
          {activeTab === 'fleet' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {agencyVehicles.length > 0 ? (
                agencyVehicles.map((veh) => (
                  <div
                    key={veh.id}
                    className="bg-white rounded-xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="h-36 overflow-hidden bg-neutral-100">
                      <img
                        src={veh.images[0]}
                        alt={veh.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-semibold text-[#C9A01B] uppercase">{veh.category}</div>
                        <h4 className="font-playfair font-bold text-sm text-[#111111]">{veh.name}</h4>
                        <div className="text-[11px] text-[#6B7280] mt-1">{veh.passengerCapacity} seats · {veh.transmission}</div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#F5F2EA] flex items-center justify-between">
                        <span className="text-sm font-bold text-[#111111]">{veh.pricePerDay} SAR<span className="text-[10px] text-gray-500 font-normal">/day</span></span>
                        <button
                          onClick={() => onSelectVehicle(veh)}
                          className="px-3 py-1 rounded-full bg-[#C9A01B] text-white text-xs font-semibold hover:bg-[#b89115]"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-xs text-gray-500">
                  Fleet vehicles updating. Contact the agency directly via WhatsApp or phone.
                </div>
              )}
            </div>
          )}

          {/* Tab 2: About & Verification */}
          {activeTab === 'about' && (
            <div className="space-y-4 max-w-2xl bg-white p-5 rounded-xl border border-[#E5E1D8]">
              <div>
                <h4 className="font-playfair font-bold text-base text-[#111111] mb-2">Company Overview</h4>
                <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                  {agency.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1] grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#6B7280]">Year Founded:</span>
                  <p className="font-semibold text-[#111111]">{agency.foundedYear}</p>
                </div>
                <div>
                  <span className="text-[#6B7280]">Total Active Fleet:</span>
                  <p className="font-semibold text-[#111111]">{agency.vehicleCount} Vehicles</p>
                </div>
                <div>
                  <span className="text-[#6B7280]">Commercial Registration:</span>
                  <p className="font-semibold text-[#111111]">{agency.licenseNumber}</p>
                </div>
                <div>
                  <span className="text-[#6B7280]">Customer Support Email:</span>
                  <p className="font-semibold text-[#111111]">{agency.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-5 max-w-2xl">
              {/* Write a review form */}
              <div className="bg-white p-4 rounded-xl border border-[#E5E1D8]">
                <h4 className="font-playfair font-bold text-sm text-[#111111] mb-2">
                  Leave a Review for {agency.name}
                </h4>
                
                {reviewSubmitted ? (
                  <div className="p-3 bg-green-50 text-green-800 rounded-lg text-xs font-medium">
                    Thank you! Your verified review has been submitted and added to this agency.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-600 font-medium">Your Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setUserRating(s)}
                            className="p-1 focus:outline-none"
                          >
                            <Star
                              className={`w-4 h-4 ${
                                s <= userRating ? 'fill-[#C9A01B] text-[#C9A01B]' : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      rows={2}
                      required
                      placeholder="Share your experience regarding driver punctuality, cleanliness, and route knowledge..."
                      className="w-full p-2.5 border border-[#E5E1D8] rounded-lg text-xs text-[#111111] focus:outline-none focus:border-[#C9A01B]"
                    />

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Submit Review</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Sample reviews */}
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-[#E5E1D8]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#111111]">Abdul Rahman K. (United Kingdom)</span>
                    <span className="text-[11px] text-gray-400">Sep 2026</span>
                  </div>
                  <div className="flex items-center text-[#C9A01B] mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#C9A01B]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#4B5563]">
                    "Punctual airport pickup at Jeddah Terminal 1 with a brand new GMC Yukon. Clean car, polite driver who loaded all our luggage and provided cold Zamzam water. Highly recommended for Umrah families."
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
