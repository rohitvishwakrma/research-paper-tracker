import React, { useState } from 'react';

const PaperForm = ({ paper, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(paper || {
    title: '',
    authors: '',
    publicationYear: new Date().getFullYear(),
    journal: '',
    doi: '',
    url: '',
    abstract: '',
    keywords: '',
    readingStage: 'to-read',
    priority: 'medium',
    notes: '',
    rating: 3
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publicationYear' || name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      keywords: typeof formData.keywords === 'string' 
        ? formData.keywords.split(',').map(k => k.trim()).filter(k => k)
        : formData.keywords
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="paper-form">
      <h3>{paper ? 'Edit Paper' : 'Add New Paper'}</h3>
      
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Authors *</label>
        <input
          type="text"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          required
          placeholder="e.g., John Doe, Jane Smith"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Publication Year *</label>
          <input
            type="number"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            required
            min="1900"
            max={new Date().getFullYear() + 1}
          />
        </div>

        <div className="form-group">
          <label>Journal</label>
          <input
            type="text"
            name="journal"
            value={formData.journal}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>DOI</label>
        <input
          type="text"
          name="doi"
          value={formData.doi}
          onChange={handleChange}
          placeholder="e.g., 10.1234/example"
        />
      </div>

      <div className="form-group">
        <label>URL</label>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label>Abstract</label>
        <textarea
          name="abstract"
          value={formData.abstract}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="form-group">
        <label>Keywords (comma-separated)</label>
        <input
          type="text"
          name="keywords"
          value={Array.isArray(formData.keywords) ? formData.keywords.join(', ') : formData.keywords}
          onChange={handleChange}
          placeholder="e.g., machine learning, neural networks"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Reading Stage</label>
          <select
            name="readingStage"
            value={formData.readingStage}
            onChange={handleChange}
          >
            <option value="to-read">To Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {paper ? 'Update' : 'Add'} Paper
        </button>
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PaperForm;
