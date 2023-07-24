import Provider from "@/components/Provider";

import axios from "axios";

axios.defaults.withCredentials = true;

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
