// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import TestUserAcc from "./components/TestUserAcc";

import './App.css';

function App() {
  return (
    <div className="App">
      <UserProvider>
        Hello, Goal list App!
        <TestUserAcc />
      </UserProvider>
    </div>
  );
}

export default App;
