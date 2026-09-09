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
  ChevronDown,
  ChevronUp,
  Package,
  RefreshCw,
  XCircle,
  Dog,
  Layers,
  Award,
  Droplets,
  Check,
  User,
  ShoppingBag,
  Sliders,
  ShieldAlert,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function HomePage() {
  const { products, addToCart, reviews } = useApp();
  const navigate = useNavigate();
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);

  // Active product selections
  const [selectedSize, setSelectedSize] = useState('Medium (16–22")');
  const [selectedColor, setSelectedColor] = useState('Royal Black');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Review Pagination State
  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 4;

  const flagshipProduct = products.find((p) => p.id === 'prod-1') || products[0];
  const refillBagsProduct = products.find((p) => p.id === 'prod-2') || products[1];

  // Color preview mapping with dedicated high-definition product variant photos
  const colorPreviews = {
    'Royal Black': {
      border: 'border-zinc-700 hover:border-amber-400',
      bgGlow: 'from-zinc-950 via-zinc-900 to-black',
      badge: 'bg-zinc-800 text-amber-400 border-amber-500/40',
      image: '/cleanwalk_hero.png'
    },
    'Ocean Blue': {
      border: 'border-cyan-900/60 hover:border-cyan-400',
      bgGlow: 'from-slate-950 via-cyan-950/40 to-black',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      image: '/cleanwalk_blue.jpg'
    },
    'Sand Beige': {
      border: 'border-amber-900/60 hover:border-yellow-300',
      bgGlow: 'from-amber-950/40 via-stone-900 to-black',
      badge: 'bg-amber-950/80 text-amber-200 border-yellow-500/40',
      image: '/cleanwalk_beige.jpg'
    }
  };

  const sizesList = [
    { name: 'Small (12–16")', desc: 'Terriers, Pugs, Frenchies' },
    { name: 'Medium (16–22")', desc: 'Beagles, Corgis, Spaniels' },
    { name: 'Large (22–28")', desc: 'Labradors, Golden Retrievers' },
    { name: 'XL (28–38")', desc: 'Great Danes, Mastiffs, Huskies' }
  ];

  const colorsList = [
    { name: 'Royal Black', hex: '#18181b', ring: 'ring-zinc-400' },
    { name: 'Ocean Blue', hex: '#0e7490', ring: 'ring-cyan-400' },
    { name: 'Sand Beige', hex: '#b45309', ring: 'ring-amber-400' }
  ];

  const faqs = [
    {
      q: "How does CleanWalk work?",
      a: "CleanWalk™ attaches securely to your dog's harness. When your dog bends into position during a walk, waste falls directly into the eco-friendly biodegradable pouch before touching the ground, allowing hands-free and zero-contact waste collection."
    },
    {
      q: "Is it leak-proof?",
      a: "Yes! CleanWalk™ features a 20-micron leak-proof inner lining and dual drawstring closure that traps odor and locks liquids completely inside."
    },
    {
      q: "Is it washable?",
      a: "Absolutely. The outer housing is made of waterproof, stain-resistant high-density nylon & alloy trim. Simply wipe down with water or gentle soap."
    },
    {
      q: "Which size should I choose?",
      a: "Measure your dog's waist right in front of the hind legs. Small fits 12–16\", Medium fits 16–22\", Large fits 22–28\", and XL fits 28–38\"."
    },
    {
      q: "Are refill bags biodegradable?",
      a: "Yes, 100%. Our refill bags are made from certified compostable cornstarch material that breaks down naturally in compost facilities within 90 days."
    },
    {
      q: "How do I replace refill bags?",
      a: "Simply unclip the pouch, pull out the empty core, snap in a fresh CleanWalk™ bag roll, and draw the lead through the dispenser slot in under 5 seconds."
    }
  ];

  // Pagination calculation
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice((reviewPage - 1) * reviewsPerPage, reviewPage * reviewsPerPage);

  return (
    <div className="space-y-28 pb-20 text-zinc-100 font-sans">
      
      {/* PART 1 — Homepage Hero Section with Video Container */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900/80 to-zinc-950">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Content Column */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE WORLD'S FIRST WEARABLE HANDS-FREE WASTE CATCHER</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-white leading-tight tracking-tight">
              NARAN PETCARE <br />
              <span className="text-gold-gradient">CleanWalk™</span>
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              The world's first wearable hands-free dog waste catcher that attaches securely to your dog's harness so waste falls directly into the biodegradable collection bag before touching the ground.
            </p>

            {/* CTA Buttons (Unchanged) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setDemoVideoOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-amber-400/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span>WATCH DEMO</span>
              </button>
            </div>

            {/* PART 2 — Highlight Features Grid */}
            <div className="pt-6 border-t border-zinc-900">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-3">Key Highlights</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left max-w-xl mx-auto lg:mx-0">
                {[
                  "Hands-Free Walking",
                  "Leak-Proof & Odor Lock",
                  "Waterproof Inner Lining",
                  "Eco Biodegradable Bags",
                  "Soft Harness Padding",
                  "Adjustable Waist (S–XL)",
                  "Secure Drawstring Seal",
                  "Easy Replace Cartridge",
                  "Cleaner Walks. World."
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1.5 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — HTML5 Video Container (PART 1 Requirement) */}
          <div className="relative group">
            {/* Ambient Golden Glow on Hover */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 opacity-20 blur-xl group-hover:opacity-60 transition-opacity duration-500" />
            
            <div className="relative bg-zinc-900 border border-zinc-800 group-hover:border-amber-400/80 rounded-3xl p-3 overflow-hidden shadow-2xl transition-all duration-500">
              <div className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-black">
                {/* HTML5 Video Player Container */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  preload="metadata"
                  poster="/cleanwalk_hero.png"
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                >
                  <source src="/cleanwalk_demo.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>

                {/* Video Badge Overlay */}
                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px] font-semibold text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>AUTOPLAY PRODUCT DEMO</span>
                </div>

                {/* Bottom Product Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/85 backdrop-blur-md border border-zinc-800/90 p-4 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">CleanWalk™ Flagship</div>
                    <div className="text-sm font-bold text-white">NARAN PETCARE CleanWalk™</div>
                    <div className="text-xs text-zinc-400">${flagshipProduct.price} <span className="line-through text-zinc-600">${flagshipProduct.comparePrice}</span></div>
                  </div>
                  <button
                    onClick={() => addToCart(flagshipProduct, selectedSize, 1)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-xs font-extrabold rounded-xl hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* PART 3 — New "How CleanWalk Works" Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Dog className="w-3.5 h-3.5" />
            <span>4-STEP SANITARY SOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">How CleanWalk Works</h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Waste never touches the ground or your hands. Designed for effortless hygiene on every daily walk.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: 'Step 1',
              title: 'Wear',
              desc: 'Place the harness comfortably on the dog.',
              icon: Dog,
              img: '/cleanwalk_product.png',
              fallback: '/cleanwalk_product.png'
            },
            {
              step: 'Step 2',
              title: 'Catch',
              desc: 'When the dog bends to poop, waste falls directly into the catcher bag.',
              icon: Droplets,
              img: '/cleanwalk_hero.png',
              fallback: '/cleanwalk_hero.png'
            },
            {
              step: 'Step 3',
              title: 'Close',
              desc: 'Pull the drawstring and seal the bag.',
              icon: Lock,
              img: '/cleanwalk_cartridge.png',
              fallback: '/cleanwalk_cartridge.png'
            },
            {
              step: 'Step 4',
              title: 'Remove & Dispose',
              desc: 'Remove the biodegradable bag and dispose responsibly.',
              icon: Leaf,
              img: '/cleanwalk_bags.png',
              fallback: '/cleanwalk_bags.png'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-amber-500/70 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              <div className="absolute top-4 right-4 text-3xl font-serif font-extrabold text-zinc-800 group-hover:text-amber-500/20 transition-colors">
                0{idx + 1}
              </div>

              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>

              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">{item.step}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">{item.desc}</p>

              <div className="w-full h-36 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <img
                  src={item.img}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = item.fallback;
                  }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* PART 4 — Dedicated Product Design Section (Updated Client Spec) */}
      <section className="relative bg-zinc-950 border-y border-zinc-900 py-24 overflow-hidden">
        {/* Background glow elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL PRODUCT ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">Product Design Callouts</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              Explore the anatomical engineering behind the world's first hands-free wearable dog waste catcher.
            </p>
          </div>

          {/* 3-Column Layout: Left (3 cards) | Center (Large Harness Graphic) | Right (3 cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side Features (3 Cards) */}
            <div className="lg:col-span-4 space-y-8">
              {[
                {
                  title: 'Adjustable Waist Strap',
                  desc: 'Heavy-duty quick-release buckle providing customized fit from S to XL.',
                  icon: Sliders
                },
                {
                  title: 'Soft Breathable Padding',
                  desc: 'Multi-layer ergonomic air mesh preventing chafing and heat buildup.',
                  icon: ShieldCheck
                },
                {
                  title: 'Waterproof Inner Lining',
                  desc: '20-micron sealed barrier ensuring complete liquid and stain resistance.',
                  icon: Droplets
                }
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="group relative bg-zinc-900/80 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {feat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Thin Gold Connector Line (Left to Center) */}
                  <div className="hidden lg:flex items-center absolute -right-8 top-1/2 -translate-y-1/2 w-8 pointer-events-none">
                    <div className="w-full h-[1px] bg-gradient-to-r from-amber-400 to-amber-500/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_#f59e0b]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Center Product Image (Large NARAN PETCARE CleanWalk™ Harness) */}
            <div className="lg:col-span-4 flex justify-center relative my-4 lg:my-0">
              <div className="relative group">
                {/* Glowing Aura Ring */}
                <div className="absolute -inset-4 rounded-full bg-amber-500/20 blur-2xl group-hover:opacity-80 transition-opacity duration-500" />

                <div className="relative bg-zinc-900/90 border border-amber-500/40 rounded-3xl p-6 shadow-2xl group-hover:border-amber-400 transition-colors">
                  <img
                    src="/cleanwalk_product.png"
                    alt="NARAN PETCARE CleanWalk™ Official Product Design"
                    className="w-full max-w-xs sm:max-w-sm h-auto object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  />
                  <div className="mt-4 text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-500/40 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider">
                      CleanWalk™ Patent Design
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Features (3 Cards) */}
            <div className="lg:col-span-4 space-y-8">
              {[
                {
                  title: 'Tail Opening',
                  desc: 'Anatomically contoured slot allowing natural tail position and movement.',
                  icon: Dog
                },
                {
                  title: 'Secure Drawstring Seal',
                  desc: 'High-tension cord lock that instantly traps odor and seals bag tight.',
                  icon: Lock
                },
                {
                  title: 'Leak-Proof Collection Pouch',
                  desc: 'Double-walled collection chamber keeping waste locked until disposal.',
                  icon: Package
                }
              ].map((feat, idx) => (
                <div
                  key={idx}
                  className="group relative bg-zinc-900/80 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:-translate-y-1"
                >
                  {/* Desktop Thin Gold Connector Line (Center to Right) */}
                  <div className="hidden lg:flex items-center absolute -left-8 top-1/2 -translate-y-1/2 w-8 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_#f59e0b]" />
                    <div className="w-full h-[1px] bg-gradient-to-r from-amber-500/20 to-amber-400" />
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 transition-transform">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed font-light">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* PART 5 — Refill Bag System */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>ECO REFILL SYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">Refill Bag System</h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Swap rolls in under 5 seconds with zero hassle or microplastic footprint.
          </p>
        </div>

        {/* 4 Visual Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { num: '1', title: 'Open Pouch', desc: 'Unclip magnetic latch on housing pouch.' },
            { num: '2', title: 'Remove Used Bag', desc: 'Tie drawstring and extract sealed compostable bag.' },
            { num: '3', title: 'Insert Refill Roll', desc: 'Drop in fresh CleanWalk™ 100% plant-based roll.' },
            { num: '4', title: 'Close Pouch', desc: 'Latch shut and feed top lead through dispenser slot.' }
          ].map((st, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-center space-y-3 hover:border-amber-400/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold text-sm flex items-center justify-center mx-auto shadow-md">
                {st.num}
              </div>
              <h4 className="text-base font-bold text-white">{st.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Refill Bag Product Card */}
        <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-500/30 rounded-3xl p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold">
              100% Certified Plant-Based
            </div>
            <h3 className="text-2xl font-serif font-bold text-white">{refillBagsProduct.name}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">{refillBagsProduct.description}</p>
            <div className="text-2xl font-extrabold text-amber-400">${refillBagsProduct.price} <span className="text-xs text-zinc-500 line-through">${refillBagsProduct.comparePrice}</span></div>
            <button
              onClick={() => addToCart(refillBagsProduct, 'Standard', 1)}
              className="px-6 py-3 bg-amber-400 text-black text-xs font-extrabold rounded-xl hover:bg-amber-300 transition-colors shadow-lg"
            >
              Add Refill 3-Pack to Cart
            </button>
          </div>
          <div className="flex justify-center">
            <img src="/cleanwalk_bags.png" alt="Refill Bags" className="w-64 h-64 object-contain rounded-2xl border border-zinc-800" />
          </div>
        </div>
      </section>


      {/* PART 6 & PART 7 — Interactive Size Selector & Color Variants */}
      <section className="bg-zinc-900/40 border-y border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Preview Box */}
            <div className="space-y-6">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">Interactive Product Customizer</div>
              <h2 className="text-3xl font-serif font-bold text-white">Select Your Custom Fit & Style</h2>

              <div className={`relative bg-gradient-to-b ${colorPreviews[selectedColor].bgGlow} border ${colorPreviews[selectedColor].border} rounded-3xl p-8 text-center transition-all duration-500`}>
                <div className={`inline-block px-3 py-1 rounded-full border text-xs font-bold mb-6 ${colorPreviews[selectedColor].badge}`}>
                  Selected Color: {selectedColor}
                </div>

                <img
                  src={colorPreviews[selectedColor].image}
                  alt={selectedColor}
                  className="w-full h-72 object-contain mx-auto rounded-2xl transition-all duration-500"
                />

                <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                  <div>
                    <span className="text-zinc-500">Size Fit:</span> <span className="font-bold text-white">{selectedSize}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Price:</span> <span className="font-bold text-amber-400">${flagshipProduct.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Selection Controls */}
            <div className="space-y-8">
              
              {/* PART 6 — Available Sizes Cards */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Select Size</h3>
                  <span className="text-xs text-amber-400 font-semibold">Size Guide (Waist Circumference)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sizesList.map((sz) => (
                    <button
                      key={sz.name}
                      onClick={() => setSelectedSize(sz.name)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedSize === sz.name
                          ? 'bg-amber-400/10 border-amber-400 text-white shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{sz.name}</span>
                        {selectedSize === sz.name && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-1">{sz.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PART 7 — Color Variants Component */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Select Color Variant</h3>
                <div className="flex gap-4">
                  {colorsList.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'bg-zinc-900 border-amber-400 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full ring-2 ${c.ring}`} style={{ backgroundColor: c.hex }} />
                      <span className="text-xs font-bold">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart CTA */}
              <div className="pt-4 border-t border-zinc-800">
                <button
                  onClick={() => addToCart(flagshipProduct, selectedSize, 1)}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-sm rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-amber-500/20 cursor-pointer"
                >
                  ADD TO CART — ${flagshipProduct.price} ({selectedSize}, {selectedColor})
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* PART 8 — Premium Packaging Showcase (FIX 1 Client Spec) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column — Title, Description & Checklist */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Package className="w-3.5 h-3.5" />
              <span>UNBOXING EXPERIENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">
              Premium Packaging Showcase
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
              Every CleanWalk™ arrives housed inside our luxury matte-black gift box with gold foil embossing. Designed with Apple & Tesla level unboxing precision.
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" /> What's Included In The Box:
              </h3>
              <div className="space-y-2 text-xs text-zinc-300">
                {[
                  "CleanWalk Harness",
                  "Waste Catcher Pouch",
                  "Two Biodegradable Refill Rolls",
                  "Storage Carry Pouch",
                  "User Guide & Warranty Card"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl hover:border-amber-500/40 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-semibold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Apple/Tesla Style Packaging Collage (Official Assets Only) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {/* Box 1: Closed Matte-Black Gift Box */}
            <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 text-center hover:border-amber-400 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] group">
              <div className="w-full h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800">
                <img
                  src="/cleanwalk_hero.png"
                  alt="Closed Matte-Black Gift Box"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 text-xs font-bold text-white">Matte-Black Gift Box</div>
              <div className="text-[10px] text-amber-400/80">Gold Foil Embossed Box</div>
            </div>

            {/* Box 2: Open Gift Box with Harness */}
            <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 text-center hover:border-amber-400 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] group">
              <div className="w-full h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800">
                <img
                  src="/cleanwalk_product.png"
                  alt="CleanWalk Harness Inside"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 text-xs font-bold text-white">CleanWalk™ Harness</div>
              <div className="text-[10px] text-amber-400/80">Ergonomic Soft Padding</div>
            </div>

            {/* Box 3: Biodegradable Refill Rolls */}
            <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 text-center hover:border-amber-400 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] group">
              <div className="w-full h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800">
                <img
                  src="/cleanwalk_bags.png"
                  alt="Two Biodegradable Refill Rolls"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 text-xs font-bold text-white">2 Refill Bag Rolls</div>
              <div className="text-[10px] text-amber-400/80">100% Compostable Cornstarch</div>
            </div>

            {/* Box 4: Quick-Reload Cartridge & Pouch */}
            <div className="bg-zinc-900/90 border border-amber-500/30 rounded-2xl p-4 text-center hover:border-amber-400 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] group">
              <div className="w-full h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800">
                <img
                  src="/cleanwalk_cartridge.png"
                  alt="Storage Carry Pouch & Cartridge"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 text-xs font-bold text-white">Storage Carry Pouch</div>
              <div className="text-[10px] text-amber-400/80">Magnetic Quick Cartridge</div>
            </div>
          </div>

        </div>
      </section>


      {/* PART 9 — Why CleanWalk? Visual Story Comparison (FIX 2 Client Spec) */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Heading & Subtitle */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>VISUAL COMPARISON STORY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">Why CleanWalk?</h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              See the difference between stressful traditional dog walks and the CleanWalk hands-free experience.
            </p>
          </div>

          {/* 2-Column Comparison Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Left Column — WITHOUT CLEANWALK (Warning Red) */}
            <div className="bg-red-950/20 border border-red-900/50 rounded-3xl p-8 space-y-6 shadow-xl relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-300">WITHOUT CLEANWALK</h3>
                  <div className="text-[11px] text-red-400/80">Traditional Walking Hassle</div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                {[
                  "Dog squats to poop.",
                  "Waste falls directly onto the ground.",
                  "Owner bends down to pick it up.",
                  "Dirty hands.",
                  "Bad smell.",
                  "Plastic poop bag handling.",
                  "Stressful walk."
                ].map((bad, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-red-950/40 border border-red-900/30 p-3 rounded-xl">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{bad}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — WITH CLEANWALK (Gold Premium) */}
            <div className="bg-amber-950/20 border border-amber-500/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-amber-400 text-black text-[10px] font-extrabold rounded-bl-xl uppercase tracking-wider shadow-md">
                Recommended Choice
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-400">WITH CLEANWALK</h3>
                  <div className="text-[11px] text-amber-300/80">Hands-Free Modern Experience</div>
                </div>
              </div>

              <div className="space-y-3 text-xs text-zinc-200">
                {[
                  "Dog wears the CleanWalk harness.",
                  "Dog bends to poop.",
                  "Waste drops directly into the CleanWalk biodegradable catcher bag.",
                  "Waste never touches the ground.",
                  "Hands-free walking.",
                  "Leak-proof odor lock.",
                  "Cleaner parks.",
                  "Stress-free walking experience."
                ].map((good, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="font-semibold text-white">{good}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Visual Story Timeline (Horizontal 3-Step Story) */}
          <div className="pt-8 max-w-5xl mx-auto border-t border-zinc-900 space-y-6">
            <div className="text-center text-xs font-bold uppercase tracking-widest text-amber-400">
              CleanWalk Visual Story Timeline
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl text-center space-y-3 hover:border-amber-500/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center mx-auto shadow-md">
                  Step 1
                </div>
                <h4 className="text-sm font-bold text-white">Squat & Position</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Dog begins to squat naturally while walking.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-amber-500/30 p-6 rounded-2xl text-center space-y-3 hover:border-amber-400 transition-colors shadow-lg">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center mx-auto shadow-md">
                  Step 2
                </div>
                <h4 className="text-sm font-bold text-white">Direct Catch</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  CleanWalk catcher collects waste before it reaches the ground.
                </p>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl text-center space-y-3 hover:border-amber-500/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center mx-auto shadow-md">
                  Step 3
                </div>
                <h4 className="text-sm font-bold text-white">Hands-Free Walk</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  Owner continues walking without bending down or picking waste.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* PART 10 — Customer Reviews with Pagination */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">REAL PET PARENT FEEDBACK</div>
          <h2 className="text-3xl font-serif font-bold text-white">Customer Reviews</h2>
          <p className="text-xs text-zinc-400">Verified buyers share their CleanWalk™ experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {currentReviews.map((rev) => (
            <div key={rev.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4 hover:border-amber-500/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                </span>
              </div>

              <p className="text-xs text-zinc-300 italic leading-relaxed">"{rev.review}"</p>

              <div className="flex items-center gap-3 border-t border-zinc-800/80 pt-3">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                  {rev.customer ? rev.customer[0] : 'U'}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{rev.customer}</div>
                  <div className="text-[10px] text-zinc-500">{rev.product || 'CleanWalk™ Waste Catcher'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Pagination Controls */}
        {totalReviewPages > 1 && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => setReviewPage((prev) => Math.max(1, prev - 1))}
              disabled={reviewPage === 1}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300 disabled:opacity-40 hover:border-amber-400 transition-colors cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs text-zinc-400">Page {reviewPage} of {totalReviewPages}</span>
            <button
              onClick={() => setReviewPage((prev) => Math.min(totalReviewPages, prev + 1))}
              disabled={reviewPage === totalReviewPages}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-300 disabled:opacity-40 hover:border-amber-400 transition-colors cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </section>


      {/* PART 11 — Expandable FAQ Accordion */}
      <section className="bg-zinc-950 border-y border-zinc-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">GOT QUESTIONS?</div>
            <h2 className="text-3xl font-serif font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Demo Video Modal */}
      <Modal isOpen={demoVideoOpen} onClose={() => setDemoVideoOpen(false)} title="CleanWalk™ Demonstration Video">
        <div className="space-y-4">
          <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center group">
            <video
              autoPlay
              muted
              loop
              controls
              className="w-full h-full object-cover"
              poster="/cleanwalk_hero.png"
            >
              <source src="/cleanwalk_demo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="text-xs text-zinc-400 leading-relaxed">
            <span className="text-amber-400 font-bold">Interactive Demo:</span> CleanWalk™ demonstrates automatic bag feeding, odor-sealed closure, and fast magnetic cartridge swaps in real-world walking conditions.
          </div>
          <button
            onClick={() => {
              setDemoVideoOpen(false);
              navigate('/shop');
            }}
            className="w-full py-3 bg-amber-400 text-black font-bold text-xs rounded-xl hover:bg-amber-300 transition-colors cursor-pointer"
          >
            Explore CleanWalk Specifications
          </button>
        </div>
      </Modal>

    </div>
  );
}
