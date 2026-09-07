import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Star, ShoppingBag, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ShopPage() {
  const { products, addToCart } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Categories extraction
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  // Filtering logic
  let filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSize = selectedSize === 'All' || (p.sizes && p.sizes.includes(selectedSize));
    const matchesStock = !inStockOnly || p.inventory > 0;
    return matchesSearch && matchesCat && matchesSize && matchesStock;
  });

  // Sorting logic
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
            NARAN PETCARE CATALOG
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Luxury Dog Walking Equipment
          </h1>
          <p className="text-xs text-zinc-400 mt-2">
            Showing {filtered.length} of {products.length} premium items
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-zinc-400 font-medium">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Main Grid + Filter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 h-fit">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider pb-4 border-b border-zinc-800">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>Filter Products</span>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Search</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Category</label>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs text-left py-1.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Size</label>
            <div className="flex flex-wrap gap-2">
              {['All', 'S', 'M', 'L', 'XL', 'Standard'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedSize === sz
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-2 border-t border-zinc-800/80">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded bg-zinc-950 border-zinc-800 text-amber-400 focus:ring-0"
              />
              <span className="text-xs text-zinc-300 font-medium">In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 border border-zinc-900 rounded-2xl space-y-4">
              <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No products found</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try resetting your filters or search terms to explore our luxury catalog.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedSize('All');
                  setInStockOnly(false);
                }}
                className="px-4 py-2 bg-amber-400 text-black text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all flex flex-col group"
                >
                  {/* Image Container */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="relative aspect-square bg-zinc-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-amber-400 font-bold border border-zinc-800">
                      {product.category}
                    </div>

                    {product.inventory <= 0 && (
                      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center text-red-400 font-bold text-xs">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold">{product.rating}</span>
                          <span className="text-zinc-500">({product.reviewCount})</span>
                        </div>
                        <span className="text-[10px] text-zinc-500">{product.sku}</span>
                      </div>

                      <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="text-sm font-bold text-white hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-light">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-extrabold text-white">${product.price.toFixed(2)}</div>
                        {product.comparePrice && (
                          <div className="text-[10px] text-zinc-500 line-through">
                            ${product.comparePrice.toFixed(2)}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product, product.sizes ? product.sizes[0] : 'Standard', 1)}
                        disabled={product.inventory <= 0}
                        className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 disabled:bg-zinc-800 disabled:text-zinc-600 text-black text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
