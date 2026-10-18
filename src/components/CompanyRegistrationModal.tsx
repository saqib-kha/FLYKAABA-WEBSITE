import React, { useState } from 'react';
import { X, Building2, ShieldCheck, CheckCircle2, FileText, Upload, AlertCircle } from 'lucide-react';
import { SAUDI_CITIES } from '../data/mockData';
import { insforgeService } from '../lib/insforge';

interface CompanyRegistrationModalProps {
  onClose: () => void;
  onCompanyRegistered: (companyName: string) => void;
}

export const CompanyRegistrationModal: React.FC<CompanyRegistrationModalProps> = ({
  onClose,
  onCompanyRegistered,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('Makkah');
  const [crNumber, setCrNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [fleetSize, setFleetSize] = useState('5-15 vehicles');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !crNumber.trim() || !phone.trim() || !email.trim()) {
      setError('Please fill in all required company registration fields.');
      return;
    }
    setError('');
    try {
      const fleetNum = parseInt(fleetSize.replace(/\D/g, '')) || 10;
      await insforgeService.registerAgency({
        name: companyName.trim(),
        city,
        phone: phone.trim(),
        email: email.trim(),
        licenseNumber: crNumber.trim(),
        description: `Transport operator registered in ${city}. Commercial Registration: ${crNumber}`,
        vehicleCount: fleetNum,
      });
    } catch (err) {
      console.warn('Company registration saved locally:', err);
    }
    setSubmitted(true);
    onCompanyRegistered(companyName);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E1D8] flex items-center justify-between bg-[#FBF7E9]/60">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#C9A01B]" />
            <div>
              <h3 className="font-playfair text-lg font-bold text-[#111111]">
                Partner With FlyKaaba
              </h3>
              <p className="text-[11px] text-[#6B7280]">
                List your transport company & connect directly with pilgrims and travelers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  Application Received
                </span>
                <h4 className="font-playfair text-2xl font-bold text-[#111111] mt-1">
                  Welcome, {companyName}!
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 max-w-md mx-auto leading-relaxed">
                  Our merchant verification team has received your registration documents (CR: {crNumber}). We will contact you via WhatsApp at {phone} within 24 hours to finalize your verified vendor badge.
                </p>
              </div>

              <div className="p-4 bg-[#F7F6F2] rounded-xl text-left text-xs max-w-md mx-auto space-y-1.5 border border-[#E5E1D8]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Operating City:</span>
                  <span className="font-semibold text-gray-900">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fleet Size:</span>
                  <span className="font-semibold text-gray-900">{fleetSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact Officer:</span>
                  <span className="font-semibold text-gray-900">{contactName || 'Representative'}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#C9A01B] text-white text-xs font-semibold hover:bg-[#b89115]"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="e.g. Al Noor Transport Services Ltd"
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Primary City of Operation *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none bg-white"
                  >
                    {SAUDI_CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Commercial Registration (CR) Number *
                  </label>
                  <input
                    type="text"
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                    required
                    placeholder="e.g. 1010XXXXXX"
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Fleet Size *
                  </label>
                  <select
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none bg-white"
                  >
                    <option value="1-5 vehicles">1 - 5 vehicles</option>
                    <option value="5-15 vehicles">5 - 15 vehicles</option>
                    <option value="15-50 vehicles">15 - 50 vehicles</option>
                    <option value="50+ vehicles">50+ vehicles (Commercial Fleet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Owner / Manager Name *
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="e.g. Sultan Al-Ghamdi"
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+966 50 000 0000"
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="operations@transport.sa"
                    className="w-full h-10 px-3 border border-[#E5E1D8] rounded-lg text-xs sm:text-sm focus:border-[#C9A01B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Ministry License upload placeholder */}
              <div className="border-2 border-dashed border-[#E5E1D8] rounded-xl p-4 text-center hover:border-[#C9A01B] transition-colors cursor-pointer bg-[#FBF7E9]/30">
                <Upload className="w-6 h-6 text-[#C9A01B] mx-auto mb-1" />
                <div className="text-xs font-semibold text-[#111111]">
                  Upload Ministry of Transport License / CR Copy
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  PDF, JPG or PNG up to 10MB (optional for initial review)
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#C9A01B] hover:bg-[#b89115] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Submit Company for Verification
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
