// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import GlobeView from "./components/GlobeView";
import Calculator from "./questions/Calculator";
import ToDo from "./questions/ToDo";

function App() {
  return (
    <Routes>
      {/* Home Globe Page */}
      <Route path="/" element={<GlobeView />} />

      {/* Projects */}
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/todo" element={<ToDo />} />
    </Routes>
  );
}

export default App;
