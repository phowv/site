import axios from 'axios'

export const API_BASE = import.meta.env.VITE_API_URL

console.debug("Api url: ", import.meta.env.VITE_API_URL)

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
