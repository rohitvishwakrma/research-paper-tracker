import { usePapers } from '../context/PaperContext';

export const usePaperActions = () => {
  const { addPaper, updatePaper, deletePaper } = usePapers();
  
  return {
    addPaper,
    updatePaper,
    deletePaper
  };
};

export const usePaperFilters = () => {
  const { filters, setFilters } = usePapers();
  
  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      readingStages: [],
      researchDomains: [],
      impactScores: [],
      dateRange: 'all',
    });
  };
  
  return {
    filters,
    updateFilter,
    clearFilters
  };
};