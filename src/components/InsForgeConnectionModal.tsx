import React, { useState } from 'react';
import { X, Zap, CheckCircle2, RefreshCw, Database, Server, Key, ExternalLink, ShieldAlert } from 'lucide-react';
import { insforgeService, InsForgeConfigState } from '../lib/insforge';

interface InsForgeConnectionModalProps {
  onClose: () => void;
  onDataSyncSuccess?: () => void;
}

export const InsForgeConnectionModal: React.FC<InsForgeConnectionModalProps> = ({
  onClose,
  onDataSyncSuccess,
}) => {
  const [config, setConfig] = useState<InsForgeConfigState>(insforgeService.getConfig());
  const [url, setUrl] = useState(config.baseUrl);
  const [key, setKey] = useState(config.anonKey);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; latencyMs?: number; message?: string } | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await insforgeService.testConnection();
    setIsTesting(false);
    setTestResult(res);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const res = insforgeService.updateConfig(url, key);
    if (res.success) {
      setConfig(insforgeService.getConfig());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      if (onDataSyncSuccess) onDataSyncSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl border border-[#E5E1D8]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E5E1D8] flex items-center justify-between bg-[#18181B] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C9A01B] flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C9A01B]">
                Cloud Infrastructure
              </div>
              <h2 className="font-playfair text-xl font-bold">
                InsForge Backend Connection
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Status Banner */}
          <div className="bg-[#FBF7EE] border border-[#EBE7DF] rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <div className="text-xs font-bold text-[#111111] flex items-center gap-2">
                  <span>InsForge CLI & SDK Linked</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-mono font-medium">Project Active</span>
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  Project ID: <span className="font-mono text-[#111111] font-semibold">{config.projectId}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleTestConnection}
              disabled={isTesting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-xs font-semibold text-[#111111] transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#C9A01B] ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing...' : 'Test Ping'}</span>
            </button>
          </div>

          {/* 3 Connected Dashboards Banner */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Connected Surfaces (1 Website + 3 Dashboards)</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-white border border-gray-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-gray-800">Website & Booking</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-gray-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-gray-800">Admin Dashboard</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-gray-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-gray-800">Agency Dashboard</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-gray-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-gray-800">Driver Portal</span>
              </div>
            </div>
          </div>

          {testResult && (
            <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
              testResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>
                {testResult.message} ({testResult.latencyMs}ms response)
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1.5">
                InsForge Project ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={config.projectId}
                  className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 bg-gray-50 text-xs font-mono text-[#111111]"
                />
                <Database className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1.5">
                InsForge Project Base URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://hi4ydxt3.us-east.insforge.app"
                  className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 text-xs font-mono text-[#111111] focus:outline-none focus:border-[#C9A01B]"
                />
                <Server className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1.5">
                InsForge Anon API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder="ik_c93abb318797..."
                  className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 text-xs font-mono text-[#111111] focus:outline-none focus:border-[#C9A01B]"
                />
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Managed Database Tables */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-[#111111] mb-2">
                InsForge Synced Tables (Postgres)
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl border border-[#E5E1D8] bg-[#FDFCFB] flex items-center justify-between">
                  <span className="font-mono text-[#111111]">public.agencies</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="p-2.5 rounded-xl border border-[#E5E1D8] bg-[#FDFCFB] flex items-center justify-between">
                  <span className="font-mono text-[#111111]">public.vehicles</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="p-2.5 rounded-xl border border-[#E5E1D8] bg-[#FDFCFB] flex items-center justify-between">
                  <span className="font-mono text-[#111111]">public.bookings</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
                <div className="p-2.5 rounded-xl border border-[#E5E1D8] bg-[#FDFCFB] flex items-center justify-between">
                  <span className="font-mono text-[#111111]">public.audit_logs</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex items-center justify-between">
              {saveSuccess ? (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Configuration saved!
                </span>
              ) : (
                <span className="text-xs text-[#6B7280]">
                  Changes take effect immediately
                </span>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C9A01B] hover:bg-[#b89115] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
