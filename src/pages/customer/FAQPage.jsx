import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does CleanWalk™ attach to my existing dog leash?',
      a: 'CleanWalk™ features a universal aerospace aluminum clip that securely attaches to any flat leather, round rope, or nylon leash in seconds.'
    },
    {
      q: 'What size CleanWalk™ should I select for my dog breed?',
      a: 'We offer sizes S (30–40cm), M (40–60cm), L (60–80cm), and XL (80–100cm). Small is suited for dogs under 15 lbs, Medium for 15–40 lbs, Large for 40–75 lbs, and XL for giant breeds over 75 lbs.'
    },
    {
      q: 'Are the NARAN waste bags biodegradable?',
      a: 'Yes! All CleanWalk™ waste refill bags are certified 100% plant-based cornstarch compostable, breaking down fully within 90 days in industrial composting conditions.'
    },
    {
      q: 'How do I clean and care for my CleanWalk™ device?',
      a: 'The exterior features waterproof black ceramic and anodized aluminum coatings. Simply wipe down with our Sanitizing Spray or warm soapy water.'
    },
    {
      q: 'What is your warranty and return policy?',
      a: 'We offer a 30-day risk-free home trial and a 2-year manufacturer defect warranty on all CleanWalk™ devices.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-xs uppercase tracking-widest text-amber-400 font-bold">Client Knowledge Base</h1>
        <h2 className="text-4xl font-serif font-bold text-white">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4"
            >
              <span className="text-sm font-bold text-white">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${
                  openIndex === idx ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-xs text-zinc-300 border-t border-zinc-800/60 pt-4 leading-relaxed font-light">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
