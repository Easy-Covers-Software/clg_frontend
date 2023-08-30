import { useAuth } from '@/context/AuthContext';

import { CreateAccountOptionsStyledComponents } from '../LoginDialog.styles';
const { Container, GoogleSignInIcon, EasyCoversSignInIcon, IconContainer } =
  CreateAccountOptionsStyledComponents;

import { LoginApiMethods } from '@/Utils/utils';
import { Typography } from '@mui/material';
const { signInGoogle } = LoginApiMethods;

export default function CreateAccountOptions() {
  const { state, dispatch } = useAuth();
  const { accountAuthProps, createAccountEasyCovers, forgotPassword } = state;

  const handleCreateAccountEasyCovers = () => {
    accountAuthProps?.updateAction('create');
  };

  const handleGoogle = () => {
    signInGoogle();
  };

  return (
    <Container>
      <IconContainer onClick={handleGoogle}>
        <GoogleSignInIcon src='/GoogleIcon.svg' alt='google icon' />
      </IconContainer>

      <IconContainer
        onClick={() => {
          accountAuthProps?.updateAction('create');
        }}
      >
        {accountAuthProps?.action === 'create' ||
        accountAuthProps?.action === 'forgot' ? (
          <Typography
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              accountAuthProps?.reset();
              // dispatch({
              //   type: 'RESET_LOGIN',
              // });
            }}
            style={{
              fontSize: '1.4rem',
              color: '#13d0b7',
            }}
          >
            Log In
          </Typography>
        ) : (
          <EasyCoversSignInIcon src='/easy-covers-full.svg' alt='google icon' />
        )}
      </IconContainer>
    </Container>
  );
}
