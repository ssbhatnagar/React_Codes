// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import GlobeView from "./utils/GlobeView";
import NotFound from "./utils/NotFound";
import Calculator from "./components/Calculator/Calculator";
import ToDo from "./components/TodoAppAllType/ToDo";
import TodoFinal from "./components/TodoAppAllType/TodoFinal";
import PasswordGenerator from "./components/PasswordGenerator/PasswordGenerator";
import WeatherApp from "./components/WeatherApp/WeatherApp";

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
      <Route path="/weather" element={<WeatherApp />} />
      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
