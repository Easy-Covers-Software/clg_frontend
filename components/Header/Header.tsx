import * as React from "react";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import styled from "@emotion/styled";

const Logo = styled.img`
  height: 75px;
  width: 75px;
`;

export default function Header() {
  return (
    <>
      <Logo src="/easy-covers-logo.svg" alt="Description of Image" />
    </>
  );
}
