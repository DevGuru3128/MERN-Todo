import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee from "../pages/EmployeePage";
import HomePage from "../pages/HomePage";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/employee" Component={Employee} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
