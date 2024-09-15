import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import SignUpPage from "./SignUpPage";
import Header from "./Header"; // Import the Header component
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add any additional logout logic here
  };

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/SignIn" element={<SignUpPage />} />
        
      </Routes>
    </div>
  );
}

export default App;