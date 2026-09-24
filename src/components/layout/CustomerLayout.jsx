import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, ShieldCheck, Menu, X, ArrowRight, Sparkles, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ToastContainer from '../common/ToastContainer';
import { OFFICIAL_NARAN_PETCARE_SOCIAL_LINKS } from '../common/FollowNaranPetcare';

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
          <Link to="/" className="flex items-center gap-3 group py-1">
            <img
              src="/naran_official_logo.png"
              alt="NARAN PETCARE CLEANWALK™"
              className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]"
            />
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
          <div className="flex items-center gap-3">
            <Link
              to="/account"
              className="px-4 py-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400 text-white rounded-full transition-all flex items-center gap-2 text-xs font-bold shadow-md cursor-pointer"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>{customerUser?.name ? customerUser.name.split(' ')[0] : 'Victoria'}</span>
              <span className="text-zinc-400 text-[10px]">▼</span>
            </Link>

            <Link
              to="/cart"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-amber-500/60 hover:border-amber-400 text-white rounded-full transition-all flex items-center gap-2 text-xs font-extrabold shadow-md cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-[11px] font-extrabold flex items-center justify-center ml-0.5">
                {totalCartItems}
              </span>
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
              <Link to="/" className="inline-block group">
                <img
                  src="/naran_official_logo.png"
                  alt="NARAN PETCARE"
                  className="h-16 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]"
                />
              </Link>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Elevating dog walking into a luxurious, sanitary, and effortless experience with CleanWalk™ hands-free technology.
              </p>
              <div className="text-xs text-amber-400/80 font-mono">
                Designed & Engineered for Pet Royalty.
              </div>

              {/* PART 12 — FOLLOW NARAN PETCARE (10 Official Platforms) */}
              <div className="pt-4 border-t border-zinc-900 space-y-3">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">FOLLOW NARAN PETCARE</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'Instagram', label: 'Instagram', color: 'text-pink-500', svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
                    { key: 'Facebook', label: 'Facebook', color: 'text-blue-500', svg: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
                    { key: 'TikTok', label: 'TikTok', color: 'text-cyan-400', svg: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.96-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.36 1.49-1.43 2.47-.1 1.2.4 2.41 1.35 3.12 1.05.8 2.49.96 3.66.42 1.13-.51 1.86-1.66 1.92-2.89.02-3.7.01-7.41.01-11.11z"/> },
                    { key: 'YouTube', label: 'YouTube', color: 'text-red-500', svg: <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/> },
                    { key: 'Pinterest', label: 'Pinterest', color: 'text-red-600', svg: <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/> },
                    { key: 'X (Twitter)', label: 'X (Twitter)', color: 'text-white', svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                    { key: 'Threads', label: 'Threads', color: 'text-zinc-200', svg: <path d="M12 21.5c-4.8 0-8.5-3.4-8.5-8.3s3.7-8.7 8.7-8.7c4.6 0 7.8 3.1 7.8 7.3 0 3.7-2.3 6.1-5.2 6.1-1.4 0-2.6-.7-3.1-1.7-.6.9-1.6 1.7-3.1 1.7-2.2 0-3.8-1.7-3.8-3.8 0-2.4 1.9-4.2 4.4-4.2 1.3 0 2.4.5 3 1.2v-.9c0-2.2-1.6-3.8-4-3.8-2.3 0-4.1 1.6-4.3 3.7h-2.1c.2-3.3 2.9-5.7 6.4-5.7 3.6 0 6.1 2.4 6.1 5.9v4.7c0 .7.3 1.2 1 1.2 1.5 0 2.9-1.5 2.9-4 0-3.4-2.5-5.9-6.3-5.9-4 0-6.9 2.8-6.9 6.8 0 3.9 2.8 6.7 6.8 6.7 2.1 0 3.9-.8 5.1-2.1l1.4 1.4c-1.6 1.7-3.9 2.7-6.5 2.7zm-.6-9.7c-1.3 0-2.3.9-2.3 2.2 0 1.2.9 2.1 2.2 2.1 1.3 0 2.3-.9 2.3-2.2 0-1.2-1-2.1-2.2-2.1z"/> },
                    { key: 'LinkedIn', label: 'LinkedIn', color: 'text-blue-400', svg: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> },
                    { key: 'WhatsApp', label: 'WhatsApp', color: 'text-emerald-400', svg: <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/> },
                    { key: 'Google Business Profile', label: 'Google', color: 'text-amber-400', svg: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/> }
                  ].map((soc, idx) => {
                    const url = OFFICIAL_NARAN_PETCARE_SOCIAL_LINKS[soc.key];
                    if (url) {
                      return (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-amber-400 rounded-xl text-xs transition-all hover:scale-[1.02] group cursor-pointer ${soc.color}`}
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            {soc.svg}
                          </svg>
                          <span className="text-[11px] font-semibold text-zinc-300 group-hover:text-white truncate">
                            {soc.label}
                          </span>
                        </a>
                      );
                    }
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-2.5 py-1.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl opacity-60 cursor-not-allowed"
                        title="Official URL unassigned"
                      >
                        <svg className={`w-3.5 h-3.5 ${soc.color} shrink-0 opacity-60`} fill="currentColor" viewBox="0 0 24 24">
                          {soc.svg}
                        </svg>
                        <span className="text-[11px] font-semibold text-zinc-400 truncate">
                          {soc.label}
                        </span>
                      </div>
                    );
                  })}
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
