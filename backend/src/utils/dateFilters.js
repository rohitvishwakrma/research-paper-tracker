const getDateRange = (filterType) => {
  const now = new Date();
  let startDate;

  switch (filterType) {
    case 'thisWeek':
      // Start of current week (Sunday)
      startDate = new Date(now);
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
      break;

    case 'thisMonth':
      // Start of current month
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case 'last3Months':
      // 3 months ago
      startDate = new Date(now);
      startDate.setMonth(now.getMonth() - 3);
      break;

    case 'allTime':
    default:
      return null; // No date filter
  }

  return startDate;
};

const buildDateFilter = (filterType) => {
  const startDate = getDateRange(filterType);
  
  if (!startDate) return {};
  
  return {
    dateAdded: { $gte: startDate }
  };
};

module.exports = {
  getDateRange,
  buildDateFilter,
};