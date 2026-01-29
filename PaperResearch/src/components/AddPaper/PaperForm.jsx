
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePapers } from '../../context/PaperContext';
import {
  RESEARCH_DOMAINS,
  READING_STAGES,
  IMPACT_SCORES,
} from '../../utils/constants';

const PaperForm = () => {
  const navigate = useNavigate();
  const { addPaper } = usePapers();

  const [formData, setFormData] = useState({
    title: '',
    firstAuthor: '',
    researchDomain: '',
    readingStage: '',
    citationCount: 0,
    impactScore: 'Unknown',
    dateAdded: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Paper title is required';
    if (!formData.firstAuthor.trim())
      newErrors.firstAuthor = 'First author name is required';
    if (!formData.researchDomain)
      newErrors.researchDomain = 'Research domain is required';
    if (!formData.readingStage)
      newErrors.readingStage = 'Reading stage is required';
    if (formData.citationCount < 0)
      newErrors.citationCount = 'Citation count cannot be negative';
    if (!formData.dateAdded)
      newErrors.dateAdded = 'Date added is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'citationCount' ? Math.max(0, Number(value)) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    addPaper({
      ...formData,
      title: formData.title.trim(),
      firstAuthor: formData.firstAuthor.trim(),
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1026] via-[#181e3a] to-[#1a1440] py-12">
      <div className="w-full max-w-2xl p-12 rounded-3xl bg-[#181e3a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center" style={{ boxShadow: "0 12px 48px 0 rgba(31,38,135,0.37)" }}>
        <h2 className="text-4xl font-bold text-white text-center mb-2">Add New Paper</h2>
        <p className="text-slate-300 text-lg text-center mb-8">Enter the details of the research paper you want to track and analyze.</p>
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Paper Title */}
          <div className="md:col-span-2">
            <label className="block text-lg font-semibold text-white mb-2">Paper Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-6 py-5 rounded-xl bg-[#232a45] border ${errors.title ? 'border-red-400' : 'border-white/20'} text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md`}
              placeholder="Enter the paper title"
            />
            {errors.title && <p className="mt-1 text-base text-red-400">{errors.title}</p>}
          </div>

          {/* First Author */}
          <div>
            <label className="block text-lg font-semibold text-white mb-2">First Author Name *</label>
            <input
              type="text"
              name="firstAuthor"
              required
              value={formData.firstAuthor}
              onChange={handleChange}
              className={`w-full px-6 py-5 rounded-xl bg-[#232a45] border ${errors.firstAuthor ? 'border-red-400' : 'border-white/20'} text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md`}
              placeholder="Enter first author name"
            />
            {errors.firstAuthor && <p className="mt-1 text-base text-red-400">{errors.firstAuthor}</p>}
          </div>

          {/* Research Domain */}
          <div>
            <label className="block text-lg font-semibold text-white mb-2">Research Domain *</label>
            <select
              name="researchDomain"
              required
              value={formData.researchDomain}
              onChange={handleChange}
              className={`w-full px-6 py-5 rounded-xl bg-[#232a45] border ${errors.researchDomain ? 'border-red-400' : 'border-white/20'} text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md`}
            >
              <option value="">Select Domain</option>
              {RESEARCH_DOMAINS.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            {errors.researchDomain && <p className="mt-1 text-base text-red-400">{errors.researchDomain}</p>}
          </div>

          {/* Reading Stage */}
          <div>
            <label className="block text-lg font-semibold text-white mb-2">Reading Stage *</label>
            <select
              name="readingStage"
              required
              value={formData.readingStage}
              onChange={handleChange}
              className={`w-full px-6 py-5 rounded-xl bg-[#232a45] border ${errors.readingStage ? 'border-red-400' : 'border-white/20'} text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md`}
            >
              <option value="">Select Stage</option>
              {READING_STAGES.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </select>
            {errors.readingStage && <p className="mt-1 text-base text-red-400">{errors.readingStage}</p>}
          </div>

          {/* Citation Count */}
          <div>
            <label className="block text-lg font-semibold text-white mb-2">Citation Count</label>
            <input
              type="number"
              name="citationCount"
              min="0"
              value={formData.citationCount}
              onChange={handleChange}
              className="w-full px-6 py-5 rounded-xl bg-[#232a45] border border-white/20 text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
          </div>

          {/* Impact Score */}
          <div>
            <label className="block text-lg font-semibold text-white mb-2">Impact Score</label>
            <select
              name="impactScore"
              value={formData.impactScore}
              onChange={handleChange}
              className="w-full px-6 py-5 rounded-xl bg-[#232a45] border border-white/20 text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            >
              {IMPACT_SCORES.map((score) => (
                <option key={score} value={score}>{score}</option>
              ))}
            </select>
          </div>

          {/* Date Added */}
          <div className="md:col-span-2">
            <label className="block text-lg font-semibold text-white mb-2">Date Added *</label>
            <input
              type="date"
              name="dateAdded"
              required
              value={formData.dateAdded}
              onChange={handleChange}
              className={`w-full px-6 py-5 rounded-xl bg-[#232a45] border ${errors.dateAdded ? 'border-red-400' : 'border-white/20'} text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-8 border-t border-white/10 mt-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-8 py-4 border border-white/20 text-white rounded-xl bg-[#232a45] hover:bg-[#232a45]/80 transition-all text-lg font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold text-lg shadow-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 disabled:opacity-60"
          >
            Save Paper
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default PaperForm;
