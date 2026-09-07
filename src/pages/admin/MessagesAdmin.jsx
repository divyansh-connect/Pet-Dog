import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, User, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function MessagesAdmin() {
  const { messages, replyToMessage, markMessageResolved } = useApp();

  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [activeMessageId, setActiveMessageId] = useState(messages[0]?.id || null);
  const [replyText, setReplyText] = useState('');

  const filteredMessages = messages.filter(
    (m) => selectedPlatform === 'All' || m.platform === selectedPlatform
  );

  const activeMessage = messages.find((m) => m.id === activeMessageId) || filteredMessages[0];

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMessage) return;
    replyToMessage(activeMessage.id, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Unified Inbox & Customer Messaging</h1>
          <p className="text-xs text-zinc-400 mt-1">Multi-channel customer inquiries from Instagram, Facebook & Website Contact forms</p>
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div className="flex gap-2 border-b border-zinc-900 pb-2">
        {['All', 'Instagram', 'Facebook', 'Website'].map((plat) => (
          <button
            key={plat}
            onClick={() => setSelectedPlatform(plat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedPlatform === plat
                ? 'bg-amber-400 text-black shadow-md'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
            }`}
          >
            {plat}
          </button>
        ))}
      </div>

      {/* Main Inbox 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
        {/* Left Conversation List */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-4 space-y-2 overflow-y-auto max-h-[600px]">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setActiveMessageId(msg.id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                activeMessageId === msg.id
                  ? 'bg-amber-400/10 border-amber-500/40 text-white'
                  : 'bg-zinc-950/40 border-zinc-800/40 hover:bg-zinc-800/40 text-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white">{msg.senderName}</span>
                <span className="text-[10px] text-amber-400 font-semibold">{msg.platform}</span>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-1">{msg.lastMessage}</p>
              <div className="flex items-center justify-between text-[10px] text-zinc-500 mt-2">
                <span>{msg.timestamp}</span>
                {msg.resolved && <span className="text-emerald-400 font-bold">Resolved</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Right Active Thread View */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
          {activeMessage ? (
            <>
              <div>
                {/* Thread Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeMessage.avatar}
                      alt={activeMessage.senderName}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{activeMessage.senderName}</h3>
                      <div className="text-[10px] text-zinc-500">{activeMessage.platform} Inquiry</div>
                    </div>
                  </div>

                  {!activeMessage.resolved && (
                    <button
                      onClick={() => markMessageResolved(activeMessage.id)}
                      className="px-3 py-1.5 bg-emerald-400/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                    </button>
                  )}
                </div>

                {/* Messages Bubble History */}
                <div className="py-6 space-y-4 max-h-[350px] overflow-y-auto pr-2">
                  {activeMessage.thread.map((t, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${t.isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                          t.isUser
                            ? 'bg-amber-400 text-black font-medium'
                            : 'bg-zinc-950 border border-zinc-800 text-zinc-200'
                        }`}
                      >
                        <div className="text-[9px] opacity-75 font-bold mb-1">{t.sender} • {t.time}</div>
                        {t.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-4 border-t border-zinc-800 flex gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official reply..."
                  className="flex-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg"
                >
                  <Send className="w-4 h-4" /> SEND
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-20 text-xs text-zinc-500">Select a message thread to view</div>
          )}
        </div>
      </div>
    </div>
  );
}
