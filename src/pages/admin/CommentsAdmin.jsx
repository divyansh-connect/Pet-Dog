import React, { useState } from 'react';
import { MessageCircle, Check, Trash2, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CommentsAdmin() {
  const { comments, replyComment } = useApp();
  const [replyInput, setReplyInput] = useState({});

  const handleReply = (cmtId) => {
    const text = replyInput[cmtId];
    if (!text) return;
    replyComment(cmtId, text);
    setReplyInput({ ...replyInput, [cmtId]: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Multi-Channel Comments Moderation</h1>
          <p className="text-xs text-zinc-400 mt-1">Moderate and reply to social comments from IG, Facebook, YouTube & Website</p>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((cmt) => (
          <div key={cmt.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{cmt.author}</span>
                <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-semibold">{cmt.platform}</span>
              </div>
              <span className="text-[10px] text-zinc-500">{cmt.date}</span>
            </div>

            <p className="text-xs text-zinc-300 font-light italic">"{cmt.content}"</p>
            <div className="text-[10px] text-zinc-500">Post: {cmt.postTitle}</div>

            <div className="pt-3 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                placeholder="Write reply..."
                value={replyInput[cmt.id] || ''}
                onChange={(e) => setReplyInput({ ...replyInput, [cmt.id]: e.target.value })}
                className="flex-1 p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white"
              />
              <button
                onClick={() => handleReply(cmt.id)}
                className="px-4 py-2 bg-amber-400 text-black font-bold text-xs rounded-xl"
              >
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
