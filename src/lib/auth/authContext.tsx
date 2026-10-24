import { createContext } from "react";
import {
	type LoginRequest,
	type RegisterRequest,
} from "../api/authApi";

export interface User {
	login: string;
	email: string;
	description: string;
}

export interface AuthContextType {
	user: User | null;
	isAuth: boolean;
	isLoading: boolean;
	login: (data: LoginRequest) => Promise<void>;
	register: (data: RegisterRequest) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
