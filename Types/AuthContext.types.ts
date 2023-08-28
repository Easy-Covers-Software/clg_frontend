export type AccountAuthProps = {
  email: string;
  password: string;
  newPasswordRepeat: string;
  username: string;
  showPassword: boolean;
  showPasswordRepeat: boolean;
  action: 'login' | 'create' | 'forgot';
  updateEmail: (email: string) => void;
  clearEmail: () => void;
  updatePassword: (password: string) => void;
  updateNewPasswordRepeat: (newPasswordRepeat: string) => void;
  updateUsername: (username: string) => void;
  toggleShowPassword: () => void;
  toggleShowPasswordRepeat: () => void;
  updateAction: (action: string) => void;
  reset: () => void;
};

export type LoggedInProps = {
  email: string;
  resume: string;
  gpt3_generations_available: string;
  gpt4_generations_available: string;
  adjustments_available: string;
  isAuthenticated: boolean;
  reset: () => void;
};

export type Trackers = {
  page: string;
  mobileMode: string;
  mobileModeSaved: string;
  updatePage: (page: string) => void;
  updateMobileMode: (mobileMode: string) => void;
  updateMobileModeSaved: (mobileModeSaved: string) => void;
};

export type ConfirmDialog = {
  open: boolean;
  header: string;
  message: string;
  buttonText: string;
  didConfirmAlert: boolean;
  openAlertDialogConfirm: (
    open: boolean,
    header: string,
    message: string,
    buttonText: string
  ) => void;
  updateDidConfirmAlert: (didConfirmAlert: boolean) => void;
  reset: () => void;
};

export type DialogProps = {
  isLoginOpen: boolean;
  isSettingsOpen: boolean;
  isHelpDialogOpen: boolean;
  isPaymentSuccessDialogOpen: boolean;
  isConfirmDialogOpen: boolean;
  toggleLoginIsOpen: () => void;
  toggleSettingsIsOpen: () => void;
  toggleHelpDialog: () => void;
  togglePaymentSuccessDialog: () => void;
  toggleConfirmDialog: () => void;
};

export type Snackbar = {
  open: boolean;
  type: string;
  message: string;
  updateSnackbar: (isOpen: boolean, type: string, message: string) => void;
  reset: () => void;
};

export type AuthState = {
  accountAuthProps: AccountAuthProps;
  loggedInProps: LoggedInProps;
  trackers: Trackers;
  confirmDialog: ConfirmDialog;
  dialogProps: DialogProps;
  snackbar: Snackbar;
  updateUser: boolean;
  loading: boolean;
};
