import React, { useState } from 'react';
import { ShieldCheck, UserCheck, RefreshCw, Lock, Check, ShieldAlert, Sliders } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function StaffAdmin() {
  const { staff, currentRole, setCurrentRole, rolesPermissions, updateRolePermissions, showToast } = useApp();

  const allModules = [
    'Main Dashboard',
    'Website / Store',
    'Products',
    'Orders',
    'Inventory',
    'Customers / CRM',
    'Payments & Refunds',
    'Shipping & Tracking',
    'Social Media',
    'Unified Inbox',
    'Comments & Reviews',
    'Advertising',
    'Marketing',
    'Analytics & Reports',
    'Staff / Roles & Permissions',
    'Integrations',
    'Security & Activity Logs',
    'Settings'
  ];

  const configurableRoles = [
    'Admin',
    'Inventory Manager',
    'Marketing Manager',
    'Customer Support',
    'Order Manager',
    'Social Media Manager'
  ];

  const handleToggleModulePermission = (role, moduleName) => {
    if (role === 'Super Admin') {
      showToast('Super Admin authority is absolute and cannot be restricted.', 'error');
      return;
    }
    const currentList = rolesPermissions?.[role] || [];
    let updated;
    if (currentList.includes(moduleName)) {
      updated = currentList.filter((m) => m !== moduleName);
    } else {
      updated = [...currentList, moduleName];
    }
    updateRolePermissions(role, updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Staff / Roles & Permissions Matrix</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Super Admin has the highest level of authority. Configure dynamic authorization permissions for all staff roles below.
          </p>
        </div>
      </div>

      {/* Role Simulator Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-amber-950/40 border border-amber-500/30 p-6 rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
            <RefreshCw className="w-4 h-4" /> Active Role Simulator (RBAC Enforcer)
          </div>
          <span className="text-[10px] bg-amber-400 text-black px-2.5 py-0.5 rounded font-extrabold">
            Active: {currentRole}
          </span>
        </div>
        <p className="text-xs text-zinc-300">
          Switch active role to test how authorized areas adapt dynamically. Non-Super Admin roles are strictly blocked from unauthorized modules.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Super Admin', 'Social Media Manager', 'Order Manager', 'Inventory Manager'].map((role) => (
            <button
              key={role}
              onClick={() => {
                setCurrentRole(role);
                showToast(`Switched active RBAC role to: ${role}`);
              }}
              className={`p-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                currentRole === role
                  ? 'bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20 font-black'
                  : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:text-white'
              }`}
            >
              <div>{role}</div>
              <div className="text-[10px] font-normal opacity-80 mt-0.5">
                {role === 'Super Admin' ? 'Highest Authority' : 'Restricted Role'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Authorization Permission Matrix */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> Super Admin Authorization Matrix
            </h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Super Admin manages which exact modules each team role is authorized to access.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-bold text-white">Module Name</th>
                <th className="py-3.5 px-4 text-amber-400 font-extrabold text-center">Super Admin</th>
                {configurableRoles.map((r) => (
                  <th key={r} className="py-3.5 px-4 text-center text-zinc-200">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {allModules.map((moduleName) => (
                <tr key={moduleName} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">{moduleName}</td>
                  
                  {/* Super Admin Always Allowed */}
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 border border-amber-500/30">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </td>

                  {/* Configurable Roles */}
                  {configurableRoles.map((role) => {
                    const isAllowed = rolesPermissions?.[role]?.includes(moduleName);
                    return (
                      <td key={role} className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleModulePermission(role, moduleName)}
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-lg transition-all cursor-pointer border ${
                            isAllowed
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                          }`}
                        >
                          {isAllowed ? <Check className="w-3.5 h-3.5" /> : <Lock className="w-3 h-3" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-zinc-800 text-xs font-bold text-white uppercase tracking-wider">
          Staff Members Directory
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Authority Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {staff.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{member.name}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{member.email}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-semibold ${member.role === 'Super Admin' ? 'text-amber-400 font-extrabold' : 'text-zinc-200'}`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                      member.role === 'Super Admin'
                        ? 'bg-amber-400/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}>
                      {member.role === 'Super Admin' ? 'Highest Level Authority' : 'Authorized Role'}
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
