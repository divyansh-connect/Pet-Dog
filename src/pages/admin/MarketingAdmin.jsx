import React, { useState } from 'react';
import { Megaphone, Plus, TrendingUp, DollarSign, Target, MousePointer } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function MarketingAdmin() {
  const { campaigns, createCampaign } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('Instagram & TikTok Ads');
  const [budget, setBudget] = useState(3000);

  const handleSave = (e) => {
    e.preventDefault();
    if (!name) return;
    createCampaign({
      name,
      platform,
      budget: Number(budget),
      startDate: new Date().toISOString().split('T')[0],
      endDate: '2026-10-30',
      status: 'Active',
      targetAudience: 'Pet owners aged 25-45'
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Marketing & Ad Campaigns</h1>
          <p className="text-xs text-zinc-400 mt-1">Track digital ad campaigns, performance analytics & campaign ROI</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl transition-all shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> CREATE CAMPAIGN
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{camp.name}</span>
              <span className="bg-emerald-400/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                {camp.status}
              </span>
            </div>

            <div className="text-[10px] text-zinc-400 font-semibold">{camp.platform}</div>

            <div className="space-y-2 pt-3 border-t border-zinc-800 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Budget / Spent</span>
                <span className="font-bold text-white">${camp.spent} / ${camp.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Attributed Revenue</span>
                <span className="font-extrabold text-amber-400">${camp.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Campaign ROI</span>
                <span className="font-bold text-emerald-400">{camp.roi}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Launch Marketing Campaign">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-300 font-semibold">Campaign Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
              placeholder="e.g. Holiday CleanWalk Promo"
            />
          </div>

          <div>
            <label className="text-zinc-300 font-semibold">Ad Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
            >
              <option value="Instagram & TikTok Ads">Instagram & TikTok Ads</option>
              <option value="Google Search & Shopping">Google Search & Shopping</option>
              <option value="Facebook Retargeting">Facebook Retargeting</option>
              <option value="YouTube Video Sponsorships">YouTube Video Sponsorships</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-300 font-semibold">Budget Allocation ($)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-mono"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-amber-400 text-black font-extrabold text-xs rounded-xl">
            Save & Launch Campaign
          </button>
        </form>
      </Modal>
    </div>
  );
}
