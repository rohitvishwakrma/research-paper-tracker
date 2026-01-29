import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiBookOpen,
  FiBarChart2,
  FiPlusCircle,
  FiX,
  FiSettings
} from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      label: 'Paper Library',
      icon: <FiBookOpen className="w-5 h-5" />,
    },
    {
      path: '/add',
      label: 'Add Paper',
      icon: <FiPlusCircle className="w-5 h-5 " />,
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: <FiBarChart2 className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto relative">

          {/* Close Button (Mobile) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Menu */}
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center p-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Settings */}
          <div className="pt-8 mt-8 border-t border-gray-200">
            <Link
              to="/settings"
              onClick={onClose}
              className="flex items-center p-3 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              <FiSettings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
