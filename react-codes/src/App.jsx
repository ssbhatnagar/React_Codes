// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import GlobeView from "./components/GlobeView";
import NotFound from "./components/NotFound";
import Calculator from "./questions/Calculator";
import ToDo from "./questions/ToDo";
import TodoFinal from "./questions/TodoFinal";
import PasswordGenerator from "./questions/PasswordGenerator";

function App() {
  return (
    <Routes>
      {/* Home Globe Page */}
      <Route path="/" element={<GlobeView />} />

      {/* Projects */}
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/todo" element={<ToDo />} />
      <Route path="/todofinal" element={<TodoFinal />} />
      <Route path="/password-generator" element={<PasswordGenerator />} />
      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
