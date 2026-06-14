import axios from 'axios'

export const API_BASE = 'http://localhost:2244/api/v1'

export const api = axios.create({
	baseURL: API_BASE,
	withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
