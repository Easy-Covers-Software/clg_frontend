import React, { createContext, useState, useContext } from 'react';

const LoginAccordionContext = createContext(null);

export const LoginContext = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleLoginIsOpen = () => {
    setIsLoginOpen((prevState) => !prevState);
  };

  return (
    <LoginAccordionContext.Provider value={{ isLoginOpen, toggleLoginIsOpen }}>
      {children}
    </LoginAccordionContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginAccordionContext);




