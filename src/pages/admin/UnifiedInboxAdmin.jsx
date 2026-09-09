import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, Search, Filter, Share2, Globe, Video } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function UnifiedInboxAdmin() {
  const { messages, replyToMessage, markMessageResolved, showToast } = useApp();

  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id || null);
  const [replyText, setReplyText] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('All');

  const selectedMessage = messages.find((m) => m.id === activeMessageId) || messages[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    replyToMessage(selectedMessage.id, replyText);
    setReplyText('');
    showToast('Reply dispatched through unified communication router.');
  };

  const filteredMessages = messages.filter((m) => {
    if (filterPlatform === 'All') return true;
    return m.platform === filterPlatform;
  });

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram':
        return <Share2 className="w-3.5 h-3.5 text-pink-400" />;
      case 'Facebook':
        return <Share2 className="w-3.5 h-3.5 text-blue-400" />;
      case 'TikTok':
        return <Video className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <MessageSquare className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Unified Customer Communication Inbox</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Centralized messaging router bringing together inquiries across Website, Instagram DMs, Facebook Messenger, Email, and TikTok.
          </p>
        </div>
      </div>

      {/* Main Inbox Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden min-h-[600px] shadow-2xl">
        {/* Left Thread List */}
        <div className="lg:col-span-5 border-r border-zinc-800 flex flex-col">
          {/* Filter Bar */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/60">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Conversations</span>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-amber-400"
            >
              <option value="All">All Channels</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Website">Website Form</option>
              <option value="TikTok">TikTok</option>
            </select>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/60">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setActiveMessageId(msg.id)}
                className={`p-4 cursor-pointer transition-all ${
                  activeMessageId === msg.id
                    ? 'bg-amber-400/10 border-l-4 border-l-amber-400'
                    : 'hover:bg-zinc-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <img src={msg.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs font-bold text-white">{msg.senderName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                    {getPlatformIcon(msg.platform)}
                    <span>{msg.platform}</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 line-clamp-2 pl-8">{msg.lastMessage}</p>
                <div className="flex items-center justify-between mt-2 pl-8 text-[10px] text-zinc-500">
                  <span>{msg.timestamp}</span>
                  {msg.resolved && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                      <CheckCircle className="w-3 h-3" /> Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Message Thread */}
        <div className="lg:col-span-7 flex flex-col bg-zinc-950/40">
          {selectedMessage ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
                <div className="flex items-center gap-3">
                  <img src={selectedMessage.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-amber-400/30" />
                  <div>
                    <h3 className="text-xs font-bold text-white">{selectedMessage.senderName}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      {getPlatformIcon(selectedMessage.platform)}
                      <span>Channel: {selectedMessage.platform}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => markMessageResolved(selectedMessage.id)}
                  className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 rounded-xl transition-colors cursor-pointer"
                >
                  Mark Resolved
                </button>
              </div>

              {/* Chat Thread Messages */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                {selectedMessage.thread?.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[80%] ${
                      item.isUser ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className="text-[10px] text-zinc-500 mb-1">{item.sender} • {item.time}</div>
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        item.isUser
                          ? 'bg-amber-400 text-black font-medium shadow-md shadow-amber-400/10'
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input Form */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-zinc-800 bg-zinc-900/80 flex items-center gap-3">
                <input
                  type="text"
                  placeholder={`Reply to ${selectedMessage.senderName} on ${selectedMessage.platform}...`}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-amber-400/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-zinc-500">Select a conversation thread to view.</div>
          )}
        </div>
      </div>
    </div>
  );
}
