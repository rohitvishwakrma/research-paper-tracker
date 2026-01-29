import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiBookOpen,
  FiBarChart2,
  FiPlusCircle,
  FiLogIn,
  FiLogOut,
  FiUser
} from 'react-icons/fi';

const Navbar = ({ onMenuClick, isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  const navItems = [
    {
      path: '/',
      label: 'Paper Library',
      icon: <FiBookOpen className="w-5 h-5" />,
    },
    {
      path: '/add',
      label: 'Add Paper',
      icon: <FiPlusCircle className="w-5 h-5" />,
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: <FiBarChart2 className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">

          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Toggle menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex ml-2 md:mr-24">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-600 rounded-lg">
                  <FiBookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  Research Paper Tracker
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            {/* Login/Logout and User Profile */}
            {isAuthenticated ? (
              <>
                {/* Profile button */}
                <Link
                  to="/profile"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/profile'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">
                    <FiUser className="w-5 h-5" />
                  </span>
                  Profile
                </Link>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="mr-2">
                    <FiLogOut className="w-5 h-5" />
                  </span>
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login button */}
                <Link
                  to="/login"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/login'
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">
                    <FiLogIn className="w-5 h-5" />
                  </span>
                  Login
                </Link>

                {/* Signup button - optional, can be made primary */}
                <Link
                  to="/signup"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/signup'
                      ? 'bg-primary-600 text-white'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  <span className="mr-2">
                    <FiUser className="w-5 h-5" />
                  </span>
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;