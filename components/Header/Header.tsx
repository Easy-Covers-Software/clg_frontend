'use client';

import * as React from 'react';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className="header">
      <ThunderstormIcon fontSize="large" />
    </div>
  );
}
