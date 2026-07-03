import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_URL

if (API_BASE === "") console.error("Api base is not set");

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
