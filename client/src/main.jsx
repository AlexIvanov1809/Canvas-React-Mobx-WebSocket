import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Canvas, SettingBar, Toolbar } from "./components";
import "./styles/style.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Main />} />
        <Route
          path="/"
          element={<Navigate to={`/f${(+new Date()).toString(16)}`} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

const Main = () => {
  return (
    <div className="app">
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
};

createRoot(document.getElementById("app")).render(<App />);
