import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Share2, Plus, Trash2, Edit, Heart, MessageSquare, Repeat } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SocialAdmin() {
  const { socialPosts, deleteSocialPost } = useApp();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('All');

  const platforms = [
    { name: 'Instagram', handle: '@naranpetcare', followers: '48.5K', engagement: '5.4%' },
    { name: 'TikTok', handle: '@naranpetcare', followers: '124.2K', engagement: '8.2%' },
    { name: 'Facebook', handle: 'NARAN Petcare Official', followers: '22.1K', engagement: '3.1%' },
    { name: 'YouTube', handle: 'NARAN Petcare Luxury', followers: '15.8K', engagement: '6.7%' },
    { name: 'X', handle: '@naranpetcare', followers: '9.4K', engagement: '2.8%' }
  ];

  const filteredPosts = socialPosts.filter(
    (p) => selectedStatus === 'All' || p.status === selectedStatus
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Social Media Operations</h1>
          <p className="text-xs text-zinc-400 mt-1">Multi-channel post publishing, social monitoring & brand analytics</p>
        </div>

        <button
          onClick={() => navigate('/admin/social/create')}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl transition-all shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> CREATE SOCIAL POST
        </button>
      </div>

      {/* Connected Platform Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {platforms.map((p) => (
          <div key={p.name} className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">{p.name}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <div className="text-[10px] text-zinc-500">{p.handle}</div>
            <div className="pt-2 border-t border-zinc-800 flex justify-between text-xs">
              <span className="font-extrabold text-white">{p.followers}</span>
              <span className="text-amber-400 font-semibold">{p.engagement}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Posts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider">Social Posts Queue</h2>
          <div className="flex gap-2">
            {['All', 'Published', 'Scheduled', 'Draft'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
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
                  className="p-1 text-zinc-500 hover:text-red-400"
                  title="Delete Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
