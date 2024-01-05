import React, { FC } from 'react';

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Container = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackButton = styled(IconButton)`
  position: relative;
  top: 16px;
  right: 44%;
`;

const BackButtonLabel = styled(Typography)``;

const Title = styled(Typography)`
  margin-top: -3%;
  font-size: 1.5rem;
`;

const Body = styled(Grid)`
  width: 100%;
  height: 100%;
  // overflow: scroll;
  padding: 1%;
  box-sizing: border-box;
`;

interface Props {
  subSectionHeader: string;
  onClose: () => void;
  children: React.ReactNode;
}

const SubSectionFrame: React.FC<Props> = ({
  subSectionHeader,
  onClose,
  children,
}) => {
  return (
    <Container>
      <BackButton onClick={onClose}>
        <ArrowBackIcon />
        <BackButtonLabel>back</BackButtonLabel>
      </BackButton>
      <Title>{subSectionHeader}</Title>

      <Body>{children}</Body>
    </Container>
  );
};

export default SubSectionFrame;
