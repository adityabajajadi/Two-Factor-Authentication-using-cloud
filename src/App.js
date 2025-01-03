import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePages";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignUpForm";
import Page2 from "./components/Page2.js";
import FPage3 from "./pages/fpage3.jsx";

 // Import the new page component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/app" element={<Page2 />} />
        <Route path="/fpage3" element={<FPage3 />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
};

export default App;