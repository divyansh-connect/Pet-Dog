import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ContactPage() {
  const { submitContactForm } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    submitContactForm(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-xs uppercase tracking-widest text-amber-400 font-bold">24/7 Concierge Support</h1>
        <h2 className="text-4xl font-serif font-bold text-white">Get in Touch with NARAN</h2>
        <p className="text-xs text-zinc-400">
          Have questions about CleanWalk™ sizes, custom bulk orders, or shipping? Our client care team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 bg-zinc-900/40 p-8 rounded-3xl border border-zinc-900">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Email Us</h3>
                <p className="text-xs text-zinc-400 mt-0.5">concierge@naranpetcare.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Client Line</h3>
                <p className="text-xs text-zinc-400 mt-0.5">+1 (800) 555-NARAN</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Flagship Showroom</h3>
                <p className="text-xs text-zinc-400 mt-0.5">740 Madison Ave, New York, NY 10065</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-serif font-bold text-white">Message Received</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Your message has been received and logged directly into our Admin Unified Inbox! A specialist will respond shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-amber-400 text-black text-xs font-bold rounded-xl"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-serif font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" /> Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-zinc-300 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="Victoria Sterling"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                    placeholder="v.sterling@luxury.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-semibold">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  placeholder="CleanWalk Size Consultation"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-semibold">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  placeholder="How can we assist you today?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT INQUIRY</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
