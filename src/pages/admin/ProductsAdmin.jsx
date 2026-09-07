import React, { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Search, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function ProductsAdmin() {
  const { products, addProduct, updateProduct, deleteProduct, duplicateProduct } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Equipment',
    price: 49.99,
    comparePrice: 59.99,
    description: '',
    inventory: 50,
    lowStockThreshold: 10,
    sizes: ['M', 'L'],
    images: ['/cleanwalk_hero_1788608476478.png']
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      sku: `CW-${Math.floor(100 + Math.random() * 900)}`,
      category: 'Equipment',
      price: 49.99,
      comparePrice: 59.99,
      description: '',
      inventory: 50,
      lowStockThreshold: 10,
      sizes: ['M', 'L'],
      images: ['/cleanwalk_hero.png']
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      sku: prod.sku,
      category: prod.category,
      price: prod.price,
      comparePrice: prod.comparePrice || '',
      description: prod.description,
      inventory: prod.inventory,
      lowStockThreshold: prod.lowStockThreshold,
      sizes: prod.sizes || ['Standard'],
      images: prod.images || ['/cleanwalk_hero_1788608476478.png']
    });
    setModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setModalOpen(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Product Catalog CRUD</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage catalog items, pricing, SKU codes & stock limits</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl transition-all shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> + ADD PRODUCT
        </button>
      </div>

      {/* Search */}
      <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product name or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
        <table className="w-full text-xs text-left min-w-[700px]">
          <thead className="bg-zinc-950 text-amber-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-10 h-10 object-cover rounded-lg bg-zinc-950 border border-zinc-800 shrink-0"
                  />
                  <div>
                    <div className="font-bold text-white">{prod.name}</div>
                    <div className="text-[10px] text-zinc-500">{prod.sizes ? prod.sizes.join(', ') : 'Standard'}</div>
                  </div>
                </td>
                <td className="p-4 font-mono text-zinc-400">{prod.sku}</td>
                <td className="p-4 text-zinc-400">{prod.category}</td>
                <td className="p-4 font-bold text-white">${prod.price.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`font-bold ${prod.inventory <= prod.lowStockThreshold ? 'text-amber-400' : 'text-white'}`}>
                    {prod.inventory} units
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                      prod.status === 'In Stock'
                        ? 'bg-emerald-400/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-400/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {prod.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg"
                      title="Edit"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => duplicateProduct(prod.id)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(prod.id)}
                      className="p-1.5 bg-red-950/60 hover:bg-red-900 text-red-400 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? 'Edit Product Details' : 'Add New Product'}
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="text-zinc-300 font-semibold">Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold">SKU Code *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-semibold">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
              >
                <option value="Equipment">Equipment</option>
                <option value="Accessories">Accessories</option>
                <option value="Leashes & Harnesses">Leashes & Harnesses</option>
                <option value="Care">Care</option>
                <option value="Apparel">Apparel</option>
                <option value="Bundles">Bundles</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-semibold">Compare Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.comparePrice}
                onChange={(e) => setFormData({ ...formData, comparePrice: parseFloat(e.target.value) || 0 })}
                className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold">Inventory Level</label>
              <input
                type="number"
                value={formData.inventory}
                onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-semibold">Low Stock Threshold</label>
              <input
                type="number"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: parseInt(e.target.value) || 0 })}
                className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-300 font-semibold">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mt-1 p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-400 text-black font-extrabold text-xs rounded-xl hover:bg-amber-300 transition-colors mt-4"
          >
            Save Product
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Product Deletion"
      >
        <div className="space-y-4 text-xs">
          <p className="text-zinc-300">
            Are you sure you want to delete this product? This action will remove it from the catalog.
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteProduct(deleteConfirmId);
                setDeleteConfirmId(null);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
