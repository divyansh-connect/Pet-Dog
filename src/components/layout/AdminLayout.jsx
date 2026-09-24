import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  Sparkles,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ToastContainer from '../common/ToastContainer';
import AccessDenied from '../common/AccessDenied';

export default function AdminLayout() {
  const {
    adminUser,
    logoutAdmin,
    currentRole,
    setCurrentRole,
    rolesPermissions,
    notifications,
    markNotificationRead,
    showToast,
    orders,
    products,
    customers,
    messages
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Enforce Admin Auth Protection: Redirect to /admin/login if not logged in
  useEffect(() => {
    if (!adminUser?.loggedIn) {
      navigate('/admin/login');
    }
  }, [adminUser, navigate]);

  if (!adminUser?.loggedIn) return null;

  const unreadNotifs = notifications.filter((n) => !n.read);

  // Exact Requested Super Admin Navigation Flow
  const navItems = [
    { name: 'Main Dashboard', path: '/admin', icon: LayoutDashboard, module: 'Main Dashboard' },
    { name: 'Website / Store', path: '/admin/store', icon: Store, module: 'Website / Store' },
    { name: 'Products', path: '/admin/products', icon: Package, module: 'Products' },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag, module: 'Orders' },
    { name: 'Inventory', path: '/admin/inventory', icon: Layers, module: 'Inventory' },
    { name: 'Customers / CRM', path: '/admin/customers', icon: Users, module: 'Customers / CRM' },
    { name: 'Payments & Refunds', path: '/admin/payments', icon: CreditCard, module: 'Payments & Refunds' },
    { name: 'Shipping & Tracking', path: '/admin/shipping', icon: Truck, module: 'Shipping & Tracking' },
    { name: 'Social Media', path: '/admin/social', icon: Share2, module: 'Social Media' },
    { name: 'Unified Inbox', path: '/admin/inbox', icon: MessageSquare, module: 'Unified Inbox' },
    { name: 'Comments & Reviews', path: '/admin/comments-reviews', icon: Star, module: 'Comments & Reviews' },
    { name: 'Advertising', path: '/admin/advertising', icon: Target, module: 'Advertising' },
    { name: 'Marketing', path: '/admin/marketing', icon: Megaphone, module: 'Marketing' },
    { name: 'Analytics & Reports', path: '/admin/analytics', icon: BarChart3, module: 'Analytics & Reports' },
    { name: 'Staff / Roles & Permissions', path: '/admin/staff', icon: ShieldCheck, module: 'Staff / Roles & Permissions' },
    { name: 'Integrations', path: '/admin/integrations', icon: Plug, module: 'Integrations' },
    { name: 'Security & Activity Logs', path: '/admin/security', icon: History, module: 'Security & Activity Logs' },
    { name: 'Settings', path: '/admin/settings', icon: Settings, module: 'Settings' }
  ];

  const isModuleAllowed = (moduleName) => {
    if (currentRole === 'Super Admin') return true;
    const allowedList = rolesPermissions?.[currentRole];
    if (allowedList && Array.isArray(allowedList)) {
      if (allowedList.includes('*')) return true;
      return allowedList.includes(moduleName);
    }
    return false;
  };

  const activeNavItem = navItems.find((item) =>
    item.path === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(item.path)
  );

  const allowedToViewCurrentModule = activeNavItem ? isModuleAllowed(activeNavItem.module) : true;

  const filteredOrders = searchQuery
    ? orders.filter(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredProducts = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredCustomers = searchQuery
    ? customers.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans selection:bg-amber-400 selection:text-black">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-zinc-900/90 border-r border-zinc-800/80 fixed inset-y-0 z-30">
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-800/80">
          <Link to="/admin" className="flex items-center gap-3">
            <img
              src="/naran_official_logo.png"
              alt="NARAN ADMIN"
              className="h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]"
            />
          </Link>
        </div>

        {/* Role Simulator Banner */}
        <div className="px-4 py-3 bg-zinc-950/60 border-b border-zinc-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-zinc-400">Role:</span>
            <span className="font-semibold text-amber-300">{currentRole}</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems
            .filter((item) => isModuleAllowed(item.module))
            .map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/10'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
        </div>

        {/* Bottom Storefront & Logout Link */}
        <div className="p-4 border-t border-zinc-800/80 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-amber-400 transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>Customer Storefront</span>
          </Link>

          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin/login');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-800/60 text-xs font-semibold text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Admin Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top App Header */}
        <header className="h-20 bg-zinc-900/60 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8">
          {/* Mobile drawer toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Global Search Bar */}
          <div className="relative max-w-md w-full hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders, products, customers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchResultsOpen(true);
                }}
                onFocus={() => setSearchResultsOpen(true)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {/* Global Search Results Popup */}
            {searchResultsOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-4 max-h-80 overflow-y-auto z-50">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-xs text-zinc-400 font-semibold uppercase">
                  <span>Search Results for "{searchQuery}"</span>
                  <button onClick={() => setSearchResultsOpen(false)} className="text-zinc-500 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {filteredOrders.length > 0 && (
                  <div className="mt-3">
                    <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">Orders</div>
                    {filteredOrders.map(o => (
                      <div
                        key={o.id}
                        onClick={() => { navigate('/admin/orders'); setSearchResultsOpen(false); }}
                        className="py-1.5 px-2 hover:bg-zinc-800 rounded text-xs flex justify-between cursor-pointer"
                      >
                        <span className="font-semibold text-white">{o.id} ({o.customer.name})</span>
                        <span className="text-zinc-400">${o.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredProducts.length > 0 && (
                  <div className="mt-3">
                    <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">Products</div>
                    {filteredProducts.map(p => (
                      <div
                        key={p.id}
                        onClick={() => { navigate('/admin/products'); setSearchResultsOpen(false); }}
                        className="py-1.5 px-2 hover:bg-zinc-800 rounded text-xs flex justify-between cursor-pointer"
                      >
                        <span className="font-semibold text-white">{p.name}</span>
                        <span className="text-zinc-400">{p.sku}</span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredCustomers.length > 0 && (
                  <div className="mt-3">
                    <div className="text-[10px] uppercase tracking-wider text-amber-400 font-bold mb-1">Customers</div>
                    {filteredCustomers.map(c => (
                      <div
                        key={c.id}
                        onClick={() => { navigate('/admin/customers'); setSearchResultsOpen(false); }}
                        className="py-1.5 px-2 hover:bg-zinc-800 rounded text-xs flex justify-between cursor-pointer"
                      >
                        <span className="font-semibold text-white">{c.name}</span>
                        <span className="text-zinc-400">{c.email}</span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredOrders.length === 0 && filteredProducts.length === 0 && filteredCustomers.length === 0 && (
                  <div className="py-4 text-center text-xs text-zinc-500">No matching records found.</div>
                )}
              </div>
            )}
          </div>

          {/* Right User & Notification Controls */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white transition-colors relative"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-semibold">
                      {unreadNotifs.length} Unread
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-2 space-y-2">
                    {notifications.slice(0, 5).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors border ${
                          n.read
                            ? 'bg-zinc-950/40 border-zinc-800/40 text-zinc-400'
                            : 'bg-amber-400/10 border-amber-500/20 text-white'
                        }`}
                      >
                        <div className="font-semibold text-amber-300 mb-0.5">{n.title}</div>
                        <div className="text-[11px] text-zinc-300">{n.message}</div>
                        <div className="text-[9px] text-zinc-500 mt-1">{n.time}</div>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/admin/notifications"
                    onClick={() => setNotificationsOpen(false)}
                    className="block text-center text-xs text-amber-400 font-semibold hover:underline pt-2 border-t border-zinc-800"
                  >
                    View All Notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pl-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-black font-bold text-xs">
                  {adminUser.name ? adminUser.name.charAt(0) : 'A'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-white leading-tight">{adminUser.name}</div>
                  <div className="text-[10px] text-amber-400 font-medium">{currentRole}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-3 z-50 space-y-3">
                  <div className="border-b border-zinc-800 pb-2">
                    <div className="text-xs font-bold text-white">{adminUser.name}</div>
                    <div className="text-[10px] text-amber-400 font-semibold">{currentRole}</div>
                    <div className="text-[10px] text-zinc-500">{adminUser.email}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider px-2">Switch Active Role (RBAC):</div>
                    {[
                      'Super Admin',
                      'Admin',
                      'Social Media Manager',
                      'Inventory Manager',
                      'Customer Support',
                      'Marketing Manager'
                    ].map((roleName) => (
                      <button
                        key={roleName}
                        onClick={() => {
                          setCurrentRole(roleName);
                          showToast(`Switched active RBAC role to: ${roleName}`);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                          currentRole === roleName
                            ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-500/30'
                            : 'text-zinc-300 hover:bg-zinc-800'
                        }`}
                      >
                        <span>{roleName}</span>
                        {currentRole === roleName && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-zinc-800 pt-2">
                    <button
                      onClick={() => {
                        logoutAdmin();
                        navigate('/admin/login');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Admin Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex">
            {/* Backdrop Dismiss */}
            <div className="fixed inset-0" onClick={() => setSidebarOpen(false)} />

            <div className="relative z-10 w-[85vw] max-w-xs bg-zinc-900 h-full flex flex-col p-4 border-r border-zinc-800 shadow-2xl animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-black font-extrabold text-xs">
                    N
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block">NARAN ADMIN</span>
                    <span className="text-[9px] text-amber-400 font-semibold">{currentRole}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-1">
                {navItems
                  .filter((item) => isModuleAllowed(item.module))
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-amber-400 text-black font-extrabold shadow-lg shadow-amber-400/10'
                              : 'text-zinc-300 hover:bg-zinc-800/80 hover:text-white'
                          }`
                        }
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2">
                <Link
                  to="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-amber-400 transition-colors"
                >
                  <Store className="w-4 h-4" />
                  <span>Customer Storefront</span>
                </Link>

                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    logoutAdmin();
                    navigate('/admin/login');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-800/60 text-xs font-semibold text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Admin Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Route Content */}
        <main className="p-4 sm:p-8 flex-1">
          {allowedToViewCurrentModule ? (
            <Outlet />
          ) : (
            <AccessDenied moduleName={activeNavItem?.name || 'Module'} />
          )}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
