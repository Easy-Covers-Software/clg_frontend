import React from "react";
import styled from "@emotion/styled";

import MenuLoggedOut from "./components/MenuLoggedOut";
import MenuLoggedIn from "./components/MenuLoggedIn/MenuLoggedIn";
import { useSession } from "next-auth/react";

const Logo = styled.img`
  margin-top: -55%;
`;

type UserInfo = {
  name: string;
  email: string;
  image: string;
};

export default function Sidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const userInfo: UserInfo = user;

  console.log(session);

  return (
    <>
      <Logo
        src="/easy-covers-full.svg"
        alt="Description of Image"
        width={"100%"}
      />

      {user ? (
        <MenuLoggedIn userInfo={userInfo && userInfo} />
      ) : (
        <MenuLoggedOut />
      )}
    </>
  );
}
