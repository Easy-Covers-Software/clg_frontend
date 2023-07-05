import React from 'react';
import styled from '@emotion/styled';

import MenuLoggedOut from './components/MenuLoggedOut';

const Logo = styled.img`
  margin-top: -55%;
`;

export default function Sidebar() {
  return (
    <>
      <Logo
        src="/easy-covers-full.svg"
        alt="Description of Image"
        width={'100%'}
      />

      <MenuLoggedOut />
    </>
  );
}
