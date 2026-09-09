import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingBag,
  Layers,
  Users,
  CreditCard,
  Truck,
  Share2,
  MessageSquare,
  Star,
  Target,
  Megaphone,
  BarChart3,
  ShieldCheck,
  Plug,
  History,
  Settings,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminDashboard() {
  const { orders, products, customers, currentRole } = useApp();
  const navigate = useNavigate();

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;
  const totalCustomersCount = customers.length;
  const lowStockCount = products.filter((p) => p.inventory <= p.lowStockThreshold).length;

  const modulesGrid = [
    { title: 'Website / Store', path: '/admin/store', icon: Store, desc: 'Storefront hero, domain & banners', count: 'Active' },
    { title: 'Products', path: '/admin/products', icon: Package, desc: 'CleanWalk™ catalog management', count: `${products.length} items` },
    { title: 'Orders', path: '/admin/orders', icon: ShoppingBag, desc: 'Customer order processing', count: `${totalOrdersCount} orders` },
    { title: 'Inventory', path: '/admin/inventory', icon: Layers, desc: 'Stock levels & SKU alerts', count: `${lowStockCount} low stock` },
    { title: 'Customers / CRM', path: '/admin/customers', icon: Users, desc: 'Customer profiles & VIP tiers', count: `${totalCustomersCount} profiles` },
    { title: 'Payments & Refunds', path: '/admin/payments', icon: CreditCard, desc: 'Stripe, PayPal & refund queue', count: '3 Gateways' },
    { title: 'Shipping & Tracking', path: '/admin/shipping', icon: Truck, desc: 'FedEx, UPS & DHL dispatch', count: '4 Active' },
    { title: 'Social Media', path: '/admin/social', icon: Share2, desc: 'FB, IG, TikTok, YT, Pinterest, X', count: '6 Channels' },
    { title: 'Unified Inbox', path: '/admin/inbox', icon: MessageSquare, desc: 'Central customer messaging', count: '2 Unread' },
    { title: 'Comments & Reviews', path: '/admin/comments-reviews', icon: Star, desc: 'Product reviews & post comments', count: 'Mod Ready' },
    { title: 'Advertising Center', path: '/admin/advertising', icon: Target, desc: 'Meta, Google & TikTok ads', count: '3 Campaigns' },
    { title: 'Marketing', path: '/admin/marketing', icon: Megaphone, desc: 'Coupons & discount rules', count: '3 Active' },
    { title: 'Analytics & Reports', path: '/admin/analytics', icon: BarChart3, desc: 'Executive revenue reports', count: 'Live' },
    { title: 'Staff / Roles & Permissions', path: '/admin/staff', icon: ShieldCheck, desc: 'Super Admin RBAC matrix', count: '4 Members' },
    { title: 'Integrations', path: '/admin/integrations', icon: Plug, desc: 'Shopify, Amazon & Klaviyo', count: '5 Synced' },
    { title: 'Security & Activity Logs', path: '/admin/security', icon: History, desc: 'Audit trail & 2FA controls', count: 'Secured' },
    { title: 'Settings', path: '/admin/settings', icon: Settings, desc: 'Store global parameters', count: 'Configured' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-zinc-900 via-amber-950/20 to-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-2xl">
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4" /> CENTRAL SUPER ADMIN CONTROL CENTER
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            NARAN PETCARE Business Operations
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Highest Authority Role: <strong className="text-amber-300 font-bold">{currentRole}</strong> • Full system control active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/analytics"
            className="px-4 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 rounded-xl transition-colors"
          >
            Analytics & Reports
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-all shadow-lg shadow-amber-400/10"
          >
            Manage Orders ({totalOrdersCount})
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Gross Sales</span>
            <DollarSign className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-serif">${totalSales.toFixed(2)}</div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from last period
          </div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-serif">{totalOrdersCount}</div>
          <div className="text-[10px] text-zinc-400">All channels combined</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Active Customers</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-serif">{totalCustomersCount}</div>
          <div className="text-[10px] text-zinc-400">CRM user directory</div>
        </div>

        <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Low Stock Warning</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-serif">{lowStockCount} SKUs</div>
          <div className="text-[10px] text-amber-400 font-bold">Action required in Inventory</div>
        </div>
      </div>

      {/* Super Admin Control Modules Navigation Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Super Admin Management Modules</h2>
          <span className="text-[10px] text-zinc-500 font-mono">NARAN PETCARE Executive Control</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modulesGrid.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                onClick={() => navigate(mod.path)}
                className="bg-zinc-900/80 border border-zinc-800/90 hover:border-amber-400/50 p-5 rounded-2xl transition-all cursor-pointer group hover:bg-zinc-900 flex flex-col justify-between space-y-4 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-amber-400/10 border border-amber-400/20 rounded-xl group-hover:bg-amber-400 group-hover:text-black text-amber-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-amber-300">
                    {mod.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <span>{mod.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">{mod.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
