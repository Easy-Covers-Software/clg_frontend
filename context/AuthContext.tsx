import React, { useState, useEffect, useContext } from "react";
import https from "https";

import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { init } from "next/dist/compiled/@vercel/og/satori";

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

  const setNotAuthenticated = (): void => {
    setIsAuthenticated(false);
    setLoading(false);
    setUser(null);
  };

  async function fetchUser(): Promise<Response> {
    // const url = makeUrl("/users/me/");
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

  // const login = async (
  //   username: string,
  //   password: string
  // ): Promise<Response> => {
  //   const resp = await fetchToken(username, password);
  //   if (resp.ok) {
  //     const tokenData = await resp.json();
  //     handleNewToken(tokenData);
  //     await initUser(tokenData.access);
  //   } else {
  //     setIsAuthenticated(false);
  //     setLoading(true);
  //     // Let the page handle the error
  //   }
  //   return resp;
  // };

  // const logout = (): void => {
  //   setAccessToken("");
  //   setAccessTokenExpiry(null);
  //   setNotAuthenticated();
  //   const url = makeUrl("/token/logout/");
  //   fetch(url, {
  //     method: "POST",
  //     credentials: "include",
  //   });
  // };

  useEffect(() => {
    initUser();
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => useContext(AuthContext);
