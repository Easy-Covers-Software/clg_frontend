'use client';

import React from 'react';

import Provider from '@/components/Provider';

import 'styles/globals.css';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import { LoginContext } from '../context/StateContext';

const RootLayout = ({ children }) => {
  return (
    <Provider session={null}>
      <html lang="en">
        <body>
          <div className="layout-grid">
            <div className="header">
              <Header />
            </div>

            <LoginContext>
              <div className="sidebar">
                <Sidebar />
              </div>
              <main className="main-content">{children}</main>
            </LoginContext>
          </div>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
