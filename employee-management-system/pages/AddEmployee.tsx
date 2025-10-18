
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { Employee } from '../types';
import EmployeeForm from '../components/EmployeeForm';
import Toast from '../components/Toast';

const AddEmployee: React.FC = () => {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee = await addEmployee(employeeData);
    if (newEmployee) {
      setToast({ message: 'Employee added successfully!', type: 'success' });
      setTimeout(() => navigate('/employees'), 1000);
    } else {
      setToast({ message: 'Failed to add employee.', type: 'error' });
    }
  };

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Employee</h2>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEmployee;
