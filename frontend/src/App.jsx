import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/LandingPage/Home";
import Login from "./components/LandingPage/Login";
import SignUp from "./components/LandingPage/SignUp";
import Dashboard from "./components/AdminDashboard/Dashboard";
import Application from "./components/AdminDashboard/Application";
import Settings from "./components/AdminDashboard/Settings";
import Jobs from "./components/AdminDashboard/Jobs";
import Companies from "./components/AdminDashboard/Companies";
import Profile from "./components/AdminDashboard/Profile";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Help from "./components/AdminDashboard/Help";

function App() {
  const googleClientId =
    "69056251506-h4u9nd77t85ovk87ufa44jkudt6d5ske.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        {/* Set up Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
