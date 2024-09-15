import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
import SignUpPage from "./SignUpPage";
import CreateEvent from "./CreateEvent";
import EventDetail from "./EventDetail";
import DetailMemberList from "./DetailMemberList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
          caseSensitive={false}
        />
        <Route path="/SignIn" element={<SignUpPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/EventDetail" element={<EventDetail />} />
        <Route path="/DetailMemberList" element={<DetailMemberList />} />
      </Routes>
    </div>
  );
}

export default App;
