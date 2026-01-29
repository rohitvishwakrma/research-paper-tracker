import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const PaperContext = createContext();

const initialPapers = [
  {
    id: '1',
    title: "Attention Is All You Need",
    firstAuthor: "Ashish Vaswani",
    researchDomain: "Computer Science",
    readingStage: "Fully Read",
    citationCount: 85000,
    impactScore: "High Impact",
    dateAdded: "2023-10-15",
    createdAt: new Date('2023-10-15').getTime(),
  },
  {
    id: '2',
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    firstAuthor: "Jacob Devlin",
    researchDomain: "Computer Science",
    readingStage: "Methodology Done",
    citationCount: 45000,
    impactScore: "High Impact",
    dateAdded: "2023-11-20",
    createdAt: new Date('2023-11-20').getTime(),
  },
  {
    id: '3',
    title: "AlphaFold: Accurate Structure Prediction",
    firstAuthor: "John Jumper",
    researchDomain: "Biology",
    readingStage: "Results Analyzed",
    citationCount: 12000,
    impactScore: "High Impact",
    dateAdded: "2023-12-05",
    createdAt: new Date('2023-12-05').getTime(),
  },
  {
    id: '4',
    title: "The Discovery of Gravitational Waves",
    firstAuthor: "Rainer Weiss",
    researchDomain: "Physics",
    readingStage: "Introduction Done",
    citationCount: 8000,
    impactScore: "High Impact",
    dateAdded: "2024-01-10",
    createdAt: new Date('2024-01-10').getTime(),
  },
  {
    id: '5',
    title: "CRISPR-Cas9 Genome Editing",
    firstAuthor: "Jennifer Doudna",
    researchDomain: "Biology",
    readingStage: "Notes Completed",
    citationCount: 15000,
    impactScore: "High Impact",
    dateAdded: "2023-11-30",
    createdAt: new Date('2023-11-30').getTime(),
  },
  {
    id: '6',
    title: "Reinforcement Learning: A Survey",
    firstAuthor: "Richard Sutton",
    researchDomain: "Computer Science",
    readingStage: "Abstract Read",
    citationCount: 5000,
    impactScore: "Medium Impact",
    dateAdded: "2024-01-25",
    createdAt: new Date('2024-01-25').getTime(),
  },
  {
    id: '7',
    title: "Quantum Supremacy Using a Programmable Processor",
    firstAuthor: "John Martinis",
    researchDomain: "Physics",
    readingStage: "Methodology Done",
    citationCount: 3000,
    impactScore: "High Impact",
    dateAdded: "2024-01-18",
    createdAt: new Date('2024-01-18').getTime(),
  },
];

export const PaperProvider = ({ children }) => {
  const [papers, setPapers] = useState(() => {
    const saved = localStorage.getItem('research-papers');
    return saved ? JSON.parse(saved) : initialPapers;
  });

  const [filters, setFilters] = useState({
    readingStages: [],
    researchDomains: [],
    impactScores: [],
    dateRange: 'all',
  });

  // Save to localStorage whenever papers change
  useEffect(() => {
    localStorage.setItem('research-papers', JSON.stringify(papers));
  }, [papers]);

  const addPaper = (paperData) => {
    const newPaper = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      ...paperData,
    };
    setPapers([newPaper, ...papers]);
    toast.success('Paper added successfully!');
  };

  const updatePaper = (id, paperData) => {
    setPapers(papers.map(paper => 
      paper.id === id ? { ...paper, ...paperData } : paper
    ));
    toast.success('Paper updated successfully!');
  };

  const deletePaper = (id) => {
    setPapers(papers.filter(paper => paper.id !== id));
    toast.success('Paper deleted successfully!');
  };

  const filteredPapers = papers.filter(paper => {
    // Filter by reading stage
    if (filters.readingStages.length > 0 && 
        !filters.readingStages.includes(paper.readingStage)) {
      return false;
    }

    // Filter by research domain
    if (filters.researchDomains.length > 0 && 
        !filters.researchDomains.includes(paper.researchDomain)) {
      return false;
    }

    // Filter by impact score
    if (filters.impactScores.length > 0 && 
        !filters.impactScores.includes(paper.impactScore)) {
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
        default:
          return true;
      }

      if (paperDate < cutoffDate) {
        return false;
      }
    }

    return true;
  });

  // Analytics computation
  const getAnalytics = () => {
    // Summary
    const totalPapers = papers.length;
    const totalCitations = papers.reduce((sum, p) => sum + (p.citationCount || 0), 0);
    const domains = [...new Set(papers.map(p => p.researchDomain))];
    const summary = {
      totalPapers,
      totalCitations,
      domains: domains.length,
    };

    // Funnel Data (example: count by readingStage)
    const readingStages = [
      'Abstract Read',
      'Introduction Done',
      'Methodology Done',
      'Results Analyzed',
      'Notes Completed',
      'Fully Read',
    ];
    const funnelData = readingStages.map(stage => ({
      stage,
      count: papers.filter(p => p.readingStage === stage).length,
    }));

    // Scatter Data (example: citations by impactScore)
    const impactScores = [...new Set(papers.map(p => p.impactScore))];
    const scatterData = impactScores.map(score => ({
      impactScore: score,
      citations: papers.filter(p => p.impactScore === score).reduce((sum, p) => sum + (p.citationCount || 0), 0),
    }));

    // Stacked Bar Data (example: count by domain and readingStage)
    const stackedBarData = domains.map(domain => {
      const domainPapers = papers.filter(p => p.researchDomain === domain);
      const data = { domain };
      readingStages.forEach(stage => {
        data[stage] = domainPapers.filter(p => p.readingStage === stage).length;
      });
      return data;
    });

    // Domain Citations (average citations per domain)
    const domainCitations = domains.map(domain => {
      const domainPapers = papers.filter(p => p.researchDomain === domain);
      const avgCitations = domainPapers.length > 0 ? Math.round(domainPapers.reduce((sum, p) => sum + (p.citationCount || 0), 0) / domainPapers.length) : 0;
      return { domain, avgCitations };
    });

    return {
      summary,
      funnelData,
      scatterData,
      stackedBarData,
      domainCitations,
    };
  };

  return (
    <PaperContext.Provider value={{
      papers,
      filteredPapers,
      filters,
      addPaper,
      updatePaper,
      deletePaper,
      setFilters,
      getAnalytics,
    }}>
      {children}
    </PaperContext.Provider>
  );
};

export const usePapers = () => useContext(PaperContext);