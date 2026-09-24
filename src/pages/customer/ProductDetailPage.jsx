import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Check, ShoppingBag, ArrowRight, Minus, Plus, Box, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import ProductSpecificationSection from '../../components/common/ProductSpecificationSection';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, showToast } = useApp();

  // If URL is /product/cleanwalk, route to flagship prod-1
  const targetId = id === 'cleanwalk' ? 'prod-1' : id || 'prod-1';
  const product = products.find((p) => p.id === targetId) || products[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [selectedImage, setSelectedImage] = useState(product.images ? product.images[0] : '');
  const [quantity, setQuantity] = useState(1);

  // Sync image if product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes ? product.sizes[0] : 'Standard');
      setSelectedImage(product.images ? product.images[0] : '');
      setQuantity(1);
    }
  }, [product]);

  const handleQuantityChange = (delta) => {
    const nextQty = quantity + delta;
    if (nextQty < 1) return;
    if (nextQty > product.inventory) {
      showToast(`Cannot select more than available stock (${product.inventory})`, 'error');
      return;
    }
    setQuantity(nextQty);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Top Product Hero Grid */}
      <div className={`grid grid-cols-1 ${product.images && product.images.length > 0 ? 'lg:grid-cols-2' : 'max-w-3xl mx-auto'} gap-12 items-start`}>
        {/* Gallery */}
        {product.images && product.images.length > 0 && (
          <div className="space-y-4">
            <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.inventory <= 0 && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-red-400 font-extrabold text-sm">
                  OUT OF STOCK
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImage === img ? 'border-amber-400 scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Details & Specs */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              <span>{product.category}</span>
              <span>•</span>
              <span className="text-zinc-400 font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="font-bold ml-1 text-white">{product.rating}</span>
                <span className="text-zinc-500">({product.reviewCount} Reviews)</span>
              </div>

              <div className="h-4 w-px bg-zinc-800" />

              <div className="flex items-center gap-1.5 font-medium">
                {product.inventory > 10 ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> In Stock ({product.inventory} available)
                  </span>
                ) : product.inventory > 0 ? (
                  <span className="text-amber-400 font-bold">
                    Low Stock ({product.inventory} left)
                  </span>
                ) : (
                  <span className="text-red-400 font-bold">Out of Stock</span>
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-white">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="text-base text-zinc-500 line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
            {product.comparePrice && (
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-500/20 px-2 py-0.5 rounded">
                Save ${(product.comparePrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white uppercase tracking-wider">Select Size</span>
                <span className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedSize === size
                        ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/10'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    Size {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-3 pt-4 border-t border-zinc-900">
            <span className="text-xs font-semibold text-white uppercase tracking-wider block">Quantity</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-white">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-zinc-500">
                Max per order: {product.inventory} units
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            <button
              onClick={handleAddToCart}
              disabled={product.inventory <= 0}
              className="py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>ADD TO CART</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.inventory <= 0}
              className="py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:scale-[1.02] text-black font-extrabold text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>BUY NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Technical Information & Full Client Specification Sheet */}
      <ProductSpecificationSection />
    </div>
  );
}
