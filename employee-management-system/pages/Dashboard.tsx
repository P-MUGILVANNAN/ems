
import React, { useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEmployees } from '../context/EmployeeContext';
import Loader from '../components/Loader';
import StatCard from '../components/StatCard';
import { UsersIcon } from '../components/icons';
import { Department } from '../types';

const Dashboard: React.FC = () => {
  const { employees, loading, fetchEmployees } = useEmployees();

  useEffect(() => {
    if (employees.length === 0) {
      fetchEmployees();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const departments = new Set(employees.map(emp => emp.department)).size;
    return { totalEmployees, activeEmployees, departments };
  }, [employees]);

  const departmentData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const dep in Department) {
        counts[Department[dep as keyof typeof Department]] = 0;
    }
    employees.forEach(emp => {
      counts[emp.department] = (counts[emp.department] || 0) + 1;
    });
    return Object.keys(counts).map(name => ({ name, count: counts[name] }));
  }, [employees]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Employees" value={stats.totalEmployees} icon={<UsersIcon />} color="bg-blue-100 text-blue-600" />
        <StatCard title="Active Employees" value={stats.activeEmployees} icon={<UsersIcon />} color="bg-green-100 text-green-600" />
        <StatCard title="Departments" value={stats.departments} icon={<UsersIcon />} color="bg-purple-100 text-purple-600" />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Employee Distribution by Department</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={departmentData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} interval={0} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3B82F6" name="Number of Employees" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
