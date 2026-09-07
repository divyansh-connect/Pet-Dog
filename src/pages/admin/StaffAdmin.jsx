import React, { useState } from 'react';
import { ShieldCheck, UserCheck, RefreshCw, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function StaffAdmin() {
  const { staff, currentRole, setCurrentRole, showToast } = useApp();

  const handleRoleSwitch = (role) => {
    setCurrentRole(role);
    showToast(`Switched active role to ${role}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Staff Users & Role Permissions</h1>
          <p className="text-xs text-zinc-400 mt-1">Manage team access control and test active role simulation</p>
        </div>
      </div>

      {/* Demo Role Switcher Highlight Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-amber-950/40 border border-amber-500/30 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
          <RefreshCw className="w-4 h-4" /> Live Role Permissions Simulation
        </div>
        <p className="text-xs text-zinc-300">
          Click any role below to instantly simulate permissions. For instance, selecting <span className="text-amber-300 font-semibold">Social Media Manager</span> restricts access to Staff & Settings, demonstrating the frontend access control system.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Super Admin', 'Social Media Manager', 'Order Manager', 'Inventory Manager'].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSwitch(role)}
              className={`p-3 rounded-2xl text-xs font-bold text-left transition-all border ${
                currentRole === role
                  ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:text-white'
              }`}
            >
              <div>{role}</div>
              <div className="text-[10px] font-normal opacity-80 mt-0.5">
                {currentRole === role ? 'Active Mode' : 'Click to Switch'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-x-auto shadow-2xl">
        <table className="w-full text-xs text-left min-w-[600px]">
          <thead className="bg-zinc-950 text-amber-400 uppercase border-b border-zinc-800 text-[10px] tracking-wider font-bold">
            <tr>
              <th className="p-4">Staff Member</th>
              <th className="p-4">Email</th>
              <th className="p-4">Assigned Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 text-zinc-300">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-zinc-800/40 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-amber-400 font-bold text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <span>{member.name}</span>
                </td>
                <td className="p-4 text-zinc-400">{member.email}</td>
                <td className="p-4">
                  <span className="text-amber-300 font-semibold">{member.role}</span>
                </td>
                <td className="p-4">
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    {member.status}
                  </span>
                </td>
                <td className="p-4 text-zinc-400">{member.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
