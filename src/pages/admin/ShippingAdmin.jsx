import React, { useState } from 'react';
import { Truck, Package, MapPin, Search, CheckCircle2, Clock, ExternalLink, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ShippingAdmin() {
  const { showToast, logActivity } = useApp();
  const [searchTracking, setSearchTracking] = useState('');

  const shippingCarriers = [
    { name: 'FedEx Express', code: 'FEDEX', activeShipments: 14, status: 'Connected', apiLatency: '42ms' },
    { name: 'UPS Worldwide', code: 'UPS', activeShipments: 9, status: 'Connected', apiLatency: '38ms' },
    { name: 'DHL Express Global', code: 'DHL', activeShipments: 6, status: 'Connected', apiLatency: '55ms' }
  ];

  const [shipments, setShipments] = useState([
    { id: 'shp-1001', orderId: 'NARAN-1024', customer: 'Victoria Sterling', destination: 'New York, NY', carrier: 'FedEx Express', trackingNumber: 'FX-88992011', status: 'In Transit', estimatedDelivery: '2026-09-08' },
    { id: 'shp-1002', orderId: 'NARAN-1023', customer: 'Marcus Vance', destination: 'Los Angeles, CA', carrier: 'UPS Worldwide', trackingNumber: '1Z99999999', status: 'Delivered', estimatedDelivery: '2026-09-06' },
    { id: 'shp-1003', orderId: 'NARAN-1022', customer: 'Elena Rostova', destination: 'San Francisco, CA', carrier: 'FedEx Express', trackingNumber: 'FX-44331100', status: 'Delivered', estimatedDelivery: '2026-09-05' },
    { id: 'shp-1004', orderId: 'NARAN-1021', customer: 'Harrison Forde', destination: 'Chicago, IL', carrier: 'DHL Express', trackingNumber: 'DHL-9922001', status: 'Label Created', estimatedDelivery: '2026-09-09' }
  ]);

  const filteredShipments = shipments.filter(
    (s) =>
      s.orderId.toLowerCase().includes(searchTracking.toLowerCase()) ||
      s.trackingNumber.toLowerCase().includes(searchTracking.toLowerCase()) ||
      s.customer.toLowerCase().includes(searchTracking.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <Truck className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Shipping & Tracking Management</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Super Admin shipping carrier dispatch, package status tracking, rate rules, and label generation.
          </p>
        </div>
      </div>

      {/* Carrier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {shippingCarriers.map((carrier) => (
          <div key={carrier.name} className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">{carrier.name}</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                {carrier.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-white font-serif">{carrier.activeShipments}</div>
                <div className="text-[11px] text-zinc-400">Active Shipments</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-amber-400">{carrier.apiLatency}</div>
                <div className="text-[10px] text-zinc-500">API Health</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Shipments Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl space-y-4 p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">Live Package Dispatch Directory</h2>
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search order ID or tracking #..."
              value={searchTracking}
              onChange={(e) => setSearchTracking(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Carrier</th>
                <th className="py-3 px-4">Tracking Number</th>
                <th className="py-3 px-4">Est. Delivery</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredShipments.map((shp) => (
                <tr key={shp.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{shp.orderId}</td>
                  <td className="py-3.5 px-4 text-zinc-200">{shp.customer}</td>
                  <td className="py-3.5 px-4 text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>{shp.destination}</span>
                  </td>
                  <td className="py-3.5 px-4">{shp.carrier}</td>
                  <td className="py-3.5 px-4 font-mono text-amber-400 font-semibold">{shp.trackingNumber}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{shp.estimatedDelivery}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      shp.status === 'Delivered'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : shp.status === 'In Transit'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-500/30'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}>
                      {shp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
