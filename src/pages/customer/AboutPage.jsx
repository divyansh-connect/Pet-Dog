import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Globe, Gem, Leaf, PawPrint, Heart } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black py-8 px-4 sm:px-6 lg:px-10 max-w-[1360px] mx-auto space-y-12">
      
      {/* 1. TOP HERO / ABOUT HEADER SECTION */}
      <section className="relative pt-4 pb-8 text-center">
        {/* Top-Right Decorative Cursive Gold Text */}
        <div className="absolute right-2 sm:right-6 md:right-12 top-0 font-handwriting text-gold-accent text-xl sm:text-2xl md:text-3xl leading-tight -rotate-3 select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          A Cleaner<br />
          Brighter Tomorrow ♡
        </div>

        {/* Small Gold Uppercase Heading with Thin Gold Flanking Lines */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="h-[1px] w-6 sm:w-10 bg-amber-400/60 inline-block"></span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase">
            OUR STORY
          </span>
          <span className="h-[1px] w-6 sm:w-10 bg-amber-400/60 inline-block"></span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-naran font-bold text-white tracking-tight mb-4">
          About <span className="text-gold-gradient">NARAN PETCARE</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light px-4">
          Founded on the philosophy that everyday moments with your companion<br className="hidden sm:inline" />
          should reflect dignity, precision engineering, and hygiene.
        </p>
      </section>

      {/* 2. MAIN SECTION 1: TWO-COLUMN COMPOSITION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        
        {/* LEFT COLUMN: Large Image Container with Gold Border & Overlays */}
        <div className="lg:col-span-6 relative rounded-2xl md:rounded-3xl border border-amber-500/50 bg-zinc-950 p-2 sm:p-3 shadow-2xl overflow-hidden flex flex-col justify-center">
          {/* Golden Retriever Main Image */}
          <div className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden bg-zinc-950 flex items-center justify-center">
            <img
              src="/about_dog_main.jpg"
              alt="Golden Retriever wearing CleanWalk harness"
              className="w-full h-full object-contain rounded-xl"
            />

            {/* Top-Right Circular Detail Overlay */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full border-2 border-amber-400/90 overflow-hidden shadow-2xl bg-zinc-950/80 backdrop-blur-xs group">
              <img
                src="/about_pouch_circle.jpg"
                alt="CleanWalk harness detail"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-115 transition-transform duration-500"
              />
            </div>

            {/* Bottom-Left Decorative Gold Handwritten Text */}
            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 font-handwriting text-amber-300 text-xl sm:text-2xl md:text-3xl leading-tight -rotate-3 select-none pointer-events-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
              Same<br />
              Adventures<br />
              A Cleaner<br />
              Tomorrow ♡
            </div>

            {/* Middle-Right Decorative Gold Handwritten Text */}
            <div className="absolute top-[48%] right-4 sm:right-8 font-handwriting text-amber-300 text-xl sm:text-2xl md:text-3xl leading-tight text-right rotate-2 select-none pointer-events-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]">
              Elegant<br />
              Functional<br />
              Hygienic
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Heading, Paragraphs, Stats & CTA Row */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2 px-1 lg:px-4 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-naran font-bold text-white tracking-wide leading-tight">
              Luxury Meets Functional Innovation
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              <p>
                Traditional dog walking gear has long compromised on aesthetics and sanitation.
                At NARAN, our team of dedicated designers and pet care specialists created
                CleanWalk™ to deliver a more responsible, elegant solution.
              </p>
              <p>
                Every product is hand-assembled using sustainable, high-quality materials,
                ensuring functional reliability, comfort, and a premium look for you and your dog.
              </p>
            </div>
          </div>

          {/* 3 Statistics Row with Gold Circular Icons */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-5 my-2 border-t border-b border-amber-500/25 items-center">
            {/* Stat 1 */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-base sm:text-xl font-bold text-amber-400 font-serif-naran">100%</div>
                <div className="text-[10px] sm:text-xs text-zinc-300 font-light leading-tight">Sanitary Guarantee</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-2 sm:gap-3 border-l border-amber-500/20 pl-2 sm:pl-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-base sm:text-xl font-bold text-amber-400 font-serif-naran">50,000+</div>
                <div className="text-[10px] sm:text-xs text-zinc-300 font-light leading-tight">Happy Pets & Owners</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-2 sm:gap-3 border-l border-amber-500/20 pl-2 sm:pl-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0 shadow-sm">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <div className="text-base sm:text-xl font-bold text-amber-400 font-serif-naran">Available</div>
                <div className="text-[10px] sm:text-xs text-zinc-300 font-light leading-tight">Worldwide</div>
              </div>
            </div>
          </div>

          {/* Gold CTA Button & Packaging Visual Container */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-1">
            {/* Gold Pill CTA Button */}
            <button
              onClick={() => navigate('/cleanwalk')}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-3 transition-all shadow-lg shadow-amber-500/20 group cursor-pointer"
            >
              <span>OUR MISSION</span>
              <span className="w-6 h-6 rounded-full bg-black text-amber-400 flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            {/* Packaging Visual + Decorative Text */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <img
                src="/about_packaging_box.jpg"
                alt="CleanWalk Luxury Product Packaging"
                className="h-20 sm:h-24 md:h-26 w-auto object-contain rounded-lg shadow-md"
              />
              <div className="font-handwriting text-amber-300 text-base sm:text-lg leading-tight -rotate-2 select-none">
                Thoughtfully<br />
                Designed<br />
                For a Better<br />
                Tomorrow ♡
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. FEATURE STRIP (FULL WIDTH BLACK STRIP WITH GOLD ACCENTS) */}
      <section className="w-full bg-zinc-950 border-t border-b border-amber-500/30 py-6 px-4 sm:px-6 lg:px-8 rounded-2xl md:rounded-3xl shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-amber-500/25">
          {/* Feature 1 */}
          <div className="flex items-center gap-4 lg:px-6 py-2 first:lg:pl-0">
            <div className="w-11 h-11 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Premium Quality</h4>
              <p className="text-xs text-zinc-400 font-light mt-0.5 leading-snug">
                Thoughtfully designed<br />for durability and style.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 lg:px-6 py-2 pt-4 sm:pt-2">
            <div className="w-11 h-11 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Pet & Planet Friendly</h4>
              <p className="text-xs text-zinc-400 font-light mt-0.5 leading-snug">
                Sustainable materials<br />for a cleaner world.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4 lg:px-6 py-2 pt-4 sm:pt-2">
            <div className="w-11 h-11 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
              <PawPrint className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">Trusted by Families</h4>
              <p className="text-xs text-zinc-400 font-light mt-0.5 leading-snug">
                Rigorous testing for<br />safety and comfort.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-4 lg:px-6 py-2 pt-4 sm:pt-2 last:lg:pr-0">
            <div className="w-11 h-11 rounded-full border border-amber-400/80 bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">A Healthier Tomorrow</h4>
              <p className="text-xs text-zinc-400 font-light mt-0.5 leading-snug">
                Happier pets. Cleaner<br />communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOWER IMAGE SECTION (CINEMATIC BANNER WITH PACK OF DOGS) */}
      <section className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-amber-500/40 min-h-[320px] sm:min-h-[360px] md:min-h-[420px] flex items-center shadow-2xl bg-zinc-950">
        {/* Pack of Dogs Widescreen Outdoor Scenic Background */}
        <img
          src="/about_dogs_banner.jpg"
          alt="Because Every Dog Deserves Better - NARAN PETCARE"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/30 md:to-transparent"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left Side Content */}
          <div className="max-w-md space-y-3">
            <div className="text-[11px] sm:text-xs font-bold text-amber-400 tracking-[0.2em] uppercase">
              CLEANER WALKS. HAPPIER LIVES.
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif-naran font-bold text-white leading-tight">
              Because Every<br />
              Dog Deserves Better
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              From small companions to large adventurers,<br className="hidden sm:inline" />
              NARAN PETCARE is here for every walk.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigate('/how-it-works')}
                className="px-5 py-3 bg-black/75 hover:bg-black/90 border border-amber-400/80 text-white rounded-full font-bold text-xs tracking-wider uppercase flex items-center gap-3 transition-all cursor-pointer hover:border-amber-300 shadow-md"
              >
                <span className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center text-[10px] pl-0.5">
                  ▶
                </span>
                <span>WATCH OUR STORY</span>
              </button>
            </div>
          </div>

          {/* Right Side Cursive Gold Decorative Text */}
          <div className="font-handwriting text-amber-300 text-2xl sm:text-3xl md:text-4xl leading-tight text-right select-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] self-end md:self-center -rotate-2">
            Different Dogs<br />
            Same Cleaner<br />
            Tomorrow ♡
          </div>
        </div>
      </section>

    </div>
  );
}

