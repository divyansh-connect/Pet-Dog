import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import CustomerLayout from './components/layout/CustomerLayout';
import AdminLayout from './components/layout/AdminLayout';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import ShopPage from './pages/customer/ShopPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import CleanWalkPage from './pages/customer/CleanWalkPage';
import HowItWorksPage from './pages/customer/HowItWorksPage';
import AboutPage from './pages/customer/AboutPage';
import FAQPage from './pages/customer/FAQPage';
import ContactPage from './pages/customer/ContactPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import AccountPage from './pages/customer/AccountPage';
import CustomerLogin from './pages/customer/CustomerLogin';
import CustomerRegister from './pages/customer/CustomerRegister';
import CustomerForgotPassword from './pages/customer/CustomerForgotPassword';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import InventoryAdmin from './pages/admin/InventoryAdmin';
import CustomersAdmin from './pages/admin/CustomersAdmin';
import SocialAdmin from './pages/admin/SocialAdmin';
import SocialCreatePost from './pages/admin/SocialCreatePost';
import MessagesAdmin from './pages/admin/MessagesAdmin';
import CommentsAdmin from './pages/admin/CommentsAdmin';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import MarketingAdmin from './pages/admin/MarketingAdmin';
import ReportsAdmin from './pages/admin/ReportsAdmin';
import IntegrationsAdmin from './pages/admin/IntegrationsAdmin';
import StaffAdmin from './pages/admin/StaffAdmin';
import ApprovalsAdmin from './pages/admin/ApprovalsAdmin';
import ActivityAdmin from './pages/admin/ActivityAdmin';
import NotificationsAdmin from './pages/admin/NotificationsAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import AdminLogin from './pages/admin/AdminLogin';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer E-Commerce Website & Customer Auth */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
            <Route path="cleanwalk" element={<CleanWalkPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="account/login" element={<CustomerLogin />} />
            <Route path="account/register" element={<CustomerRegister />} />
            <Route path="account/forgot-password" element={<CustomerForgotPassword />} />
          </Route>

          {/* Admin Login Standalone */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Central Admin Control Center */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="inventory" element={<InventoryAdmin />} />
            <Route path="customers" element={<CustomersAdmin />} />
            <Route path="social" element={<SocialAdmin />} />
            <Route path="social/create" element={<SocialCreatePost />} />
            <Route path="messages" element={<MessagesAdmin />} />
            <Route path="comments" element={<CommentsAdmin />} />
            <Route path="reviews" element={<ReviewsAdmin />} />
            <Route path="marketing" element={<MarketingAdmin />} />
            <Route path="reports" element={<ReportsAdmin />} />
            <Route path="integrations" element={<IntegrationsAdmin />} />
            <Route path="staff" element={<StaffAdmin />} />
            <Route path="approvals" element={<ApprovalsAdmin />} />
            <Route path="activity" element={<ActivityAdmin />} />
            <Route path="notifications" element={<NotificationsAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
