const Paper = require('../models/Paper.model');
const { buildDateFilter } = require('../utils/dateFilters');

const analyticsService = {
  // Funnel Analytics: Papers by reading stage
  async getFunnelAnalytics(filters = {}) {
    const { dateFilter = 'allTime' } = filters;
    const dateFilterObj = buildDateFilter(dateFilter);

    const funnelData = await Paper.aggregate([
      { $match: dateFilterObj },
      {
        $group: {
          _id: '$readingStage',
          count: { $sum: 1 },
          avgCitations: { $avg: '$citationCount' },
        },
      },
      {
        $project: {
          stage: '$_id',
          count: 1,
          avgCitations: { $round: ['$avgCitations', 2] },
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Ensure all stages are present
    const allStages = [
      'To Read',
      'Currently Reading',
      'Partially Read',
      'Fully Read',
      'Reviewed'
    ];

    return allStages.map(stage => {
      const found = funnelData.find(item => item.stage === stage);
      return found || { stage, count: 0, avgCitations: 0 };
    });
  },

  // Scatter Plot: Impact vs Citations
  async getScatterPlotData(filters = {}) {
    const { dateFilter = 'allTime' } = filters;
    const dateFilterObj = buildDateFilter(dateFilter);

    return await Paper.find(dateFilterObj)
      .select('title citationCount impactScore researchDomain readingStage')
      .lean();
  },

  // Stacked Bar: Papers by domain and impact
  async getStackedBarData(filters = {}) {
    const { dateFilter = 'allTime' } = filters;
    const dateFilterObj = buildDateFilter(dateFilter);

    return await Paper.aggregate([
      { $match: dateFilterObj },
      {
        $group: {
          _id: {
            domain: '$researchDomain',
            impact: '$impactScore',
          },
          count: { $sum: 1 },
          totalCitations: { $sum: '$citationCount' },
        },
      },
      {
        $group: {
          _id: '$_id.domain',
          impacts: {
            $push: {
              impact: '$_id.impact',
              count: '$count',
              totalCitations: '$totalCitations',
            },
          },
          totalPapers: { $sum: '$count' },
        },
      },
      {
        $project: {
          domain: '$_id',
          impacts: 1,
          totalPapers: 1,
          _id: 0,
        },
      },
      { $sort: { totalPapers: -1 } },
    ]);
  },

  // Summary Analytics Dashboard
  async getSummaryAnalytics(filters = {}) {
    const { dateFilter = 'allTime' } = filters;
    const dateFilterObj = buildDateFilter(dateFilter);

    const [
      totalStats,
      domainStats,
      stageStats,
      recentPapers,
    ] = await Promise.all([
      // Total statistics
      Paper.aggregate([
        { $match: dateFilterObj },
        {
          $group: {
            _id: null,
            totalPapers: { $sum: 1 },
            totalCitations: { $sum: '$citationCount' },
            avgCitations: { $avg: '$citationCount' },
            topCitedPaper: { $max: '$citationCount' },
          },
        },
      ]),

      // Papers by domain
      Paper.aggregate([
        { $match: dateFilterObj },
        {
          $group: {
            _id: '$researchDomain',
            count: { $sum: 1 },
            avgCitations: { $avg: '$citationCount' },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),

      // Papers by reading stage
      Paper.aggregate([
        { $match: dateFilterObj },
        {
          $group: {
            _id: '$readingStage',
            count: { $sum: 1 },
          },
        },
      ]),

      // Recent papers
      Paper.find(dateFilterObj)
        .sort({ dateAdded: -1 })
        .limit(5)
        .select('title firstAuthor researchDomain citationCount')
        .lean(),
    ]);

    return {
      summary: totalStats[0] || {
        totalPapers: 0,
        totalCitations: 0,
        avgCitations: 0,
        topCitedPaper: 0,
      },
      topDomains: domainStats,
      readingStageDistribution: stageStats,
      recentPapers,
    };
  },

  // Get available filters for frontend
  async getAvailableFilters() {
    const [domains, stages, impacts] = await Promise.all([
      Paper.distinct('researchDomain'),
      Paper.distinct('readingStage'),
      Paper.distinct('impactScore'),
    ]);

    return {
      domains: domains.sort(),
      stages: stages.sort(),
      impacts: impacts.sort(),
    };
  },
};

module.exports = analyticsService;