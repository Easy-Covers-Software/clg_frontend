import React from 'react';

import Provider from '@/components/Provider';

const RootLayout = ({ children }) => {
  return (
      <html lang="en">
        <body>
        <Provider>
          {children}
        </Provider>
        </body>
      </html>
  );
};

export default RootLayout;
