import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, Create, UpdatePage, ViewTask } from "./screens";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/view/:id" element={<ViewTask />} />
      </Routes>
    </Router>
  );
};

export default App;
