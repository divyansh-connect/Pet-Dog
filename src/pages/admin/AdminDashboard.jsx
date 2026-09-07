import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Share2,
  Package,
  Activity,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { orders, products, customers, socialPosts, activityLogs, currentRole } = useApp();
  const navigate = useNavigate();

  // Dynamic KPI metrics calculated directly from state
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalCustomersCount = customers.length;
  const lowStockCount = products.filter((p) => p.inventory <= p.lowStockThreshold).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-zinc-900 via-amber-950/20 to-zinc-900 p-6 rounded-3xl border border-zinc-800">
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            EXECUTIVE OVERVIEW
          </div>
          <h1 className="text-2xl font-serif font-bold text-white">
            Welcome back, Alexander
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Logged in as <span className="text-amber-300 font-semibold">{currentRole}</span> • All systems operational
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/reports"
            className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 rounded-xl transition-colors"
          >
            Analytics Reports
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-colors shadow-lg"
          >
            Manage Orders ({totalOrdersCount})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Sales</span>
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">${totalSales.toFixed(2)}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% from last month</span>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total Orders</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{totalOrdersCount}</div>
          <div className="text-[11px] text-zinc-400">Live order database count</div>
        </div>

        {/* Customers */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Active Customers</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white">{totalCustomersCount}</div>
          <div className="text-[11px] text-zinc-400">Registered CRM profiles</div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Low Stock Items</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-400">{lowStockCount}</div>
          <div className="text-[11px] text-amber-300 font-medium">Requires inventory attention</div>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Stream */}
        <div className="lg:col-span-2 bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-zinc-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Channel</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-zinc-800/30">
                    <td className="py-3 px-2 font-bold text-amber-400">{ord.id}</td>
                    <td className="py-3 px-2 text-white">{ord.customer.name}</td>
                    <td className="py-3 px-2 text-zinc-400">{ord.channel}</td>
                    <td className="py-3 px-2 font-semibold text-white">${ord.total.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span className="bg-amber-400/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Alerts & Social Highlights */}
        <div className="space-y-6">
          {/* Inventory Alert Box */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-amber-400" /> Stock Watch
              </h3>
              <Link to="/admin/inventory" className="text-xs text-amber-400 font-semibold hover:underline">
                Manage
              </Link>
            </div>

            <div className="space-y-3">
              {products
                .filter((p) => p.inventory <= p.lowStockThreshold)
                .slice(0, 3)
                .map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs">
                    <div>
                      <div className="font-bold text-white">{prod.name}</div>
                      <div className="text-[10px] text-zinc-500">Threshold: {prod.lowStockThreshold} units</div>
                    </div>
                    <span className="text-xs font-extrabold text-amber-400 bg-amber-400/10 px-2 py-1 rounded">
                      {prod.inventory} Left
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" /> Recent Audit Activity
              </h3>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {activityLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="text-xs space-y-1 p-2 border-b border-zinc-900">
                  <div className="flex justify-between text-zinc-400">
                    <span className="font-bold text-amber-300">{log.action}</span>
                    <span className="text-[9px] text-zinc-500">{log.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-zinc-300">{log.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
