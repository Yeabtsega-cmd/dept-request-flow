import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { Request } from '../types';
import { motion } from 'framer-motion';

interface DashboardOverviewProps {
  requests: Request[];
  onCreateRequest: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ requests, onCreateRequest }) => {
  const stats = [
    { label: 'Active Requests', value: requests.filter(r => r.status === 'Pending').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Completed', value: requests.filter(r => r.status === 'Completed').length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Average Time', value: '4.2h', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Departments', value: '4', icon: AlertCircle, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <button 
          onClick={onCreateRequest}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          <Plus size={20} strokeWidth={3} />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                +12% <ArrowUpRight size={12} />
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-semibold">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800">Recent Requests</h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title & Department</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${request.targetDepartment === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                          {request.targetDepartment === 'Admin' ? <CreditCard size={18} /> : <Calendar size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{request.title}</p>
                          <p className="text-xs text-slate-500">{request.targetDepartment} Dept</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        request.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{new Date(request.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-900 font-bold transition-colors">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <button className="w-full p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group">
              <p className="font-bold text-slate-800 group-hover:text-blue-700">Request New Agent ID</p>
              <p className="text-sm text-slate-500">Fast track ID for new team members</p>
            </button>
            <button className="w-full p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group">
              <p className="font-bold text-slate-800 group-hover:text-blue-700">Submit HR Leave</p>
              <p className="text-sm text-slate-500">Plan your time off</p>
            </button>
            <button className="w-full p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all text-left group">
              <p className="font-bold text-slate-800 group-hover:text-blue-700">IT Support Ticket</p>
              <p className="text-sm text-slate-500">Hardware or software issues</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;