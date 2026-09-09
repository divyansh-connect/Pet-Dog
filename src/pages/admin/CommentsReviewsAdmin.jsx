import React, { useState } from 'react';
import { Star, MessageCircle, CheckCircle, Reply, ThumbsUp, Globe, Filter, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CommentsReviewsAdmin() {
  const { comments, reviews, replyComment, approveReview, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('reviews');

  const [replyInput, setReplyInput] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);

  const handleReplySubmit = (id) => {
    if (!replyInput.trim()) return;
    replyComment(id, replyInput);
    setReplyInput('');
    setActiveCommentId(null);
    showToast('Reply published successfully to comment thread.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Comments & Customer Reviews</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Dedicated moderation center to view, respond to, and approve product reviews and social media comments.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Product Reviews ({reviews.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'comments'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Social & Store Comments ({comments.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'reviews' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                    {rev.source}
                  </span>
                </div>

                <div className="text-xs font-bold text-white">{rev.product}</div>
                <p className="text-xs text-zinc-300 italic">"{rev.review}"</p>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>By: <strong className="text-white">{rev.customer}</strong></span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comments.map((cmt) => (
              <div key={cmt.id} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">{cmt.author}</span>
                  <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded font-medium">
                    {cmt.platform}
                  </span>
                </div>

                <div className="text-[11px] text-zinc-400">On post: <strong className="text-zinc-200">"{cmt.postTitle}"</strong></div>
                <p className="text-xs text-zinc-200 bg-zinc-950 p-3 rounded-xl border border-zinc-800">{cmt.content}</p>

                {activeCommentId === cmt.id ? (
                  <div className="space-y-2 pt-2">
                    <input
                      type="text"
                      placeholder="Write official response..."
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setActiveCommentId(null)}
                        className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(cmt.id)}
                        className="px-3 py-1 bg-amber-400 text-black text-xs font-bold rounded-lg"
                      >
                        Publish Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveCommentId(cmt.id)}
                    className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold hover:underline"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply to Comment</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
