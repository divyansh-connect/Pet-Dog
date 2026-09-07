import React, { useState } from 'react';
import { Search, Eye, X, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CustomersAdmin() {
  const { customers, orders } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCustomer, setActiveCustomer] = useState(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Customer CRM</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage customer profiles, purchase history & VIP tiering</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
        <table className="w-full text-xs text-left min-w-[650px]">
          <thead className="bg-zinc-950 text-amber-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Total Spent</th>
              <th className="p-4">Avg Order Value</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-white">{c.name}</div>
                  <div className="text-[10px] text-zinc-500">Last Order: {c.lastOrder}</div>
                </td>
                <td className="p-4 text-zinc-400">
                  <div>{c.email}</div>
                  <div className="text-[10px]">{c.phone}</div>
                </td>
                <td className="p-4 font-bold text-white">{c.ordersCount} orders</td>
                <td className="p-4 font-extrabold text-amber-400">${c.totalSpent.toFixed(2)}</td>
                <td className="p-4 font-semibold text-white">${c.avgOrderValue.toFixed(2)}</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                      c.status === 'VIP'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-500/30'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setActiveCustomer(c)}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-medium inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Detail Drawer */}
      {activeCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-zinc-900 h-full border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-white">{activeCustomer.name}</h3>
                  <p className="text-xs text-amber-400 font-mono">{activeCustomer.email}</p>
                </div>
                <button onClick={() => setActiveCustomer(null)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Total Lifetime Spent</div>
                  <div className="text-xl font-extrabold text-amber-400">${activeCustomer.totalSpent.toFixed(2)}</div>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <div className="text-[10px] text-zinc-500 uppercase">Total Orders</div>
                  <div className="text-xl font-extrabold text-white">{activeCustomer.ordersCount}</div>
                </div>
              </div>

              <div className="pt-6 space-y-2 text-xs">
                <div className="font-bold text-white uppercase tracking-wider text-[10px]">Contact Info</div>
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2 text-zinc-300">
                  <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-amber-400" /> {activeCustomer.email}</div>
                  <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-amber-400" /> {activeCustomer.phone}</div>
                  <div className="flex items-center gap-2 font-mono"><MapPin className="w-3.5 h-3.5 text-amber-400" /> {activeCustomer.address}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveCustomer(null)}
              className="w-full py-3 bg-zinc-800 text-white font-bold text-xs rounded-xl"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
