import React, { useState, useEffect } from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { usePapers } from '../../context/PaperContext';
import {
  RESEARCH_DOMAINS,
  READING_STAGES,
  IMPACT_SCORES,
} from '../../utils/constants';

const EditPaperModal = ({ paper, isOpen, onClose }) => {
  const { updatePaper, deletePaper } = usePapers();

  const [formData, setFormData] = useState({
    title: '',
    firstAuthor: '',
    researchDomain: '',
    readingStage: '',
    citationCount: 0,
    impactScore: 'Unknown',
    dateAdded: '',
  });

  const [errors, setErrors] = useState({});

  /* Lock body scroll when modal open */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  /* Sync form when paper changes */
  useEffect(() => {
    if (!paper) return;
    setFormData({
      title: paper.title,
      firstAuthor: paper.firstAuthor,
      researchDomain: paper.researchDomain,
      readingStage: paper.readingStage,
      citationCount: paper.citationCount,
      impactScore: paper.impactScore,
      dateAdded: paper.dateAdded,
    });
  }, [paper]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Paper title is required';
    if (!formData.firstAuthor.trim()) newErrors.firstAuthor = 'First author name is required';
    if (!formData.researchDomain) newErrors.researchDomain = 'Research domain is required';
    if (!formData.readingStage) newErrors.readingStage = 'Reading stage is required';
    if (formData.citationCount < 0) newErrors.citationCount = 'Citation count cannot be negative';
    if (!formData.dateAdded) newErrors.dateAdded = 'Date added is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'citationCount' ? Number(value) || 0 : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paper) return;

    if (validateForm()) {
      updatePaper(paper.id, formData);
      onClose();
    }
  };

  const handleDelete = () => {
    if (!paper) return;
    if (window.confirm('Are you sure you want to delete this paper?')) {
      deletePaper(paper.id);
      onClose();
    }
  };

  if (!isOpen || !paper) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg z-10">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Edit Paper</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <Input label="Paper Title *" name="title" value={formData.title} onChange={handleChange} error={errors.title} />

            {/* Author */}
            <Input label="First Author *" name="firstAuthor" value={formData.firstAuthor} onChange={handleChange} error={errors.firstAuthor} />

            {/* Domain & Stage */}
            <div className="grid grid-cols-2 gap-4">
              <Select label="Research Domain *" name="researchDomain" value={formData.researchDomain} onChange={handleChange} options={RESEARCH_DOMAINS} error={errors.researchDomain} />
              <Select label="Reading Stage *" name="readingStage" value={formData.readingStage} onChange={handleChange} options={READING_STAGES} error={errors.readingStage} />
            </div>

            {/* Citations & Impact */}
            <div className="grid grid-cols-2 gap-4">
              <Input label="Citation Count" type="number" name="citationCount" value={formData.citationCount} onChange={handleChange} error={errors.citationCount} />
              <Select label="Impact Score" name="impactScore" value={formData.impactScore} onChange={handleChange} options={IMPACT_SCORES} />
            </div>

            {/* Date */}
            <Input label="Date Added *" type="date" name="dateAdded" value={formData.dateAdded} onChange={handleChange} error={errors.dateAdded} />

            {/* Actions */}
            <div className="flex justify-between pt-6 border-t">
              <button type="button" onClick={handleDelete} className="flex items-center text-red-600 hover:text-red-700">
                <FiTrash2 className="mr-2" /> Delete
              </button>
              <div className="space-x-3">
                <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-900">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* Small reusable inputs (internal only) */
const Input = ({ label, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input {...props} className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-300' : 'border-gray-300'}`} />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select {...props} className={`w-full px-3 py-2 border rounded-md ${error ? 'border-red-300' : 'border-gray-300'}`}>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

export default EditPaperModal;
