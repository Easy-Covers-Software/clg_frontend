'use client';

import { FC, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material';
import Header from './PageStructure/Header/Header';
import Sidebar from './PageStructure/Sidebar/Sidebar';
import { AuthProvider } from '@/context/AuthContext';
import theme from '../styles/theme/index.js';
import 'styles/globals.css';

type Props = {
  children: ReactNode;
};

const Provider: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="layout-grid">
          {/* <div className="header">
            <Header />
          </div> */}

          <div className="sidebar">
            <Sidebar />
          </div>
          <main className="main-content">{children}</main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Provider;
