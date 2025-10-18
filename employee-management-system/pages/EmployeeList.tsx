import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import Loader from '../components/Loader';
import { Department } from '../types';
import Toast from '../components/Toast';
import { AddUserIcon, EyeIcon, PencilIcon, TrashIcon } from '../components/icons';

const ITEMS_PER_PAGE = 10;

const EmployeeList: React.FC = () => {
  const { employees, loading, fetchEmployees, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    return employees
      .filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(employee =>
        departmentFilter === 'All' || employee.department === departmentFilter
      );
  }, [employees, searchTerm, departmentFilter]);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee(id);
      setToast({ message: 'Employee deleted successfully!', type: 'success' });
      fetchEmployees();
    }
  };
  
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  if (loading && employees.length === 0) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-50 rounded-xl shadow-md">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Employee List</h2>
        <Link
          to="/add-employee"
          className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition"
        >
          <AddUserIcon />
          <span className="ml-2">Add Employee</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={departmentFilter}
          onChange={e => { setDepartmentFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="All">All Departments</option>
          {Object.values(Department).map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
          <thead className="bg-blue-50">
            <tr>
              {['Name', 'Department', 'Role', 'Status', 'Actions'].map(header => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedEmployees.map(employee => (
              <tr key={employee._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">{employee.name}</div>
                  <div className="text-sm text-gray-500">{employee.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{employee.department}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{employee.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      employee.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button onClick={() => navigate(`/employees/${employee._id}`)} className="text-gray-500 hover:text-blue-600" title="View"><EyeIcon /></button>
                    <button onClick={() => navigate(`/edit-employee/${employee._id}`)} className="text-gray-500 hover:text-indigo-600" title="Edit"><PencilIcon /></button>
                    <button onClick={() => handleDelete(employee._id)} className="text-gray-500 hover:text-red-600" title="Delete"><TrashIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-10 text-gray-500">No employees found.</div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-2">
          <span className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredEmployees.length)}</span> of <span className="font-medium">{filteredEmployees.length}</span> results
          </span>
          <div className="flex items-center space-x-2">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
            <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
