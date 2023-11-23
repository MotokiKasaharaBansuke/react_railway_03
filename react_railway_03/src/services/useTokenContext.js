import React, { createContext, useState, useContext, useEffect } from "react";

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  const [token, setToken] = useState(getTokenFromLocalStorage());

  const saveToken = (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  useEffect(() => {
    setToken(getTokenFromLocalStorage());
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </TokenContext.Provider>
  );
};
