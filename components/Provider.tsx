"use client";

import { FC, ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { AuthProvider } from "@/context/AuthContext";
import theme from "../styles/theme/index.js";
import "styles/globals.css";

type Props = {
  children: ReactNode;
};

const inputs = document.querySelectorAll("input, select, textarea");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
  });

  input.addEventListener("blur", () => {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute("content", "width=device-width, initial-scale=1.0");
  });
});

const Provider: FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <div className="layout-grid">
          <div className="header">
            <Header />
          </div>

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
