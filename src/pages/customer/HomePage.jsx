import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Star,
  CheckCircle2,
  Lock,
  Leaf,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function HomePage() {
  const { products, addToCart, reviews } = useApp();
  const navigate = useNavigate();
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);

  const flagshipProduct = products.find((p) => p.id === 'prod-1') || products[0];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FUTURE OF DOG WALKING HAS ARRIVED</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white leading-tight tracking-tight">
              MEET <span className="text-gold-gradient">CLEANWALK™</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              "The premium hands-free dog waste catcher that keeps every walk clean, convenient, and stress-free."
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => navigate('/shop')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setDemoVideoOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-3 group"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span>WATCH DEMO</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-zinc-900 max-w-lg mx-auto lg:mx-0 text-left">
              <div>
                <div className="text-xl font-bold text-white">100%</div>
                <div className="text-xs text-zinc-400">Hands-Free Waste</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">&lt;3 Sec</div>
                <div className="text-xs text-zinc-400">Quick Reload</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white">4.9 ★</div>
                <div className="text-xs text-zinc-400">Verified Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 to-yellow-300 opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-4 overflow-hidden shadow-2xl">
              <img
                src={flagshipProduct.images[0]}
                alt="CleanWalk Hero"
                className="w-full h-[450px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">Flagship Innovation</div>
                  <div className="text-sm font-bold text-white">{flagshipProduct.name}</div>
                  <div className="text-xs text-zinc-400">${flagshipProduct.price}</div>
                </div>
                <button
                  onClick={() => addToCart(flagshipProduct, 'M', 1)}
                  className="px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-xl hover:bg-amber-300 transition-colors"
                >
                  Quick Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-amber-400 font-bold">Uncompromising Quality</h2>
          <h3 className="text-3xl font-serif font-bold text-white">Designed for Modern Pet Royalty</h3>
          <p className="text-xs text-zinc-400">
            CleanWalk™ replaces unpleasant plastic bag contact with aerospace engineering and sleek Italian aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-8 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Sanitary & Touch-Free</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Never feel or squeeze warm waste through thin plastic. The spring-assisted locking mechanism captures and seals instantly.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-8 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Universal Leash Mounting</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Clips seamlessly onto any standard leather, nylon, or rope leash. Stays balanced and lightweight throughout your walk.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-8 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Certified Eco-Compostable</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Paired with 100% plant-based cornstarch bags that naturally break down, ensuring zero micro-plastic footprint.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-zinc-900/40 border-y border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-amber-400 font-bold">Effortless Operation</h2>
            <h3 className="text-3xl font-serif font-bold text-white">3 Simple Steps to Clean Walks</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-amber-400/40 text-amber-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg">
                1
              </div>
              <h4 className="text-base font-bold text-white">Load Bag Cartridge</h4>
              <p className="text-xs text-zinc-400">Snap the magnetically locked refill cartridge into the CleanWalk housing.</p>
            </div>

            <div className="relative text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-amber-400/40 text-amber-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg">
                2
              </div>
              <h4 className="text-base font-bold text-white">Position & Catch</h4>
              <p className="text-xs text-zinc-400">Position the ergonomic catcher during your dog's natural walk routine.</p>
            </div>

            <div className="relative text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-950 border border-amber-400/40 text-amber-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg">
                3
              </div>
              <h4 className="text-base font-bold text-white">One-Click Seal & Drop</h4>
              <p className="text-xs text-zinc-400">Press the gold spring trigger to seal the bag unit cleanly into public disposal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-amber-400 font-bold">Verified Customer Praise</h2>
          <h3 className="text-3xl font-serif font-bold text-white mt-2">What Pet Parents Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{rev.source}</span>
              </div>
              <p className="text-xs text-zinc-300 italic">"{rev.review}"</p>
              <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-800/60 pt-3">
                <span className="font-semibold text-white">{rev.customer}</span>
                <span className="text-amber-400/80">{rev.product}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Video Modal */}
      <Modal isOpen={demoVideoOpen} onClose={() => setDemoVideoOpen(false)} title="CleanWalk™ Demonstration Video">
        <div className="space-y-4">
          <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center group">
            <img src={flagshipProduct.images[0]} alt="Demo Preview" className="w-full h-full object-cover opacity-60" />
            <div className="absolute w-16 h-16 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xl shadow-2xl animate-pulse">
              <Play className="w-6 h-6 fill-black ml-1" />
            </div>
          </div>
          <div className="text-xs text-zinc-400 leading-relaxed">
            <span className="text-amber-400 font-bold">Interactive Demo:</span> CleanWalk™ demonstrates automatic bag feeding, odor-sealed closure, and fast magnetic cartridge swaps in real-world walking conditions.
          </div>
          <button
            onClick={() => {
              setDemoVideoOpen(false);
              navigate('/product/cleanwalk');
            }}
            className="w-full py-3 bg-amber-400 text-black font-bold text-xs rounded-xl hover:bg-amber-300 transition-colors"
          >
            Explore CleanWalk Specifications
          </button>
        </div>
      </Modal>
    </div>
  );
}
