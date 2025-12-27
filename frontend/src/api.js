// Axios instance for API calls
import axios from 'axios';

// Replace baseURL with your deployed backend URL after deployment
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // Redirect to login on unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
