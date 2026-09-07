import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Box, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CleanWalkPage() {
  const { products, addToCart } = useApp();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === 'prod-1') || products[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold uppercase tracking-widest">
          Flagship Showcase
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white">CleanWalk™ Waste Catcher</h1>
        <p className="text-sm text-zinc-300 font-light">
          The ultimate hands-free dog waste catcher engineered with black ceramic housing, gold accents, and zero-touch spring release.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl">
          <img src={product.images[0]} alt="CleanWalk Showcase" className="w-full h-[450px] object-cover rounded-2xl" />
        </div>

        <div className="space-y-6">
          <div className="text-3xl font-extrabold text-white">${product.price.toFixed(2)}</div>
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-bold">{product.rating} / 5.0 Rating</span>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">{product.description}</p>

          <div className="space-y-3 pt-4 border-t border-zinc-900">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Features Included:</div>
            {product.features && product.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              onClick={() => {
                addToCart(product, 'M', 1);
                navigate('/cart');
              }}
              className="flex-1 py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20"
            >
              ADD TO CART NOW
            </button>
            <button
              onClick={() => navigate('/product/cleanwalk')}
              className="py-4 px-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs rounded-2xl"
            >
              Full Specs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
