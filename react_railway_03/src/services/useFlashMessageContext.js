import React, { createContext, useContext, useState } from "react";

const FlashMessageContext = createContext();

export const useFlashMessage = () => useContext(FlashMessageContext);

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <FlashMessageContext.Provider value={{ message, setMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
