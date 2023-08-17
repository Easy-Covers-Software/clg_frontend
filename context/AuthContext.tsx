import { createContext, useContext, useReducer, useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { LoginUtils } from "@/Utils/utils";
const { fetchUser, postLogin, postLogout, postCreateAccount, passwordReset } =
  LoginUtils;

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext({});

const initialState = {
  email: "",
  password: "",
  newPasswordRepeat: "",
  username: "",
  showPassword: false,
  showPasswordRepeat: false,
  loading: true,
  isAuthenticated: false,
  user: null,
  isLoginOpen: false,
  isSettingsOpen: false,
  isHelpDialogOpen: false,
  isPaymentSuccessDialogOpen: false,
  createAccountEasyCovers: false,
  page: "",
  mobileMode: "setup",
  mobileModeSaved: "choose",
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
    buttonText: "",
  },
  didConfirmAlert: false,
  forgotPassword: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
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
    case "SET_IS_HELP_DIALOG_OPEN":
      return { ...state, isHelpDialogOpen: action.payload };
    case "SET_CREATE_ACCOUNT_EASY_COVERS":
      return { ...state, createAccountEasyCovers: action.payload };
    case "SET_FORGOT_PASSWORD":
      return { ...state, forgotPassword: action.payload };
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
    case "SET_MOBILE_MODE":
      return { ...state, mobileMode: action.payload };
    case "SET_MOBILE_MODE_SAVED":
      return { ...state, mobileModeSaved: action.payload };
    case "RESET_INPUTS":
      return {
        ...state,
        email: "",
        password: "",
        newPasswordRepeat: "",
      };
    case "RESET_LOGIN":
      return {
        ...state,
        createAccountEasyCovers: false,
        forgotPassword: false,
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
  
  const toggleHelpDialog = () => {
    dispatch({ type: "SET_IS_HELP_DIALOG_OPEN", payload: !state.isHelpDialogOpen });
  };
  
  const togglePaymentSuccessDialog = () => {
    dispatch({ type: "SET_CREATE_ACCOUNT_EASY_COVERS", payload: !state.isPaymentSuccessDialogOpen });
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

  const openAlertDialogConfirm = (open, header, message, buttonText) => {
    dispatch({
      type: "SET_ALERT_DIALOG_CONFIRM",
      payload: {
        open: open,
        header: header,
        message: message,
        buttonText: buttonText,
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
        buttonText: ""
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
    console.log("create account username", state.username);

    const response = await postCreateAccount(
      state.username,
      state.email,
      state.password,
      state.newPasswordRepeat
    );

    if (response.type === "SUCCESS") {
      toggleLoginIsOpen();
      login();
      updateSnackbar(true, "success", "Account Created Successfully");
      dispatch({ type: "RESET_LOGIN" });
    } else {
      console.log("Error creating account");
      dispatch({ type: "SET_CREATE_ACCOUNT_EASY_COVERS", payload: false });
      updateSnackbar(true, "error", `Error creating account: ${response.type}`);
    }
    dispatch({ type: "RESET_LOGIN" });
  };

  const login = async () => {
    const response = await postLogin(
      state.username,
      state.email,
      state.password
    );

    console.log("login response", response);
    if (response.type === "SUCCESS") {
      toggleLoginIsOpen();
      dispatch({ type: "RESET_INPUTS" });
      await initUser();
      updateSnackbar(true, "success", "Logged In Successfully");
    } else {
      console.log("Error logging in", response);
      updateSnackbar(true, "error", `Error logging in: ${response.type}`);
    }
    dispatch({
      type: "RESET_INPUTS",
    });
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

  const resetPassword = async () => {
    if (state.email.trim() !== "") {
      const response = await passwordReset(state.email);

      if (response && response.type === "SUCCESS") {
        toggleLoginIsOpen();

        updateSnackbar(
          true,
          "success",
          "Password reset link sent to your email."
        );
      } else {
        console.log("Error resetting password");
        updateSnackbar(
          true,
          "error",
          `Error resetting password: ${response.error}`
        );
      }
    } else {
      console.log("Email is empty");
      updateSnackbar(true, "error", "Please provide an email address.");
    }
    dispatch({ type: "RESET_INPUTS" });
    dispatch({ type: "RESET_LOGIN" });
  };

  useEffect(() => {
    initUser();
  }, [state.updateUser]);

  useEffect(() => {
    if (state.email !== "") {
      // check if the state.email contains an @ symbol
      const atSymbolIndex = state.email.indexOf("@");

      if (atSymbolIndex !== -1) {
        // get everything in the state.email string before the @ symbol
        const substringBeforeAt = state.email.slice(0, atSymbolIndex);

        dispatch({
          type: "SET_USERNAME",
          payload: substringBeforeAt,
        });
      }
    }
  }, [state.email]);

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
        resetPassword,
        toggleHelpDialog,
        togglePaymentSuccessDialog,
      }}
    >
      {/* <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}> */}
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PPAL_CLIENT_ID }}
      >
        {children}
      </PayPalScriptProvider>
      {/* </GoogleOAuthProvider> */}
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => useContext(AuthContext);
