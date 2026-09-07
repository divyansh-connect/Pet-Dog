import React, { useState } from 'react';
import { Search, Filter, Eye, X, Check, ArrowUpDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function OrdersAdmin() {
  const { orders, updateOrderStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeDrawerOrder, setActiveDrawerOrder] = useState(null);

  // Filtering
  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || ord.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Order Management</h1>
          <p className="text-xs text-zinc-400 mt-1">View, track, and update customer order fulfillment</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedStatus === status
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
        <table className="w-full text-xs text-left min-w-[700px]">
          <thead className="bg-zinc-950 text-amber-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-zinc-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-4 font-bold text-amber-400">{ord.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-white">{ord.customer.name}</div>
                    <div className="text-[10px] text-zinc-500">{ord.customer.email}</div>
                  </td>
                  <td className="p-4 text-zinc-400">{ord.channel}</td>
                  <td className="p-4">{ord.items.length} items</td>
                  <td className="p-4 font-bold text-white">${ord.total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setActiveDrawerOrder(ord)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Drawer Modal */}
      {activeDrawerOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-zinc-900 h-full border-l border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Order Details</h3>
                  <p className="text-xs text-amber-400 font-mono">{activeDrawerOrder.id}</p>
                </div>
                <button onClick={() => setActiveDrawerOrder(null)} className="text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Updater */}
              <div className="pt-4 space-y-2">
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                  Fulfillment Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(activeDrawerOrder.id, st);
                        setActiveDrawerOrder({ ...activeDrawerOrder, status: st });
                      }}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        activeDrawerOrder.status === st
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="pt-6 space-y-2 text-xs">
                <div className="font-bold text-white uppercase tracking-wider text-[10px]">Customer Details</div>
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                  <div className="text-white font-bold">{activeDrawerOrder.customer.name}</div>
                  <div className="text-zinc-400">{activeDrawerOrder.customer.email}</div>
                  <div className="text-zinc-400">{activeDrawerOrder.customer.phone}</div>
                  <div className="text-zinc-500 font-mono pt-1 border-t border-zinc-900">
                    {activeDrawerOrder.customer.address}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="pt-6 space-y-2 text-xs">
                <div className="font-bold text-white uppercase tracking-wider text-[10px]">Purchased Products</div>
                <div className="space-y-2">
                  {activeDrawerOrder.items.map((it, idx) => (
                    <div key={idx} className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex justify-between">
                      <div>
                        <div className="font-semibold text-white">{it.name}</div>
                        <div className="text-[10px] text-amber-400">Size: {it.size} | Qty: {it.quantity}</div>
                      </div>
                      <div className="font-bold text-white">${(it.price * it.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveDrawerOrder(null)}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
