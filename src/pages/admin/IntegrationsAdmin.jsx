import React, { useState } from 'react';
import { Plug, CheckCircle2, XCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function IntegrationsAdmin() {
  const { integrations, toggleIntegration } = useApp();
  const [connectModalItem, setConnectModalItem] = useState(null);

  const handleConnect = () => {
    if (!connectModalItem) return;
    toggleIntegration(connectModalItem.id);
    setConnectModalItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">E-Commerce & Social Integrations</h1>
          <p className="text-xs text-zinc-400 mt-1">Connect third-party channels, fulfillment centers & marketing platforms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{item.category}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                    item.connected
                      ? 'bg-emerald-400/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {item.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-white mt-2">{item.name}</h3>
              <p className="text-[10px] text-zinc-400 mt-1">Last Sync: {item.lastSync}</p>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              {item.connected ? (
                <button
                  onClick={() => toggleIntegration(item.id)}
                  className="px-3.5 py-1.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-400 text-xs font-bold rounded-xl"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={() => setConnectModalItem(item)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl transition-all shadow-md"
                >
                  Connect Platform
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      <Modal
        isOpen={!!connectModalItem}
        onClose={() => setConnectModalItem(null)}
        title={`Connect ${connectModalItem?.name}`}
      >
        {connectModalItem && (
          <div className="space-y-4 text-xs">
            <p className="text-zinc-300">
              This will initiate OAuth authorization for <span className="text-amber-400 font-bold">{connectModalItem.name}</span> prototype channel.
            </p>
            <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
              <div className="font-bold text-white">Permissions Requested:</div>
              <div className="text-[11px] text-zinc-400">• Read orders & inventory counts</div>
              <div className="text-[11px] text-zinc-400">• Sync social posts & messages</div>
            </div>

            <button
              onClick={handleConnect}
              className="w-full py-3 bg-amber-400 text-black font-extrabold text-xs rounded-xl hover:bg-amber-300"
            >
              Authorize Demo Connection
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
