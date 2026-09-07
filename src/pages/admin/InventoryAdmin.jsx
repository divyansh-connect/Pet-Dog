import React, { useState } from 'react';
import { Layers, Sliders, AlertTriangle, Plus, Minus, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/common/Modal';

export default function InventoryAdmin() {
  const { products, adjustStock } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [adjustModalProduct, setAdjustModalProduct] = useState(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState(10);
  const [reason, setReason] = useState('Restock / Shipment Arrival');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveAdjustment = (e) => {
    e.preventDefault();
    if (!adjustModalProduct) return;
    adjustStock(adjustModalProduct.id, adjustmentAmount, reason);
    setAdjustModalProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Inventory Control</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time stock auditing, low stock alerts & inventory adjustments</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl">
          <div className="text-[10px] text-zinc-400 font-semibold uppercase">Total SKU Count</div>
          <div className="text-2xl font-extrabold text-white">{products.length}</div>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl">
          <div className="text-[10px] text-zinc-400 font-semibold uppercase">Total Stock Quantity</div>
          <div className="text-2xl font-extrabold text-white">
            {products.reduce((sum, p) => sum + p.inventory, 0)} units
          </div>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl">
          <div className="text-[10px] text-amber-400 font-semibold uppercase">Low Stock Alerts</div>
          <div className="text-2xl font-extrabold text-amber-400">
            {products.filter((p) => p.inventory <= p.lowStockThreshold).length}
          </div>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl">
          <div className="text-[10px] text-red-400 font-semibold uppercase">Critical / Out of Stock</div>
          <div className="text-2xl font-extrabold text-red-400">
            {products.filter((p) => p.inventory === 0).length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inventory by product or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
        <table className="w-full text-xs text-left min-w-[650px]">
          <thead className="bg-zinc-950 text-amber-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">Product</th>
              <th className="p-4">Available</th>
              <th className="p-4">Threshold</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Stock Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4 font-mono text-zinc-400">{p.sku}</td>
                <td className="p-4 font-bold text-white">{p.name}</td>
                <td className="p-4 font-extrabold text-white">{p.inventory} units</td>
                <td className="p-4 text-zinc-400">{p.lowStockThreshold} units</td>
                <td className="p-4">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                      p.inventory === 0
                        ? 'bg-red-950 text-red-400 border-red-800'
                        : p.inventory <= p.lowStockThreshold
                        ? 'bg-amber-400/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-400/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      setAdjustModalProduct(p);
                      setAdjustmentAmount(10);
                      setReason('Restock / Shipment Arrival');
                    }}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-xl transition-all shadow-md inline-flex items-center gap-1"
                  >
                    <Sliders className="w-3.5 h-3.5" /> Adjust Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adjust Stock Modal */}
      <Modal
        isOpen={!!adjustModalProduct}
        onClose={() => setAdjustModalProduct(null)}
        title="Adjust Inventory Quantity"
      >
        {adjustModalProduct && (
          <form onSubmit={handleSaveAdjustment} className="space-y-4 text-xs">
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
              <div className="font-bold text-white">{adjustModalProduct.name}</div>
              <div className="text-[10px] text-zinc-500 font-mono">SKU: {adjustModalProduct.sku}</div>
              <div className="text-xs text-amber-400 font-semibold pt-1">
                Current Stock: {adjustModalProduct.inventory} units
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Stock Adjustment (+ or -)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  required
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(parseInt(e.target.value) || 0)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white font-mono"
                  placeholder="e.g. 20 or -5"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Reason for Adjustment</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white"
              >
                <option value="Restock / Shipment Arrival">Restock / Shipment Arrival (+)</option>
                <option value="Damaged Stock / Spoilage">Damaged Stock / Spoilage (-)</option>
                <option value="Customer Return">Customer Return (+)</option>
                <option value="Inventory Audit Correction">Inventory Audit Correction</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-400 text-black font-extrabold text-xs rounded-xl hover:bg-amber-300 transition-colors mt-2"
            >
              Save Adjustment & Audit Log
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
