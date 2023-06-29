import React, { createContext, useState, useContext } from 'react';

const Context = createContext(null);

export const LoginContext = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLoginIsOpen = () => {
    setIsLoginOpen((prevState) => !prevState);
  };

  return (
    <Context.Provider value={{ isLoginOpen, toggleLoginIsOpen }}>
      {children}
    </Context.Provider>
  );
};

export const useLoginContext = () => useContext(Context);
