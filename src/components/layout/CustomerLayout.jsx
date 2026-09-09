import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, ShieldCheck, Menu, X, ArrowRight, Sparkles, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ToastContainer from '../common/ToastContainer';

export default function CustomerLayout() {
  const { cart, customerUser, logoutCustomer } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'CleanWalk™', path: '/cleanwalk' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-gradient-to-r from-zinc-950 via-amber-950/40 to-zinc-950 border-b border-amber-500/20 py-2 px-4 text-center text-xs tracking-wider text-amber-200/90 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>COMPLIMENTARY EXPRESS GLOBAL SHIPPING ON ORDERS OVER $100</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center text-black font-extrabold text-xl shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-widest text-white leading-tight font-serif">
                NARAN
              </span>
              <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase font-semibold">
                PETCARE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors tracking-wide relative py-1 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-zinc-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {customerUser?.loggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/account"
                  className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors flex items-center gap-2 text-xs font-medium border border-zinc-800"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline font-semibold">{customerUser.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/account/login"
                className="px-4 py-2 bg-amber-400/10 border border-amber-500/30 text-amber-300 hover:bg-amber-400 hover:text-black rounded-xl transition-all text-xs font-bold"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/cart"
              className="relative p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-200 hover:text-white transition-all flex items-center gap-2 group"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-amber-400">Cart</span>
              {totalCartItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-xs font-extrabold flex items-center justify-center animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-zinc-200 hover:text-amber-400 py-2"
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
              {customerUser?.loggedIn ? (
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
                >
                  <User className="w-4 h-4 text-amber-400" />
                  Account Profile ({customerUser.name})
                </Link>
              ) : (
                <Link
                  to="/account/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-amber-400 font-bold"
                >
                  <User className="w-4 h-4" />
                  Customer Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Body Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-zinc-900">
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-black font-bold">
                  N
                </div>
                <span className="text-lg font-extrabold text-white font-serif tracking-wider">
                  NARAN PETCARE
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Elevating dog walking into a luxurious, sanitary, and effortless experience with CleanWalk™ hands-free technology.
              </p>
              <div className="text-xs text-amber-400/80 font-mono">
                Designed & Engineered for Pet Royalty.
              </div>

              {/* PART 12 — Social Media Links (9 Platforms) */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Connect With Us</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Instagram', label: 'IG', url: 'https://instagram.com/naran.petcare' },
                    { name: 'Facebook', label: 'FB', url: 'https://facebook.com/naranpetcare' },
                    { name: 'TikTok', label: 'TK', url: 'https://tiktok.com/@naranpetcare' },
                    { name: 'YouTube', label: 'YT', url: 'https://youtube.com/@naranpetcare' },
                    { name: 'Google Business', label: 'GB', url: 'https://business.google.com' },
                    { name: 'Pinterest', label: 'PT', url: 'https://pinterest.com/naranpetcare' },
                    { name: 'X (Twitter)', label: 'X', url: 'https://x.com/naranpetcare' },
                    { name: 'Threads', label: 'TH', url: 'https://threads.net/@naran.petcare' },
                    { name: 'LinkedIn', label: 'LN', url: 'https://linkedin.com/company/naranpetcare' },
                    { name: 'WhatsApp Business', label: 'WA', url: 'https://wa.me/18005556272' }
                  ].map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${soc.name} (Ready for API Connection)`}
                      className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-amber-400 text-xs font-bold flex items-center justify-center transition-all hover:scale-110 shadow-md"
                    >
                      {soc.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Store
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link to="/shop" className="hover:text-amber-400 transition-colors">All Products</Link></li>
                <li><Link to="/cleanwalk" className="hover:text-amber-400 transition-colors">CleanWalk™ Catcher</Link></li>
                <li><Link to="/shop?category=Accessories" className="hover:text-amber-400 transition-colors">Compostable Bags</Link></li>
                <li><Link to="/shop?category=Leashes" className="hover:text-amber-400 transition-colors">Italian Leather Leashes</Link></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Support
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link to="/how-it-works" className="hover:text-amber-400 transition-colors">How CleanWalk Works</Link></li>
                <li><Link to="/faq" className="hover:text-amber-400 transition-colors">Frequently Asked Questions</Link></li>
                <li><Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Support</Link></li>
                <li><Link to="/account" className="hover:text-amber-400 transition-colors">Track Order</Link></li>
              </ul>
            </div>

            {/* Separate Admin Portal Link */}
            <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" /> Admin Portal Portal
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                  Separate staff authentication for central management control panel.
                </p>
              </div>
              <Link
                to="/admin/login"
                className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <span>Admin Login (/admin/login)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
            <div>© {new Date().getFullYear()} NARAN PETCARE INC. All Rights Reserved.</div>
            <div className="flex gap-6">
              <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-zinc-300 cursor-pointer">Shipping & Returns</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
}
