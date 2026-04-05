// Mock data for the admin dashboard
// This will be replaced with real backend data

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface DashboardMetrics {
  totalProjects: number;
  activeProjects: number;
  totalServices: number;
  teamMembers: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Structural Design',
    description: 'Professional structural engineering and design services',
    category: 'Engineering',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Project Management',
    description: 'Complete project management and supervision',
    category: 'Management',
    status: 'active',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    name: 'Quality Assurance',
    description: 'Quality control and assurance services',
    category: 'Quality',
    status: 'active',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Site Inspection',
    description: 'Regular site inspection and reporting',
    category: 'Inspection',
    status: 'active',
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    name: 'Consulting',
    description: 'Technical consulting services',
    category: 'Consulting',
    status: 'inactive',
    createdAt: '2024-01-05',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Downtown Office Complex',
    description: 'Modern 30-story office building in city center',
    client: 'Urban Development Corp',
    status: 'in-progress',
    startDate: '2024-01-15',
    budget: 45000000,
    spent: 18500000,
  },
  {
    id: 'p2',
    name: 'Residential Housing Project',
    description: 'Mixed-use residential development',
    client: 'Prime Homes Ltd',
    status: 'in-progress',
    startDate: '2024-02-01',
    budget: 28000000,
    spent: 8200000,
  },
  {
    id: 'p3',
    name: 'Industrial Warehouse',
    description: 'Large-scale warehouse facility',
    client: 'Logistics Solutions Inc',
    status: 'planning',
    startDate: '2024-04-01',
    budget: 15000000,
    spent: 1200000,
  },
  {
    id: 'p4',
    name: 'Highway Bridge Expansion',
    description: 'Major infrastructure bridge project',
    client: 'Ministry of Transportation',
    status: 'completed',
    startDate: '2023-06-15',
    endDate: '2024-01-30',
    budget: 52000000,
    spent: 51800000,
  },
  {
    id: 'p5',
    name: 'Shopping Mall Renovation',
    description: 'Complete mall renovation and modernization',
    client: 'Metropolitan Retail Group',
    status: 'on-hold',
    startDate: '2024-03-01',
    budget: 22000000,
    spent: 6500000,
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 't1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@ikengineering.com',
    role: 'Chief Engineer',
    department: 'Engineering',
    joinDate: '2020-03-15',
    status: 'active',
  },
  {
    id: 't2',
    name: 'Fatima Al-Mansouri',
    email: 'fatima.mansouri@ikengineering.com',
    role: 'Project Manager',
    department: 'Management',
    joinDate: '2021-06-20',
    status: 'active',
  },
  {
    id: 't3',
    name: 'Mohammed Al-Kaabi',
    email: 'mohammed.kaabi@ikengineering.com',
    role: 'Structural Engineer',
    department: 'Engineering',
    joinDate: '2022-01-10',
    status: 'active',
  },
  {
    id: 't4',
    name: 'Layla Ahmed',
    email: 'layla.ahmed@ikengineering.com',
    role: 'QA Manager',
    department: 'Quality',
    joinDate: '2021-09-05',
    status: 'active',
  },
  {
    id: 't5',
    name: 'Hassan Ibrahim',
    email: 'hassan.ibrahim@ikengineering.com',
    role: 'Site Supervisor',
    department: 'Operations',
    joinDate: '2020-11-20',
    status: 'inactive',
  },
  {
    id: 't6',
    name: 'Noor Al-Hashmi',
    email: 'noor.hashmi@ikengineering.com',
    role: 'CAD Designer',
    department: 'Design',
    joinDate: '2023-02-14',
    status: 'active',
  },
];

export const mockMetrics: DashboardMetrics = {
  totalProjects: 5,
  activeProjects: 2,
  totalServices: 5,
  teamMembers: 6,
  totalRevenue: 162000000,
  monthlyRevenue: 28000000,
};

// Helper function to get data from localStorage or return mock data
export const getDataFromStorage = <T>(key: string, defaultData: T): T => {
  if (typeof window === 'undefined') return defaultData;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch {
    return defaultData;
  }
};

// Helper function to save data to localStorage
export const saveDataToStorage = (key: string, data: any): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage: ${key}`, error);
  }
};
