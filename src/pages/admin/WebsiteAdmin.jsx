import React, { useState } from 'react';
import { Store, Globe, Eye, Save, Sparkles, Smartphone, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function WebsiteAdmin() {
  const { showToast, logActivity } = useApp();

  const [heroTitle, setHeroTitle] = useState('The Hands-Free Revolution in Dog Care');
  const [heroSubtitle, setHeroSubtitle] = useState('CleanWalk™ Waste Catcher - Engineering Elegance for Every Walk');
  const [announcementBanner, setAnnouncementBanner] = useState('FREE EXPRESS SHIPPING ON ORDERS OVER $100 | CODE: CLEANWALK15');
  const [currency, setCurrency] = useState('USD ($)');
  const [customDomain, setCustomDomain] = useState('naranpetcare.com');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    logActivity('Website Config Updated', 'Website / Store', 'Updated storefront hero showcase, banners, and theme settings.');
    setIsSaved(true);
    showToast('Website storefront configuration saved successfully!');
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <Store className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Website / Storefront Control</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Manage your NARAN PETCARE storefront design, hero showcase, banners, domain, and SEO settings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-300 transition-colors"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Live Store Preview</span>
          </a>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Saved!' : 'Save Store Changes'}</span>
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Hero & Branding Banner Section */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Hero & Announcement Banners</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Announcement Bar Text</label>
              <input
                type="text"
                value={announcementBanner}
                onChange={(e) => setAnnouncementBanner(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Hero Headline Title</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Hero Subtitle Description</label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Store Preferences & Custom Domain */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-zinc-800 pb-3">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Domain & Localization</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Primary Domain</label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Display Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                  <option value="GBP (£)">GBP (£)</option>
                  <option value="CAD ($)">CAD ($)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-6">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" /> Live Hero Preview
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-semibold uppercase">
                Active Theme
              </span>
            </div>

            {/* Simulated Hero Card */}
            <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-xl">
              <div className="bg-amber-400 text-black text-[10px] font-extrabold px-3 py-1.5 text-center truncate">
                {announcementBanner}
              </div>
              <div className="p-5 text-center space-y-3">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[9px] font-bold text-amber-300 uppercase">
                  NARAN LUXURY PETCARE
                </div>
                <h3 className="text-sm font-extrabold text-white leading-tight font-serif">
                  {heroTitle}
                </h3>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {heroSubtitle}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-4 py-2 bg-amber-400 text-black font-bold text-xs rounded-lg shadow-md shadow-amber-400/10">
                    Explore CleanWalk™
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
