export type Department = 'Admin' | 'HR' | 'IT' | 'Operations';
export type Role = 'Head' | 'Senior' | 'Associate' | 'Employee';
export type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected';
export type IDType = 'Temporary' | 'Permanent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: Department;
  avatar: string;
  joinedDate: string;
}

export interface Request {
  id: string;
  requesterId: string;
  requesterName: string;
  targetDepartment: Department;
  title: string;
  description: string;
  status: RequestStatus;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;
  assignedTo?: string;
  metadata?: {
    agentId?: string;
    agentName?: string;
    idType?: IDType;
    agentJoinDate?: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'request';
  timestamp: string;
  read: boolean;
}