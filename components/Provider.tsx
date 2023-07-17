"use client";

import { FC, ReactNode } from "react";

import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

import "styles/globals.css";

type Props = {
  children: ReactNode;
};

import { AuthProvider } from "@/context/AuthContext";

const Provider: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="layout-grid">
        <div className="header">
          <Header />
        </div>

        <div className="sidebar">
          <Sidebar />
        </div>
        <main className="main-content">{children}</main>
      </div>
    </AuthProvider>
  );
};

export default Provider;
