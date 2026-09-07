import React, { useState } from 'react';
import { History, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ActivityAdmin() {
  const { activityLogs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = activityLogs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">System Audit & Activity Logs</h1>
          <p className="text-xs text-zinc-400 mt-1">Immutable audit stream recording all storefront & admin actions</p>
        </div>
      </div>

      <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
        <table className="w-full text-xs text-left min-w-[650px]">
          <thead className="bg-zinc-950 text-amber-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">User Role</th>
              <th className="p-4">Module</th>
              <th className="p-4">Action</th>
              <th className="p-4">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4 text-zinc-500 font-mono text-[10px]">{log.timestamp}</td>
                <td className="p-4 font-semibold text-white">{log.user}</td>
                <td className="p-4">
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                    {log.module}
                  </span>
                </td>
                <td className="p-4 font-bold text-white">{log.action}</td>
                <td className="p-4 text-zinc-300">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
