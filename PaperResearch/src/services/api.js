
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BASE_URL = `${API_URL}/papers`;

export const addPaper = async (paper) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paper),
  });
  return res.json();
};

export const getPapers = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const getAnalytics = async () => {
  const res = await fetch(`${BASE_URL}/analytics`);
  return res.json();
};
