import { createContext, useContext, useReducer, useEffect } from 'react';

import { fetchUser } from '@/api/AuthMethods';

import { APIResponse, FetchUserApiResponse } from '@/Types/ApiResponse.types';
import { AuthState } from '@/Types/Auth.types';

interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext({});

// const initialState: AuthState = {
const initialState: any = {
  //== Account Auth Props ==//
  accountAuthProps: {
    email: '',
    password: '',
    showPassword: false,
    action: 'login', // "login", "forgot"
    updateEmail: (email: string): void => {},
    clearEmail: (): void => {},
    updatePassword: (password: string): void => {},
    updateUsername: (username: string): void => {},
    toggleShowPassword: (): void => {},
    updateAction: (action: string): void => {},
    reset: (): void => {},
  },

  //== Logged In Props ==//
  loggedInProps: {
    user: null,
    updateUser: (): void => {},
    reset: (): void => {},
  },

  //== Trackers ==//
  trackers: {
    page: 'jobPostings', // "jobPostings", "candidates", "generate", "calls"
    updatePage: (page: string): void => {},
    reset: (): void => {},
  },

  //== Confirm Dialog ==//
  confirmDialog: {
    open: false,
    header: '',
    message: '',
    buttonText: '',
    didConfirmAlert: false,
    openAlertDialogConfirm: (
      open: boolean,
      header: string,
      message: string,
      buttonText: string
    ): void => {},
    updateDidConfirmAlert: (didConfirmAlert: boolean): void => {},
    reset: (): void => {},
  },

  //== Dialog Props ==//
  dialogProps: {
    isLoginOpen: false,
    isSettingsOpen: false,
    isHelpDialogOpen: false,
    isConfirmDialogOpen: false,
    updateConfirmDialog: (): void => {},
    toggleLoginIsOpen: (): void => {},
    toggleSettingsIsOpen: (): void => {},
    toggleHelpDialog: (): void => {},
  },

  //== Snackbar ==//
  snackbar: {
    open: false,
    type: '',
    message: '',
    updateSnackbar: (
      isOpen: boolean,
      type: string,
      message: string
    ): void => {},
    reset: (): void => {},
  },

  //== Update User / Loading ==//
  updateUser: false,
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    //== Account Auth Props ==//
    case 'SET_ACCOUNT_AUTH_PROPS':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          ...action.payload,
        },
      };

    case 'UPDATE_EMAIL':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          email: action.payload,
        },
      };

    case 'UPDATE_PASSWORD':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          password: action.payload,
        },
      };

    case 'CLEAR_EMAIL':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          email: '',
        },
      };

    case 'UPDATE_NEW_PASSWORD_REPEAT':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          newPasswordRepeat: action.payload,
        },
      };

    case 'UPDATE_PHONE_NUMBER':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          phoneNumber: action.payload,
        },
      };

    case 'UPDATE_USERNAME':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          username: action.payload,
        },
      };

    case 'TOGGLE_SHOW_PASSWORD':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          showPassword: !state.accountAuthProps.showPassword,
        },
      };

    case 'TOGGLE_SHOW_PASSWORD_REPEAT':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          showPasswordRepeat: !state.accountAuthProps.showPasswordRepeat,
        },
      };

    case 'UPDATE_ACTION':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          action: action.payload,
        },
      };

    //== Logged In Props ==//
    case 'SET_LOGGED_IN_PROPS':
      return {
        ...state,
        loggedInProps: {
          ...state.loggedInProps,
          ...action.payload,
        },
      };

    //== Trackers ==//
    case 'SET_TRACKERS':
      return {
        ...state,
        trackers: {
          ...state.trackers,
          ...action.payload,
        },
      };

    case 'UPDATE_PAGE':
      return {
        ...state,
        trackers: {
          ...state.trackers,
          page: action.payload,
        },
      };

    //== Confirm Dialog ==//
    case 'SET_CONFIRM_DIALOG':
      return {
        ...state,
        confirmDialog: {
          ...state.confirmDialog,
          ...action.payload,
        },
      };

    case 'UPDATE_DID_CONFIRM_ALERT':
      return {
        ...state,
        confirmDialog: {
          ...state.confirmDialog,
          didConfirmAlert: action.payload,
        },
      };

    //== Dialog Props ==//
    case 'SET_DIALOG_PROPS':
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          ...action.payload,
        },
      };

    case 'TOGGLE_IS_LOGIN_OPEN':
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          isLoginOpen: !state.dialogProps.isLoginOpen,
        },
      };

    case 'TOGGLE_IS_SETTINGS_OPEN':
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          isSettingsOpen: !state.dialogProps.isSettingsOpen,
        },
      };

    case 'TOGGLE_IS_HELP_DIALOG_OPEN':
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          isHelpDialogOpen: !state.dialogProps.isHelpDialogOpen,
        },
      };

    case 'TOGGLE_IS_PAYMENT_SUCCESS_DIALOG_OPEN':
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          isPaymentSuccessDialogOpen:
            !state.dialogProps.isPaymentSuccessDialogOpen,
        },
      };

    case 'UPDATE_CONFIRM_DIALOG':
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          ...action.payload,
        },
      };

    //== Snackbar ==//
    case 'SET_SNACKBAR':
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          ...action.payload,
        },
      };

    //== Update User ==//
    case 'UPDATE_USER':
      return {
        ...state,
        updateUser: !state.updateUser,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };

    //== Resets ==//
    case 'RESET_ACCOUNT_AUTH_PROPS':
      return {
        ...state,
        accountAuthProps: {
          ...state.accountAuthProps,
          email: '',
          password: '',
          newPasswordRepeat: '',
          username: '',
          showPassword: false,
          showPasswordRepeat: false,
          action: 'login',
        },
      };

    case 'RESET_LOGGED_IN_PROPS':
      return {
        ...state,
        loggedInProps: {
          ...state.loggedInProps,
          user: null,
        },
      };

    case 'RESET_TRACKERS':
      return {
        ...state,
        trackers: {
          ...state.trackers,
          page: '',
        },
      };

    case 'RESET_SNACKBAR':
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
          type: '',
          message: '',
        },
      };

    case 'RESET_CONFIRM_DIALOG':
      return {
        ...state,
        confirmDialog: {
          ...state.confirmDialog,
          open: false,
          header: '',
          message: '',
          buttonText: '',
        },
      };

    case 'RESET_DIALOG_PROPS':
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          isLoginOpen: false,
          isSettingsOpen: false,
          isHelpDialogOpen: false,
          isPaymentSuccessDialogOpen: false,
          isConfirmDialogOpen: false,
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

  const initUser = async (): Promise<void> => {
    const response: APIResponse<any> = await fetchUser();
    // const response: APIResponse<FetchUserApiResponse> = await fetchUser();

    if (response.data) {
      dispatch({
        type: 'SET_LOGGED_IN_PROPS',
        payload: {
          user: response.data.user,
        },
      });
    } else {
      dispatch({
        type: 'RESET_LOGGED_IN_PROPS',
      });
    }
  };

  //==* Updated Hooks *==//
  //== Account Auth Props ==//
  useEffect(() => {
    dispatch({
      type: 'SET_ACCOUNT_AUTH_PROPS',
      payload: {
        email: initialState.accountAuthProps.email,
        password: initialState.accountAuthProps.password,
        showPassword: initialState.accountAuthProps.showPassword,
        action: initialState.accountAuthProps.action,
        updateEmail: (email: string): void => {
          dispatch({ type: 'UPDATE_EMAIL', payload: email });
        },
        clearEmail: (): void => {
          dispatch({ type: 'CLEAR_EMAIL' });
        },
        updatePassword: (password: string): void => {
          dispatch({ type: 'UPDATE_PASSWORD', payload: password });
        },
        updateUsername: (username: string): void => {
          dispatch({ type: 'UPDATE_USERNAME', payload: username });
        },
        toggleShowPassword: (): void => {
          dispatch({ type: 'TOGGLE_SHOW_PASSWORD' });
        },
        updateAction: (action: string): void => {
          dispatch({ type: 'UPDATE_ACTION', payload: action });
        },
        reset: (): void => {
          dispatch({ type: 'RESET_ACCOUNT_AUTH_PROPS' });
        },
      },
    });
  }, []);

  //== Logged In Props ==//
  useEffect(() => {
    dispatch({
      type: 'SET_LOGGED_IN_PROPS',
      payload: {
        user: initialState.loggedInProps.user,
        updateUser: (): void => {
          dispatch({ type: 'UPDATE_USER' });
        },
        reset: (): void => {
          dispatch({ type: 'RESET_LOGGED_IN_PROPS' });
        },
      },
    });
  }, []);

  //== Trackers ==//
  useEffect(() => {
    dispatch({
      type: 'SET_TRACKERS',
      payload: {
        page: initialState.trackers.page,
        updatePage: (page: string): void => {
          dispatch({ type: 'UPDATE_PAGE', payload: page });
        },
        reset: (): void => {
          dispatch({ type: 'RESET_TRACKERS' });
        },
      },
    });
  }, []);

  //== Confirm Dialog ==//
  useEffect(() => {
    dispatch({
      type: 'SET_CONFIRM_DIALOG',
      payload: {
        open: initialState.confirmDialog.open,
        header: initialState.confirmDialog.header,
        message: initialState.confirmDialog.message,
        buttonText: initialState.confirmDialog.buttonText,
        didConfirmAlert: initialState.confirmDialog.didConfirmAlert,

        openAlertDialogConfirm: (
          open: boolean,
          header: string,
          message: string,
          buttonText: string
        ): void => {
          dispatch({
            type: 'SET_CONFIRM_DIALOG',
            payload: {
              open: open,
              header: header,
              message: message,
              buttonText: buttonText,
            },
          });
        },
        updateDidConfirmAlert: (didConfirmAlert: boolean): void => {
          dispatch({
            type: 'UPDATE_DID_CONFIRM_ALERT',
            payload: didConfirmAlert,
          });
        },
        reset: (): void => {
          dispatch({ type: 'RESET_CONFIRM_DIALOG' });
        },
      },
    });
  }, []);

  //== Dialog Props ==//
  useEffect(() => {
    dispatch({
      type: 'SET_DIALOG_PROPS',
      payload: {
        isLoginOpen: initialState.dialogProps.isLoginOpen,
        isSettingsOpen: initialState.dialogProps.isSettingsOpen,
        isHelpDialogOpen: initialState.dialogProps.isHelpDialogOpen,
        isConfirmDialogOpen: initialState.dialogProps.isConfirmDialogOpen,

        toggleLoginIsOpen: (): void => {
          dispatch({ type: 'TOGGLE_IS_LOGIN_OPEN' });
        },
        toggleSettingsIsOpen: (): void => {
          dispatch({ type: 'TOGGLE_IS_SETTINGS_OPEN' });
        },
        toggleHelpDialog: (): void => {
          dispatch({ type: 'TOGGLE_IS_HELP_DIALOG_OPEN' });
        },
        togglePaymentSuccessDialog: (): void => {
          dispatch({ type: 'TOGGLE_IS_PAYMENT_SUCCESS_DIALOG_OPEN' });
        },
        updateConfirmDialog: (): void => {
          dispatch({ type: 'UPDATE_CONFIRM_DIALOG' });
        },
        reset: (): void => {
          dispatch({ type: 'RESET_DIALOG_PROPS' });
        },
      },
    });
  }, []);

  //== Snackbar ==//
  useEffect(() => {
    dispatch({
      type: 'SET_SNACKBAR',
      payload: {
        open: initialState.snackbar.open,
        type: initialState.snackbar.type,
        message: initialState.snackbar.message,
        updateSnackbar: (
          isOpen: boolean,
          type: string,
          message: string
        ): void => {
          dispatch({
            type: 'SET_SNACKBAR',
            payload: {
              open: isOpen,
              type: type,
              message: message,
            },
          });
        },
        reset: (): void => {
          dispatch({ type: 'RESET_SNACKBAR' });
        },
      },
    });
  }, []);

  //==* Non-State Hooks *==//
  //== Updates User ==//
  useEffect(() => {
    initUser();
  }, [state.updateUser]);

  console.log('auth state', state);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): any => useContext(AuthContext);
