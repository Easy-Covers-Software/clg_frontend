"use client";

import { useEffect } from "react";

export interface IHomeProps {}

import { useLoginContext } from "@/context/LoginContext";
import { GenerationContext } from "@/context/GenerationSetupContext";
import { useAuth } from "@/context/AuthContext";

import Cookies from "js-cookie";
import axios from "axios";

// import { useSession } from "next-auth/react";

import LoginDialog from "@/components/Login/LoginDialog";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import GenerationSetup from "@/components/GenerationSetup/GenerationSetup";
import Results from "@/components/Results/Results";

export default function Home(props: IHomeProps) {
  const { isLoginOpen } = useLoginContext();
  const { user, fetchUser } = useAuth();

  console.log("user", user);

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <Grid display={"flex"} justifyContent={"space-between"} width={"100%"}>
      {isLoginOpen ? <LoginDialog /> : null}
      <GenerationContext>
        <GenerationSetup />
        <Results />
      </GenerationContext>
    </Grid>
  );
}
