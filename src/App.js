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

  const addCard = (cardName) => {
    const newCard = {
      id: Math.max(0, ...demoCardsData.map(c => c.id)) + 1,
      uid: "iZn6jCgv9k",
      card_name: cardName
    }
    setDemoCardsData(prev => [...prev, newCard]);
  }

  const addTodo = (cardId, todoDesc) => {
    const newTodo = {
      id: Math.max(0, ...demoTodosData.map(t => t.id)) + 1,
      uid: "iZn6jCgv9k",
      to_do: todoDesc,
      card_id: cardId
    }
    setDemoTodosData(prev => [...prev, newTodo]);
  }

  const editCard = (id, cardName) => {
    setDemoCardsData(prev => prev.map(c => c.id === id ? (c.card_name = cardName, c) : c));
  }

  const editTodo = (id, todoDesc) => {
    setDemoTodosData(prev => prev.map(t => t.id === id ? (t.to_do = todoDesc, t) : t));
  }

  const removeCard = (cardId) => {
    setDemoCardsData(prev => prev.filter(c => c.id !== cardId));
    setDemoTodosData(prev => prev.filter(t => t.card_id !== cardId));
  }

  const removeTodo = (todoId) => {
    setDemoTodosData(prev => prev.filter(t => t.id !== todoId));
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
              addCard={addCard}
              editCard={editCard}
              removeCard={removeCard}
            />} />
            <Route path="/demo/:cardId" element={<DemoGoalCardDetail
              demoCardsData={demoCardsData}
              demoTodosData={demoTodosData}
              addTodo={addTodo}
              editCard={editCard}
              editTodo={editTodo}
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
