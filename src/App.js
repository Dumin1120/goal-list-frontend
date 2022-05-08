// import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HomeBoard from "./components/HomeBoard";
import UserLogIn from "./components/UserLogIn";
import UserSignUp from "./components/UserSignUp";
import GoalCardDetail from "./components/GoalCardDetail";

import "./App.css";


export default function App() {

  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<HomeBoard />} />
            <Route path="/login" element={<UserLogIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/card/:cardId" element={<GoalCardDetail />} />
            {/* <Route path="/:cardId" element={<GoalCardDetail />} /> */}
            {/* <Route path="/demo" element={<TryDemo
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
            />} /> */}
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

/*

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
*/
