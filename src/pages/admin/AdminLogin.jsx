import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Sparkles, UserCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { loginAdmin, adminUser, setCurrentRole } = useApp();

  const [email, setEmail] = useState('admin@naranpetcare.com');
  const [password, setPassword] = useState('demo123');
  const [selectedRole, setSelectedRole] = useState('Super Admin');

  // If already logged in, redirect to /admin
  React.useEffect(() => {
    if (adminUser?.loggedIn) {
      navigate('/admin');
    }
  }, [adminUser, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) return;
    loginAdmin(email, password);
    setCurrentRole(selectedRole);
    navigate('/admin');
  };

  const handleQuickRoleLogin = (role, demoEmail) => {
    loginAdmin(demoEmail, 'demo123');
    setCurrentRole(role);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 font-sans selection:bg-amber-400 selection:text-black relative">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Close Button (Navigates back to Customer Storefront Landing Page) */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all border border-transparent hover:border-zinc-700 group"
          title="Return to Storefront Landing Page"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
            N
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight">NARAN PETCARE</h1>
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-widest">Admin Control Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-300 font-semibold block mb-1">Admin Email / Username</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              placeholder="admin@naranpetcare.com"
            />
          </div>

          <div>
            <label className="text-zinc-300 font-semibold block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>

          {/* Select Admin Role on Login Screen */}
          <div>
            <label className="text-zinc-300 font-semibold block mb-1">Select Login Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-amber-300 font-bold focus:border-amber-400 focus:outline-none"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Social Media Manager">Social Media Manager</option>
              <option value="Order Manager">Order Manager</option>
              <option value="Marketing Manager">Marketing Manager</option>
              <option value="Inventory Manager">Inventory Manager</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>SIGN IN TO ADMIN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Role Login Options */}
        <div className="pt-4 border-t border-zinc-800 space-y-3">
          <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Demo Quick Login by Role
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickRoleLogin('Super Admin', 'admin@naranpetcare.com')}
              className="p-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-amber-300 font-semibold rounded-xl text-left text-[11px]"
            >
              <div className="font-bold text-white">Super Admin</div>
              <div className="text-[9px] text-zinc-500">Full Access</div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('Social Media Manager', 'sarah.w@naranpetcare.com')}
              className="p-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-amber-300 font-semibold rounded-xl text-left text-[11px]"
            >
              <div className="font-bold text-white">Social Manager</div>
              <div className="text-[9px] text-zinc-500">Restricted Access</div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('Order Manager', 'michael.c@naranpetcare.com')}
              className="p-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-amber-300 font-semibold rounded-xl text-left text-[11px]"
            >
              <div className="font-bold text-white">Order Manager</div>
              <div className="text-[9px] text-zinc-500">Orders & CRM</div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('Inventory Manager', 'jessica.t@naranpetcare.com')}
              className="p-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-amber-300 font-semibold rounded-xl text-left text-[11px]"
            >
              <div className="font-bold text-white">Inventory Manager</div>
              <div className="text-[9px] text-zinc-500">Stock & Catalog</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
