
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { Employee } from '../types';
import EmployeeForm from '../components/EmployeeForm';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployee, updateEmployee, loading } = useEmployees();
  const [employee, setEmployee] = useState<Employee | undefined>(undefined);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then(setEmployee);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (updates: Partial<Employee>) => {
    if (!id) return;
    const updatedEmployee = await updateEmployee(id, updates);
    if (updatedEmployee) {
      setToast({ message: 'Employee updated successfully!', type: 'success' });
      setTimeout(() => navigate('/employees'), 1000);
    } else {
      setToast({ message: 'Failed to update employee.', type: 'error' });
    }
  };

  if (loading || !employee) {
    return <Loader />;
  }

  return (
    <div>
       {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Employee</h2>
      <EmployeeForm onSubmit={handleSubmit} initialData={employee} isEditMode={true} />
    </div>
  );
};

export default EditEmployee;
