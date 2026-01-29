import React from 'react';
import { FiX } from 'react-icons/fi';
import { usePapers } from '../../context/PaperContext';
import {
  READING_STAGES,
  RESEARCH_DOMAINS,
  IMPACT_SCORES,
  DATE_RANGES
} from '../../utils/constants';

const FilterSection = () => {
  const { filters, setFilters } = usePapers();

  const handleStageToggle = (stage) => {
    setFilters({
      ...filters,
      readingStages: filters.readingStages.includes(stage)
        ? filters.readingStages.filter(s => s !== stage)
        : [...filters.readingStages, stage],
    });
  };

  const handleDomainToggle = (domain) => {
    setFilters({
      ...filters,
      researchDomains: filters.researchDomains.includes(domain)
        ? filters.researchDomains.filter(d => d !== domain)
        : [...filters.researchDomains, domain],
    });
  };

  const handleImpactToggle = (impact) => {
    setFilters({
      ...filters,
      impactScores: filters.impactScores.includes(impact)
        ? filters.impactScores.filter(i => i !== impact)
        : [...filters.impactScores, impact],
    });
  };

  const handleDateChange = (dateRange) => {
    setFilters({ ...filters, dateRange });
  };

  const handleClearAll = () => {
    setFilters({
      readingStages: [],
      researchDomains: [],
      impactScores: [],
      dateRange: 'all',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value =>
    Array.isArray(value) ? value.length > 0 : value !== 'all'
  );

  return (
    <div className="bg-white rounded-xl shadow-card p-6 mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={handleClearAll}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Clear all
        </button>
      </div>

      {/* Filter Groups */}
      <div className="space-y-6">
        {/* Reading Stage */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Reading Stage
          </h4>
          <div className="flex flex-wrap gap-2">
            {READING_STAGES.map(stage => (
              <button
                key={stage}
                onClick={() => handleStageToggle(stage)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.readingStages.includes(stage)
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        {/* Research Domain */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Research Domain
          </h4>
          <div className="flex flex-wrap gap-2">
            {RESEARCH_DOMAINS.map(domain => (
              <button
                key={domain}
                onClick={() => handleDomainToggle(domain)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.researchDomains.includes(domain)
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Score */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Impact Score
          </h4>
          <div className="flex flex-wrap gap-2">
            {IMPACT_SCORES.map(score => (
              <button
                key={score}
                onClick={() => handleImpactToggle(score)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.impactScores.includes(score)
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        {/* Date Added */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Date Added
          </h4>
          <div className="flex flex-wrap gap-2">
            {DATE_RANGES.map(range => (
              <button
                key={range.value}
                onClick={() => handleDateChange(range.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.dateRange === range.value
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Active Filters
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.readingStages.map(stage => (
              <span
                key={stage}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-50 text-primary-700"
              >
                {stage}
                <button
                  onClick={() => handleStageToggle(stage)}
                  className="ml-2 hover:text-primary-900"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.researchDomains.map(domain => (
              <span
                key={domain}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-50 text-primary-700"
              >
                {domain}
                <button
                  onClick={() => handleDomainToggle(domain)}
                  className="ml-2 hover:text-primary-900"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.impactScores.map(score => (
              <span
                key={score}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-50 text-primary-700"
              >
                {score}
                <button
                  onClick={() => handleImpactToggle(score)}
                  className="ml-2 hover:text-primary-900"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-50 text-primary-700">
                {DATE_RANGES.find(r => r.value === filters.dateRange)?.label}
                <button
                  onClick={() => handleDateChange('all')}
                  className="ml-2 hover:text-primary-900"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
