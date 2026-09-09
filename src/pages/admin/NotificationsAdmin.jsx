import React, { useState } from 'react';
import { Bell, CheckCircle2, Trash2, Check, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationsAdmin() {
  const {
    notifications,
    markNotificationRead,
    clearAllNotifications,
    showToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    'All',
    'Unread',
    'New Order',
    'New Customer',
    'Review Received',
    'Refund Request',
    'Low Stock',
    'Social Message',
    'Campaign Completed'
  ];

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.read;
    return n.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const markAllRead = () => {
    notifications.forEach((n) => markNotificationRead(n.id));
    showToast('All notifications marked as read.', 'info');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5" />
            <span>REAL-TIME NOTIFICATION SYSTEM</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-white">Notification Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Multi-channel event stream covering orders, stock alerts, reviews, refund triggers, and campaign milestones.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={markAllRead}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Check className="w-4 h-4" /> Mark All as Read
          </button>
          <button
            onClick={clearAllNotifications}
            className="px-4 py-2.5 bg-red-950/40 hover:bg-red-900 border border-red-800/60 text-red-300 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      {/* PART 18 — Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeFilter === cat
                ? 'bg-amber-400 text-black font-extrabold shadow-md shadow-amber-500/20'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notification Stream */}
      <div className="space-y-4">
        {filteredNotifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 shadow-lg ${
              n.read
                ? 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400'
                : 'bg-gradient-to-r from-zinc-900 via-amber-950/20 to-zinc-900 border-amber-500/40 text-white'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 text-sm">{n.title}</span>
                <span className="text-[10px] bg-zinc-800 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase font-bold">
                  {n.type}
                </span>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{n.message}</p>
              <div className="text-[10px] text-zinc-500">{n.time}</div>
            </div>

            {!n.read && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markNotificationRead(n.id);
                }}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl shrink-0 cursor-pointer shadow-md"
              >
                Mark Read
              </button>
            )}
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-500 text-xs">
            No notifications found in "{activeFilter}" filter category.
          </div>
        )}
      </div>
    </div>
  );
}
