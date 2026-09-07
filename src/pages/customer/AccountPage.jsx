import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AccountPage() {
  const { customerUser, logoutCustomer, orders } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  // Protect Customer Account Route: Redirect if not logged in
  React.useEffect(() => {
    if (!customerUser?.loggedIn) {
      navigate('/account/login');
    }
  }, [customerUser, navigate]);

  if (!customerUser?.loggedIn) return null;

  const myOrders = orders.filter(
    (o) => o.customer.email.toLowerCase() === (customerUser.email || '').toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* User Header Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-400 text-black font-extrabold text-2xl flex items-center justify-center shadow-lg">
            {customerUser.name ? customerUser.name.charAt(0) : 'C'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-white">{customerUser.name}</h1>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase">
                {customerUser.status || 'Active'} Customer
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">{customerUser.email} • {customerUser.phone}</p>
          </div>
        </div>

        {/* Customer Logout Button */}
        <button
          onClick={() => {
            logoutCustomer();
            navigate('/account/login');
          }}
          className="px-5 py-2.5 bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-900 pb-2 overflow-x-auto">
        {['Overview', 'Orders', 'Profile', 'Addresses'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/10'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl space-y-2">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Total Orders</div>
            <div className="text-3xl font-extrabold text-white">{myOrders.length}</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl space-y-2">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Total Spent</div>
            <div className="text-3xl font-extrabold text-amber-400">
              ${myOrders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/80 p-6 rounded-2xl space-y-2">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Membership Tier</div>
            <div className="text-3xl font-extrabold text-white">NARAN Gold VIP</div>
          </div>
        </div>
      )}

      {activeTab === 'Orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">My Order History</h2>
          {myOrders.length === 0 ? (
            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl text-center text-xs text-zinc-400">
              You have no recent orders placed yet.
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((ord) => (
                <div key={ord.id} className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-2">
                    <div>
                      <span className="font-extrabold text-amber-400 text-sm">{ord.id}</span>
                      <span className="text-xs text-zinc-400 ml-3">
                        {new Date(ord.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white">${ord.total.toFixed(2)}</span>
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                        {ord.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-zinc-300">
                        <span>{item.name} ({item.size}) x {item.quantity}</span>
                        <span className="font-semibold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'Profile' && (
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl max-w-lg space-y-4">
          <h2 className="text-base font-bold text-white">Account Details</h2>
          <div className="space-y-3 text-xs text-zinc-300">
            <div><span className="text-zinc-500">Name:</span> {customerUser.name}</div>
            <div><span className="text-zinc-500">Email:</span> {customerUser.email}</div>
            <div><span className="text-zinc-500">Phone:</span> {customerUser.phone}</div>
          </div>
        </div>
      )}

      {activeTab === 'Addresses' && (
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl max-w-lg space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-400" /> Primary Shipping Address
          </h2>
          <div className="text-xs text-zinc-300 font-mono p-4 bg-zinc-950 rounded-xl border border-zinc-800">
            {customerUser.address || '740 Park Ave, Apt 12B, New York, NY 10021'}
          </div>
        </div>
      )}
    </div>
  );
}
