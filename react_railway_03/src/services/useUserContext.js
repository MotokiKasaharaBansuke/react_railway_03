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

  useEffect(() => {
    if (token) {
      getUser(token)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }, [token, user, setMessage]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
