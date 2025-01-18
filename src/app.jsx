import React from "react";
import Header from "./components/header";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Questions from "./pages/questions";
import HowItWorks from "./pages/how-it-works";
import { useUser } from "@clerk/clerk-react";
import SignIn from "./auth/sign-in";
import DynamicPage from "./pages/dynamicpage";
import Start from "./pages/start";
import Feedback from "./pages/feedback";

export default function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        {isSignedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/howitworks" element={<HowItWorks />} />
            <Route path="/interview/:id" element={<DynamicPage />} />
            <Route path="/interview/:id/start" element={<Start />} />
            <Route path="/interview/:id/feedback" element={<Feedback />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}
      </Routes>
    </div>
  );
}
