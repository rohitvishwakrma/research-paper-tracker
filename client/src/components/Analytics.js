import React, { useState, useEffect } from 'react';
import { paperService } from '../services/api';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const response = await paperService.getAnalytics();
      setStats(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load analytics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;
  if (error) return <div className="analytics-error">{error}</div>;
  if (!stats) return null;

  return (
    <div className="analytics-container">
      <h2>📊 Analytics Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Papers</h3>
          <div className="stat-value">{stats.totalPapers}</div>
        </div>

        <div className="stat-card">
          <h3>To Read</h3>
          <div className="stat-value">{stats.byStage['to-read'] || 0}</div>
        </div>

        <div className="stat-card">
          <h3>Currently Reading</h3>
          <div className="stat-value">{stats.byStage['reading'] || 0}</div>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <div className="stat-value">{stats.byStage['completed'] || 0}</div>
        </div>

        <div className="stat-card">
          <h3>Archived</h3>
          <div className="stat-value">{stats.byStage['archived'] || 0}</div>
        </div>

        <div className="stat-card">
          <h3>Average Rating</h3>
          <div className="stat-value">{stats.averageRating ? stats.averageRating.toFixed(1) : 'N/A'}</div>
        </div>
      </div>

      <div className="priority-stats">
        <h3>By Priority</h3>
        <div className="priority-bars">
          <div className="priority-bar">
            <label>High Priority:</label>
            <div className="bar-container">
              <div 
                className="bar bar-high" 
                style={{ width: `${(stats.byPriority['high'] || 0) / stats.totalPapers * 100}%` }}
              />
              <span>{stats.byPriority['high'] || 0}</span>
            </div>
          </div>
          <div className="priority-bar">
            <label>Medium Priority:</label>
            <div className="bar-container">
              <div 
                className="bar bar-medium" 
                style={{ width: `${(stats.byPriority['medium'] || 0) / stats.totalPapers * 100}%` }}
              />
              <span>{stats.byPriority['medium'] || 0}</span>
            </div>
          </div>
          <div className="priority-bar">
            <label>Low Priority:</label>
            <div className="bar-container">
              <div 
                className="bar bar-low" 
                style={{ width: `${(stats.byPriority['low'] || 0) / stats.totalPapers * 100}%` }}
              />
              <span>{stats.byPriority['low'] || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
