import { User, Request } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.j@nexusflow.com',
  role: 'Associate',
  department: 'Operations',
  avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/597d2392-3e72-45b2-b328-d7628a380c11/avatar-1-6c999002-1773323912404.webp',
  joinedDate: '2024-01-15'
};

export const ADMIN_TEAM: User[] = [
  {
    id: 'a1',
    name: 'Sarah Chen',
    email: 'sarah.c@nexusflow.com',
    role: 'Head',
    department: 'Admin',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/597d2392-3e72-45b2-b328-d7628a380c11/avatar-2-32a49c21-1773323918149.webp',
    joinedDate: '2020-05-20'
  },
  {
    id: 'a2',
    name: 'Michael Ross',
    email: 'michael.r@nexusflow.com',
    role: 'Senior',
    department: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=a2',
    joinedDate: '2022-03-10'
  }
];

export const INITIAL_REQUESTS: Request[] = [
  {
    id: 'req-001',
    requesterId: 'u1',
    requesterName: 'Alex Johnson',
    targetDepartment: 'Admin',
    title: 'New Agent ID Request - John Doe',
    description: 'Requesting ID for new agent John Doe who joined yesterday.',
    status: 'Pending',
    priority: 'High',
    createdAt: new Date().toISOString(),
    metadata: {
      agentName: 'John Doe',
      agentJoinDate: new Date().toISOString(),
      idType: 'Temporary'
    }
  },
  {
    id: 'req-002',
    requesterId: 'u2',
    requesterName: 'Jessica Lee',
    targetDepartment: 'IT',
    title: 'Software Access',
    description: 'Need access to Figma Enterprise.',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];