import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Users, 
  Car, 
  DollarSign, 
  Check, 
  X, 
  RefreshCw, 
  Zap, 
  Building2
} from 'lucide-react';
import { TravelAgency, Vehicle, BookingRecord } from '../data/mockData';
import { insforgeService } from '../lib/insforge';

interface AdminDashboardViewProps {
  agencies: TravelAgency[];
  vehicles: Vehicle[];
  bookings: BookingRecord[];
  onGoHome: () => void;
  onOpenInsForgeModal: () => void;
  onApproveAgency?: (agencyId: string) => void;
  onRejectAgency?: (agencyId: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  agencies,
  vehicles,
  bookings,
  onGoHome,
  onOpenInsForgeModal,
  onApproveAgency,
  onRejectAgency,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'database' | 'all-bookings'>('overview');
  const [insforgeSyncing, setInsforgeSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<'agencies' | 'vehicles' | 'bookings'>('agencies');

  const totalGMV = bookings.reduce((sum, b) => sum + (b.totalPriceSar || 0), 0);
  const verifiedCount = agencies.filter((a) => a.isVerified).length;
  const pendingCount = agencies.filter((a) => !a.isVerified).length;

  const handleSyncToInsForge = async () => {
    setInsforgeSyncing(true);
    setSyncStatus('Connecting to InsForge Postgres cluster...');
    
    await insforgeService.syncAgencies(agencies);
    await insforgeService.syncVehicles(vehicles);
    await insforgeService.syncBookings(bookings);
    
    setTimeout(() => {
      setInsforgeSyncing(false);
      setSyncStatus(`Synced ${agencies.length} agencies, ${vehicles.length} vehicles, and ${bookings.length} bookings to InsForge.`);
      setTimeout(() => setSyncStatus(null), 4000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      
      {/* Top Header */}
      <div className="bg-[#121316] text-white border-b border-[#27272A]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C9A01B] text-white flex items-center justify-center font-bold text-xl shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-playfair text-2xl font-bold text-white">
                  Marketplace Operations Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-gray-400">
                FlyKaaba Core Platform · Powered by InsForge Cloud Infrastructure
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncToInsForge}
              disabled={insforgeSyncing}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#27272A] hover:bg-[#323238] border border-[#3F3F46] text-xs font-semibold text-gray-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C9A01B] ${insforgeSyncing ? 'animate-spin' : ''}`} />
              <span>{insforgeSyncing ? 'Syncing...' : 'Sync InsForge Database'}</span>
            </button>
            <button
              onClick={onOpenInsForgeModal}
              className="px-3.5 py-1.5 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-xs font-semibold text-white shadow-xs"
            >
              InsForge API Keys
            </button>
            <button
              onClick={onGoHome}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors"
            >
              Public Site
            </button>
          </div>
        </div>
      </div>

      {syncStatus && (
        <div className="bg-emerald-500 text-white text-xs font-medium py-2 px-4 text-center">
          {syncStatus}
        </div>
      )}

      {/* Analytics KPI Row */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 -mt-3 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>Verified Agencies</span>
              <Building2 className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {verifiedCount}
            </div>
            <div className="text-[11px] text-[#6B7280] mt-1">
              {pendingCount} pending review
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>Total Fleet Vehicles</span>
              <Car className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {vehicles.length}
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">
              Active across 8 Saudi cities
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>Platform GMV</span>
              <DollarSign className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              {totalGMV} SAR
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">
              100% processed through FlyKaaba
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E5E1D8] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2 font-medium">
              <span>InsForge Postgres Tables</span>
              <Database className="w-4 h-4 text-[#C9A01B]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#111111]">
              4 Tables
            </div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">
              ● Postgres live connection
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="border-b border-[#E5E1D8] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'overview'
                  ? 'border-[#C9A01B] text-[#C9A01B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              Operations Overview
            </button>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
                activeTab === 'verifications'
                  ? 'border-[#C9A01B] text-[#C9A01B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              <span>Agency Approvals</span>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'database'
                  ? 'border-[#C9A01B] text-[#C9A01B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              InsForge Postgres Explorer
            </button>
            <button
              onClick={() => setActiveTab('all-bookings')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'all-bookings'
                  ? 'border-[#C9A01B] text-[#C9A01B]'
                  : 'border-transparent text-[#6B7280] hover:text-[#111111]'
              }`}
            >
              All Pilgrimage Bookings ({bookings.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Operations Overview */}
        {activeTab === 'overview' && (
          <div className="py-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Agencies summary */}
              <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#111111]">
                    Verified Transport Partners
                  </h3>
                  <button
                    onClick={() => setActiveTab('verifications')}
                    className="text-xs text-[#C9A01B] font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {agencies.slice(0, 4).map((a) => (
                    <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <div className="font-semibold text-sm text-[#111111]">{a.name}</div>
                        <div className="text-xs text-[#6B7280]">{a.city} · {a.vehicleCount || 10} vehicles</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        a.isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {a.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* InsForge Status Box */}
              <div className="bg-[#FBF7EE] rounded-2xl border border-[#EBE7DF] p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9A01B]">
                  <Zap className="w-4 h-4 fill-current" />
                  InsForge Realtime Architecture
                </div>
                <h3 className="font-playfair text-xl font-bold text-[#111111]">
                  Semantic Cloud Infrastructure Active
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  FlyKaaba integrates InsForge BaaS to orchestrate authentication, PostgreSQL storage, real-time fleet synchronization, and booking telemetry across all pilgrimage routes.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={onOpenInsForgeModal}
                    className="px-4 py-2 rounded-xl bg-[#C9A01B] text-white text-xs font-semibold shadow-xs"
                  >
                    Inspect InsForge Config
                  </button>
                  <button
                    onClick={handleSyncToInsForge}
                    className="px-4 py-2 rounded-xl bg-white border border-[#D1CDC5] text-xs font-semibold text-[#111111]"
                  >
                    Trigger Replication Ping
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Agency Verifications Queue */}
        {activeTab === 'verifications' && (
          <div className="py-8 space-y-4">
            <h3 className="font-playfair text-xl font-bold text-[#111111] mb-2">
              Agency License Verification Queue
            </h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Applications submitted via the "List your company" portal undergo MOT compliance verification here before appearing publicly.
            </p>

            <div className="space-y-3">
              {agencies.map((agency) => (
                <div
                  key={agency.id}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[#111111]">
                        {agency.name}
                      </h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        agency.isVerified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {agency.isVerified ? 'Active & Verified' : 'Awaiting Review'}
                      </span>
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      Headquarters: {agency.city} · License: {agency.licenseNumber || 'KSA-MOT-PENDING'} · Phone: {agency.phone}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!agency.isVerified ? (
                      <>
                        <button
                          onClick={() => onApproveAgency && onApproveAgency(agency.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Verify</span>
                        </button>
                        <button
                          onClick={() => onRejectAgency && onRejectAgency(agency.id)}
                          className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Approved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: InsForge Database Explorer */}
        {activeTab === 'database' && (
          <div className="py-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedTable('agencies')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold cursor-pointer ${
                    selectedTable === 'agencies'
                      ? 'bg-[#18181B] text-[#C9A01B]'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  public.agencies ({agencies.length})
                </button>
                <button
                  onClick={() => setSelectedTable('vehicles')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold cursor-pointer ${
                    selectedTable === 'vehicles'
                      ? 'bg-[#18181B] text-[#C9A01B]'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  public.vehicles ({vehicles.length})
                </button>
                <button
                  onClick={() => setSelectedTable('bookings')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold cursor-pointer ${
                    selectedTable === 'bookings'
                      ? 'bg-[#18181B] text-[#C9A01B]'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  public.bookings ({bookings.length})
                </button>
              </div>

              <span className="text-xs text-[#6B7280]">
                InsForge Postgres Schema: Normalized Relational
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                {selectedTable === 'agencies' && (
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3">id</th>
                        <th className="p-3">name</th>
                        <th className="p-3">city</th>
                        <th className="p-3">is_verified</th>
                        <th className="p-3">license_no</th>
                        <th className="p-3">rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {agencies.map((a) => (
                        <tr key={a.id} className="hover:bg-gray-50">
                          <td className="p-3 text-gray-500">{a.id}</td>
                          <td className="p-3 font-semibold text-gray-900">{a.name}</td>
                          <td className="p-3">{a.city}</td>
                          <td className="p-3">
                            <span className={a.isVerified ? 'text-emerald-600 font-bold' : 'text-amber-600'}>
                              {String(a.isVerified)}
                            </span>
                          </td>
                          <td className="p-3 text-gray-500">{a.licenseNumber || '—'}</td>
                          <td className="p-3">{a.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {selectedTable === 'vehicles' && (
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3">id</th>
                        <th className="p-3">name</th>
                        <th className="p-3">category</th>
                        <th className="p-3">agency_id</th>
                        <th className="p-3">price_sar</th>
                        <th className="p-3">seats</th>
                        <th className="p-3">available</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {vehicles.slice(0, 10).map((v) => (
                        <tr key={v.id} className="hover:bg-gray-50">
                          <td className="p-3 text-gray-500">{v.id}</td>
                          <td className="p-3 font-semibold text-gray-900">{v.name}</td>
                          <td className="p-3">{v.category}</td>
                          <td className="p-3 text-gray-500">{v.companyId}</td>
                          <td className="p-3 font-bold text-[#C9A01B]">{v.pricePerDay} SAR</td>
                          <td className="p-3">{v.passengerCapacity}</td>
                          <td className="p-3 text-emerald-600 font-bold">{String(v.isAvailable !== false)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {selectedTable === 'bookings' && (
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
                      <tr>
                        <th className="p-3">ref_number</th>
                        <th className="p-3">vehicle</th>
                        <th className="p-3">route</th>
                        <th className="p-3">customer</th>
                        <th className="p-3">total_price</th>
                        <th className="p-3">status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-gray-50">
                          <td className="p-3 text-[#C9A01B] font-bold">{b.referenceNumber}</td>
                          <td className="p-3 font-semibold text-gray-900">{b.vehicleName}</td>
                          <td className="p-3">{b.pickupCity} → {b.destinationCity}</td>
                          <td className="p-3">{b.customerName}</td>
                          <td className="p-3 font-bold">{b.totalPriceSar} SAR</td>
                          <td className="p-3 text-emerald-600 font-bold">{b.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: All Bookings */}
        {activeTab === 'all-bookings' && (
          <div className="py-8 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-playfair text-xl font-bold text-[#111111]">
                Global Bookings Registry
              </h3>
              <span className="text-xs text-[#6B7280]">
                {bookings.length} reservations logged
              </span>
            </div>

            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-[#E5E1D8] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#C9A01B]">
                        #{b.referenceNumber}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {b.status}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-[#111111]">
                      {b.vehicleName} · {b.companyName}
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      {b.pickupCity} → {b.destinationCity} · {b.travelDate} at {b.pickupTime} · Passenger: {b.customerName} ({b.customerPhone})
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-[#111111]">
                      {b.totalPriceSar} SAR
                    </div>
                    <div className="text-[11px] text-[#6B7280]">
                      Paid via verified gateway
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
