import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import SignUpPage from "./SignUpPage";

function App() {
  return (
    <div className="App">
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
