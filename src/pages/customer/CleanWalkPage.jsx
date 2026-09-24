import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Box, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProductSpecificationSection from '../../components/common/ProductSpecificationSection';
import WorksForAllDogsSection from '../../components/common/WorksForAllDogsSection';

export default function CleanWalkPage() {
  const { products, addToCart } = useApp();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === 'prod-1') || products[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Top Banner & Quick Purchase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="bg-zinc-950 border border-zinc-900 p-2 sm:p-3 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center min-h-[360px] sm:min-h-[420px]">
          <img
            src="/cleanwalk_dog_hero.jpg"
            alt="NARAN PETCARE CLEANWALK™ DOG WASTE CATCHER"
            className="w-full h-[360px] sm:h-[420px] object-contain rounded-xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
          />
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <span>PATENT PENDING FLAGSHIP SHOWCASE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-white leading-tight">
            CLEANWALK™ <br />
            <span className="text-gold-gradient">DOG WASTE CATCHER</span>
          </h1>

          <p className="text-base text-amber-300 font-serif italic">
            "No Mess. No Stress. Just Clean Walks."
          </p>

          <div className="flex items-baseline gap-4 pt-2">
            <span className="text-3xl font-black text-white">${product.price.toFixed(2)}</span>
            <span className="text-base text-zinc-500 line-through">${product.comparePrice.toFixed(2)}</span>
            <span className="text-xs font-extrabold text-amber-400 bg-amber-400/10 border border-amber-500/30 px-2.5 py-1 rounded-md">
              SAVE ${(product.comparePrice - product.price).toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => {
                addToCart(product, 'M', 1);
                navigate('/cart');
              }}
              className="flex-1 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:scale-[1.02] text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BUY CLEANWALK™ NOW</span>
            </button>

            <button
              onClick={() => navigate('/product/cleanwalk')}
              className="py-4 px-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>FULL TECH SPECS</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* FULL CLIENT DESIGN PACKAGE SPECIFICATION SECTION */}
      <ProductSpecificationSection />

      {/* Works for All Dogs Section */}
      <WorksForAllDogsSection />

    </div>
  );
}
