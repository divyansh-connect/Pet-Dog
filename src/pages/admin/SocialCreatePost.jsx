import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Calendar, Send, Save, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function SocialCreatePost() {
  const { createSocialPost } = useApp();
  const navigate = useNavigate();

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('/cleanwalk_hero.png');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Instagram', 'TikTok']);
  const [scheduledFor, setScheduledFor] = useState('');

  const togglePlatform = (p) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleAction = (status) => {
    if (!caption.trim()) return;
    createSocialPost({
      caption,
      image,
      platforms: selectedPlatforms,
      status,
      scheduledFor: status === 'Scheduled' ? scheduledFor || new Date().toISOString() : null
    });
    navigate('/admin/social');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <button
          onClick={() => navigate('/admin/social')}
          className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Social Dashboard
        </button>
        <h1 className="text-xl font-serif font-bold text-white">Create Social Post</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post Composer Form */}
        <div className="lg:col-span-2 space-y-6 bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800">
          <div>
            <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block mb-2">Target Platforms</label>
            <div className="flex flex-wrap gap-3">
              {['Facebook', 'Instagram', 'TikTok', 'YouTube', 'X'].map((plat) => (
                <button
                  type="button"
                  key={plat}
                  onClick={() => togglePlatform(plat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedPlatforms.includes(plat)
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  {plat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block mb-2">Caption / Body</label>
            <textarea
              rows={5}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your luxury brand caption here... #NaranPetcare #CleanWalk"
              className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-300 font-semibold uppercase tracking-wider block mb-2">Media Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={() => handleAction('Draft')}
              className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> SAVE DRAFT
            </button>

            <button
              onClick={() => handleAction('Scheduled')}
              className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" /> SCHEDULE
            </button>

            <button
              onClick={() => handleAction('Published')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 ml-auto shadow-lg"
            >
              <Send className="w-4 h-4" /> PUBLISH NOW
            </button>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className="bg-zinc-900/60 p-6 rounded-3xl border border-zinc-800 space-y-4">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Mock Post Preview</div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-bold text-xs flex items-center justify-center">N</div>
              <div>
                <div className="text-xs font-bold text-white">NARAN Petcare</div>
                <div className="text-[10px] text-zinc-500">Sponsored • {selectedPlatforms.join(', ')}</div>
              </div>
            </div>
            <p className="text-xs text-zinc-300 font-light">{caption || 'Caption preview...'}</p>
            {image && <img src={image} alt="Preview" className="w-full h-44 object-cover rounded-xl border border-zinc-800" />}
          </div>
        </div>
      </div>
    </div>
  );
}
