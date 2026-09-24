import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Leaf,
  RefreshCw,
  ChevronRight,
  ShoppingCart,
  ArrowRight,
  Truck,
  ShieldCheck,
  Dog,
  Headphones
} from 'lucide-react';

export default function RefillBagSystemSection() {
  const navigate = useNavigate();

  const steps = [
    {
      num: '1',
      title: 'Open the Bag',
      desc: 'Lift the metal ring to open the catcher bag.',
      img: '/official_step1_bucket.png'
    },
    {
      num: '2',
      title: 'Remove Used Bag',
      desc: 'Pull the drawstring to remove the used bag and dispose responsibly.',
      img: '/official_step2_bucket.png'
    },
    {
      num: '3',
      title: 'Insert Fresh Bag',
      desc: 'Place a new biodegradable bag inside and tuck it neatly around the ring.',
      img: '/official_step3_bucket.png'
    },
    {
      num: '4',
      title: 'Close & Go',
      desc: "Secure the bag and you're ready for a cleaner, happier walk.",
      img: '/official_step4_bucket.png'
    }
  ];

  const features = [
    { icon: Truck, text: 'Fast & Reliable Shipping' },
    { icon: ShieldCheck, text: 'Secure Checkout' },
    { icon: Dog, text: 'Multiple Sizes' },
    { icon: RefreshCw, text: 'Eco-Friendly Refill Bags' },
    { icon: Headphones, text: 'Dedicated Customer Support' }
  ];

  return (
    <section className="bg-[#050505] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 font-sans selection:bg-amber-400 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* 1. Header Tag, Main Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/80 bg-black text-amber-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Leaf className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span>ECO REFILL SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-white tracking-tight leading-tight">
            CleanWalk™ Refill Bag System
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
            Swap rolls in under 5 seconds with zero hassle or microplastic footprint.
          </p>
        </div>

        {/* Embedded Testing Back Guide Image */}
        <div className="w-full flex justify-center my-4">
          <img
            src="/testing_back.png"
            alt="CleanWalk Refill System Guide"
            loading="lazy"
            decoding="async"
            className="w-full max-w-6xl h-auto object-contain rounded-2xl border border-[#D4A017]/40 shadow-2xl"
          />
        </div>

        {/* 2. Four Instruction Cards (Pixel-Perfect Reference Match) */}


        {/* 3. Bottom Call-to-Action Banner */}
        <div className="border-y border-[#D4A017]/40 py-5 px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative bg-black my-6">
          {/* Left: Leaf Icon + 100% Biodegradable Bags */}
          <div className="flex items-center gap-4 text-left">
            <Leaf className="w-9 h-9 text-[#22c55e] fill-[#22c55e]/20 shrink-0 stroke-[2.5]" />
            <div>
              <div className="text-[#22c55e] font-extrabold text-base sm:text-lg tracking-tight">
                100% Biodegradable Bags
              </div>
              <div className="text-zinc-300 text-xs sm:text-sm font-normal">
                A cleaner planet for brighter tomorrows.
              </div>
            </div>
          </div>

          {/* Center: Gold CTA Button */}
          <button
            onClick={() => navigate('/shop')}
            className="w-full sm:w-auto px-8 py-3 bg-[#ffc82c] hover:bg-[#eab308] text-black font-extrabold text-xs sm:text-sm rounded-full shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2.5 cursor-pointer group shrink-0 tracking-wider uppercase"
          >
            <ShoppingCart className="w-4 h-4 fill-black text-black" />
            <span>SHOP CLEANWALK™ REFILL BAGS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
          </button>

          {/* Right: 3 Green Refill Rolls Graphic + Compatibility */}
          <div className="flex items-center gap-4 text-left sm:text-right">
            <img
              src="/cleanwalk_real_refill_roll.png"
              alt="CleanWalk Refill Rolls"
              loading="lazy"
              decoding="async"
              className="h-12 sm:h-14 object-contain shrink-0"
            />
            <div>
              <div className="text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider">
                COMPATIBLE WITH CLEANWALK™
              </div>
              <div className="text-zinc-400 text-xs font-normal">
                Easy to replace. Better for the planet.
              </div>
            </div>
          </div>
        </div>

        {/* 4. Feature Strip Below Banner */}
        <div className="pt-2 px-2">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 md:divide-x divide-amber-500/20 text-center">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-medium text-zinc-200 px-2 py-1"
              >
                <feat.icon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{feat.text}</span>
              </div>
            ))}
          </div>

          {/* 5. Bottom Brand Line */}
          <div className="flex items-center justify-center gap-4 pt-8 pb-2">
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-r from-transparent to-amber-500/40" />
            <div className="text-center text-xs font-serif font-extrabold text-amber-400 uppercase tracking-[0.35em]">
              CLEANER WALKS. HAPPIER LIVES.
            </div>
            <div className="h-[1px] w-24 sm:w-48 bg-gradient-to-l from-transparent to-amber-500/40" />
          </div>
        </div>

      </div>
    </section>
  );
}
