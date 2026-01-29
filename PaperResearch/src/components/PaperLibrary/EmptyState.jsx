import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus } from 'react-icons/fi';

const EmptyState = () => {
  return (
    <div className="text-center py-14 px-6 bg-white rounded-xl shadow-md">
      
      {/* Icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-5">
        <FiSearch className="w-8 h-8 text-gray-400" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No papers found
      </h3>

      {/* Description */}
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Try adjusting your filters or add a new research paper to get started.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          aria-label="Clear filters"
          onClick={() => {
            // Clear filters logic would go here
            window.location.reload();
          }}
          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
        >
          Clear Filters
        </button>

        <Link
          to="/add"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add New Paper
        </Link>
      </div>
    </div>
  );
};

export default EmptyState;
