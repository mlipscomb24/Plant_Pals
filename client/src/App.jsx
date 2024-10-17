import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Plantcare from "./pages/Plantcare";
import Header from "./components/Header";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";



function App() {
  return (
    <div className="App">
      <Header />
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/plantcare" element={<Plantcare />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
