import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function AccessDenied({ moduleName }) {
  const { currentRole } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-zinc-950/50 rounded-2xl border border-zinc-800/80 my-6 space-y-4">
      <div className="w-16 h-16 rounded-full bg-red-950/40 border border-red-800/50 flex items-center justify-center text-red-500 shadow-lg">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white">Access Restricted</h2>
      <p className="text-xs text-zinc-400 max-w-md">
        Your current role (<span className="text-amber-400 font-bold">{currentRole}</span>) does not have permission to view the <span className="text-white font-semibold">{moduleName}</span> section.
      </p>

      <button
        onClick={() => navigate('/admin')}
        className="px-6 py-2.5 bg-amber-400 text-black text-xs font-bold rounded-xl hover:bg-amber-300 transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Dashboard
      </button>
    </div>
  );
}
