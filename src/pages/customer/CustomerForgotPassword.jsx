import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CustomerForgotPassword() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    showToast('Reset password link sent to ' + email);
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-8 shadow-2xl">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-serif font-bold text-white tracking-tight">Forgot Password</h1>
        <p className="text-xs text-zinc-400">Enter your email address to receive password reset instructions</p>
      </div>

      {sent ? (
        <div className="text-center py-6 space-y-4">
          <CheckCircle2 className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
          <p className="text-xs text-zinc-300">
            Password reset instructions have been sent to <span className="text-amber-400 font-bold">{email}</span>.
          </p>
          <Link
            to="/account/login"
            className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold hover:underline pt-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-300 font-semibold block mb-1">Account Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
              placeholder="victoria@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all"
          >
            SEND RESET LINK
          </button>

          <div className="text-center pt-2">
            <Link to="/account/login" className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
