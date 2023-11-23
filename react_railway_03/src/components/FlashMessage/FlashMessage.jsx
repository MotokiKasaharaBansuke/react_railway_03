import React, { useEffect } from "react";
import { useFlashMessage } from "../../services/useFlashMessageContext";
import "./FlashMessage.scss";

export const FlashMessage = () => {
  const { message, setMessage } = useFlashMessage();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return <div className="flash-message">{message}</div>;
};
