import axiosInstance from './axiosInstance';

const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  const data = response.data;

  if (data?.token) {
    localStorage.setItem('token', data.token);
  }

  if (data?.admin) {
    localStorage.setItem('admin', JSON.stringify(data.admin));
  }

  return data;
};

const getCurrentUser = () => {
  const admin = localStorage.getItem('admin');
  return admin ? JSON.parse(admin) : null;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
};

export const authService = {
  login,
  logout,
  getCurrentUser,
};
