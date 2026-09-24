import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function WorksForAllDogsSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-black text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 font-sans select-none">
      <div className="max-w-6xl mx-auto relative group rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] border border-amber-500/30">

        {/* Full HD Poster Image (Image 3) */}
        <img
          src="/dogs.jpg"
          alt="CleanWalk™ Works For All Dogs & Breeds"
          className="w-full h-auto object-cover rounded-3xl"
        />        {/* Overlay Interactive Shop Button (Positioned at bottom over CTA button) */}
        <div className="absolute bottom-[2.5%] left-[30%] right-[30%] sm:left-[35%] sm:right-[35%] flex justify-center z-20">
          <button
            onClick={() => navigate('/shop')}
            className="w-full py-2.5 sm:py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-xs sm:text-base rounded-full shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-2 sm:gap-3 cursor-pointer tracking-wider uppercase border border-amber-300/60"
            title="Shop CleanWalk™ Now"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 fill-black shrink-0" />
            <span className="font-extrabold">SHOP CLEANWALK™</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 stroke-[3]" />
          </button>
        </div>

      </div>
    </section>
  );
}
