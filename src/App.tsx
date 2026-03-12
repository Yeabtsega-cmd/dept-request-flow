import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import RequestModal from './components/RequestModal';
import DepartmentQueue from './components/DepartmentQueue';
import { Toaster, toast } from 'sonner';
import { INITIAL_REQUESTS, CURRENT_USER } from './store/mockData';
import { Request } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [requests, setRequests] = useState<Request[]>(INITIAL_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    toast(`Welcome back, ${CURRENT_USER.name}!`, {
      description: "You have 3 pending requests in your inbox.",
    });
  }, []);

  const handleCreateRequest = (data: any) => {
    const newRequest: Request = {
      id: `req-${Math.random().toString(36).substr(2, 9)}`,
      requesterId: CURRENT_USER.id,
      requesterName: CURRENT_USER.name,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      ...data
    };

    setRequests([newRequest, ...requests]);
  };

  const updateRequestStatus = (id: string, status: any) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const adminRequests = requests.filter(r => r.targetDepartment === 'Admin');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Toaster 
        position="top-right" 
        expand={true} 
        richColors 
        theme="light"
        closeButton
        style={{
          borderRadius: '1.5rem',
          padding: '1rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        }}
      />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header />
        
        <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full flex-1">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              requests={requests} 
              onCreateRequest={() => setIsModalOpen(true)} 
            />
          )}

          {activeTab === 'inbox' && (
            <DepartmentQueue 
              requests={adminRequests} 
              role="Senior" 
              onUpdateStatus={updateRequestStatus}
            />
          )}

          {activeTab === 'requests' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Requests</h1>
                  <p className="text-slate-500 mt-2 font-medium">Track and manage the requests you've submitted.</p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {requests.filter(r => r.requesterId === CURRENT_USER.id).length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
                      <p className="text-slate-400 font-bold text-lg">You haven't submitted any requests yet.</p>
                    </div>
                  ) : (
                    requests.filter(r => r.requesterId === CURRENT_USER.id).map(req => (
                      <div key={req.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <span className="bg-slate-50 text-slate-500 px-2 py-0.5 rounded text-[10px] font-black uppercase border border-slate-100">{req.targetDepartment} Dept</span>
                               <span className="text-[10px] text-slate-400 font-bold">{new Date(req.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="font-black text-xl text-slate-800">{req.title}</h3>
                            <p className="text-sm text-slate-500 font-medium mt-1">Status changed on {new Date(req.createdAt).toLocaleDateString()}</p>
                         </div>
                         <div className="mt-4 md:mt-0 flex items-center gap-4">
                            <span className={`px-5 py-2 rounded-2xl text-xs font-black shadow-sm border ${
                              req.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                              req.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                              req.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                              'bg-amber-50 text-amber-700 border-amber-100'
                            }`}>
                              {req.status}
                            </span>
                            <button className="text-slate-400 hover:text-slate-900 transition-colors">
                               <span className="text-sm font-bold underline underline-offset-4">View History</span>
                            </button>
                         </div>
                      </div>
                    ))
                  )}
                </div>
             </div>
          )}

          {(activeTab === 'team' || activeTab === 'admin' || activeTab === 'settings') && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20 animate-in zoom-in-95 duration-500">
              <div className="bg-white p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center max-w-md">
                <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 ring-8 ring-blue-50/50">
                  <div className="w-10 h-10 bg-blue-600 rounded-2xl" />
                </div>
                <h2 className="text-3xl font-black text-slate-900">Module Locked</h2>
                <p className="mt-4 font-medium text-slate-500 leading-relaxed">This module is currently under development. Please check back after the next system update.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-colors shadow-lg"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <RequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateRequest}
      />
    </div>
  );
};

export default App;