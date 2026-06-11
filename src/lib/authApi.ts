import { api } from "./axios";

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

export interface AuthResponse {
  token: string;
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

export async function registerUser(data: RegisterRequest): Promise<DefaultResponse> {
  const response = await api.post<DefaultResponse>("/auth/register", data);
  return response.data;
}

export async function getMe(): Promise<GetMeResponse> {
  const response = await api.get<GetMeResponse>("/auth/me");
  return response.data;
}