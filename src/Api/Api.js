import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-api-eight-flax.vercel.app',
});

export const loginUser = async (email, password) => {
  const response = await api.post('/api/login', { email, password });
  return response.data; // { id, email, token }
};

export const fetchDashboardData = async (token) => {
  const response = await api.get('/dashboard', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default api;