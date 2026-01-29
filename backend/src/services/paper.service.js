import Paper from '../models/Paper.model.js';
import { buildDateFilter } from '../utils/dateFilters.js';

const paperService = {
  // Add a new paper
  async createPaper(paperData) {
    const paper = new Paper(paperData);
    return await paper.save();
  },

  // Get all papers with filters
  async getPapers(filters = {}) {
    const {
      search = '',
      domain = '',
      stage = '',
      impact = '',
      dateFilter = 'allTime',
      sortBy = 'dateAdded',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = filters;

    // Build query
    const query = {};

    // Search in title and author
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { firstAuthor: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by research domain
    if (domain) {
      query.researchDomain = domain;
    }

    // Filter by reading stage
    if (stage) {
      query.readingStage = stage;
    }

    // Filter by impact score
    if (impact) {
      query.impactScore = impact;
    }

    // Apply date filter
    const dateFilterObj = buildDateFilter(dateFilter);
    Object.assign(query, dateFilterObj);

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [papers, total] = await Promise.all([
      Paper.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Paper.countDocuments(query),
    ]);

    return {
      papers,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    };
  },

  // Get paper by ID
  async getPaperById(id) {
    return await Paper.findById(id);
  },

  // Update paper
  async updatePaper(id, updateData) {
    return await Paper.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
  },

  // Delete paper
  async deletePaper(id) {
    return await Paper.findByIdAndDelete(id);
  },

  // Get paper statistics
  async getPaperStats() {
    const stats = await Paper.aggregate([
      {
        $group: {
          _id: null,
          totalPapers: { $sum: 1 },
          totalCitations: { $sum: '$citationCount' },
          avgCitations: { $avg: '$citationCount' },
        },
      },
      {
        $project: {
          _id: 0,
          totalPapers: 1,
          totalCitations: 1,
          avgCitations: { $round: ['$avgCitations', 2] },
        },
      },
    ]);

    return stats[0] || { totalPapers: 0, totalCitations: 0, avgCitations: 0 };
  },
};

export default paperService;