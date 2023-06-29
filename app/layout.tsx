import { ReactNode } from 'react';

import 'styles/globals.css';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: IRootLayoutProps) => {
  return (
    <div className="layout-grid">
      <div className="header">
        <Header />
      </div>

      <div className="sidebar">
        <Sidebar />
      </div>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default RootLayout;
