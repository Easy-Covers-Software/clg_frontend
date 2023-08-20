import Provider from "@/components/Provider";

import axios from "axios";

axios.defaults.withCredentials = true;
import Document, { Html, Head, Main, NextScript } from "next/document";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>

      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
