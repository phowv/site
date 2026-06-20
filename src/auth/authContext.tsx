import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, registerUser, type LoginRequest, type RegisterRequest } from "../lib/authApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { subscribeToLogout, triggerLogout } from "../lib/utils/authUtils";

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
    subscribeToLogout(() => {
      localStorage.removeItem("access_token");
      setUser(null);
    })

    const token = localStorage.getItem("access_token");

    setIsLoading(true);

    if (!token) {
      setIsLoading(false);
    }
    
    getMe()
      .then((userData) => {
        setUser({login: userData.user_login, email: userData.user_email, description: userData.user_description});
      })
      .catch(() => {
        localStorage.removeItem("access_token");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data);
      localStorage.setItem("access_token", response.access_token);

      const userData = await getMe();
      setUser({login: userData.user_login, email: userData.user_email, description: userData.user_description});
      console.debug("fetched user data", userData);
      setIsLoading(false);

    } catch (error: any) {
      localStorage.removeItem("access_token");
      setUser(null);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setIsLoading(true);
      const response = await registerUser(data);
      if (response.error !== undefined) {
        throw new Error("regisration error: " + response.error);
      }
    } catch (error: unknown) {
      setIsLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data["error"]);
      }

      throw error
    }

    setIsLoading(false);
    navigate("/login");
  };

  const logout = () => {
    triggerLogout()
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