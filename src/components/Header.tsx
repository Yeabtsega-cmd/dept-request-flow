import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { CURRENT_USER } from '../store/mockData';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search requests, members, tasks..." 
          className="bg-transparent border-none outline-none ml-2 text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-100 rounded-full relative transition-colors"
          >
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <h3 className="font-bold text-slate-800 mb-3 px-1">Notifications</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs font-semibold text-blue-600 mb-1">Request Update</p>
                  <p className="text-sm text-slate-700">Your ID request for John Doe has been received.</p>
                  <p className="text-[10px] text-slate-400 mt-2">2 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                  <p className="text-xs font-semibold text-slate-500 mb-1">Team Alert</p>
                  <p className="text-sm text-slate-700">New maintenance request from IT department.</p>
                  <p className="text-[10px] text-slate-400 mt-2">1 hour ago</p>
                </div>
              </div>
              <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:underline">View all notifications</button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800">{CURRENT_USER.name}</p>
            <p className="text-[11px] text-slate-500 font-medium">{CURRENT_USER.department} • {CURRENT_USER.role}</p>
          </div>
          <img 
            src={CURRENT_USER.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;