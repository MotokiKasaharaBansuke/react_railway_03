import React, { createContext, useContext, useState, useEffect } from "react";
import { useToken } from "./useTokenContext";
import { getUser } from "./userService";
import { useFlashMessage } from "./useFlashMessageContext";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { setMessage } = useFlashMessage();
  const { token } = useToken();
  const [user, setUser] = useState(null);

  const refreshUser = () => {
    if (token) {
      getUser(token)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  };

  useEffect(() => {
    refreshUser();
  }, [token, setMessage]);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
