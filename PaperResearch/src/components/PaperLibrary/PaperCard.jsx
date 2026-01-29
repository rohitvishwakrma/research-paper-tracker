
import React, { useState } from 'react';
import {
  FiEdit2,
  FiTrash2,
  FiUser,
  FiBook,
  FiTrendingUp,
  FiCalendar,
} from 'react-icons/fi';
import EditPaperModal from '../common/EditPaperModal';
import { usePapers } from '../../context/PaperContext';
import { formatDate, formatCitationCount } from '../../utils/data';
import { IMPACT_COLORS, STAGE_COLORS } from '../../utils/constants';

const PaperCard = ({ paper }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deletePaper } = usePapers();

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this paper?'
    );
    if (confirmed) {
      deletePaper(paper.id);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {paper.title}
              </h3>
              <div className="flex items-center mt-2 text-gray-600">
                <FiUser className="w-4 h-4 mr-1" />
                <span className="text-sm">{paper.firstAuthor}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                aria-label="Edit paper"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleDelete}
                className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                aria-label="Delete paper"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                IMPACT_COLORS[paper.impactScore] || IMPACT_COLORS.Unknown
              }`}
            >
              <FiTrendingUp className="w-3 h-3 mr-1" />
              {paper.impactScore}
            </span>

            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                STAGE_COLORS[paper.readingStage] || STAGE_COLORS.Default
              }`}
            >
              <FiBook className="w-3 h-3 mr-1" />
              {paper.readingStage}
            </span>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {paper.researchDomain}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {formatCitationCount(paper.citationCount)}
              </div>
              <div className="text-xs text-gray-500">Citations</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center text-gray-600">
                <FiCalendar className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  {formatDate(paper.dateAdded)}
                </span>
              </div>
              <div className="text-xs text-gray-500">Added</div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditPaperModal
          paper={paper}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default PaperCard;
