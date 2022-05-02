import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import TryDemo from "./pages/TryDemo";
import GoalCardDetail from "./components/GoalCardDetail";
import DemoGoalCardDetail from "./components/DemoGoalCardDetail";
// import TestUserAcc from "./components/TestUserAcc";

import "./App.css";

import { demoCards, demoTodos } from "./data/demoData";

function App() {
  const [demoCardsData, setDemoCardsData] = useState([]);
  const [demoTodosData, setDemoTodosData] = useState([]);

  const removeCard = (cardId) => {
    setDemoCardsData(prev => prev.filter(card => card.id !== cardId));
    setDemoTodosData(prev => prev.filter(todo => todo.card_id !== cardId))
  }

  const removeTodo = (todoId) => {
    setDemoTodosData(prev => prev.filter(todo => todo.id !== todoId));
  }

  useEffect(() => {
    setDemoCardsData(demoCards);
    setDemoTodosData(demoTodos);
  }, [])

  return (
    <div className="App">
      {console.log(demoCardsData, demoTodosData)}
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:cardId" element={<GoalCardDetail />} />
            <Route path="/demo" element={<TryDemo
              demoCardsData={demoCardsData}
              removeCard={removeCard}
            />} />
            <Route path="/demo/:cardId" element={<DemoGoalCardDetail
              demoTodosData={demoTodosData}
              removeCard={removeCard}
              removeTodo={removeTodo}
            />} />
          </Routes>
        </BrowserRouter>
        {/* <TestUserAcc /> */}
      </UserProvider>
    </div>
  );
}

export default App;
