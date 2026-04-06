
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface IServiceQuery {
  searchTerm?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const useUsers = (params?: IServiceQuery) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const res = await axios.get(
        "https://ikengineering.co.nz/api/user",
        {
          params: {
            searchTerm: params?.searchTerm,
            sort: params?.sort,
            page: params?.page,
            limit: params?.limit,
          },
        }
      );
      return res.data;
    },
  });

  return { isPending, error, data, refetch };
};

import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
  phone?: string;
  avatar?: string;
}

interface UseUsersResponse {
  data: User[];
  isLoading: boolean;
  error: string | null;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getTotalUsers: () => number;
  getActiveUsers: () => number;
}

const STORAGE_KEY = 'ik_engineering_users';

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Al Mansouri',
    email: 'ahmed@ikengineering.com',
    role: 'admin',
    department: 'Management',
    status: 'active',
    joinDate: '2022-01-15',
    phone: '+971-50-123-4567',
  },
  {
    id: '2',
    name: 'Fatima Al Zahra',
    email: 'fatima@ikengineering.com',
    role: 'manager',
    department: 'Civil Engineering',
    status: 'active',
    joinDate: '2022-06-10',
    phone: '+971-50-234-5678',
  },
  {
    id: '3',
    name: 'Mohammed Hassan',
    email: 'mohammed@ikengineering.com',
    role: 'manager',
    department: 'Structural Engineering',
    status: 'active',
    joinDate: '2022-08-20',
    phone: '+971-50-345-6789',
  },
  {
    id: '4',
    name: 'Layla Ahmed',
    email: 'layla@ikengineering.com',
    role: 'employee',
    department: 'Project Management',
    status: 'active',
    joinDate: '2023-02-14',
    phone: '+971-50-456-7890',
  },
  {
    id: '5',
    name: 'Omar Ibrahim',
    email: 'omar@ikengineering.com',
    role: 'employee',
    department: 'Civil Engineering',
    status: 'active',
    joinDate: '2023-03-22',
    phone: '+971-50-567-8901',
  },
  {
    id: '6',
    name: 'Noor Al-Rashid',
    email: 'noor@ikengineering.com',
    role: 'employee',
    department: 'Quality Assurance',
    status: 'inactive',
    joinDate: '2023-05-10',
    phone: '+971-50-678-9012',
  },
];

export const useStaticUsers = (): UseUsersResponse => {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize data from localStorage
  useEffect(() => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        setData(defaultUsers);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUsers));
      }
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      setData(defaultUsers);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addUser = (user: Omit<User, 'id'>) => {
    try {
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
      };
      const updated = [...data, newUser];
      setData(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      setError('Failed to add user');
    }
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    try {
      const updated = data.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      );
      setData(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const deleteUser = (id: string) => {
    try {
      const updated = data.filter((user) => user.id !== id);
      setData(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const getTotalUsers = () => data.length;

  const getActiveUsers = () => data.filter((u) => u.status === 'active').length;

  return {
    data,
    isLoading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getTotalUsers,
    getActiveUsers,
  };
};
