import React, { useState } from 'react';
import {
  Settings,
  RefreshCw,
  Shield,
  Key,
  Lock,
  Mail,
  Smartphone,
  History,
  AlertTriangle,
  CheckCircle2,
  Globe,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function SettingsAdmin() {
  const {
    resetDemoData,
    twoFactorEnabled,
    toggleTwoFactor,
    loginHistory,
    showToast,
    logActivity
  } = useApp();

  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [emailVerifyModalOpen, setEmailVerifyModalOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    logActivity('Password Changed', 'Security', 'Admin updated master security password.');
    showToast('Admin password updated successfully.');
    setPasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleVerifyEmail = () => {
    logActivity('Email Verification', 'Security', 'Verified admin security contact email.');
    showToast('Security verification code sent to admin email address.');
    setEmailVerifyModalOpen(false);
  };

  return (
    <div className="space-y-10 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>ENTERPRISE SECURITY & CONTROLS</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-white">Security Suite & Settings</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage Two-Factor Authentication (2FA), active user sessions, password credentials, and login history audit logs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column — Security Controls */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* PART 16 — Security Controls Box */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" /> Authentication & Credential Management
            </h2>

            <div className="space-y-4 text-xs">
              
              {/* 2FA Toggle */}
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-amber-400" /> Two-Factor Authentication (2FA)
                  </div>
                  <div className="text-[11px] text-zinc-400">Requires Time-based One-Time Password (TOTP) authenticator app code on login.</div>
                </div>
                <button
                  onClick={toggleTwoFactor}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    twoFactorEnabled
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-white'
                  }`}
                >
                  {twoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}
                </button>
              </div>

              {/* Password Reset */}
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-400" /> Master Password & Credentials
                  </div>
                  <div className="text-[11px] text-zinc-400">Update encrypted hash password for admin control panel access.</div>
                </div>
                <button
                  onClick={() => setPasswordModalOpen(true)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 font-bold text-xs rounded-xl cursor-pointer transition-all"
                >
                  Change Password
                </button>
              </div>

              {/* Email Verification */}
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" /> Email Security Verification
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">admin@naranpetcare.com (Verified)</div>
                </div>
                <button
                  onClick={() => setEmailVerifyModalOpen(true)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs rounded-xl cursor-pointer transition-all"
                >
                  Re-verify Email
                </button>
              </div>

            </div>
          </div>

          {/* PART 16 — Session Management & Login History */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" /> Active Session & Login History
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-950 text-amber-400 uppercase text-[10px] tracking-wider font-bold">
                  <tr>
                    <th className="p-3">User & Role</th>
                    <th className="p-3">IP Address</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Device / Browser</th>
                    <th className="p-3">Timestamp</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {loginHistory?.map((log) => (
                    <tr key={log.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white">{log.user}</div>
                        <div className="text-[10px] text-amber-400">{log.role}</div>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-zinc-400">{log.ip}</td>
                      <td className="p-3 text-zinc-300">{log.location}</td>
                      <td className="p-3 text-zinc-400">{log.device}</td>
                      <td className="p-3 font-mono text-[10px] text-zinc-500">{log.timestamp}</td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            log.status.includes('Success')
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : 'bg-red-500/10 border-red-500/30 text-red-400'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column — General Settings & Demo Control */}
        <div className="space-y-8">
          
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-400" /> General Business Info
            </h2>

            <div className="space-y-4 text-xs">
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

              <div>
                <label className="text-zinc-400 font-medium">Domain Status</label>
                <div className="mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> naranpetcare.com (SSL Active)
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-6 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
              <RefreshCw className="w-4 h-4" /> System Reset & Baseline
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              Restore baseline product catalogs, sample orders, customer profiles, and initial activity logs.
            </p>

            <button
              onClick={() => setResetConfirmOpen(true)}
              className="w-full py-4 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 font-extrabold text-xs rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RESET DEMO SYSTEM</span>
            </button>
          </div>

        </div>

      </div>

      {/* Password Reset Modal */}
      <Modal isOpen={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} title="Change Master Password">
        <form onSubmit={handleChangePassword} className="space-y-4 text-xs text-zinc-100">
          <div>
            <label className="text-zinc-400 font-medium">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-zinc-400 font-medium">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div>
            <label className="text-zinc-400 font-medium">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => setPasswordModalOpen(false)}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-400 text-black font-extrabold rounded-xl hover:bg-amber-300"
            >
              Update Password
            </button>
          </div>
        </form>
      </Modal>

      {/* Email Verification Modal */}
      <Modal isOpen={emailVerifyModalOpen} onClose={() => setEmailVerifyModalOpen(false)} title="Verify Email Security Contact">
        <div className="space-y-4 text-xs text-zinc-100">
          <p className="text-zinc-300 leading-relaxed">
            Click below to send a security verification OTP to <strong className="text-amber-400 font-mono">admin@naranpetcare.com</strong>.
          </p>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setEmailVerifyModalOpen(false)}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleVerifyEmail}
              className="px-5 py-2 bg-amber-400 text-black font-extrabold rounded-xl hover:bg-amber-300"
            >
              Send Verification Email
            </button>
          </div>
        </div>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal isOpen={resetConfirmOpen} onClose={() => setResetConfirmOpen(false)} title="Confirm Demo System Reset">
        <div className="space-y-4 text-xs text-zinc-100">
          <div className="flex items-center gap-3 text-red-400 bg-red-950/40 p-3 rounded-xl border border-red-800">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <span>This will restore all products, orders, inventory, and activity logs to baseline demo configuration.</span>
          </div>

          <p className="text-zinc-300">Are you sure you want to proceed?</p>

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setResetConfirmOpen(false)}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                resetDemoData();
                setResetConfirmOpen(false);
              }}
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
