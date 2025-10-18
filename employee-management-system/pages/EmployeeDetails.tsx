import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { Employee } from '../types';
import Loader from '../components/Loader';

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEmployee, loading } = useEmployees();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then(emp => emp ? setEmployee(emp) : navigate('/employees'));
    } else {
      navigate('/employees');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading || !employee) {
    return <Loader />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">{employee.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailItem label="Full Name" value={employee.name} />
          <DetailItem label="Email" value={employee.email} />
          <DetailItem label="Phone" value={employee.phone} />
          <DetailItem label="Department" value={employee.department} />
          <DetailItem label="Role" value={employee.role} />
          <DetailItem label="Salary" value={`$${employee.salary.toLocaleString()}`} />
          <DetailItem label="Date of Joining" value={new Date(employee.dateOfJoining).toLocaleDateString()} />
          <DetailItem label="Status">
            <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {employee.status}
            </span>
          </DetailItem>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate('/employees')}
            className="px-6 py-2 rounded-lg border border-blue-300 bg-white text-blue-700 font-medium shadow hover:bg-blue-50 transition"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value?: string; children?: React.ReactNode }> = ({ label, value, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
    <h4 className="text-sm font-medium text-gray-400">{label}</h4>
    {value && <p className="mt-2 text-lg font-semibold text-gray-900">{value}</p>}
    {children && <div className="mt-2">{children}</div>}
  </div>
);

export default EmployeeDetails;
