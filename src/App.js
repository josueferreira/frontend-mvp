import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Seguir from "./components/Seguir";

function App() {
  return (
    <div className="flex flex-row">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
        <Seguir />
      </Router>
    </div>
  );
}

export default App;
