import React from 'react';
import {
  FiBook,
  FiCheckCircle,
  FiTrendingUp,
  FiBarChart2,
} from 'react-icons/fi';

const SummaryCards = ({ analytics }) => {
  const cards = [
    {
      title: 'Total Papers',
      value: analytics.totalPapers || 0,
      icon: <FiBook className="w-7 h-7" />,
      bg: 'bg-blue-50',
      text: 'text-blue-600',
    },
    {
      title: 'Fully Read',
      value: analytics.fullyRead || 0,
      icon: <FiCheckCircle className="w-7 h-7" />,
      bg: 'bg-green-50',
      text: 'text-green-600',
    },
    {
      title: 'Completion Rate',
      value: analytics.completionRate || '0%',
      icon: <FiTrendingUp className="w-7 h-7" />,
      bg: 'bg-purple-50',
      text: 'text-purple-600',
    },
    {
      title: 'Avg Citations',
      value: analytics.avgCitations
        ? analytics.avgCitations.toLocaleString()
        : '0',
      icon: <FiBarChart2 className="w-7 h-7" />,
      bg: 'bg-orange-50',
      text: 'text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {card.value}
              </p>
            </div>

            <div className={`p-3 rounded-lg ${card.bg}`}>
              <div className={card.text}>{card.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
