import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import { DOMAIN_COLORS } from '../../utils/constants';

const DomainCitations = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <p className="text-gray-500">No citation data available</p>;
  }

  const maxCitations = Math.max(...Object.values(data));

  return (
    <div className="space-y-6">
      {Object.entries(data).map(([domain, citations]) => {
        const percentage =
          maxCitations > 0 ? (citations / maxCitations) * 100 : 0;

        return (
          <div key={domain} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: DOMAIN_COLORS[domain] }}
                />
                <span className="font-medium text-gray-700">{domain}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <FiBarChart2 className="w-4 h-4" />
                <span className="font-semibold">
                  {citations.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: DOMAIN_COLORS[domain],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DomainCitations;
