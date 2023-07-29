import { createContext, useContext, useReducer, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from "@react-oauth/google";

import axios from "axios";
import Cookies from "js-cookie";

const CLIENT_ID =
  "464586598349-3uu0huc0df86brd568ikatpa9avg015m.apps.googleusercontent.com";

const PPAL_CLIENT_ID =
  "AdqQqoVIY7CmxhdsTPRwN6vQmUnMsR1QoxR5o2HcVbR1zI9W-XUq2PYVSfQf72htFWZSxL4A7XzqqE4s";

const API_BASE = "https://localhost:8000";

import { LoginUtils } from "@/Utils/utils";
const { fetchUser, postLogin, postLogout, postCreateAccount } = LoginUtils;

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext({});

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
  page: "",
  snackbar: {
    open: false,
    type: "",
    message: "",
  },
  updateUser: false,
  accessLevel: {
    num_gpt3_generations_available: 0,
    num_gpt4_generations_available: 0,
    num_adjustments_available: 0,
  },
  userResume: "",
  alertDialogConfirmOpen: false,
  alertDialogConfirm: {
    open: false,
    header: "",
    message: "",
  },
  didConfirmAlert: false,
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
    case "SET_UPDATE_USER":
      return { ...state, updateUser: !state.updateUser };
    case "SET_ACCESS_LEVEL":
      return {
        ...state,
        accessLevel: {
          ...state.accessLevel,
          ...action.payload,
        },
      };
    case "SET_USER_RESUME":
      return { ...state, userResume: action.payload };
    case "SET_ALERT_DIALOG_CONFIRM_OPEN":
      return { ...state, alertDialogConfirmOpen: action.payload };
    case "SET_ALERT_DIALOG_CONFIRM":
      return {
        ...state,
        alertDialogConfirm: {
          ...state.alertDialogConfirm,
          ...action.payload,
        },
      };
    case "SET_DID_CONFIRM_ALERT":
      return { ...state, didConfirmAlert: action.payload };
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

  const handleClickShowPassword = () => {
    dispatch({ type: "SET_SHOW_PASSWORD", payload: !state.showPassword });
  };

  const handleClickShowPasswordRepeat = () => {
    dispatch({
      type: "SET_SHOW_PASSWORD_REPEAT",
      payload: !state.showPasswordRepeat,
    });
  };

  const setNotAuthenticated = (): void => {
    dispatch({ type: "SET_IS_AUTHENTICATED", payload: false });
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_USER", payload: null });
    dispatch({ type: "SET_ACCESS_LEVEL", payload: initialState.accessLevel });
  };

  const toggleLoginIsOpen = () => {
    dispatch({ type: "SET_IS_LOGIN_OPEN", payload: !state.isLoginOpen });
  };

  const toggleSettingsIsOpen = () => {
    dispatch({ type: "SET_IS_SETTINGS_OPEN", payload: !state.isSettingsOpen });
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

  const openAlertDialogConfirm = (open, header, message) => {
    dispatch({
      type: "SET_ALERT_DIALOG_CONFIRM",
      payload: {
        open: open,
        header: header,
        message: message,
      },
    });
  };

  const handleAlertDialogConfirmClose = () => {
    dispatch({
      type: "SET_ALERT_DIALOG_CONFIRM",
      payload: {
        open: false,
        header: "",
        message: "",
      },
    });
  };

  const initUser = async () => {
    const response = await fetchUser();
    console.log("User found in session.", response);
    dispatch({ type: "SET_USER", payload: response.user?.email });
    dispatch({ type: "SET_USER_RESUME", payload: response.user?.resume });
    dispatch({
      type: "SET_ACCESS_LEVEL",
      payload: response.user?.access_level,
    });
  };

  const createAccount = async () => {
    const response = await postCreateAccount(
      state.email,
      state.password,
      state.newPasswordRepeat
    );

    console.log("createAccount response", response);

    if (response.type === "SUCCESS") {
      toggleLoginIsOpen();
      login();
      updateSnackbar(true, "success", "Account Created Successfully");
    } else {
      console.log("Error creating account");
      updateSnackbar(
        true,
        "error",
        `Error creating account: ${response.error}`
      );
    }
  };

  const login = async () => {
    const response = await postLogin(state.email, state.password);

    console.log("login response", response);
    if (response.type === "SUCCESS") {
      toggleLoginIsOpen();
      await initUser();
      updateSnackbar(true, "success", "Logged In Successfully");
    } else {
      console.log("Error logging in");
      updateSnackbar(true, "error", `Error logging in: ${response.error}`);
    }
  };

  const logout = async () => {
    const response = await postLogout();
    if (response) {
      setNotAuthenticated();
      updateSnackbar(true, "success", "Logged Out Successfully");
    } else {
      console.log("Error logging out user");
      updateSnackbar(
        true,
        "error",
        `Error logging out user: ${response.error}`
      );
    }
  };

  useEffect(() => {
    initUser();
  }, [state.updateUser]);

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
        logout,
        handleClickShowPasswordRepeat,
        login,
        createAccount,
        updateSnackbar,
        handleSnackbarClose,
        openAlertDialogConfirm,
        handleAlertDialogConfirmClose,
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
