import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ApprovalsAdmin() {
  const { approvals, approveRequest, rejectRequest } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Pending Requests & Approvals</h1>
          <p className="text-xs text-zinc-400 mt-1">Review executive price changes and marketing budget requests</p>
        </div>
      </div>

      <div className="space-y-4">
        {approvals.map((item) => (
          <div key={item.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{item.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                    item.status === 'Approved'
                      ? 'bg-emerald-400/20 text-emerald-300 border-emerald-500/30'
                      : item.status === 'Rejected'
                      ? 'bg-red-950 text-red-400 border-red-800'
                      : 'bg-amber-400/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-light">{item.description}</p>
              <div className="text-[10px] text-zinc-500">Requested by: {item.requestedBy} • {item.date}</div>
            </div>

            {item.status === 'Pending' && (
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => rejectRequest(item.id)}
                  className="px-4 py-2 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-400 font-bold text-xs rounded-xl"
                >
                  REJECT
                </button>
                <button
                  onClick={() => approveRequest(item.id)}
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow-md"
                >
                  APPROVE
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
