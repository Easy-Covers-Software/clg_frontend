import React, { FC } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider } from '@mui/material';

const Container = styled(Grid2)`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const BackButton = styled(IconButton)`
  position: relative;
  top: 8px;
  right: 44%;
`;

const BackButtonLabel = styled(Typography)``;

const Title = styled(Typography)`
  margin-top: -3%;
  font-size: 1.5rem;
`;

const Body = styled(Grid2)`
  width: 100%;
  height: 100%;
  // overflow: scroll;
  padding: 1%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
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

      <Divider
        sx={{
          minWidth: '100%',
        }}
      />

      <Body>{children}</Body>
    </Container>
  );
};

export default SubSectionFrame;
