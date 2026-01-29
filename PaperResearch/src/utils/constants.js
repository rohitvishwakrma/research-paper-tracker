/* -------------------- Reading Stages -------------------- */
export const READING_STAGES = [
  'Abstract Read',
  'Introduction Done',
  'Methodology Done',
  'Results Analyzed',
  'Fully Read',
  'Notes Completed'
];

/* -------------------- Research Domains -------------------- */
export const RESEARCH_DOMAINS = [
  'Computer Science',
  'Biology',
  'Physics',
  'Chemistry',
  'Mathematics',
  'Social Sciences'
];

/* -------------------- Impact Scores -------------------- */
export const IMPACT_SCORES = [
  'High Impact',
  'Medium Impact',
  'Low Impact',
  'Unknown'
];

/* -------------------- Date Filters -------------------- */
export const DATE_RANGES = [
  { value: 'all', label: 'All Time' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: '3months', label: 'Last 3 Months' }
];

/* -------------------- Color Mappings -------------------- */
export const IMPACT_COLORS = {
  'High Impact': '#ef4444',
  'Medium Impact': '#f59e0b',
  'Low Impact': '#3b82f6',
  'Unknown': '#9ca3af'
};

export const STAGE_COLORS = {
  'Abstract Read': '#3b82f6',
  'Introduction Done': '#10b981',
  'Methodology Done': '#8b5cf6',
  'Results Analyzed': '#f59e0b',
  'Fully Read': '#ef4444',
  'Notes Completed': '#6366f1'
};

export const DOMAIN_COLORS = {
  'Computer Science': '#3b82f6',
  'Biology': '#10b981',
  'Physics': '#8b5cf6',
  'Chemistry': '#f59e0b',
  'Mathematics': '#ef4444',
  'Social Sciences': '#6366f1'
};
