import React from "react";
import "./App.scss";
import { Router } from "./routes/Router";
import { TokenProvider } from "./services/tokenService";

function App() {
  return (
    <div className="App">
      <TokenProvider>
        <Router />
      </TokenProvider>
    </div>
  );
}

export default App;
