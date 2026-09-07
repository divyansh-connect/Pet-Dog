import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const { loginCustomer, customerUser } = useApp();

  const [email, setEmail] = useState('victoria@example.com');
  const [password, setPassword] = useState('demo123');

  // If already logged in, redirect to account
  React.useEffect(() => {
    if (customerUser?.loggedIn) {
      navigate('/account');
    }
  }, [customerUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    loginCustomer(email, password);
    navigate('/account');
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-8 shadow-2xl">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
          N
        </div>
        <h1 className="text-2xl font-serif font-bold text-white tracking-tight">Customer Portal Sign In</h1>
        <p className="text-xs text-zinc-400">Manage your orders, profile details & luxury rewards</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="text-zinc-300 font-semibold block mb-1">Email Address</label>
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
          <div className="flex justify-between items-center mb-1">
            <label className="text-zinc-300 font-semibold">Password</label>
            <Link to="/account/forgot-password" className="text-[10px] text-amber-400 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none font-mono"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <span>SIGN IN TO ACCOUNT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-4 pt-4 border-t border-zinc-800 text-center text-xs">
        <button
          onClick={() => {
            loginCustomer('victoria@example.com', 'demo123');
            navigate('/account');
          }}
          className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-amber-400 font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Demo Customer Login (Victoria)</span>
        </button>

        <div className="text-zinc-400 text-[11px]">
          Don't have an account?{' '}
          <Link to="/account/register" className="text-amber-400 font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
