import { api } from "./axios";
import { triggerLogout } from "./utils/authUtils";

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  login: string;
  email: string;
  password: string;
	description: string;
}

export interface VerifyRequest {
  login: string;
  code: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface DefaultResponse {
	status: string;
	error: string | undefined;
}

export interface GetMeResponse {
  user_login: string;
	user_email: string;
	user_description: string;
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
}

export async function refreshUser(): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/refresh", undefined);
  return response.data;
}

export async function registerUser(data: RegisterRequest): Promise<DefaultResponse> {
  const response = await api.post<DefaultResponse>("/auth/register", data);
  return response.data;
}

export async function verifyUser(data: VerifyRequest): Promise<DefaultResponse> {
  const response = await api.post<DefaultResponse>("/auth/verify", data);
  return response.data;
}

export async function getMe(): Promise<GetMeResponse> {
  const response = await api.get<GetMeResponse>("/auth/me");
  return response.data;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const original = error.config;

    if (original.url?.includes("/auth/refresh")) {
      triggerLogout()
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    return refreshUser()
      .then((resp) => {
        localStorage.setItem("access_token", resp.access_token)
        return api(original)
      })
      .catch((err) => {
        console.log("Error try to refresh token", err);
        triggerLogout()
      })
  }
);