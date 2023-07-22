import React, { createContext, useContext, useReducer, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

import axios from "axios";
import Cookies from "js-cookie";

const CLIENT_ID =
  "464586598349-3uu0huc0df86brd568ikatpa9avg015m.apps.googleusercontent.com";

const PPAL_CLIENT_ID =
  "AdqQqoVIY7CmxhdsTPRwN6vQmUnMsR1QoxR5o2HcVbR1zI9W-XUq2PYVSfQf72htFWZSxL4A7XzqqE4s";

const API_BASE = "https://localhost:8000";

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = React.createContext({});

const initialState = {
  email: "",
  password: "",
  newPasswordRepeat: "",
  showPassword: false,
  showPasswordRepeat: false,
  loading: true,
  isAuthenticated: false,
  user: null,
  isLoginOpen: false,
  isSettingsOpen: false,
  createAccountEasyCovers: false,
  page: "generation-mode",
  snackbar: {
    open: false,
    type: "",
    message: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_NEW_PASSWORD_REPEAT":
      return { ...state, newPasswordRepeat: action.payload };
    case "SET_SHOW_PASSWORD":
      return { ...state, showPassword: action.payload };
    case "SET_SHOW_PASSWORD_REPEAT":
      return { ...state, showPasswordRepeat: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_IS_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_IS_LOGIN_OPEN":
      return { ...state, isLoginOpen: action.payload };
    case "SET_IS_SETTINGS_OPEN":
      return { ...state, isSettingsOpen: action.payload };
    case "SET_CREATE_ACCOUNT_EASY_COVERS":
      return { ...state, createAccountEasyCovers: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SNACKBAR":
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          ...action.payload,
        },
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const AuthProvider = ({
  children,
}: AuthProviderProps): React.ReactNode => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearInput = () => {
    dispatch({ type: "SET_EMAIL", payload: "" });
  };

  const handleClickShowPassword = () =>
    dispatch({ type: "SET_SHOW_PASSWORD", payload: !state.showPassword });

  const handleClickShowPasswordRepeat = () =>
    dispatch({
      type: "SET_SHOW_PASSWORD_REPEAT",
      payload: !state.showPasswordRepeat,
    });

  const setNotAuthenticated = (): void => {
    dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_USER", payload: null });
  };

  const toggleLoginIsOpen = () => {
    dispatch({ type: "SET_IS_LOGIN_OPEN", payload: !state.isLoginOpen });
  };

  const toggleSettingsIsOpen = () => {
    dispatch({ type: "SET_IS_SETTINGS_OPEN", payload: !state.isSettingsOpen });
  };

  const fetchUser = async (): Promise<Response> => {
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
  };

  const initUser = async (): Promise<void> => {
    const user = await fetchUser();
    dispatch({ type: "SET_USER", payload: user });
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

  const login = async () => {
    const url = "https://localhost:8000/users/auth/login/";

    const form = new FormData();
    form.append("email", state.email);
    form.append("password", state.password);

    try {
      const response = await axios.post(url, form, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        toggleLoginIsOpen();
        await initUser();
        updateSnackbar(true, "success", "Logged In Successfully");
        // window.location.reload();
      }
    } catch (error) {
      console.log("Error logging in");
      console.log(error);
      updateSnackbar(
        true,
        "error",
        `Error logging in: ${error.response.data.error}`
      );
    }
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
      if (response.status === 200 || response.status === 201) {
        setNotAuthenticated();
        updateSnackbar(true, "success", "Logged Out Successfully");
        // window.location.reload();
      }
    } catch (error) {
      console.log("Error logging out user");
      console.log(error);
      updateSnackbar(
        true,
        "error",
        `Error logging out user: ${error.response.data.error}`
      );
    }
  };

  const createAccount = async () => {
    const url = "https://localhost:8000/users/auth/register/";

    const form = new FormData();
    form.append("email", state.email);
    form.append("password1", state.password);
    form.append("password2", state.newPasswordRepeat);

    try {
      const response = await axios.post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        updateSnackbar(true, "success", "Account Created Successfully");
        await login();
      }
    } catch (error) {
      console.log("Error creating account");
      console.log(error);
      updateSnackbar(
        true,
        "error",
        `Error creating account: ${error.response.data.error}`
      );
    }
  };

  const updateSnackbar = (isOpen, type, message) => {
    dispatch({
      type: "SET_SNACKBAR",
      payload: {
        open: isOpen,
        type: type,
        message: message,
      },
    });
  };

  const handleSnackbarClose = () => {
    dispatch({
      type: "SET_SNACKBAR",
      payload: {
        open: false,
        type: "success",
        message: "",
      },
    });
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        clearInput,
        handleClickShowPassword,
        toggleLoginIsOpen,
        toggleSettingsIsOpen,
        fetchUser,
        signInGoogle,
        logout,
        handleClickShowPasswordRepeat,
        login,
        createAccount,
        updateSnackbar,
        handleSnackbarClose,
      }}
    >
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <PayPalScriptProvider options={{ clientId: PPAL_CLIENT_ID }}>
          {children}
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => useContext(AuthContext);
