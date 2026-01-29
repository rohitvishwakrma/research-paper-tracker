import React, { useState, useRef } from 'react';
import './App.css';
import "remixicon/fonts/remixicon.css";
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
    React.useEffect(() => {
      const handleTabEvent = (e) => {
        if (e.type === 'setActiveTab' && e.detail) {
          setActiveTab(e.detail);
        }
      };
      window.addEventListener('setActiveTab', handleTabEvent);
      return () => window.removeEventListener('setActiveTab', handleTabEvent);
    }, []);
  const [activeTab, setActiveTab] = useState('library');
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Attention Is All You Need",
      firstAuthor: "Ashish Vaswani",
      researchDomain: "Computer Science",
      readingStage: "Fully Read",
      citationCount: 85000,
      impactScore: "High Impact",
      dateAdded: "2023-10-15",
    },
    {
      id: 2,
      title: "BERT: Pre-training of Deep Bidirectional Transformers",
      firstAuthor: "Jacob Devlin",
      researchDomain: "Computer Science",
      readingStage: "Methodology Done",
      citationCount: 45000,
      impactScore: "High Impact",
      dateAdded: "2023-11-20",
    },
    {
      id: 3,
      title: "AlphaFold: Accurate Structure Prediction",
      firstAuthor: "John Jumper",
      researchDomain: "Biology",
      readingStage: "Results Analyzed",
      citationCount: 12000,
      impactScore: "High Impact",
      dateAdded: "2023-12-05",
    },
    {
      id: 4,
      title: "Reinforcement Learning: A Survey",
      firstAuthor: "Richard Sutton",
      researchDomain: "Computer Science",
      readingStage: "Abstract Read",
      citationCount: 5000,
      impactScore: "Medium Impact",
      dateAdded: "2024-01-25",
    },
    {
      id: 5,
      title: "Quantum Supremacy Using a Programmable Processor",
      firstAuthor: "John Martinis",
      researchDomain: "Physics",
      readingStage: "Methodology Done",
      citationCount: 3000,
      impactScore: "High Impact",
      dateAdded: "2024-01-18",
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    firstAuthor: '',
    researchDomain: 'Computer Science',
    readingStage: 'Abstract Read',
    citationCount: 0,
    impactScore: 'Unknown',
    dateAdded: new Date().toISOString().split('T')[0]
  });

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    readingStage: [],
    researchDomain: [],
    impactScore: [],
    dateRange: 'all'
  });

  // Filter options
  const readingStages = [
    'Abstract Read',
    'Introduction Done',
    'Methodology Done',
    'Results Analyzed',
    'Fully Read',
    'Notes Completed'
  ];

  const researchDomains = [
    'Computer Science',
    'Biology',
    'Physics',
    'Chemistry',
    'Mathematics',
    'Social Sciences'
  ];

  const impactScores = [
    'High Impact',
    'Medium Impact',
    'Low Impact',
    'Unknown'
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'citationCount' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPaper = {
      id: papers.length + 1,
      ...formData
    };
    setPapers([...papers, newPaper]);
    setFormData({
      title: '',
      firstAuthor: '',
      researchDomain: 'Computer Science',
      readingStage: 'Abstract Read',
      citationCount: 0,
      impactScore: 'Unknown',
      dateAdded: new Date().toISOString().split('T')[0]
    });
    setActiveTab('library');
    alert('Paper added successfully!');
  };

  const handleDeletePaper = (id) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      setPapers(papers.filter(paper => paper.id !== id));
    }
  };

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'dateRange') {
      setFilters({ ...filters, dateRange: value });
    } else {
      const currentValues = filters[filterType];
      if (currentValues.includes(value)) {
        setFilters({
          ...filters,
          [filterType]: currentValues.filter(item => item !== value)
        });
      } else {
        setFilters({
          ...filters,
          [filterType]: [...currentValues, value]
        });
      }
    }
  };

  const handleClearFilters = () => {
    setFilters({
      readingStage: [],
      researchDomain: [],
      impactScore: [],
      dateRange: 'all'
    });
  };

  const filteredPapers = papers.filter(paper => {
    // Filter by reading stage
    if (filters.readingStage.length > 0 && !filters.readingStage.includes(paper.readingStage)) {
      return false;
    }
    
    // Filter by research domain
    if (filters.researchDomain.length > 0 && !filters.researchDomain.includes(paper.researchDomain)) {
      return false;
    }
    
    // Filter by impact score
    if (filters.impactScore.length > 0 && !filters.impactScore.includes(paper.impactScore)) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange !== 'all') {
      const paperDate = new Date(paper.dateAdded);
      const now = new Date();
      let cutoffDate = new Date();
      
      switch(filters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case '3months':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
      }
      
      if (paperDate < cutoffDate) {
        return false;
      }
    }
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCitationCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  // Calculate analytics
  const totalPapers = papers.length;
  const fullyRead = papers.filter(p => p.readingStage === 'Fully Read').length;
  const completionRate = ((fullyRead / totalPapers) * 100).toFixed(1);
  const highImpactCount = papers.filter(p => p.impactScore === 'High Impact').length;
  const totalCitations = papers.reduce((sum, paper) => sum + paper.citationCount, 0);
  const avgCitations = Math.round(totalCitations / totalPapers);

  // Profile dropdown state
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileBtnRef = useRef(null);
  // Simulate user info (for demo)
  const user = { name: 'John Doe', email: 'john@example.com' };

  // Handle outside click for dropdown
  React.useEffect(() => {
          {activeTab === 'settings' && (
            <div className="settings centered-header">
              <h2>Settings</h2>
              <div style={{margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center'}}>
                {!isLoggedIn ? (
                  <button className="btn btn-primary" style={{minWidth: 180}} onClick={handleLogin}>Login</button>
                ) : (
                  <button className="btn btn-secondary" style={{minWidth: 180}} onClick={handleLogout}>Logout</button>
                )}
                <button className="btn btn-primary" style={{minWidth: 180}} onClick={() => setActiveTab('library')}>Go to Paper Library</button>
              </div>
            </div>
          )}
    function handleClickOutside(event) {
      if (profileBtnRef.current && !profileBtnRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown]);

  // Handle login/signup logic
  // Show login page
  const handleShowLogin = () => {
    setActiveTab('login');
    setShowProfileDropdown(false);
  };
  // Show signup page
  const handleShowSignup = () => {
    setActiveTab('signup');
    setShowProfileDropdown(false);
  };

  // Actually log in (from login page)
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('library');
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    setActiveTab('library');
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Research Paper Tracker</h1>
        </div>
        <div className="nav-links">
          <button 
            className={`nav-link ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            Paper Library
          </button>
          <button 
            className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Paper
          </button>
          <button 
            className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
        {/* Profile Button */}
        <div style={{ position: 'relative', marginLeft: '1rem' }}>
          <button
            className="profile-btn"
            ref={profileBtnRef}
            onClick={() => {
              if (!isLoggedIn) {
                setActiveTab('login');
                setShowProfileDropdown(false);
              } else {
                setShowProfileDropdown((v) => !v);
              }
            }}
            aria-label="Profile"
          >
            <span className="bg-white p-2 rounded-full border border-white-200">
              <i className="ri-user-3-line text-xl text-gray-700"></i>
            </span>
          </button>
          {showProfileDropdown && isLoggedIn && (
            <div className="profile-dropdown">
              <div style={{ padding: '0.75rem 1.5rem', color: '#60a5fa', fontWeight: 600 }}>
                {user.name}<br />
                <span style={{ fontSize: '0.9em', color: '#cbd5e1' }}>{user.email}</span>
              </div>
              <button className="profile-dropdown-btn" onClick={() => { setActiveTab('profile'); setShowProfileDropdown(false); }}>
                Profile
              </button>
              <button className="profile-dropdown-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div className="sidebar">
        <button 
          className={`sidebar-link ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('library')}
        >
          Paper Library
        </button>
        <button 
          className={`sidebar-link ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Paper
        </button>
        <button 
          className={`sidebar-link ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`sidebar-link ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Main Content */}
      <main className="main-content full-page-section">
        {activeTab === 'profile' && isLoggedIn && (
          <Profile />
        )}
        {activeTab === 'settings' && (
          <Settings
            isLoggedIn={isLoggedIn}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onGoLibrary={() => setActiveTab('library')}
          />
        )}
        {activeTab === 'login' && (
          <Login />
        )}
        {activeTab === 'signup' && (
          <Signup />
        )}
        {activeTab === 'library' && (
          <div className="library">
            <div className="library-header centered-header">
              <h2>Paper Library</h2>
              <p>Track and manage your research papers</p>
              <div className="header-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('add')}
                >
                  Add Paper
                </button>
              </div>
            </div>

            {/* Filter Section */}
            {showFilters && (
              <div className="filter-section">
                <div className="filter-header">
                  <h3>Filters</h3>
                  <button 
                    className="btn-clear-filters"
                    onClick={handleClearFilters}
                  >
                    Clear all
                  </button>
                </div>

                <div className="filter-groups">
                  {/* Reading Stage Filter */}
                  <div className="filter-group">
                    <h4>Reading Stage</h4>
                    <div className="filter-options">
                      {readingStages.map(stage => (
                        <button
                          key={stage}
                          className={`filter-option ${filters.readingStage.includes(stage) ? 'active' : ''}`}
                          onClick={() => handleFilterChange('readingStage', stage)}
                        >
                          {stage}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Research Domain Filter */}
                  <div className="filter-group">
                    <h4>Research Domain</h4>
                    <div className="filter-options">
                      {researchDomains.map(domain => (
                        <button
                          key={domain}
                          className={`filter-option ${filters.researchDomain.includes(domain) ? 'active' : ''}`}
                          onClick={() => handleFilterChange('researchDomain', domain)}
                        >
                          {domain}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Impact Score Filter */}
                  <div className="filter-group">
                    <h4>Impact Score</h4>
                    <div className="filter-options">
                      {impactScores.map(score => (
                        <button
                          key={score}
                          className={`filter-option ${filters.impactScore.includes(score) ? 'active' : ''}`}
                          onClick={() => handleFilterChange('impactScore', score)}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div className="filter-group">
                    <h4>Date Added</h4>
                    <div className="filter-options">
                      {dateRanges.map(range => (
                        <button
                          key={range.value}
                          className={`filter-option ${filters.dateRange === range.value ? 'active' : ''}`}
                          onClick={() => handleFilterChange('dateRange', range.value)}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {(filters.readingStage.length > 0 || 
                  filters.researchDomain.length > 0 || 
                  filters.impactScore.length > 0 || 
                  filters.dateRange !== 'all') && (
                  <div className="active-filters">
                    <h4>Active Filters</h4>
                    <div className="active-filter-tags">
                      {filters.readingStage.map(stage => (
                        <span key={stage} className="active-filter-tag">
                          {stage}
                          <button 
                            onClick={() => handleFilterChange('readingStage', stage)}
                            className="remove-filter"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {filters.researchDomain.map(domain => (
                        <span key={domain} className="active-filter-tag">
                          {domain}
                          <button 
                            onClick={() => handleFilterChange('researchDomain', domain)}
                            className="remove-filter"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {filters.impactScore.map(score => (
                        <span key={score} className="active-filter-tag">
                          {score}
                          <button 
                            onClick={() => handleFilterChange('impactScore', score)}
                            className="remove-filter"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {filters.dateRange !== 'all' && (
                        <span className="active-filter-tag">
                          {dateRanges.find(r => r.value === filters.dateRange)?.label}
                          <button 
                            onClick={() => handleFilterChange('dateRange', 'all')}
                            className="remove-filter"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Papers Grid */}
            <div className="papers-grid">
              {filteredPapers.length > 0 ? (
                filteredPapers.map(paper => (
                  <div key={paper.id} className="paper-card">
                    <div className="paper-card-header">
                      <h3>{paper.title}</h3>
                      <p className="author">{paper.firstAuthor}</p>
                    </div>
                    <div className="paper-card-badges">
                      <span className={`badge impact-${paper.impactScore.toLowerCase().replace(' ', '-')}`}>
                        {paper.impactScore}
                      </span>
                      <span className="badge stage">
                        {paper.readingStage}
                      </span>
                      <span className="badge domain">
                        {paper.researchDomain}
                      </span>
                    </div>
                    <div className="paper-card-stats">
                      <div className="stat">
                        <div className="stat-value">{formatCitationCount(paper.citationCount)}</div>
                        <div className="stat-label">Citations</div>
                      </div>
                      <div className="stat">
                        <div className="stat-value">{formatDate(paper.dateAdded)}</div>
                        <div className="stat-label">Added</div>
                      </div>
                    </div>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDeletePaper(paper.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-papers-message">
                  <h3>No papers found</h3>
                  <p>Try adjusting your filters or add a new paper.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveTab('add')}
                  >
                    Add Your First Paper
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-value">{filteredPapers.length}</div>
                <div className="stat-card-label">Total Papers</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">
                  {filteredPapers.filter(p => p.readingStage === 'Fully Read').length}
                </div>
                <div className="stat-card-label">Fully Read</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">
                  {filteredPapers.filter(p => p.impactScore === 'High Impact').length}
                </div>
                <div className="stat-card-label">High Impact</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">
                  {formatCitationCount(
                    filteredPapers.length > 0 
                      ? Math.round(filteredPapers.reduce((sum, p) => sum + p.citationCount, 0) / filteredPapers.length)
                      : 0
                  )}
                </div>
                <div className="stat-card-label">Avg Citations</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="add-paper">
            <h2>Add New Paper</h2>
            <p>Enter the details of the research paper you want to track</p>
            
            <form onSubmit={handleSubmit} className="paper-form">
              <div className="form-group">
                <label>Paper Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter the paper title"
                />
              </div>

              <div className="form-group">
                <label>First Author Name *</label>
                <input
                  type="text"
                  name="firstAuthor"
                  value={formData.firstAuthor}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter first author name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Research Domain *</label>
                  <select
                    name="researchDomain"
                    value={formData.researchDomain}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Sciences">Social Sciences</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Reading Stage *</label>
                  <select
                    name="readingStage"
                    value={formData.readingStage}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Abstract Read">Abstract Read</option>
                    <option value="Introduction Done">Introduction Done</option>
                    <option value="Methodology Done">Methodology Done</option>
                    <option value="Results Analyzed">Results Analyzed</option>
                    <option value="Fully Read">Fully Read</option>
                    <option value="Notes Completed">Notes Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Citation Count</label>
                  <input
                    type="number"
                    name="citationCount"
                    value={formData.citationCount}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Enter citation count"
                  />
                </div>

                <div className="form-group">
                  <label>Impact Score</label>
                  <select
                    name="impactScore"
                    value={formData.impactScore}
                    onChange={handleInputChange}
                  >
                    <option value="Unknown">Unknown</option>
                    <option value="High Impact">High Impact</option>
                    <option value="Medium Impact">Medium Impact</option>
                    <option value="Low Impact">Low Impact</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Date Added</label>
                <input
                  type="date"
                  name="dateAdded"
                  value={formData.dateAdded}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setActiveTab('library')}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Paper
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics">
            <h2>Reading Analytics</h2>
            <p>Track your progress and paper statistics</p>

            <div className="analytics-stats">
              <div className="stat-card">
                <div className="stat-card-value">{totalPapers}</div>
                <div className="stat-card-label">Total Papers</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{fullyRead}</div>
                <div className="stat-card-label">Fully Read</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{completionRate}%</div>
                <div className="stat-card-label">Completion Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">{formatCitationCount(avgCitations)}</div>
                <div className="stat-card-label">Avg Citations</div>
              </div>
            </div>

            <div className="charts-container">
              <div className="chart">
                <h3>Reading Progress Funnel</h3>
                <div className="chart-placeholder">
                  <div className="funnel-bar" style={{width: '100%', height: '50px', backgroundColor: '#3b82f6'}}>Abstract Read</div>
                  <div className="funnel-bar" style={{width: '80%', height: '50px', backgroundColor: '#60a5fa'}}>Introduction Done</div>
                  <div className="funnel-bar" style={{width: '60%', height: '50px', backgroundColor: '#93c5fd'}}>Methodology Done</div>
                  <div className="funnel-bar" style={{width: '40%', height: '50px', backgroundColor: '#bfdbfe'}}>Results Analyzed</div>
                  <div className="funnel-bar" style={{width: '20%', height: '50px', backgroundColor: '#dbeafe'}}>Fully Read</div>
                </div>
              </div>

              <div className="chart">
                <h3>Citations by Impact Score</h3>
                <div className="chart-placeholder">
                  <div className="scatter-plot">
                    <div className="scatter-point" style={{left: '10%', top: '20%', backgroundColor: '#ef4444'}}></div>
                    <div className="scatter-point" style={{left: '30%', top: '40%', backgroundColor: '#ef4444'}}></div>
                    <div className="scatter-point" style={{left: '50%', top: '60%', backgroundColor: '#f59e0b'}}></div>
                    <div className="scatter-point" style={{left: '70%', top: '30%', backgroundColor: '#3b82f6'}}></div>
                    <div className="scatter-point" style={{left: '90%', top: '80%', backgroundColor: '#ef4444'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart">
              <h3>Papers by Domain and Reading Stage</h3>
              <div className="chart-placeholder stacked-chart">
                <div className="stacked-bar">
                  <div className="stack" style={{width: '20%', backgroundColor: '#3b82f6'}}>CS</div>
                  <div className="stack" style={{width: '30%', backgroundColor: '#10b981'}}>Bio</div>
                  <div className="stack" style={{width: '15%', backgroundColor: '#8b5cf6'}}>Phy</div>
                  <div className="stack" style={{width: '25%', backgroundColor: '#f59e0b'}}>Chem</div>
                  <div className="stack" style={{width: '10%', backgroundColor: '#ef4444'}}>Math</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;