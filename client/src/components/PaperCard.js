import React from 'react';

const PaperCard = ({ paper, onEdit, onDelete, onUpdateStage }) => {
  const getStageColor = (stage) => {
    const colors = {
      'to-read': '#6c757d',
      'reading': '#007bff',
      'completed': '#28a745',
      'archived': '#6c757d'
    };
    return colors[stage] || '#6c757d';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': '#28a745',
      'medium': '#ffc107',
      'high': '#dc3545'
    };
    return colors[priority] || '#ffc107';
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="paper-card">
      <div className="paper-header">
        <h3>{paper.title}</h3>
        <div className="paper-badges">
          <span 
            className="badge badge-stage" 
            style={{ backgroundColor: getStageColor(paper.readingStage) }}
          >
            {paper.readingStage.replace('-', ' ')}
          </span>
          <span 
            className="badge badge-priority"
            style={{ backgroundColor: getPriorityColor(paper.priority) }}
          >
            {paper.priority}
          </span>
        </div>
      </div>

      <div className="paper-meta">
        <p><strong>Authors:</strong> {paper.authors}</p>
        <p><strong>Year:</strong> {paper.publicationYear}</p>
        {paper.journal && <p><strong>Journal:</strong> {paper.journal}</p>}
        {paper.doi && <p><strong>DOI:</strong> {paper.doi}</p>}
        {paper.url && (
          <p>
            <strong>URL:</strong>{' '}
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              View Paper
            </a>
          </p>
        )}
      </div>

      {paper.abstract && (
        <div className="paper-abstract">
          <p><strong>Abstract:</strong></p>
          <p>{paper.abstract.substring(0, 200)}{paper.abstract.length > 200 ? '...' : ''}</p>
        </div>
      )}

      {paper.keywords && paper.keywords.length > 0 && (
        <div className="paper-keywords">
          {paper.keywords.map((keyword, idx) => (
            <span key={idx} className="keyword-tag">{keyword}</span>
          ))}
        </div>
      )}

      {paper.rating && (
        <div className="paper-rating">
          <strong>Rating:</strong> {'★'.repeat(paper.rating)}{'☆'.repeat(5 - paper.rating)}
        </div>
      )}

      <div className="paper-dates">
        <small>Added: {formatDate(paper.dateAdded)}</small>
        {paper.dateStarted && <small> | Started: {formatDate(paper.dateStarted)}</small>}
        {paper.dateCompleted && <small> | Completed: {formatDate(paper.dateCompleted)}</small>}
      </div>

      {paper.notes && (
        <div className="paper-notes">
          <strong>Notes:</strong>
          <p>{paper.notes}</p>
        </div>
      )}

      <div className="paper-actions">
        <select
          value={paper.readingStage}
          onChange={(e) => onUpdateStage(paper._id, e.target.value)}
          className="stage-select"
        >
          <option value="to-read">To Read</option>
          <option value="reading">Reading</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
        <button onClick={() => onEdit(paper)} className="btn btn-edit">Edit</button>
        <button onClick={() => onDelete(paper._id)} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default PaperCard;
