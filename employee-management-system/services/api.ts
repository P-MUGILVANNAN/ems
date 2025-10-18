import { Department, Employee } from '../types';

const BASE_URL = 'http://localhost:5000/api'; // change if deployed
const TOKEN = localStorage.getItem('token'); // JWT token from login

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

export const api = {
  // Get all employees with optional filters
  getEmployees: async (filters?: { department?: Department; status?: 'Active' | 'Inactive'; search?: string }): Promise<Employee[]> => {
    let url = `${BASE_URL}/employees`;
    if (filters) {
      const params = new URLSearchParams();
      if (filters.department) params.append('department', filters.department);
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  },

  // Get a single employee by ID
  getEmployeeById: async (id: string): Promise<Employee> => {
    const res = await fetch(`${BASE_URL}/employees/${id}`, { headers });
    if (!res.ok) throw new Error('Failed to fetch employee');
    return res.json();
  },

  // Add a new employee
  addEmployee: async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => {
    const res = await fetch(`${BASE_URL}/employees`, {
      method: 'POST',
      headers,
      body: JSON.stringify(employeeData),
    });
    if (!res.ok) throw new Error('Failed to add employee');
    return res.json();
  },

  // Update an existing employee
  updateEmployee: async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    const res = await fetch(`${BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update employee');
    return res.json();
  },

  // Delete an employee
  deleteEmployee: async (id: string): Promise<{ success: boolean }> => {
    const res = await fetch(`${BASE_URL}/employees/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!res.ok) throw new Error('Failed to delete employee');
    return res.json();
  },
};
