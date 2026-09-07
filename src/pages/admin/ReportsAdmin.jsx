import React, { useState } from 'react';
import { BarChart3, Download, Calendar, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ReportsAdmin() {
  const { orders, products, customers } = useApp();
  const [reportType, setReportType] = useState('Sales');
  const [dateFilter, setDateFilter] = useState('30 Days');

  // Export CSV generator
  const exportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    if (reportType === 'Sales' || reportType === 'Orders') {
      csvContent += 'Order ID,Customer,Channel,Amount,Payment,Status,Date\n';
      orders.forEach((o) => {
        csvContent += `"${o.id}","${o.customer.name}","${o.channel}",${o.total},"${o.paymentStatus}","${o.status}","${o.date}"\n`;
      });
    } else {
      csvContent += 'SKU,Product Name,Category,Price,Stock,Status\n';
      products.forEach((p) => {
        csvContent += `"${p.sku}","${p.name}","${p.category}",${p.price},${p.inventory},"${p.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `naran_report_${reportType.toLowerCase()}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Business Intelligence Reports</h1>
          <p className="text-xs text-zinc-400 mt-1">Generate performance metrics and export raw data CSV files</p>
        </div>

        <button
          onClick={exportCSV}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold rounded-xl transition-all shadow-lg flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> EXPORT REPORT (CSV)
        </button>
      </div>

      {/* Date & Report Type Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['Sales', 'Orders', 'Customers', 'Products', 'Inventory', 'Social Media', 'Marketing'].map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                reportType === type
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 text-xs text-white rounded-xl px-3 py-2"
          >
            <option value="Today">Today</option>
            <option value="7 Days">7 Days</option>
            <option value="30 Days">30 Days</option>
            <option value="90 Days">90 Days</option>
          </select>
        </div>
      </div>

      {/* Visual Analytics Box */}
      <div className="bg-zinc-900/60 border border-zinc-800 p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-lg font-serif font-bold text-white">{reportType} Analytics Summary ({dateFilter})</h2>
          <span className="text-xs text-amber-400 font-mono">Live Computed Metrics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Total Revenue</div>
            <div className="text-3xl font-extrabold text-white mt-1">
              ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </div>
          </div>

          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Total Orders Processed</div>
            <div className="text-3xl font-extrabold text-amber-400 mt-1">{orders.length}</div>
          </div>

          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800">
            <div className="text-xs text-zinc-400 uppercase font-semibold">Average Order Value</div>
            <div className="text-3xl font-extrabold text-white mt-1">
              ${(orders.reduce((sum, o) => sum + o.total, 0) / (orders.length || 1)).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
