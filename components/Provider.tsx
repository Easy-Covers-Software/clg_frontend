"use client";

import { FC, ReactNode } from "react";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { LoginContext } from "@/context/LoginContext";

import "styles/globals.css";

type Props = {
  children: ReactNode;
};

import { AuthProvider } from "@/context/AuthContext";

const CLIENT_ID =
  "464586598349-3uu0huc0df86brd568ikatpa9avg015m.apps.googleusercontent.com";

const Provider: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};

export default Provider;
