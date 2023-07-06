import React from 'react';
import styled from '@emotion/styled';

import MenuLoggedOut from './components/MenuLoggedOut';
import MenuLoggedIn from './components/MenuLoggedIn/MenuLoggedIn';
import { useSession } from 'next-auth/react';

const Logo = styled.img`
  margin-top: -55%;
`;

type UserInfo = {
  name: string;
  email: string;
  picture: string;
}

export default function Sidebar() {
  const { data: session } = useSession()
  const user = session?.user
  const userInfo: UserInfo = user?.info

  console.log('user', userInfo)

  return (
    <>
      <Logo
        src="/easy-covers-full.svg"
        alt="Description of Image"
        width={'100%'}
      />

      {user ? (
        <MenuLoggedIn userInfo={userInfo} />
      ) : (
        <MenuLoggedOut />
      )}
    </>
  );
}
