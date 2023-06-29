'use client';

import React, { ReactNode, ReactElement, useState } from 'react';

import 'styles/globals.css';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import { LoginContext } from '../context/StateContext';

const RootLayout = ({ children }) => {
  return (
    <LoginContext>
      <html lang="en">
        <body>
          <div className="layout-grid">
            <div className="header">
              <Header />
            </div>

            <div className="sidebar">
              <Sidebar />
            </div>
            <main className="main-content">{children}</main>
          </div>
        </body>
      </html>
    </LoginContext>
  );
};

export default RootLayout;
