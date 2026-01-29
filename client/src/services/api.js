import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const paperService = {
  getAllPapers: () => api.get('/papers'),
  getPaper: (id) => api.get(`/papers/${id}`),
  createPaper: (paper) => api.post('/papers', paper),
  updatePaper: (id, paper) => api.put(`/papers/${id}`, paper),
  deletePaper: (id) => api.delete(`/papers/${id}`),
  getAnalytics: () => api.get('/papers/analytics/stats'),
};

export default api;
