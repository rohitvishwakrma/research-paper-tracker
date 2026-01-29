import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import PaperForm from '../components/AddPaper/PaperFormm';

const AddPaper = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Library
        </button>

        <h1 className="text-3xl font-bold text-gray-900">
          Add New Paper
        </h1>

        <p className="mt-2 text-gray-600 max-w-2xl">
          Enter the details of the research paper you want to track and analyze.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <PaperForm />
      </div>
    </div>
  );
};

export default AddPaper;
