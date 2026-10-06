import axios, { type InternalAxiosRequestConfig } from "axios";
import { triggerLogout } from "../utils/authUtils";
import { api, API_BASE } from "./axios";

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

export interface DefaultResponse {
	status: string;
	error: string | undefined;
}

export interface AuthResponse {
	access_token: string;
}

export interface GetMeResponse {
	user_login: string;
	user_email: string;
	user_role: string;
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
	try {
		const response = await api.post<AuthResponse>("/auth/login", data);
		return response.data;
	} catch (e: any) {
		if (axios.isAxiosError<DefaultResponse>(e)) {
			throw new Error(e.response?.data.error || "Login failed");
		}

		throw new Error("Unexpected error");
	}
}

export async function logoutUser(): Promise<DefaultResponse> {
	try {
		const response = await api.post<DefaultResponse>("/auth/logout");
		return response.data;
	} catch (e: any) {
		if (axios.isAxiosError<DefaultResponse>(e)) {
			throw new Error(e.response?.data.error || "Login failed");
		}

		throw new Error("Unexpected error");
	}
}

export async function registerUser(data: RegisterRequest): Promise<DefaultResponse> {
	try {
		const response = await api.post<DefaultResponse>("/auth/register", data);
		return response.data;
	} catch (e: any) {
		if (axios.isAxiosError<DefaultResponse>(e)) {
			throw new Error(e.response?.data.error || "Login failed");
		}

		throw new Error("Unexpected error");
	}
}

export async function verifyUser(data: VerifyRequest): Promise<DefaultResponse> {
	try {
		const response = await api.post<DefaultResponse>("/auth/verify", data);
		return response.data;
	} catch (e: any) {
		if (axios.isAxiosError<DefaultResponse>(e)) {
			throw new Error(e.response?.data.error || "Login failed");
		}

		throw new Error("Unexpected error");
	}
}

export async function getMe(): Promise<GetMeResponse> {
	try {
		const response = await api.get<GetMeResponse>("/auth/me");
		return response.data;
	} catch (e: any) {
		if (axios.isAxiosError<DefaultResponse>(e)) {
			throw new Error(e.response?.data.error || "Login failed");
		}

		throw new Error("Unexpected error");
	}
}

let refreshPromise: Promise<AuthResponse> | null = null;

function refreshAccessToken(): Promise<AuthResponse> {
	refreshPromise ??= axios
		.post<AuthResponse>(`${API_BASE}/auth/refresh`, undefined, { withCredentials: true })
		.then((resp) => {
			localStorage.setItem("access_token", resp.data.access_token);
			return resp.data;
		})
		.finally(() => {
			refreshPromise = null;
		});

	return refreshPromise;
}

interface RetriableConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

const AUTH_PATHS = ["/auth/login", "/auth/register", "/auth/verify", "/auth/refresh"];

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const config = error.config as RetriableConfig | undefined;
		const isAuthPath = AUTH_PATHS.some((p) => config?.url?.includes(p));

		if (error.response?.status !== 401 || !config || config._retry || isAuthPath) {
			return Promise.reject(error);
		}

		config._retry = true;

		try {
			await refreshAccessToken();
			return api(config);
		} catch {
			triggerLogout();
			return Promise.reject(error);
		}
	},
);
