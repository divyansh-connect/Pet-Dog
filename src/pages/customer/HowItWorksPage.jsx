import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-xs uppercase tracking-widest text-amber-400 font-bold">Engineering Overview</h1>
        <h2 className="text-4xl font-serif font-bold text-white">How CleanWalk™ Operates</h2>
        <p className="text-xs text-zinc-400">
          Discover the patented mechanism behind the world's most luxurious hands-free dog waste catcher.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/10 text-amber-300 text-xs font-bold">
            Step 01 • Magnetic Reloading
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">Sub-3 Second Cartridge Snap</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            Our high-grade neodymium magnets allow you to insert the compostable bag roll with zero awkward threading or tearing. Just drop in and snap shut.
          </p>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Neodymium magnet locking ring</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Anti-jam internal guide rollers</li>
          </ul>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
          <img src="/cleanwalk_cartridge.png" alt="CleanWalk Cartridge" className="w-full h-80 object-cover rounded-2xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 order-2 md:order-1">
          <img src="/cleanwalk_product.png" alt="CleanWalk Catcher" className="w-full h-80 object-cover rounded-2xl" />
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/10 text-amber-300 text-xs font-bold">
            Step 02 • Touchless Catching
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">Spring-Assisted Sealed Capture</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            When your dog gets into position, extend the ergonomic arm. The spring-loaded catch mechanism wraps the compostable bag over the waste without any physical contact.
          </p>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Zero direct hand contact</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Odor-locking silicone seal gaskets</li>
          </ul>
        </div>
      </div>

      <div className="text-center bg-zinc-900/60 border border-zinc-800 p-12 rounded-3xl space-y-6">
        <h3 className="text-2xl font-serif font-bold text-white">Ready to elevate your daily dog walks?</h3>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 text-black font-extrabold text-xs rounded-2xl hover:bg-amber-300 transition-all shadow-xl"
        >
          <span>SHOP CLEANWALK™ NOW</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
