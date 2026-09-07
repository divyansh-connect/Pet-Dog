import React, { useState } from 'react';
import { Settings, RefreshCw, Shield, CreditCard, Truck, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function SettingsAdmin() {
  const { resetDemoData } = useApp();
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleResetConfirm = () => {
    resetDemoData();
    setResetConfirmOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">System Settings & Controls</h1>
          <p className="text-xs text-zinc-400 mt-1">Configure business settings, security parameters & demo state</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Settings Options */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Business Info */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" /> General Business Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 font-medium">Brand Name</label>
                <input
                  type="text"
                  readOnly
                  value="NARAN PETCARE INC."
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-medium">Support Contact</label>
                <input
                  type="text"
                  readOnly
                  value="concierge@naranpetcare.com"
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
                />
              </div>
            </div>
          </div>

          {/* Security Mock Controls */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" /> Security Controls (Mock)
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <div>
                  <div className="font-bold text-white">Two-Factor Authentication (2FA)</div>
                  <div className="text-[10px] text-zinc-500">Require authenticator code for admin login</div>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    twoFactorEnabled ? 'bg-amber-400 text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Active Sessions</div>
                  <div className="text-[10px] text-zinc-500">1 session active (New York, NY)</div>
                </div>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded font-bold">Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Reset Demo Box */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-6 h-fit">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
            <RefreshCw className="w-4 h-4" /> Prototype State Control
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            Need to clear all placed orders, cart modifications, and product updates to present a clean demo?
          </p>

          <button
            onClick={() => setResetConfirmOpen(true)}
            className="w-full py-4 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 font-extrabold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>RESET DEMO DATA</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal isOpen={resetConfirmOpen} onClose={() => setResetConfirmOpen(false)} title="Confirm Demo Reset">
        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3 text-red-400 bg-red-950/40 p-3 rounded-xl border border-red-800">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <span>This will restore all products, orders, inventory, and activity logs to their default baseline.</span>
          </div>

          <p className="text-zinc-300">Are you sure you want to proceed with restoring baseline demo data?</p>

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setResetConfirmOpen(false)}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleResetConfirm}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl"
            >
              Confirm Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
