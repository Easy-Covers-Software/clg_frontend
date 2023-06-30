'use client';

import * as React from 'react';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <div className="header">
      <img
        src="/easy-covers-logo.svg"
        alt="Description of Image"
        height={50}
        width={50}
      />
    </div>
  );
}
