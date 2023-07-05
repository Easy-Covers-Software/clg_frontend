import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

export interface IHeaderProps {}

export default function Header() {
  return (
    <Grid className="header">
      <img
        src="/easy-covers-logo.svg"
        alt="Description of Image"
        height={75}
        width={75}
      />
    </Grid>
  );
}
