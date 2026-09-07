import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CustomerRegister() {
  const navigate = useNavigate();
  const { registerCustomer, customerUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (customerUser?.loggedIn) {
      navigate('/account');
    }
  }, [customerUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    registerCustomer(name, email, password);
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-8 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
          N
        </div>
        <h1 className="text-2xl font-serif font-bold text-white tracking-tight">Create Customer Account</h1>
        <p className="text-xs text-zinc-400">Join NARAN PETCARE VIP Client Club</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="text-zinc-300 font-semibold block mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
            placeholder="Victoria Sterling"
          />
        </div>

        <div>
          <label className="text-zinc-300 font-semibold block mb-1">Email Address *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
            placeholder="victoria@example.com"
          />
        </div>

        <div>
          <label className="text-zinc-300 font-semibold block mb-1">Password *</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none font-mono"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <span>CREATE ACCOUNT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-zinc-800 text-center text-xs text-zinc-400">
        Already have an account?{' '}
        <Link to="/account/login" className="text-amber-400 font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
