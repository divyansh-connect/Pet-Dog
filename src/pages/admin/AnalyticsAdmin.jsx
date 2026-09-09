import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingBag, ArrowUpRight, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AnalyticsAdmin() {
  const { orders, customers, products, showToast } = useApp();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;

  const handleExport = (reportType) => {
    showToast(`Exported ${reportType} CSV report to downloads.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <BarChart3 className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Analytics & Business Reports</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Super Admin executive metrics, revenue performance, channel sales breakdown, and automated reporting.
          </p>
        </div>
        <button
          onClick={() => handleExport('Executive Full Analytics')}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl shadow-lg shadow-amber-400/10 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2">
          <div className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Gross Revenue</div>
          <div className="text-2xl font-black text-white font-serif">${totalRevenue.toFixed(2)}</div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +18.4% vs last period
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2">
          <div className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Total Orders</div>
          <div className="text-2xl font-black text-white font-serif">{totalOrdersCount}</div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +12.1% conversion rate
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2">
          <div className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Average Order Value</div>
          <div className="text-2xl font-black text-white font-serif">${avgOrderValue.toFixed(2)}</div>
          <div className="text-[10px] text-amber-400 font-bold">Premium bundle adoption</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-2">
          <div className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider">Customer Count</div>
          <div className="text-2xl font-black text-white font-serif">{customers.length}</div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +24.8% repeat buyers
          </div>
        </div>
      </div>

      {/* Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Sales Channel Breakdown
          </h2>
          <div className="space-y-3">
            {[
              { channel: 'Official Website Storefront', percentage: '68%', revenue: '$33,286.00', color: 'bg-amber-400' },
              { channel: 'Shopify Integration', percentage: '22%', revenue: '$10,769.00', color: 'bg-emerald-400' },
              { channel: 'Amazon Seller Central', percentage: '10%', revenue: '$4,895.00', color: 'bg-blue-400' }
            ].map((item) => (
              <div key={item.channel} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-zinc-200">{item.channel}</span>
                  <span className="font-bold text-white">{item.revenue} ({item.percentage})</span>
                </div>
                <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.percentage }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Product Performers */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Top Performing Products
          </h2>
          <div className="space-y-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">{p.name}</div>
                  <div className="text-[10px] text-zinc-400">SKU: {p.sku} • Stock: {p.inventory} units</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-amber-400">${p.price.toFixed(2)}</div>
                  <div className="text-[10px] text-zinc-500">{p.rating} ★ ({p.reviewCount} reviews)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
