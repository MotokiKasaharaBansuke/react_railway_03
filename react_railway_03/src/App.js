import React from "react";
import "./App.scss";
import { Router } from "./routes/Router";
import { TokenProvider } from "./services/useTokenContext";
import { FlashMessageProvider } from "./services/useFlashMessageContext";
import { UserProvider } from "./services/useUserContext";

function App() {
  return (
    <div className="App">
      <TokenProvider>
        <FlashMessageProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </FlashMessageProvider>
      </TokenProvider>
    </div>
  );
}

export default App;
