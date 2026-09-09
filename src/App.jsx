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

// 19-Module Super Admin Flow Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import WebsiteAdmin from './pages/admin/WebsiteAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import OrdersAdmin from './pages/admin/OrdersAdmin';
import InventoryAdmin from './pages/admin/InventoryAdmin';
import CustomersAdmin from './pages/admin/CustomersAdmin';
import PaymentsAdmin from './pages/admin/PaymentsAdmin';
import ShippingAdmin from './pages/admin/ShippingAdmin';
import SocialAdmin from './pages/admin/SocialAdmin';
import SocialCreatePost from './pages/admin/SocialCreatePost';
import UnifiedInboxAdmin from './pages/admin/UnifiedInboxAdmin';
import CommentsReviewsAdmin from './pages/admin/CommentsReviewsAdmin';
import AdvertisingAdmin from './pages/admin/AdvertisingAdmin';
import MarketingAdmin from './pages/admin/MarketingAdmin';
import AnalyticsAdmin from './pages/admin/AnalyticsAdmin';
import StaffAdmin from './pages/admin/StaffAdmin';
import IntegrationsAdmin from './pages/admin/IntegrationsAdmin';
import SecurityAdmin from './pages/admin/SecurityAdmin';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import ActivityAdmin from './pages/admin/ActivityAdmin';
import NotificationsAdmin from './pages/admin/NotificationsAdmin';

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

          {/* 1. Super Admin Login (Standalone Entry) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Super Admin Central Control Center (Exact 19-Step Flow) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="store" element={<WebsiteAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="inventory" element={<InventoryAdmin />} />
            <Route path="customers" element={<CustomersAdmin />} />
            <Route path="payments" element={<PaymentsAdmin />} />
            <Route path="shipping" element={<ShippingAdmin />} />
            <Route path="social" element={<SocialAdmin />} />
            <Route path="social/create" element={<SocialCreatePost />} />
            <Route path="inbox" element={<UnifiedInboxAdmin />} />
            <Route path="comments-reviews" element={<CommentsReviewsAdmin />} />
            <Route path="advertising" element={<AdvertisingAdmin />} />
            <Route path="marketing" element={<MarketingAdmin />} />
            <Route path="analytics" element={<AnalyticsAdmin />} />
            <Route path="staff" element={<StaffAdmin />} />
            <Route path="integrations" element={<IntegrationsAdmin />} />
            <Route path="security" element={<SecurityAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
            <Route path="activity" element={<ActivityAdmin />} />
            <Route path="notifications" element={<NotificationsAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
