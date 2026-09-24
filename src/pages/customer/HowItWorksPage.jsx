import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, ArrowRight, Dog, Droplets, Lock, Leaf, CheckCircle2, Play } from 'lucide-react';
import DemoVideoModal from '../../components/common/DemoVideoModal';

export default function HowItWorksPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const steps = [
    {
      step: '01',
      badge: 'Step 01 • OPEN THE BAG',
      title: 'OPEN THE BAG',
      desc: 'Lift and open the gold metal ring of the NARAN Petcare waste catcher.',
      bullets: [
        'Hands opening the gold metal ring opening',
        'Empty & clean interior view',
        'NARAN Petcare premium gold logo'
      ],
      image: '/how_it_works_step1_open_bag.png',
      icon: Dog
    },
    {
      step: '02',
      badge: 'Step 02 • REMOVE USED BAG',
      title: 'REMOVE USED BAG',
      desc: 'Pull the drawstring to remove the used bag and dispose responsibly.',
      bullets: [
        'Pull drawstring upward out of catcher',
        'Zero direct contact with dog waste',
        'Quick & hygienic removal'
      ],
      image: '/how_it_works_step2_remove_bag.png',
      icon: Droplets
    },
    {
      step: '03',
      badge: 'Step 03 • INSERT FRESH BAG',
      title: 'INSERT FRESH BAG',
      desc: 'Place a new biodegradable bag inside and tuck it neatly around the ring.',
      bullets: [
        'Insert fresh green biodegradable bag',
        'Tuck neatly around the gold metal ring',
        'Prepped & ready for the next walk'
      ],
      image: '/how_it_works_step3_insert_bag.png',
      icon: Leaf
    },
    {
      step: '04',
      badge: 'Step 04 • CLOSE & GO',
      title: 'CLOSE & GO',
      desc: 'Secure the bag and you\'re ready for a cleaner, hands-free walk.',
      bullets: [
        'Secured black pouch with gold ring',
        'Comfortably attached to dog harness',
        'Clean, hands-free walking experience'
      ],
      image: '/how_it_works_step4_close_go.png',
      icon: Lock
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 font-sans">

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>ENGINEERING & USAGE OVERVIEW</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white tracking-tight">
          How CleanWalk™ Operates
        </h1>
        <p className="text-sm text-zinc-300 font-light leading-relaxed">
          Discover the patented 4-step mechanism behind the world's most luxurious hands-free dog waste catcher. Zero contact. Zero odor. 100% eco-friendly.
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 hover:bg-amber-400 hover:text-black border border-amber-500/40 text-amber-300 font-bold text-xs transition-all shadow-lg cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 group-hover:bg-black group-hover:text-amber-400 flex items-center justify-center transition-colors">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
            <span>OPEN VIDEO IN MODAL</span>
          </button>
        </div>
      </div>

      {/* Embedded Main Usage Video */}
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-amber-500/40 bg-zinc-950 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative group">
        <div className="absolute top-4 left-4 z-10 bg-zinc-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold text-amber-400 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <span>OFFICIAL 1080P DEMO VIDEO</span>
        </div>
        <video
          controls
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/how_it_works_step1_open_bag.png"
          className="w-full aspect-video object-cover rounded-3xl"
        >
          <source src="/cleanwalk_demo_optimized.webm" type="video/webm" />
          <source src="/cleanwalk_demo_optimized.mp4" type="video/mp4" />
          <source src="/naran_how_it_works_10sec.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* 4 Steps Showcase */}
      <div className="space-y-16">
        {steps.map((st, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={st.step}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/30 p-8 rounded-3xl transition-all duration-300 ${!isEven ? 'lg:flex-row-reverse' : ''
                }`}
            >
              {/* Text Column */}
              <div className={`space-y-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/10 text-amber-300 text-xs font-bold border border-amber-500/20">
                  <st.icon className="w-4 h-4 text-amber-400" />
                  <span>{st.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{st.title}</h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {st.desc}
                </p>

                <div className="space-y-2 pt-2">
                  {st.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-zinc-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Column */}
              <div className={`relative group ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="bg-black border border-zinc-800 group-hover:border-amber-500/40 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
                  <img
                    src={st.image}
                    alt={st.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-extrabold text-amber-400">
                  STEP {st.step}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Call to Action */}
      <div className="text-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/30 p-12 rounded-3xl space-y-6 shadow-2xl">
        <h2 className="text-3xl font-serif font-bold text-white">Ready to elevate your daily dog walks?</h2>
        <p className="text-xs text-zinc-400 max-w-xl mx-auto font-light">
          Join thousands of pet owners enjoying hands-free, zero-contact walks with CleanWalk™. Free shipping & 30-day money-back guarantee.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-xs rounded-2xl hover:scale-105 transition-all shadow-xl shadow-amber-500/20"
          >
            <span>SHOP CLEANWALK™ NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <DemoVideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
    </div>
  );
}
