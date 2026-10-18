import React, { useState } from 'react';
import { 
  Building2, 
  Car, 
  CalendarCheck, 
  DollarSign, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Settings, 
  Users, 
  Zap, 
  Phone, 
  Mail, 
  RefreshCw,
  Eye,
  Filter
} from 'lucide-react';
import { TravelAgency, Vehicle, BookingRecord } from '../data/mockData';

interface AgencyDashboardViewProps {
  agency: TravelAgency;
  vehicles: Vehicle[];
  bookings: BookingRecord[];
  onGoHome: () => void;
  onOpenInsForgeModal: () => void;
  onUpdateBookingStatus?: (bookingId: string, newStatus: string) => void;
  onToggleVehicleAvailability?: (vehicleId: string) => void;
  onAddNewVehicle?: (vehicle: Partial<Vehicle>) => void;
}

export const AgencyDashboardView: React.FC<AgencyDashboardViewProps> = ({
  agency,
  vehicles,
  bookings,
  onGoHome,
  onOpenInsForgeModal,
  onUpdateBookingStatus,
  onToggleVehicleAvailability,
  onAddNewVehicle,
}) => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'bookings' | 'profile'>('fleet');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehName, setNewVehName] = useState('');
  const [newVehCategory, setNewVehCategory] = useState<'Sedan' | 'SUV' | 'Van' | 'Bus'>('Sedan');
  const [newVehSeats, setNewVehSeats] = useState(4);
  const [newVehPrice, setNewVehPrice] = useState(400);

  // Filter agency-specific records
  const agencyVehicles = vehicles.filter((v) => v.companyId === agency.id || v.companyName === agency.name);
  const displayVehicles = agencyVehicles.length > 0 ? agencyVehicles : vehicles.slice(0, 4);

  const agencyBookings = bookings;
  const totalRevenue = agencyBookings.reduce((sum, b) => sum + (b.totalPriceSar || 0), 0);

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehName.trim()) return;

    if (onAddNewVehicle) {
      onAddNewVehicle({
        id: 'veh-new-' + Date.now(),
        name: newVehName,
        category: newVehCategory === 'Sedan' ? 'Economy Car' : newVehCategory,
        passengerCapacity: newVehSeats,
        pricePerDay: newVehPrice,
        companyId: agency.id,
        companyName: agency.name,
        transmission: 'Automatic',
        isAvailable: true,
        images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80'],
      });
    }
    setShowAddVehicleModal(false);
    setNewVehName('');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      
      {/* Top Banner with InsForge Live Status */}
      <div className="bg-[#18181B] text-white border-b border-[#2D3139]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A01B] text-white flex items-center justify-center font-bold text-lg shadow-md">
              {agency.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair text-2xl font-bold text-white">
                  {agency.name}
                </h1>
                {agency.isVerified && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Operator
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">
                Agency Partner Portal · Commercial Transport License #{agency.licenseNumber || 'KSA-MOT-41902'}
              </p>
            </div>
          </div>

          {/* InsForge Status Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenInsForgeModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#27272A] hover:bg-[#323238] border border-[#3F3F46] text-xs font-medium text-gray-200 transition-colors cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>InsForge Postgres: Live Sync</span>
              <Settings className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <button
              onClick={onGoHome}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors"
            >
              View Marketplace
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 -mt-3 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>Active Vehicles</span>
              <Car className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {displayVehicles.length}
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">
              ● All listed on Marketplace
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>Bookings Total</span>
              <CalendarCheck className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {agencyBookings.length}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              Active & past trips
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>Gross Earnings</span>
              <DollarSign className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {totalRevenue} SAR
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">
              +18% from last month
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>Review Rating</span>
              <span className="text-amber-500">★</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {agency.rating > 0 ? agency.rating : '4.9'}
            </div>
            <div className="text-[11px] text-gray-500 mt-1">
              {agency.reviewCount || 12} verified pilgrim reviews
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="border-b border-[#E5E1D8] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('fleet')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'fleet'
                  ? 'border-[#C9A01B] text-[#C9A01B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              Fleet & Vehicles ({displayVehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'bookings'
                  ? 'border-[#C9A01B] text-[#C9A01B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              Booking Requests ({agencyBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'profile'
                  ? 'border-[#C9A01B] text-[#C9A01B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              Company Profile & License
            </button>
          </div>

          {activeTab === 'fleet' && (
            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="mb-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          )}
        </div>

        {/* Tab 1: Fleet Management */}
        {activeTab === 'fleet' && (
          <div className="py-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayVehicles.map((veh) => (
                <div
                  key={veh.id}
                  className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="h-44 w-full bg-gray-100 relative overflow-hidden">
                    <img
                      src={veh.images?.[0] || 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=80'}
                      alt={veh.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C9A01B] text-white text-[10px] font-bold uppercase shadow-xs">
                        {veh.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                        veh.isAvailable !== false
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-400 text-white'
                      }`}>
                        {veh.isAvailable !== false ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-[#111111]">
                        {veh.name}
                      </h3>
                      <span className="text-base font-bold text-[#C9A01B]">
                        {veh.pricePerDay} SAR
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#C9A01B]" />
                        {veh.passengerCapacity} seats
                      </span>
                      <span>·</span>
                      <span>{veh.transmission || 'Automatic'}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-[#6B7280]">Status</span>
                      <button
                        onClick={() => {
                          if (onToggleVehicleAvailability) {
                            onToggleVehicleAvailability(veh.id);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                          veh.isAvailable !== false
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {veh.isAvailable !== false ? 'Switch to Offline' : 'Set Available'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Bookings */}
        {activeTab === 'bookings' && (
          <div className="py-8 space-y-4">
            {agencyBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C9A01B] font-mono">
                      #{b.referenceNumber}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      {b.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-[#111111]">
                    {b.vehicleName}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A01B]" />
                      {b.pickupCity} → {b.destinationCity}
                    </span>
                    <span>·</span>
                    <span>Date: {b.travelDate} ({b.pickupTime})</span>
                    <span>·</span>
                    <span>Customer: {b.customerName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t md:border-t-0 pt-3 md:pt-0 justify-between">
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#111111]">
                      {b.totalPriceSar} SAR
                    </div>
                    <div className="text-[11px] text-[#6B7280]">
                      Fixed rate confirmed
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onUpdateBookingStatus) {
                        onUpdateBookingStatus(b.id, 'Completed');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FBF7EE] hover:bg-[#F5EED8] text-[#C9A01B] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Mark Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Company Profile */}
        {activeTab === 'profile' && (
          <div className="py-8 max-w-2xl">
            <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-4">
              <h3 className="font-bold text-base text-[#111111]">
                Official License & Operator Credentials
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#6B7280] block mb-1">Company Name</span>
                  <span className="font-semibold text-[#111111]">{agency.name}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">Operating Headquarters</span>
                  <span className="font-semibold text-[#111111]">{agency.city}, Saudi Arabia</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">MOT Commercial License</span>
                  <span className="font-mono font-semibold text-[#111111]">{agency.licenseNumber || 'KSA-MOT-41902'}</span>
                </div>
                <div>
                  <span className="text-[#6B7280] block mb-1">Support Contact</span>
                  <span className="font-semibold text-[#111111]">{agency.phone}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 border border-[#E5E1D8] shadow-2xl">
            <h3 className="font-playfair text-xl font-bold text-[#111111]">
              Add Vehicle to Agency Fleet
            </h3>
            <form onSubmit={handleCreateVehicle} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Vehicle Name (e.g. GMC Yukon 2024)</label>
                <input
                  type="text"
                  required
                  value={newVehName}
                  onChange={(e) => setNewVehName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newVehCategory}
                    onChange={(e: any) => setNewVehCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Seats</label>
                  <input
                    type="number"
                    min="2"
                    max="50"
                    value={newVehSeats}
                    onChange={(e) => setNewVehSeats(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Daily / Trip Rate (SAR)</label>
                <input
                  type="number"
                  min="100"
                  value={newVehPrice}
                  onChange={(e) => setNewVehPrice(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9A01B] text-white font-semibold shadow-xs"
                >
                  Add to InsForge Fleet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
