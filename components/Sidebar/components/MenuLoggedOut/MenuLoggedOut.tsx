import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { UnSelectedButton } from "@/components/Global/Global";
import {
  Container,
  HorizontalDivider,
  GenerationModeTab,
} from "./MenuLoggedOut.styles";

export default function MenuLoggedOut() {
  const { state, toggleLoginIsOpen } = useAuth();
  const { page } = state;
  const { isLoginOpen } = state;

  return (
    <Container>
      <Link href={"/generation-mode"} className={"no_underline"} passHref>
        <GenerationModeTab
          style={{
            backgroundColor: page === "generation-mode" ? "#f5faf5" : "white",
          }}
        >
          Generate Mode
        </GenerationModeTab>
      </Link>

      <Grid>
        <HorizontalDivider />
        <UnSelectedButton onClick={() => toggleLoginIsOpen()}>
          Sign In
        </UnSelectedButton>
      </Grid>
    </Container>
  );
}
