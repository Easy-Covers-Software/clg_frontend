import { useAuth } from '@/context/AuthContext';

import { CreateAccountOptionsStyledComponents } from '../LoginDialog.styles';
const { Container, GoogleSignInIcon, EasyCoversSignInIcon, IconContainer } =
  CreateAccountOptionsStyledComponents;

import { Typography } from '@mui/material';

export default function CreateAccountOptions() {
  const { state, dispatch } = useAuth();
  const { accountAuthProps, createAccountEasyCovers, forgotPassword } = state;

  const handleCreateAccountEasyCovers = () => {
    accountAuthProps?.updateAction('create');
  };

  return (
    <Container>
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
          <EasyCoversSignInIcon src="/easy-covers-full.svg" alt="google icon" />
        )}
      </IconContainer>
    </Container>
  );
}
