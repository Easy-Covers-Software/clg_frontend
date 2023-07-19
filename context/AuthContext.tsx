import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cookies from "js-cookie";

const CLIENT_ID =
  "464586598349-3uu0huc0df86brd568ikatpa9avg015m.apps.googleusercontent.com";

const API_BASE = "https://localhost:8000";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

interface TokenResponse {
  access: string;
  access_expires: number;
}

const makeUrl = (endpoint: string): string => {
  return API_BASE + endpoint;
};

const fetchToken = (username: string, password: string): Promise<Response> => {
  const url = makeUrl("/token/");
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

const fetchNewToken = (): Promise<Response> => {
  const url = makeUrl("/token/refresh/");
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};

type AuthContextProps = {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<Response>;
  logout: () => void;
  getToken: () => Promise<string>;
};

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps): React.ReactNode => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | any>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const setNotAuthenticated = (): void => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser(null);
  };

  const toggleLoginIsOpen = () => {
    setIsLoginOpen((prevState) => !prevState);
  };

  const toggleSettingsIsOpen = () => {
    setIsSettingsOpen((prevState) => !prevState);
  };

  async function fetchUser(): Promise<Response> {
    const url = "https://localhost:8000/users/me/";

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });
      console.log(response);
      return response.data.user;
    } catch (error) {
      console.log("Error fetching user");
      console.log(error);
    }
  }

  const initUser = async (): Promise<void> => {
    const user = await fetchUser();
    setUser(user);
  };

  const signInGoogle = async () => {
    const parameters = {
      client_id:
        "464586598349-3uu0huc0df86brd568ikatpa9avg015m.apps.googleusercontent.com",
      redirect_uri: "https://localhost:8000/users/auth/finish_google_login/",
      response_type: "code",
      scope: "email profile openid",
      access_type: "offline",
      prompt: "consent",
    };

    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    Object.keys(parameters).forEach((key) =>
      url.searchParams.append(key, parameters[key])
    );
    window.location.href = url.toString();
  };

  const logout = async () => {
    const url = "https://localhost:8000/users/logout/";

    try {
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("Error logging out user");
      console.log(error);
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  console.log("isSettingsOpen", isSettingsOpen);

  const value = {
    isAuthenticated,
    user,
    loading,
    isLoginOpen,
    isSettingsOpen,
    toggleLoginIsOpen,
    toggleSettingsIsOpen,
    fetchUser,
    signInGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => useContext(AuthContext);
