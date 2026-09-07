import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Plus, Minus, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function CartPage() {
  const { cart, updateCartQty, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0.00 : 15.00;
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-amber-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Your Cart is Empty</h1>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Explore the NARAN PETCARE catalog to discover the luxury CleanWalk™ system and accessories.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-extrabold text-xs rounded-xl hover:bg-amber-300 transition-colors shadow-lg"
        >
          <span>Explore Shop</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white">Shopping Cart</h1>
          <p className="text-xs text-zinc-400 mt-1">Review your luxury pet care selections</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-zinc-500 hover:text-red-400 transition-colors underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="bg-zinc-900/60 border border-zinc-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image || '/cleanwalk_hero_1788608476478.png'}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-zinc-950 border border-zinc-800 shrink-0"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <div className="text-xs text-amber-400 mt-1 font-semibold">
                    Size: {item.size}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">${item.price.toFixed(2)} each</div>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
                  <button
                    onClick={() => updateCartQty(item.productId, item.size, item.quantity - 1)}
                    className="p-1.5 text-zinc-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQty(item.productId, item.size, item.quantity + 1)}
                    className="p-1.5 text-zinc-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="text-[10px] text-zinc-500 hover:text-red-400 flex items-center gap-1 mt-1 ml-auto"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-amber-400 font-medium pt-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        {/* Dynamic Order Summary Box */}
        <div className="bg-zinc-900/60 border border-zinc-800 p-6 rounded-3xl space-y-6 h-fit">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-zinc-300">
              <span>Subtotal</span>
              <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-zinc-300">
              <span>Shipping</span>
              <span className="font-semibold text-amber-400">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-zinc-300">
              <span>Estimated Tax (8%)</span>
              <span className="font-semibold text-white">${tax.toFixed(2)}</span>
            </div>

            <div className="border-t border-zinc-800 pt-3 flex justify-between text-sm font-extrabold text-white">
              <span>Total</span>
              <span className="text-amber-400 text-base">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Encrypted & Compliant Prototype Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
