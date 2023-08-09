"use client";

import Link from "next/link";
import { UnSelectedButton } from "../Global/Global";
import { Typography } from "@mui/material";

import { Container, FullLogo, WelcomePaper } from "./Home.styles";

export default function EasyCoversIntro() {
  return (
    <Container>
      <WelcomePaper>
        <FullLogo src="/easy-covers-full.svg" alt="Description of Image" />

        <Typography className="home-header">
          Easy Covers -- AI Cover Letter Generator
        </Typography>

        <Typography className="home-sub-header">
          Save time, increase your interview chances, and stand out from the
          crowd with a cover letter uniquely made to the job you're applying
          for.
        </Typography>

        <Link href={"/"} className="no_underline">
          <UnSelectedButton>Get Started</UnSelectedButton>
        </Link>
      </WelcomePaper>
    </Container>
  );
}
