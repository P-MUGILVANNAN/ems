
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Employee } from '../types';
import { api } from '../services/api';

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  getEmployee: (id: string) => Promise<Employee | undefined>;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<Employee | undefined>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<Employee | undefined>;
  deleteEmployee: (id: string) => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getEmployees();
      setEmployees(data);
    } catch (err) {
      setError('Failed to fetch employees.');
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmployee = useCallback(async (id: string) => {
    setLoading(true);
    try {
        const employee = await api.getEmployeeById(id);
        return employee;
    } catch (err) {
        setError('Failed to fetch employee.');
        return undefined;
    } finally {
        setLoading(false);
    }
  }, []);

  const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    setLoading(true);
    try {
      const newEmployee = await api.addEmployee(employeeData);
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError('Failed to add employee.');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    setLoading(true);
    try {
      const updatedEmployee = await api.updateEmployee(id, updates);
      if (updatedEmployee) {
        setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
      }
      return updatedEmployee;
    } catch (err) {
      setError('Failed to update employee.');
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    setLoading(true);
    try {
      await api.deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (err) {
      setError('Failed to delete employee.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider value={{ employees, loading, error, fetchEmployees, getEmployee, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
