'use client';

import React from 'react';

import Provider from '@/components/Provider';

import 'styles/globals.css';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import { LoginContext } from '@/context/StateContext';

import { getSession } from 'next-auth/react';
// import { GetSessionParams } from 'next-auth/react';

const RootLayout = ({ children }) => {
  return (
    <Provider>
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
