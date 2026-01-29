import { format } from 'date-fns';

export const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), 'MMM dd, yyyy');
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatCitationCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

export const calculateCompletionRate = (papers) => {
  const total = papers.length;
  const completed = papers.filter(p => p.readingStage === 'Fully Read').length;
  return total > 0 ? ((completed / total) * 100).toFixed(1) : 0;
};

export const getAverageCitations = (papers) => {
  if (papers.length === 0) return 0;
  const total = papers.reduce((sum, paper) => sum + paper.citationCount, 0);
  return Math.round(total / papers.length);
};

export const filterPapers = (papers, filters) => {
  return papers.filter(paper => {
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
};