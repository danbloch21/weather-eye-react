// Layout container //

import React from "react";
import "./App.css";
import Forecast from "./components/Forecast/Forecast";
import Logo from "./components/Logo/Logo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1>React Weather Eye</h1>
      </header>
      <main>
        <Forecast />
      </main>
      <footer>Page created by Dan Bloch</footer>
    </div>
  );
}

export default App;
