
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogoutIcon, MenuIcon } from './icons';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm flex items-center justify-between p-4 sticky top-0 z-20">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-600 md:hidden mr-4">
          <MenuIcon />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Employee Management</h1>
      </div>
      <div className="flex items-center">
        <button onClick={logout} className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-200">
          <LogoutIcon />
          <span className="ml-2 hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
