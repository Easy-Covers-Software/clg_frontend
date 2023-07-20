import React from "react";
import styled from "@emotion/styled";

import MenuLoggedOut from "./components/MenuLoggedOut";
import MenuLoggedIn from "./components/MenuLoggedIn/MenuLoggedIn";
import { useAuth } from "@/context/AuthContext";

const Logo = styled.img`
  margin-top: -55%;
`;

type UserInfo = {
  user: {
    id: string;
    username: string;
    email: string;
  };
};

export default function Sidebar() {
  const {
    state: { user },
  } = useAuth();

  console.log("user");
  console.log(user);

  return (
    <>
      <Logo
        src="/easy-covers-full.svg"
        alt="Description of Image"
        width={"100%"}
      />
      {user ? <MenuLoggedIn user={user && user} /> : <MenuLoggedOut />}
    </>
  );
}
