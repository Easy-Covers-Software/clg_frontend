import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #3f51b5;
  color: white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
`;

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <Container>
      <Typography variant='h5'>Call Duration</Typography>
      <Typography variant='h4'>{formatTime(seconds)}</Typography>
    </Container>
  );
};

export default Timer;
