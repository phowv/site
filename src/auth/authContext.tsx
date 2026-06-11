import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, registerUser, type DefaultResponse, type LoginRequest, type RegisterRequest } from "../lib/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
	login: string;
	email: string;
	description: string;
}

interface AuthContextType {
	user: User | null;
	isAuth: boolean;
	isLoading: boolean;
	login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    getMe()
      .then((userData) => {
        setUser({login: userData.user_login, email: userData.user_email, description: userData.user_description});
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.token);

      const userData = await getMe();
      setUser({login: userData.user_login, email: userData.user_email, description: userData.user_description});

      console.debug("fetched user data", userData);

    } catch (error: any) {
      localStorage.removeItem("token");
      setUser(null);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await registerUser(data);
      if (response.error !== undefined) {
        throw new Error("regisration error: " + response.error);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data["error"]);
      }

      throw error
    }	
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
		<AuthContext.Provider value={{
        user,
        isAuth: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}