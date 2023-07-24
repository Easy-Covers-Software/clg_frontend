import { useAuth } from "@/context/AuthContext";

import { CreateAccountOptionsStyledComponents } from "../LoginDialog.styles";
const { Container, GoogleSignInIcon, EasyCoversSignInIcon, IconContainer } =
  CreateAccountOptionsStyledComponents;

export default function CreateAccountOptions() {
  const { signInGoogle, dispatch } = useAuth();

  const handleCreateAccountEasyCovers = () => {
    dispatch({ type: "SET_CREATE_ACCOUNT_EASY_COVERS", payload: true });
  };

  return (
    <Container>
      <IconContainer onClick={signInGoogle}>
        <GoogleSignInIcon src="/GoogleIcon.svg" alt="google icon" />
      </IconContainer>

      <IconContainer onClick={handleCreateAccountEasyCovers}>
        <EasyCoversSignInIcon src="/easy-covers-full.svg" alt="google icon" />
      </IconContainer>
    </Container>
  );
}
