import axios from 'axios';

export default function () {
  if (process.client) {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
}
