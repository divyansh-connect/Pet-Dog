import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-xs uppercase tracking-widest text-amber-400 font-bold">The Heritage</h1>
        <h2 className="text-4xl font-serif font-bold text-white">About NARAN PETCARE</h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Founded on the philosophy that everyday moments with your companion should reflect elegance, precision engineering, and hygiene.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl">
          <img src="/cleanwalk_hero.png" alt="NARAN Heritage" className="w-full h-96 object-cover rounded-2xl" />
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-white">Luxury Meets Functional Innovation</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            Traditional dog walking gear has long compromised on aesthetics and sanitation. At NARAN, our team of industrial designers and pet care specialists crafted CleanWalk™ to deliver an uncompromised experience.
          </p>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            Every product is hand-assembled using sustainable cornstarch polymers, aerospace anodized metals, and vegetable-tanned Tuscan leather.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
            <div>
              <div className="text-2xl font-extrabold text-amber-400">100%</div>
              <div className="text-xs text-zinc-400">Sanitary Guarantee</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">50,000+</div>
              <div className="text-xs text-zinc-400">Happy Walks Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
