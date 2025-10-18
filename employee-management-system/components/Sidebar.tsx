
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, UsersIcon, AddUserIcon } from './icons';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const navLinkClasses = "flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 rounded-lg transition-colors duration-200";
  const activeLinkClasses = "bg-blue-600";

  return (
    <aside className={`bg-gray-800 text-white w-64 fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}>
      <div className="flex items-center justify-center p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">EMS</h1>
      </div>
      <nav className="p-4">
        <ul>
          <li>
            <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} end>
              <DashboardIcon />
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>
          <li className="mt-2">
            <NavLink to="/employees" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
              <UsersIcon />
              <span className="ml-3">Employees</span>
            </NavLink>
          </li>
          <li className="mt-2">
            <NavLink to="/add-employee" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
              <AddUserIcon />
              <span className="ml-3">Add Employee</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
