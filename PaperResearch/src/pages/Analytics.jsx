import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import SummaryCards from '../components/Analytics/SummaryCardss';
import FunnelChart from '../components/Analytics/FunnelChartt';
import ScatterChart from '../components/Analytics/ScatterChartt';
import StackedBarChart from '../components/Analytics/StackedBarChartt';
import DomainCitations from '../components/Analytics/DomainCitationss';

import { usePapers } from '../context/PaperContext';

const Analytics = () => {
  const navigate = useNavigate();
  const { getAnalytics } = usePapers();

  const analytics = getAnalytics();

  // ✅ Transform domain citations to expected shape
  const domainCitationMap = analytics.domainCitations.reduce((acc, item) => {
    acc[item.domain] = item.avgCitations;
    return acc;
  }, {});

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
          Reading Analytics
        </h1>

        <p className="mt-2 text-gray-600 max-w-2xl">
          Track your reading progress, citation trends, and research focus areas.
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards analytics={analytics.summary} />

      {/* Funnel + Scatter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Reading Progress Funnel
          </h3>
          <div className="h-80">
            <FunnelChart data={analytics.funnelData} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Citations by Impact Score
          </h3>
          <div className="h-80">
            <ScatterChart data={analytics.scatterData} />
          </div>
        </div>
      </div>

      {/* Stacked Bar */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Papers by Domain & Reading Stage
        </h3>
        <div className="h-96">
          <StackedBarChart data={analytics.stackedBarData} />
        </div>
      </div>

      {/* Domain Citations */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Average Citations per Domain
        </h3>
        <DomainCitations data={domainCitationMap} />
      </div>
    </div>
  );
};

export default Analytics;
