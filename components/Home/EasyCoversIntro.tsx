"use client";

import React from "react";
import Link from "next/link";
import { UnSelectedButton } from "../Global/Global";
import { Typography } from "@mui/material";

import { Container, FullLogo, WelcomePaper } from "./Home.styles";

export default function EasyCoversIntro() {
  return (
    <Container>
      <WelcomePaper>
        <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />

        <Typography variant="homeHeader">
          Easy Covers -- AI Cover Letter Generator
        </Typography>

        <Typography variant="homeSubHeader">
          Save time, increase your interview chances, and stand out from the
          crowd with a cover letter uniquely made to the job you're applying
          for.
        </Typography>

        <Link href={"/generation-mode"} className="no_underline">
          <UnSelectedButton>Get Started</UnSelectedButton>
        </Link>
      </WelcomePaper>
    </Container>
  );
}
