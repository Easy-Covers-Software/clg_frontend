import { PrimaryButton, UnSelectedButton } from "@/components/Global/Global";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";
import SignedInDisplay from "./components/SignedInDisplay";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

import { Container, GenerationModeTab, Tabs } from "./MenuLoggedIn.styles";

export default function MenuLoggedIn() {
  const {
    state: { page },
  } = useAuth();

  return (
    <Container>
      <Tabs>
        <Link href={"/generation-mode"} className={"no_underline"} passHref>
          <GenerationModeTab selected={page === "generation-mode"}>
            Generate Mode
          </GenerationModeTab>
        </Link>

        <Link href={"/saved"} className={"no_underline"} passHref>
          <GenerationModeTab selected={page === "saved"}>
            Saved
          </GenerationModeTab>
        </Link>
      </Tabs>

      {/* <Grid> */}
      <SignedInDisplay />
      {/* </Grid> */}
    </Container>
  );
}
