import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Project from "./pages/project";
import Task from "./pages/task";
import User from "./pages/user";
import { Toaster } from "react-hot-toast";
import TimeLog from "./pages/timeLog";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/project" element={<Project />} />
              <Route path="/task" element={<Task />} />
              <Route path="/user" element={<User />} />
              <Route path="/timeLog" element={<TimeLog />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
