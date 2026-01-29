import React, { useState, useEffect } from 'react';
import './App.css';
import PaperForm from './components/PaperForm';
import PaperCard from './components/PaperCard';
import Analytics from './components/Analytics';
import { paperService } from './services/api';

function App() {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [currentView, setCurrentView] = useState('papers');
  const [filterStage, setFilterStage] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPapers();
  }, []);

  useEffect(() => {
    filterPapers();
  }, [papers, filterStage, searchTerm]);

  const loadPapers = async () => {
    try {
      setLoading(true);
      const response = await paperService.getAllPapers();
      setPapers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load papers. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterPapers = () => {
    let filtered = papers;

    if (filterStage !== 'all') {
      filtered = filtered.filter(p => p.readingStage === filterStage);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(term) ||
        p.authors.toLowerCase().includes(term) ||
        (p.keywords && p.keywords.some(k => k.toLowerCase().includes(term)))
      );
    }

    setFilteredPapers(filtered);
  };

  const handleAddPaper = async (paperData) => {
    try {
      await paperService.createPaper(paperData);
      await loadPapers();
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add paper');
      console.error(err);
    }
  };

  const handleUpdatePaper = async (paperData) => {
    try {
      await paperService.updatePaper(editingPaper._id, paperData);
      await loadPapers();
      setEditingPaper(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to update paper');
      console.error(err);
    }
  };

  const handleDeletePaper = async (id) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      try {
        await paperService.deletePaper(id);
        await loadPapers();
        setError(null);
      } catch (err) {
        setError('Failed to delete paper');
        console.error(err);
      }
    }
  };

  const handleUpdateStage = async (id, newStage) => {
    try {
      await paperService.updatePaper(id, { readingStage: newStage });
      await loadPapers();
      setError(null);
    } catch (err) {
      setError('Failed to update stage');
      console.error(err);
    }
  };

  const handleEdit = (paper) => {
    setEditingPaper(paper);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingPaper(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Research Paper Reading Tracker</h1>
        <p>Efficiently manage, track, and analyze your academic reading progress</p>
      </header>

      <nav className="app-nav">
        <button 
          className={currentView === 'papers' ? 'active' : ''}
          onClick={() => setCurrentView('papers')}
        >
          Papers
        </button>
        <button 
          className={currentView === 'analytics' ? 'active' : ''}
          onClick={() => setCurrentView('analytics')}
        >
          Analytics
        </button>
      </nav>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {currentView === 'analytics' ? (
          <Analytics />
        ) : (
          <>
            <div className="toolbar">
              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <select 
                  value={filterStage} 
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Stages</option>
                  <option value="to-read">To Read</option>
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Cancel' : '+ Add Paper'}
              </button>
            </div>

            {showForm && (
              <div className="form-container">
                <PaperForm
                  paper={editingPaper}
                  onSubmit={editingPaper ? handleUpdatePaper : handleAddPaper}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

            {loading ? (
              <div className="loading">Loading papers...</div>
            ) : filteredPapers.length === 0 ? (
              <div className="empty-state">
                <p>No papers found. {papers.length === 0 ? 'Add your first paper to get started!' : 'Try adjusting your filters.'}</p>
              </div>
            ) : (
              <div className="papers-grid">
                {filteredPapers.map(paper => (
                  <PaperCard
                    key={paper._id}
                    paper={paper}
                    onEdit={handleEdit}
                    onDelete={handleDeletePaper}
                    onUpdateStage={handleUpdateStage}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Research Paper Reading Tracker © 2026</p>
      </footer>
    </div>
  );
}

export default App;
