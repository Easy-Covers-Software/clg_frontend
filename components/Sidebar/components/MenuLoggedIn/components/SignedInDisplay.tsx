import React from "react";

import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { UnSelectedButton } from "@/components/Global";
import { signOut } from "next-auth/react";

type UserInfo = {
  name: string;
  email: string;
  image: string;
};

interface SignedInDisplayProps {
  userInfo: UserInfo;
}

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;

const UserProfileInfo = styled(Grid)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4%;
  padding: 0 2% 0 0;
`;

const UserEmailAndName = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ProfilePicture = styled(Avatar)`
  height: 5vh;
  width: 5vh;
`;

export default function SignedInDisplay(props: SignedInDisplayProps) {
  const { userInfo } = props;
  const { name, email, image } = userInfo;

  return (
    <Container>
      <UserProfileInfo>
        <ProfilePicture src={image} alt="Description of user profile picture" />

        <UserEmailAndName>
          <Typography fontSize={"1rem"}>{name}</Typography>
          <Typography fontSize={"0.8rem"}>{email}</Typography>
        </UserEmailAndName>
      </UserProfileInfo>

      <UnSelectedButton>Settings</UnSelectedButton>
      <UnSelectedButton onClick={() => signOut()}>Logout</UnSelectedButton>
    </Container>
  );
}
