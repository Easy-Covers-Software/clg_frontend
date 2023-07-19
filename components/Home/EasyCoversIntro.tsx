"use client";

import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Divider from "@mui/material/Divider";
import { Paper } from "@mui/material";

import { PrimaryButton } from "../Global";
import LoginInputs from "../Login/components/LoginInputs";
import axios from "axios";

import { Typography } from "@mui/material";

import Cookies from "js-cookie";

import Link from "next/link";

import { UnSelectedButton } from "../Global";

const Container = styled(Grid)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullLogo = styled.img`
  height: 60%;
  width: 70%;
  // margin: 0 auto;
  margin-top: -5%;
`;

const WelcomePaper = styled(Paper)`
  width: 50%;
  height: 50%;
  box-shadow: 3px 3px 3px 3px lightgray;
  margin-bottom: 12%;

  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  background-color: #f8f8ff;
  border: 3px solid #13d0b7;
`;

// const GetStarted = styled(UnSelectedButton)`
//   width: 50%;
// `;

export default function EasyCoversIntro() {
  return (
    <Container>
      <WelcomePaper>
        {/* <Paper> */}
        <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />
        {/* </Paper> */}

        <Typography mt={"-5%"}>
          Easy Covers -- AI Cover Letter Generator
        </Typography>

        <Typography textAlign={"center"} mt={"1%"} mb={"5%"}>
          Save time, increase your interview chances, and stand out from the
          crowd with a cover letter uniquely made to the job you're applying
          for.
        </Typography>

        <Link href={"/generation-mode"} style={{ textDecoration: "none" }}>
          <UnSelectedButton>Get Started</UnSelectedButton>
        </Link>
      </WelcomePaper>
    </Container>
  );
}
