// App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Onboarding from "./Onboarding";
import AssignmentDashboard from "./AssignmentDashboard";
import CalendarView from "./CalendarView";
import NotificationCenter from "./NotificationCenter";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>CourseTrack</h1>
          <nav className="tab-bar">
            <NavLink to="/" className="tab-button">
              Onboarding
            </NavLink>
            <NavLink to="/dashboard" className="tab-button">
              Assignment Dashboard
            </NavLink>
            <NavLink to="/calendar" className="tab-button">
              Calendar View
            </NavLink>
            <NavLink to="/notifications" className="tab-button">
              Notification Center
            </NavLink>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<AssignmentDashboard />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/notifications" element={<NotificationCenter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
