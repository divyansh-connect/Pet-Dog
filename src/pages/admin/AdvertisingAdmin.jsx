import React, { useState } from 'react';
import { Target, TrendingUp, DollarSign, Eye, MousePointer, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdvertisingAdmin() {
  const { showToast, logActivity } = useApp();

  // Strictly Meta, Google, TikTok ONLY as requested by client
  const [adAccounts, setAdAccounts] = useState([
    { platform: 'Meta (Facebook & Instagram)', status: 'Connected', accountId: 'act_99812401', activeCampaigns: 2, monthlySpend: '$3,400.00', roas: '4.9x' },
    { platform: 'Google (Search & Shopping)', status: 'Connected', accountId: 'pub_88299012', activeCampaigns: 1, monthlySpend: '$1,200.00', roas: '3.5x' },
    { platform: 'TikTok Ads', status: 'Connected', accountId: 'tt_adv_44301', activeCampaigns: 1, monthlySpend: '$1,800.00', roas: '5.2x' }
  ]);

  const campaigns = [
    { id: 'ad-1', platform: 'Meta', name: 'Autumn Luxury Walk Launch', budget: '$5,000.00', spent: '$3,400.00', reach: '145,000', clicks: '12,400', conversions: 320, roas: '4.9x', status: 'Active' },
    { id: 'ad-2', platform: 'Google', name: 'Google Search & Shopping', budget: '$2,500.00', spent: '$1,200.00', reach: '42,000', clicks: '5,100', conversions: 140, roas: '3.5x', status: 'Active' },
    { id: 'ad-3', platform: 'TikTok', name: 'Viral CleanWalk Demo Ads', budget: '$3,000.00', spent: '$1,800.00', reach: '210,000', clicks: '18,900', conversions: 410, roas: '5.2x', status: 'Active' }
  ];

  const handleReconnect = (platform) => {
    logActivity('Ad Account Synced', 'Advertising Center', `Refreshed OAuth connection for ${platform}.`);
    showToast(`OAuth authorization refreshed for ${platform}.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Advertising Center</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Super Admin campaign monitoring and advertising account management strictly for supported platforms: <strong className="text-amber-300">Meta</strong>, <strong className="text-amber-300">Google</strong>, and <strong className="text-amber-300">TikTok</strong>.
          </p>
        </div>
      </div>

      {/* Ad Account Connection Cards (Meta, Google, TikTok ONLY) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {adAccounts.map((acc) => (
          <div key={acc.platform} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{acc.platform}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {acc.status}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono text-zinc-400">ID: {acc.accountId}</div>
              <div className="text-xl font-black text-white font-serif">{acc.monthlySpend}</div>
              <div className="text-[11px] text-zinc-400">Monthly Ad Spend</div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">ROAS: <strong className="text-amber-400">{acc.roas}</strong></span>
              <button
                onClick={() => handleReconnect(acc.platform)}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Sync OAuth
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Performance Monitoring Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Live Campaign Performance Monitoring</h2>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded font-semibold">
            Meta • Google • TikTok
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Spent</th>
                <th className="py-3 px-4">Reach</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">Conversions</th>
                <th className="py-3 px-4">ROAS</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{c.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded font-semibold text-[10px] text-amber-300">
                      {c.platform}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300">{c.budget}</td>
                  <td className="py-3.5 px-4 font-semibold text-white">{c.spent}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.reach}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.clicks}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{c.conversions}</td>
                  <td className="py-3.5 px-4 font-extrabold text-amber-400">{c.roas}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
