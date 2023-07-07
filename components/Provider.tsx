'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import { LoginContext } from '@/context/LoginContext';

import 'styles/globals.css';


type Props = {
  children: ReactNode;
};

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: { session },
//   };
// }

const Provider: FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
};

export default Provider;
