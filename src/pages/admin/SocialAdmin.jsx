import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Share2,
  Plus,
  Trash2,
  Heart,
  MessageSquare,
  RefreshCw,
  Link as LinkIcon,
  Unlink,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function SocialAdmin() {
  const {
    socialPosts,
    deleteSocialPost,
    socialConnections,
    toggleSocialConnection
  } = useApp();

  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('All');

  // OAuth Modal State
  const [oauthModalOpen, setOauthModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [oauthStep, setOauthStep] = useState(1);

  const handleOpenOAuth = (conn) => {
    setSelectedPlatform(conn);
    setOauthStep(1);
    setOauthModalOpen(true);
  };

  const handleConfirmOAuth = () => {
    if (selectedPlatform) {
      toggleSocialConnection(selectedPlatform.id);
      setOauthModalOpen(false);
    }
  };

  const filteredPosts = socialPosts.filter(
    (p) => selectedStatus === 'All' || p.status === selectedStatus
  );

  return (
    <div className="space-y-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>CENTRAL SOCIAL HUB</span>
          </div>
          <h1 className="text-3xl font-serif font-extrabold text-white">Social Media Connection Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage OAuth 2.0 API tokens, sync status, and multi-channel publishing across 16 global platforms.</p>
        </div>

        <button
          onClick={() => navigate('/admin/social/create')}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> CREATE SOCIAL POST
        </button>
      </div>

      {/* PART 13 — 16 Platform Connection Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            Connected Integrations ({socialConnections?.filter(c => c.connected).length || 0}/16 Active)
          </h2>
          <span className="text-xs text-zinc-500 font-mono">OAuth 2.0 Token Architecture</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {socialConnections?.map((conn) => (
            <div
              key={conn.id}
              className={`bg-zinc-900/80 border p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all ${
                conn.connected
                  ? 'border-zinc-800 hover:border-amber-500/50'
                  : 'border-zinc-900 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold">
                      {conn.platform.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-white">{conn.platform}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      conn.connected
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${conn.connected ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
                    {conn.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>

                <div className="text-xs text-zinc-400 font-mono">{conn.handle}</div>

                <div className="text-[11px] space-y-1 pt-2 border-t border-zinc-800/80">
                  <div className="flex justify-between text-zinc-400">
                    <span>Sync Status:</span>
                    <span className="font-semibold text-zinc-200">{conn.syncStatus}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>Last Synced:</span>
                    <span>{conn.lastSynced}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/60 flex gap-2">
                <button
                  onClick={() => handleOpenOAuth(conn)}
                  className={`flex-1 py-2 px-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    conn.connected
                      ? 'bg-zinc-950 hover:bg-zinc-800 text-amber-400 border border-zinc-800'
                      : 'bg-amber-400 hover:bg-amber-300 text-black shadow-md'
                  }`}
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                  <span>{conn.connected ? 'Re-OAuth' : 'Connect OAuth'}</span>
                </button>

                {conn.connected && (
                  <button
                    onClick={() => toggleSocialConnection(conn.id)}
                    className="py-2 px-3 bg-zinc-950 hover:bg-red-950/40 border border-zinc-800 hover:border-red-500/40 text-red-400 text-xs font-bold rounded-xl transition-all flex items-center justify-center cursor-pointer"
                    title="Disconnect Platform"
                  >
                    <Unlink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Posts Section */}
      <div className="space-y-4 pt-6 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Social Posts Queue</h2>
          <div className="flex gap-2">
            {['All', 'Published', 'Scheduled', 'Draft'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedStatus === st ? 'bg-amber-400 text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <img src={post.image} alt="Post" className="w-full h-44 object-cover" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-amber-400 font-bold">{post.platforms.join(', ')}</span>
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                      {post.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 line-clamp-3 font-light">{post.caption}</p>
                </div>
              </div>

              <div className="p-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-red-400" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-blue-400" /> {post.comments}</span>
                </div>
                <button
                  onClick={() => deleteSocialPost(post.id)}
                  className="p-1 text-zinc-500 hover:text-red-400 cursor-pointer"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OAuth Connection Modal Placeholder */}
      {selectedPlatform && (
        <Modal
          isOpen={oauthModalOpen}
          onClose={() => setOauthModalOpen(false)}
          title={`OAuth 2.0 Integration — ${selectedPlatform.platform}`}
        >
          <div className="space-y-6 text-zinc-100">
            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" /> OAuth 2.0 Secure Token Exchange
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                NARAN PETCARE Command Center connects via official OAuth provider authentication. Credentials are processed directly through {selectedPlatform.platform}'s secure auth endpoint.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Platform ID:</span>
                <span className="font-mono text-zinc-200">{selectedPlatform.platform.toLowerCase()}_prod_v2</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Auth Endpoint:</span>
                <span className="font-mono text-amber-400 text-[10px] truncate max-w-[240px]">{selectedPlatform.oauthEndpoint}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-zinc-500">Requested Permissions:</span>
                <span className="font-semibold text-zinc-200">Read/Write Posts, Audience Analytics</span>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-[11px] leading-relaxed">
              <strong>Security Protocol:</strong> No passwords or private API keys are saved locally. Access tokens automatically refresh via encrypted Bearer tokens.
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setOauthModalOpen(false)}
                className="w-1/2 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold rounded-xl hover:bg-zinc-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOAuth}
                className="w-1/2 py-3 bg-amber-400 text-black text-xs font-extrabold rounded-xl hover:bg-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <ExternalLink className="w-4 h-4" /> Authorize OAuth
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
