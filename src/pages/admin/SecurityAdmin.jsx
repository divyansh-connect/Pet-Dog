import React, { useState } from 'react';
import { ShieldCheck, History, Key, Lock, ShieldAlert, CheckCircle2, Search, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SecurityAdmin() {
  const { activityLogs, loginHistory, twoFactorEnabled, toggleTwoFactor, showToast, logActivity } = useApp();
  const [activeTab, setActiveTab] = useState('activity');
  const [searchLog, setSearchLog] = useState('');

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchLog.toLowerCase()) ||
      log.action.toLowerCase().includes(searchLog.toLowerCase()) ||
      log.module.toLowerCase().includes(searchLog.toLowerCase()) ||
      log.description.toLowerCase().includes(searchLog.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Security & Activity Audit Logs</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Super Admin system security policies, 2FA authentication state, IP address tracking, and comprehensive activity log.
          </p>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Two-Factor Authentication</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
              twoFactorEnabled
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-400/20 text-amber-300 border border-amber-500/30'
            }`}>
              {twoFactorEnabled ? 'Enforced' : 'Optional'}
            </span>
          </div>
          <p className="text-xs text-zinc-400">Require 2FA verification for all Super Admin & staff sign-ins.</p>
          <button
            onClick={toggleTwoFactor}
            className="w-full py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-bold text-amber-400 transition-colors cursor-pointer"
          >
            {twoFactorEnabled ? 'Disable 2FA Enforcement' : 'Enable 2FA Enforcement'}
          </button>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2">
          <div className="text-xs font-bold text-white">Super Admin Session Timeout</div>
          <p className="text-xs text-zinc-400">Auto-terminate idle administrative sessions after 15 minutes of inactivity.</p>
          <div className="text-xs font-mono font-bold text-emerald-400 pt-2">Status: Active (15 Min Policy)</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2">
          <div className="text-xs font-bold text-white">API Encryption & JWT Auth</div>
          <p className="text-xs text-zinc-400">HMAC-SHA256 bearer tokens with HTTP-only authorization headers.</p>
          <div className="text-xs font-mono font-bold text-amber-400 pt-2">JWT Expiration: 12 Hours</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('activity')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'activity'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Activity Audit Log ({activityLogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('loginHistory')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'loginHistory'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Login History & IP Logs ({loginHistory.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'activity' ? (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-3">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">System Activity Audit Log</h2>
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter logs by user, action, module..."
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">User / Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{log.user}</td>
                    <td className="py-3.5 px-4 font-semibold text-amber-400">{log.action}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-[10px] text-zinc-300">
                        {log.module}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">{log.description}</td>
                    <td className="py-3.5 px-4 text-zinc-500 font-mono text-[11px]">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Authentication Attempts & IP Tracking Log
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">IP Address</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Device</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {loginHistory.map((lh) => (
                  <tr key={lh.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{lh.user}</td>
                    <td className="py-3.5 px-4 text-amber-300">{lh.role}</td>
                    <td className="py-3.5 px-4 font-mono text-zinc-300">{lh.ip}</td>
                    <td className="py-3.5 px-4 text-zinc-400">{lh.location}</td>
                    <td className="py-3.5 px-4 text-zinc-400">{lh.device}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        lh.status.includes('Success')
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {lh.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500 font-mono text-[11px]">{lh.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
