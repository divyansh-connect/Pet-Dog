import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Truck, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CheckoutPage() {
  const { cart, placeOrder, customerUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: customerUser?.name ? customerUser.name.split(' ')[0] : 'Victoria',
    lastName: customerUser?.name && customerUser.name.split(' ').length > 1 ? customerUser.name.split(' ').slice(1).join(' ') : 'Sterling',
    email: customerUser?.email || 'victoria@example.com',
    phone: customerUser?.phone || '+1 (555) 234-5678',
    street: customerUser?.address ? customerUser.address.split(',')[0] : '740 Park Ave, Apt 12B',
    city: 'New York',
    state: 'NY',
    zip: '10021',
    country: 'United States',
    cardNumber: '4532 •••• •••• 8892',
    cardExp: '12/28',
    cardCvc: '884'
  });

  const [errors, setErrors] = useState({});
  const [completedOrderNum, setCompletedOrderNum] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0.00 : 15.00;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.street.trim()) newErrors.street = 'Street address required';
    if (!formData.city.trim()) newErrors.city = 'City required';
    if (!formData.state.trim()) newErrors.state = 'State required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const generatedNum = placeOrder(formData);
    if (generatedNum) {
      setCompletedOrderNum(generatedNum);
    }
  };

  // Render Confirmation Screen
  if (completedOrderNum) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-amber-400/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">Order Successfully Placed</h1>
        <p className="text-sm text-zinc-300">
          Thank you for choosing NARAN PETCARE. Your order confirmation is <span className="text-amber-400 font-extrabold">{completedOrderNum}</span>.
        </p>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl max-w-md mx-auto text-left text-xs space-y-3">
          <div className="flex justify-between border-b border-zinc-800 pb-2 text-zinc-400 font-semibold">
            <span>Order Reference</span>
            <span className="text-white font-bold">{completedOrderNum}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800 pb-2 text-zinc-400">
            <span>Customer</span>
            <span className="text-white">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Shipping Address</span>
            <span className="text-white">{formData.city}, {formData.state}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/account"
            className="px-6 py-3 bg-amber-400 text-black font-extrabold text-xs rounded-xl hover:bg-amber-300 transition-all shadow-lg"
          >
            View Customer Orders
          </Link>
          <Link
            to="/admin/orders"
            className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-amber-400 font-bold text-xs rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Inspect Order in Admin Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
        <Link to="/shop" className="text-amber-400 text-xs font-bold underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white">Checkout</h1>
        <p className="text-xs text-zinc-400 mt-1">Complete your order details</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Form Columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Customer Info */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              1. Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-300 font-medium">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.firstName && <span className="text-[10px] text-red-400 mt-1 block">{errors.firstName}</span>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.lastName && <span className="text-[10px] text-red-400 mt-1 block">{errors.lastName}</span>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.email && <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              2. Shipping Address
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-300 font-medium">Street Address *</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.street && <span className="text-[10px] text-red-400 mt-1 block">{errors.street}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-zinc-300 font-medium">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                  {errors.city && <span className="text-[10px] text-red-400 mt-1 block">{errors.city}</span>}
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-medium">State / Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                  {errors.state && <span className="text-[10px] text-red-400 mt-1 block">{errors.state}</span>}
                </div>

                <div>
                  <label className="text-xs text-zinc-300 font-medium">ZIP Code *</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                  {errors.zip && <span className="text-[10px] text-red-400 mt-1 block">{errors.zip}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Payment UI */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              3. Payment Details (Mock)
            </h2>

            <div className="p-4 bg-amber-400/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
              Prototype Mode: Payment fields are pre-filled with demo mock values. No real credit card will be charged.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs text-zinc-300 font-medium">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full mt-1 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium">Expiry / CVC</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    name="cardExp"
                    value={formData.cardExp}
                    onChange={handleChange}
                    className="w-1/2 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                  />
                  <input
                    type="text"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleChange}
                    className="w-1/2 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary & Place Order Button */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-6 h-fit">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Review Order
          </h2>

          <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex justify-between text-xs text-zinc-300">
                <div>
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-[10px] text-amber-400">Qty: {item.quantity} | Size: {item.size}</div>
                </div>
                <div className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-zinc-800 pt-4 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span className="text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Shipping</span>
              <span className="text-amber-400 font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>Tax (8%)</span>
              <span className="text-white">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-zinc-800 pt-3 text-sm font-extrabold text-white">
              <span>Grand Total</span>
              <span className="text-amber-400 text-base">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <span>PLACE ORDER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
