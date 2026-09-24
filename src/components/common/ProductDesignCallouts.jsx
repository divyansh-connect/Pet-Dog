import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sliders,
  Leaf,
  ShieldCheck,
  Settings,
  ShoppingBag,
  Lock,
  ArrowRight,
  Truck,
  PawPrint,
  RefreshCw,
  Headphones,
  Droplets
} from 'lucide-react';

import DemoVideoModal from './DemoVideoModal';

export default function ProductDesignCallouts() {
  const navigate = useNavigate();
  const [videoModalOpen, setVideoModalOpen] = React.useState(false);

  const leftFeatures = [
    {
      title: 'Adjustable Waist Strap',
      desc: 'Comfortable, secure fit for dogs of all sizes.',
      icon: Sliders
    },
    {
      title: 'Soft, Breathable Padding',
      desc: 'Keeps your dog comfortable during every walk.',
      icon: Leaf
    },
    {
      title: 'Waterproof Inner Lining',
      desc: 'Prevents leaks and keeps messes contained.',
      icon: ShieldCheck
    }
  ];

  const rightFeatures = [
    {
      title: 'Tail Opening',
      desc: 'Smart design allows natural movement and a comfortable fit.',
      icon: Settings
    },
    {
      title: 'Secure Disposable Bag',
      desc: 'Biodegradable liners collect waste directly and hygienically.',
      icon: ShoppingBag
    },
    {
      title: 'Leak-Proof Collection Pouch',
      desc: 'Keeps odors in and your hands clean.',
      icon: Lock
    }
  ];

  const bottomFeaturePanels = [
    {
      title: 'Adjustable Strap',
      icon: Sliders,
      img: '/detail_strap.jpg'
    },
    {
      title: 'Breathable Padding',
      icon: Leaf,
      img: '/detail_padding.jpg'
    },
    {
      title: 'Easy Bag Replacement',
      icon: Lock,
      img: '/detail_bag.jpg'
    },
    {
      title: 'Waterproof Lining',
      icon: Droplets,
      img: '/detail_lining.jpg'
    }
  ];

  const bottomBenefits = [
    { text: 'Fast & Reliable Shipping', icon: Truck },
    { text: 'Secure Checkout', icon: ShieldCheck },
    { text: 'Multiple Sizes', icon: PawPrint },
    { text: 'Eco-Friendly Refill Bags', icon: RefreshCw },
    { text: 'Dedicated Customer Support', icon: Headphones }
  ];

  return (
    <section className="relative bg-[#060606] border-y border-zinc-900 py-16 overflow-hidden font-sans selection:bg-amber-400 selection:text-black">
      {/* Background radial gold lighting glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header & Accents */}
        <div className="relative pt-2">
          {/* Top Left Accent */}
          <div className="hidden md:flex flex-col items-start absolute left-0 top-0 space-y-1 text-zinc-500 text-[10px] font-extrabold tracking-[0.2em]">
            <span>INNOVATIVE.</span>
            <span>PRACTICAL.</span>
            <span>PREMIUM.</span>
            <div className="flex gap-1 text-amber-400/70 pt-1">
              <PawPrint className="w-3.5 h-3.5" />
              <PawPrint className="w-3.5 h-3.5 rotate-12" />
            </div>
          </div>

          {/* Top Right Cursive Gold Text Accent */}
          <div className="hidden md:flex flex-col items-end absolute right-0 top-0 font-handwriting text-amber-300 text-2xl leading-tight -rotate-2 select-none">
            <span>Cleaner Walks</span>
            <span className="flex items-center gap-1">
              Happier Lives <span className="text-amber-300">♡</span>
            </span>
          </div>

          {/* Central Header Badge & Titles */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#101010] border border-[#D4AF37]/50 text-amber-400 text-xs font-extrabold uppercase tracking-widest shadow-md">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>SEE THE ENGINEERING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-naran font-bold text-white tracking-tight">
              Product Design Callouts
            </h2>

            <p className="text-xs sm:text-sm text-[#C7C7C7] max-w-xl mx-auto leading-relaxed font-light">
              Engineered for a cleaner, more convenient world — because every walk should be worry-free.
            </p>
          </div>
        </div>

        {/* MAIN INFOGRAPHIC SHOWCASE: LEFT 3 CARDS - CENTER HARNESS - RIGHT 3 CARDS */}
        <div className="relative pt-4">
          
          {/* REAR VIEW Gold Label above harness */}
          <div className="text-center mb-2">
            <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-[0.3em] bg-[#101010]/80 px-4 py-1 rounded-full border border-amber-500/30">
              REAR VIEW
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* LEFT SIDE: 3 FEATURE CARDS STACKED VERTICALLY */}
            <div className="lg:col-span-4 space-y-5">
              {leftFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="group relative bg-[#101010]/90 backdrop-blur-md border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:-translate-y-0.5"
                >
                  {/* Desktop Gold Connector Line Right */}
                  <div className="hidden lg:flex items-center absolute -right-8 top-1/2 -translate-y-1/2 w-8 pointer-events-none z-10">
                    <div className="w-full h-[1.5px] bg-gradient-to-r from-amber-400/80 to-amber-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_10px_#f59e0b] animate-pulse" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-950 border border-[#D4AF37]/50 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all shadow-md">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-[#C7C7C7] leading-relaxed font-light">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CENTER PRODUCT HARNESS SHOWCASE */}
            <div className="lg:col-span-4 flex justify-center relative my-4 lg:my-0">
              <div className="relative group w-full max-w-sm sm:max-w-md flex flex-col items-center justify-center">
                {/* Soft Golden Glow Behind Product */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-amber-500/25 blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center justify-center">
                  <img
                    src="/cleanwalk_rear_harness_center.png"
                    alt="CleanWalk™ Official Harness Rear View"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain max-h-[440px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: 3 FEATURE CARDS STACKED VERTICALLY */}
            <div className="lg:col-span-4 space-y-5">
              {rightFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="group relative bg-[#101010]/90 backdrop-blur-md border border-[#D4AF37]/40 hover:border-[#D4AF37] rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:-translate-y-0.5"
                >
                  {/* Desktop Gold Connector Line Left */}
                  <div className="hidden lg:flex items-center absolute -left-8 top-1/2 -translate-y-1/2 w-8 pointer-events-none z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_10px_#f59e0b] animate-pulse" />
                    <div className="w-full h-[1.5px] bg-gradient-to-r from-amber-500/40 to-amber-400/80" />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-950 border border-[#D4AF37]/50 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all shadow-md">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-[#C7C7C7] leading-relaxed font-light">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* BOTTOM FEATURE STRIP: 4 EQUAL IMAGE CARDS IN A CONTINUOUS ROW */}
          <div className="pt-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
              {bottomFeaturePanels.map((panel, idx) => (
                <div key={idx} className="flex flex-col items-center group cursor-pointer">
                  {/* Image Card Container */}
                  <div className="w-full aspect-[2.4/1] bg-[#101010] rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/50 group-hover:border-amber-400 transition-all duration-300 shadow-xl relative">
                    <img
                      src={panel.img}
                      alt={panel.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Icon + Caption Underneath */}
                  <div className="flex items-center justify-center gap-2 pt-3 text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    <panel.icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{panel.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA BUTTONS SECTION */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <button
            onClick={() => navigate('/shop')}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-extrabold tracking-wider uppercase rounded-full hover:scale-105 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>SHOP CLEANWALK™</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setVideoModalOpen(true)}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#101010] hover:bg-zinc-900 border border-[#D4AF37]/60 hover:border-amber-400 text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg"
          >
            <div className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] pl-0.5">
              ▶
            </div>
            <span>SEE HOW IT WORKS</span>
          </button>
        </div>

        {/* BOTTOM BENEFITS STRIP */}
        <div className="pt-8 border-t border-zinc-900">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {bottomBenefits.map((ben, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 text-xs font-semibold text-zinc-300">
                <ben.icon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{ben.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Usage Video Modal */}
        <DemoVideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} />
      </div>
    </section>
  );
}
