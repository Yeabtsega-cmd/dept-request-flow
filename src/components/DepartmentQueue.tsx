import React from 'react';
import { Check, X, Shield, Star, Award, Smartphone, Send } from 'lucide-react';
import { Request, Role } from '../types';
import { toast } from 'sonner';

interface DepartmentQueueProps {
  requests: Request[];
  role: Role;
  onUpdateStatus: (id: string, status: any) => void;
}

const DepartmentQueue: React.FC<DepartmentQueueProps> = ({ requests, role, onUpdateStatus }) => {
  const getRoleBadge = (role: Role) => {
    switch (role) {
      case 'Head': 
        return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border border-amber-200"><Award size={14} /> Head of Department</span>;
      case 'Senior': 
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border border-blue-200"><Star size={14} /> Senior Administrator</span>;
      case 'Associate': 
        return <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border border-slate-200"><Shield size={14} /> Associate Executive</span>;
      default: 
        return <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-black">Employee</span>;
    }
  };

  const handleAction = (id: string, status: string, agentName?: string, idType?: string) => {
    onUpdateStatus(id, status);
    if (status === 'Completed') {
      toast.success(`Request completed!`, {
        description: `SMS notification sent to requester and agent.`,
        duration: 5000,
        icon: <Smartphone className="text-blue-500" />
      });
      
      // Simulating the "system will automatically send the necessary information"
      if (agentName) {
        setTimeout(() => {
          toast.info(`[AUTO-SMS] ${agentName}: Your ${idType} ID is ready for pickup at Admin.`, {
            icon: <Send size={16} className="text-emerald-500" />,
            duration: 6000
          });
        }, 2000);
      }
    } else if (status === 'Rejected') {
      toast.error('Request rejected', {
        description: 'Requester has been notified.'
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Department Inbox</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-slate-500">Current Role:</span>
            {getRoleBadge(role)}
          </div>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex shadow-sm min-w-max">
            <button className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg transition-all">All Tasks</button>
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 rounded-lg transition-all">Pending</button>
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 rounded-lg transition-all">Archive</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {requests.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-[2rem] p-20 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="bg-slate-50 p-6 rounded-full mb-6 ring-8 ring-slate-50/50">
              <Shield size={64} className="text-slate-200" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Queue is empty</h3>
            <p className="text-slate-500 max-w-sm mt-3 font-medium text-lg">You've cleared all requests for today. Check back later for new updates.</p>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-2 h-full ${
                request.priority === 'High' ? 'bg-red-500' : 
                request.priority === 'Medium' ? 'bg-orange-400' : 
                'bg-slate-200'
              }`} />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                    request.priority === 'High' ? 'bg-red-50 text-red-600 border border-red-100' : 
                    request.priority === 'Medium' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 
                    'bg-slate-50 text-slate-600 border border-slate-100'
                  }`}>
                    {request.priority} Priority
                  </span>
                  <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="text-xs text-slate-400 font-bold">{new Date(request.createdAt).toLocaleString()}</span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 flex flex-wrap items-center gap-3 mb-2">
                  {request.title}
                  {request.metadata?.idType && (
                    <span className={`text-[11px] px-3 py-1 rounded-full font-bold shadow-sm ${
                      request.metadata.idType === 'Permanent' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-blue-50 text-blue-700 border border-blue-100'
                    }`}>
                      {request.metadata.idType} Card
                    </span>
                  )}
                </h3>
                
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  {request.description || `Automated request for agent ID generation.`}
                  {request.metadata?.agentName && (
                    <span className="block mt-2 text-sm text-slate-400">
                      Target: <span className="text-slate-900 font-bold">{request.metadata.agentName}</span> • Joined {new Date(request.metadata.agentJoinDate!).toLocaleDateString()}
                    </span>
                  )}
                </p>
                
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-black text-slate-500 shadow-inner">
                      {request.requesterName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Requested By</p>
                      <p className="text-sm font-black text-slate-800">{request.requesterName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 w-full lg:w-auto">
                {request.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleAction(request.id, 'Rejected')}
                      className="flex-1 lg:flex-none h-14 w-14 flex items-center justify-center rounded-2xl border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                    >
                      <X size={24} />
                    </button>
                    <button 
                      onClick={() => handleAction(request.id, 'Completed', request.metadata?.agentName, request.metadata?.idType)}
                      className="flex-[3] lg:flex-none flex items-center justify-center gap-3 px-10 h-14 rounded-2xl bg-slate-900 text-white font-black hover:bg-blue-600 shadow-lg shadow-slate-200 hover:shadow-blue-200 transition-all duration-300"
                    >
                      <Check size={24} strokeWidth={3} />
                      Approve & Process
                    </button>
                  </>
                )}
                {request.status === 'Completed' && (
                  <div className="flex items-center gap-3 text-emerald-600 font-black bg-emerald-50 px-8 py-4 rounded-2xl border border-emerald-100 shadow-sm shadow-emerald-100/50">
                    <Check size={24} strokeWidth={3} />
                    Successfully Processed
                  </div>
                )}
                {request.status === 'Rejected' && (
                  <div className="flex items-center gap-3 text-red-600 font-black bg-red-50 px-8 py-4 rounded-2xl border border-red-100 shadow-sm shadow-red-100/50">
                    <X size={24} strokeWidth={3} />
                    Request Rejected
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DepartmentQueue;