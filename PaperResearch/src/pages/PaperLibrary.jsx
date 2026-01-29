import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiFilter } from 'react-icons/fi';

import PaperCard from '../components/PaperLibrary/PaperCard';
import FilterSection from '../components/PaperLibrary/FilterSection';
import EmptyState from '../components/PaperLibrary/EmptyState';

import { usePapers } from '../context/PaperContext';
import { formatCitationCount } from '../utils/data';

const PaperLibrary = () => {
  const { filteredPapers } = usePapers();
  const [showFilters, setShowFilters] = useState(false);

  const stats = {
    total: filteredPapers.length,
    fullyRead: filteredPapers.filter(p => p.readingStage === 'Fully Read').length,
    highImpact: filteredPapers.filter(p => p.impactScore === 'High Impact').length,
    avgCitations:
      filteredPapers.length > 0
        ? Math.round(
            filteredPapers.reduce((sum, p) => sum + p.citationCount, 0) /
              filteredPapers.length
          )
        : 0,
  };

  return (
    <div className="space-y-6 animate-fade-in px-0 ">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Paper Library
        </h1>
        <p className="text-gray-600 mb-6">
          Browse, track, and manage your research papers
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 
                       rounded-lg text-sm font-medium text-gray-700 bg-white 
                       hover:bg-gray-50 focus:ring-2 focus:ring-primary-500"
          >
            <FiFilter className="w-4 h-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          <Link
            to="/add"
            className="inline-flex items-center px-4 py-2 bg-primary-600 
                       text-white rounded-lg text-sm font-medium 
                       hover:bg-primary-700 focus:ring-2 focus:ring-primary-500"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add Paper
          </Link>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="animate-slide-up">
          <FilterSection />
        </div>
      )}

      {/* Papers */}
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0 pl-0! pr-0!">
          {filteredPapers.map(paper => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Total Papers" value={stats.total} />
          <Stat label="Fully Read" value={stats.fullyRead} color="text-green-600" />
          <Stat label="High Impact" value={stats.highImpact} color="text-blue-600" />
          <Stat
            label="Avg Citations"
            value={formatCitationCount(stats.avgCitations)}
            color="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, color = 'text-gray-900' }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

export default PaperLibrary;
