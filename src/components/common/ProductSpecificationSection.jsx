import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Box,
  CheckCircle2,
  Droplets,
  Lock,
  Leaf,
  Layers,
  Sparkles,
  Sliders,
  Package,
  RefreshCw,
  Info,
  Check
} from 'lucide-react';

export default function ProductSpecificationSection() {
  const [selectedColor, setSelectedColor] = useState('Royal Black');
  const [selectedSize, setSelectedSize] = useState('M');

  const colorVariants = [
    { name: 'Royal Black', colorHex: '#18181b', borderHex: '#f59e0b', img: '/cleanwalk_variant_black.png' },
    { name: 'Ocean Blue', colorHex: '#1e3a8a', borderHex: '#3b82f6', img: '/cleanwalk_variant_blue.png' },
    { name: 'Sand Beige', colorHex: '#d97706', borderHex: '#f59e0b', img: '/cleanwalk_variant_beige.png' }
  ];

  const sizeChartData = [
    { size: 'S', cm: '30 - 40 cm', inch: '12" - 16"', weight: '3 - 8 kg' },
    { size: 'M', cm: '40 - 60 cm', inch: '16" - 22"', weight: '8 - 18 kg' },
    { size: 'L', cm: '60 - 80 cm', inch: '22" - 28"', weight: '18 - 30 kg' },
    { size: 'XL', cm: '80 - 100 cm', inch: '28" - 38"', weight: '30 - 50 kg' }
  ];

  const materialSpecs = [
    { label: 'Harness Material', val: '600D Oxford Fabric / Nylon' },
    { label: 'Padding', val: 'Breathable Neoprene (5mm)' },
    { label: 'Pouch Outer', val: 'PU Leather / Waterproof Polyester' },
    { label: 'Pouch Inner Liner', val: 'TPU Waterproof Coated Fabric (Leak proof and easy to clean)' },
    { label: 'Bag Material', val: 'Biodegradable (PLA + PBAT)' },
    { label: 'Bag Thickness', val: '15 - 20 Microns' },
    { label: 'Buckles', val: 'ABS Plastic' },
    { label: 'D-Ring', val: 'Zinc Alloy (Optional)' },
    { label: 'Logo Plate', val: 'Metal (Gold Finish) / Rubber' }
  ];

  const valueProps = [
    {
      title: 'CATCHES WASTE',
      desc: 'Before it touches the ground',
      icon: ShieldCheck
    },
    {
      title: 'LEAK PROOF & ODOR LOCK',
      desc: 'Smart seal keeps odor inside',
      icon: Lock
    },
    {
      title: 'ECO FRIENDLY',
      desc: 'Biodegradable refills',
      icon: Leaf
    },
    {
      title: 'HANDS FREE',
      desc: 'Walk, play and enjoy',
      icon: Sparkles
    }
  ];

  const steps = [
    { step: '1', title: 'WEAR', desc: 'Adjust the harness for a perfect fit.' },
    { step: '2', title: 'CATCH', desc: 'The pouch stays open and ready.' },
    { step: '3', title: 'CLOSE', desc: 'After use, pull the drawstring to seal.' },
    { step: '4', title: 'REMOVE & DISPOSE', desc: 'Take out the bag and dispose easily.' }
  ];

  const activeVariant = colorVariants.find(c => c.name === selectedColor) || colorVariants[0];

  return (
    <div className="space-y-20 py-12 text-zinc-100 font-sans">

      {/* BRAND & PRODUCT IDENTITY HEADER */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
          <Award className="w-4 h-4 text-amber-400" />
          <span>OFFICIAL CLIENT SPECIFICATIONS • PATENT PENDING</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-white tracking-tight">
          NARAN PETCARE <br />
          <span className="text-gold-gradient uppercase">CLEANWALK™ DOG WASTE CATCHER</span>
        </h1>

        <p className="text-lg sm:text-xl text-amber-300 font-serif italic">
          "No Mess. No Stress. Just Clean Walks."
        </p>
      </div>

      {/* KEY VALUE PROPOSITIONS (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {valueProps.map((prop, idx) => (
          <div
            key={idx}
            className="bg-zinc-900/80 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-6 transition-all duration-300 shadow-xl space-y-3"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <prop.icon className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-extrabold text-white tracking-wider uppercase">{prop.title}</h3>
            <p className="text-xs text-zinc-400 font-light">{prop.desc}</p>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS (4 STEPS) */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-8 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
          <div className="p-2 bg-amber-400/10 rounded-xl text-amber-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider">How It Works</h2>
            <p className="text-xs text-zinc-400">4-Step Ergonomic Waste Management Workflow</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Open the Bag', desc: 'Lift the metal ring to open the catcher bag.', img: '/official_step1_bucket.png' },
            { step: '2', title: 'Remove Used Bag', desc: 'Pull the drawstring to remove the used bag and dispose responsibly.', img: '/official_step2_bucket.png' },
            { step: '3', title: 'Insert Fresh Bag', desc: 'Place a new biodegradable bag inside and tuck it neatly around the ring.', img: '/official_step3_bucket.png' },
            { step: '4', title: 'Close & Go', desc: "Secure the bag and you're ready for a cleaner, happier walk.", img: '/official_step4_bucket.png' }
          ].map((st, idx) => (
            <div key={idx} className="bg-zinc-900/90 border border-amber-500/30 rounded-3xl p-3.5 relative group hover:border-amber-400 transition-all space-y-3 shadow-md">
              <div className="aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-amber-500/40 bg-zinc-950">
                <img src={st.img} alt={st.title} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center font-serif">
                  {st.step}
                </span>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{st.title}</h3>
              </div>
              <p className="text-[11px] text-zinc-400 font-light leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT VARIANTS & LIVE INTERACTIVE COLOR PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-zinc-900/40 border border-zinc-900 rounded-3xl p-8">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">PRODUCT VARIANTS</span>
            <h2 className="text-2xl font-serif font-bold text-white">Official Color Options</h2>
            <p className="text-xs text-zinc-400">Select your preferred harness finish crafted with gold trim and premium hardware.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colorVariants.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 cursor-pointer ${selectedColor === c.name
                  ? 'bg-amber-400/10 border-amber-400 shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                  }`}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 shadow-inner"
                  style={{ backgroundColor: c.colorHex, borderColor: c.borderHex }}
                />
                <span className={`text-xs font-bold ${selectedColor === c.name ? 'text-amber-300' : 'text-zinc-300'}`}>
                  {c.name}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between text-xs">
            <span className="text-zinc-400">Active Selected Color:</span>
            <span className="font-extrabold text-amber-400 uppercase tracking-wider">{selectedColor}</span>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center">
          <div className="relative group max-w-md w-full">
            <div className="absolute -inset-4 rounded-3xl bg-amber-500/20 blur-2xl group-hover:opacity-80 transition-opacity" />
            <div className="relative bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
              <img
                src={activeVariant.img}
                alt={selectedColor}
                loading="lazy"
                decoding="async"
                className="w-full h-72 object-contain rounded-2xl drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
              />
              <div className="mt-4 text-xs font-extrabold text-white uppercase tracking-wider">
                CLEANWALK™ — {selectedColor}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TECHNICAL MATERIAL SPECIFICATIONS & SIZING CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Technical Material Specifications (Column 1) */}
        <div className="lg:col-span-6 bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Technical Material Specifications</h2>
          </div>

          <div className="divide-y divide-zinc-900">
            {materialSpecs.map((m, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-bold text-zinc-400">{m.label}</span>
                <span className="font-semibold text-amber-300 sm:text-right">{m.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sizing Chart Data Table (Column 2) */}
        <div className="lg:col-span-6 bg-zinc-950 border border-zinc-900 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
              <Info className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Sizing Chart Data Table</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-zinc-800 text-amber-400 uppercase font-extrabold">
                  <th className="p-3">Size</th>
                  <th className="p-3">Waist (cm)</th>
                  <th className="p-3">Waist (Inch)</th>
                  <th className="p-3">Dog Weight (kg)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {sizeChartData.map((row) => (
                  <tr
                    key={row.size}
                    onClick={() => setSelectedSize(row.size)}
                    className={`cursor-pointer transition-colors ${selectedSize === row.size ? 'bg-amber-400/10 text-white font-bold' : 'hover:bg-zinc-900/50'
                      }`}
                  >
                    <td className="p-3 font-extrabold text-amber-400">{row.size}</td>
                    <td className="p-3">{row.cm}</td>
                    <td className="p-3">{row.inch}</td>
                    <td className="p-3">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl text-xs text-zinc-400">
            <span className="font-bold text-white">Measurement Tip:</span> Measure your dog's waist circumference right in front of the hind legs for a precise ergonomic fit.
          </div>
        </div>

      </div>

      {/* PACKAGING & REFILL SYSTEM SPECIFICATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Packaging Specifications (Box Contents) */}
        <div className="lg:col-span-6 bg-zinc-900/50 border border-amber-500/30 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Packaging Specifications</h2>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-2">
              <div className="font-extrabold text-amber-400 uppercase tracking-wider">Luxury Black Box with Gold Foil Logo</div>
              <div className="text-zinc-400">Box Dimensions: <span className="font-bold text-white">28 x 20 x 12 cm</span></div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">Package Includes:</span>
              {[
                '1 Harness Unit',
                '1 Pouch',
                '1 Roll Biodegradable Bags (20 pcs)',
                'Instruction Manual'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Refill System Specs */}
        <div className="lg:col-span-6 bg-zinc-900/50 border border-amber-500/30 rounded-3xl p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Refill System Specifications</h2>
          </div>

          <div className="space-y-4 text-xs text-zinc-300">
            <p className="leading-relaxed">
              Easy replaceable biodegradable & compostable bags engineered for zero-touch loading and 100% plant-based disposal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Odor Lock', icon: Lock },
                { title: 'Extra Thick Leak Proof', icon: Droplets },
                { title: 'Easy Tear Off', icon: Leaf }
              ].map((refill, idx) => (
                <div key={idx} className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-center space-y-2">
                  <refill.icon className="w-5 h-5 text-amber-400 mx-auto" />
                  <div className="font-bold text-white text-[11px] uppercase tracking-wider">{refill.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* FINAL SLOGAN FOOTER BANNER */}
      <div className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border border-amber-500/40 rounded-3xl p-10 text-center space-y-3 shadow-2xl">
        <div className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">NARAN PETCARE SLOGAN</div>
        <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-white tracking-wider">
          "CLEAN WALKS. CLEAN WORLD. BETTER TOGETHER."
        </h2>
      </div>

    </div>
  );
}
