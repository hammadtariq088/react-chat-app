import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chats from "./components/Chats";
import AuthContext from "./contexts/AuthContext";

const App = () => {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <AuthContext>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/chats" element={<Chats />} />
        </Routes>
      </AuthContext>
    </div>
  );
};

export default App;
