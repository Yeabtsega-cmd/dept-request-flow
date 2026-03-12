import React, { useState } from 'react';
import { X, UserPlus, Info, Calendar } from 'lucide-react';
import { Department, IDType } from '../types';
import { toast } from 'sonner';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const RequestModal: React.FC<RequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [department, setDepartment] = useState<Department>('Admin');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    agentName: '',
    agentJoinDate: '',
    priority: 'Medium' as const
  });

  if (!isOpen) return null;

  const calculateIDType = (joinDate: string): IDType => {
    const joined = new Date(joinDate);
    const now = new Date();
    const diffMonths = (now.getFullYear() - joined.getFullYear()) * 12 + (now.getMonth() - joined.getMonth());
    return diffMonths < 2 ? 'Temporary' : 'Permanent';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let metadata = {};
    if (department === 'Admin' && formData.agentName && formData.agentJoinDate) {
      const idType = calculateIDType(formData.agentJoinDate);
      metadata = {
        agentName: formData.agentName,
        agentJoinDate: formData.agentJoinDate,
        idType
      };
      toast.success(`Request created! Auto-assigned ${idType} ID status based on join date.`);
    }

    onSubmit({
      ...formData,
      targetDepartment: department,
      metadata,
      title: department === 'Admin' ? `New ID Request: ${formData.agentName}` : formData.title
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Create New Request</h2>
            <p className="text-sm text-slate-500 font-medium">Send a request to any department</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Target Department</label>
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value as Department)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="Admin">Admin (ID Cards, Supplies)</option>
                <option value="HR">HR (Leaves, Benefits)</option>
                <option value="IT">IT (Software, Hardware)</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Priority</label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {department === 'Admin' ? (
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 space-y-4">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                <UserPlus size={18} />
                <span>Agent ID Details</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-blue-600 uppercase mb-1">Agent Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. John Doe"
                    value={formData.agentName}
                    onChange={(e) => setFormData({...formData, agentName: e.target.value})}
                    className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-600 uppercase mb-1">Join Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      required
                      value={formData.agentJoinDate}
                      onChange={(e) => setFormData({...formData, agentJoinDate: e.target.value})}
                      className="w-full bg-white border border-blue-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-start mt-2">
                <Info size={14} className="text-blue-500 mt-0.5" />
                <p className="text-[11px] text-blue-600 leading-relaxed font-medium">
                  System logic: Agents joined within 2 months get Temporary IDs. Others get Permanent IDs. This is automatically determined upon submission.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Request Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Summarize your request"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Provide more context..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>
            </>
          )}

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;