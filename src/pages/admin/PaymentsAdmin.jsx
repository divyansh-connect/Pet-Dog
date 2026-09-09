import React, { useState } from 'react';
import { CreditCard, DollarSign, RotateCcw, ShieldCheck, CheckCircle2, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function PaymentsAdmin() {
  const { refunds, approveRefund, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('transactions');

  const paymentGateways = [
    { name: 'Stripe', status: 'Connected', volume: '$34,290.00', feeRate: '2.9% + 30¢', lastPayout: 'Today, 04:00 AM' },
    { name: 'PayPal Express', status: 'Connected', volume: '$11,420.00', feeRate: '3.49% + 49¢', lastPayout: 'Yesterday' },
    { name: 'Apple Pay Direct', status: 'Connected', volume: '$3,240.00', feeRate: '2.9% + 30¢', lastPayout: 'Today, 04:00 AM' }
  ];

  const recentTransactions = [
    { id: 'txn_9921', orderId: 'NARAN-1024', customer: 'Victoria Sterling', provider: 'Stripe', amount: 119.72, status: 'Succeeded', date: '2026-09-05 14:30' },
    { id: 'txn_9920', orderId: 'NARAN-1023', customer: 'Marcus Vance', provider: 'PayPal', amount: 120.49, status: 'Succeeded', date: '2026-09-04 18:15' },
    { id: 'txn_9919', orderId: 'NARAN-1022', customer: 'Elena Rostova', provider: 'Stripe', amount: 97.64, status: 'Succeeded', date: '2026-09-03 11:20' },
    { id: 'txn_9918', orderId: 'NARAN-1021', customer: 'Harrison Forde', provider: 'Apple Pay', amount: 184.42, status: 'Succeeded', date: '2026-09-05 16:00' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <CreditCard className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Payments & Refunds Control</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Super Admin payment gateway management, transaction logs, payout schedules, and refund authorizations.
          </p>
        </div>
      </div>

      {/* Payment Gateway Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {paymentGateways.map((gw) => (
          <div key={gw.name} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">{gw.name}</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {gw.status}
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-white font-serif">{gw.volume}</div>
              <div className="text-[11px] text-zinc-400">Monthly Processed Volume</div>
            </div>
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Fee: {gw.feeRate}</span>
              <span>Payout: {gw.lastPayout}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
            activeTab === 'transactions'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          Recent Transactions
        </button>
        <button
          onClick={() => setActiveTab('refunds')}
          className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'refunds'
              ? 'border-amber-400 text-amber-400'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <span>Refund Requests</span>
          {refunds.filter((r) => r.status === 'Pending Approval').length > 0 && (
            <span className="bg-amber-400 text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
              {refunds.filter((r) => r.status === 'Pending Approval').length}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'transactions' ? (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-zinc-800 text-xs font-bold text-white uppercase tracking-wider">
            Live Settlement Audit Trail
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Gateway</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{t.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{t.orderId}</td>
                    <td className="py-3.5 px-4 text-zinc-200">{t.customer}</td>
                    <td className="py-3.5 px-4">{t.provider}</td>
                    <td className="py-3.5 px-4 font-bold text-white">${t.amount.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Customer Refund Queue & Approvals
          </div>
          {refunds.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500">No active refund requests in queue.</div>
          ) : (
            <div className="space-y-3">
              {refunds.map((r) => (
                <div key={r.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white">{r.orderId}</span>
                      <span className="text-xs font-semibold text-amber-400">${r.amount.toFixed(2)}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        r.status === 'Refunded'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-400/20 text-amber-300'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400">Customer: <span className="text-zinc-200">{r.customer}</span> • Reason: {r.reason}</div>
                  </div>
                  {r.status !== 'Refunded' && (
                    <button
                      onClick={() => approveRefund(r.id)}
                      className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs rounded-xl transition-all cursor-pointer self-start sm:self-auto"
                    >
                      Authorize Refund
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
