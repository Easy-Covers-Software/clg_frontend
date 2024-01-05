import styled from '@emotion/styled';

import MenuLoggedOut from './components/MenuLoggedOut/MenuLoggedOut';
import MenuLoggedIn from './components/MenuLoggedIn/MenuLoggedIn';
import { useAuth } from '@/context/AuthContext';

const Logo = styled.img`
  margin-top: -55%;
  width: 100%;

  @media screen and (max-width: 1100px) {
    margin-top: -16%;
    // text-align: center;
    width: 100%;
  }
`;

export default function Sidebar() {
  const {
    state: { loggedInProps },
  } = useAuth();

  return (
    <>
      <Logo src='/easy-covers-full.svg' alt='Description of Image' />
      {loggedInProps?.user ? <MenuLoggedIn /> : <MenuLoggedOut />}
    </>
  );
}
