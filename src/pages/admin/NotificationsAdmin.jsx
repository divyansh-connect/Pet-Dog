import React from 'react';
import { Bell, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function NotificationsAdmin() {
  const { notifications, markNotificationRead } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">System Notifications Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time alerts triggered by customer orders, inventory limits & messages</p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
              n.read
                ? 'bg-zinc-900/40 border-zinc-800 text-zinc-400'
                : 'bg-amber-400/10 border-amber-500/30 text-white'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300 text-sm">{n.title}</span>
                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase font-semibold">{n.type}</span>
              </div>
              <p className="text-xs text-zinc-300">{n.message}</p>
              <div className="text-[10px] text-zinc-500">{n.time}</div>
            </div>

            {!n.read && (
              <button className="px-3 py-1.5 bg-amber-400 text-black text-xs font-bold rounded-xl shrink-0">
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
