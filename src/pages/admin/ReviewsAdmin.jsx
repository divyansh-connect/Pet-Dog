import React from 'react';
import { Star, CheckCircle2, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ReviewsAdmin() {
  const { reviews, approveReview } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Product Reviews & Ratings</h1>
          <p className="text-xs text-zinc-400 mt-1">Audit customer reviews before displaying on customer storefront</p>
        </div>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
        <table className="w-full text-xs text-left min-w-[650px]">
          <thead className="bg-zinc-950 text-amber-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Product</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review Text</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {reviews.map((rev) => (
              <tr key={rev.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4 font-bold text-white">{rev.customer}</td>
                <td className="p-4 text-amber-400 font-semibold">{rev.product}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </td>
                <td className="p-4 text-zinc-300 italic max-w-xs">"{rev.review}"</td>
                <td className="p-4">
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    {rev.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {rev.status !== 'Approved' ? (
                    <button
                      onClick={() => approveReview(rev.id)}
                      className="px-3 py-1.5 bg-emerald-400 text-black font-bold text-xs rounded-lg"
                    >
                      Approve
                    </button>
                  ) : (
                    <span className="text-zinc-500 text-[10px]">Published</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
