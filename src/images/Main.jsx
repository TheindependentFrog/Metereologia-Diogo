// src/Main.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Map from "./map";

function Main() {
  return (
    <Router>
      <nav style={{ display: "flex", justifyContent: "center", gap: "1rem", margin: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/map">Map</Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default Main;
