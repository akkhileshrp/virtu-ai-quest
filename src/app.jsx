import React from "react";
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
import Learning from "./pages/learning";
import AICoverLetter from "./pages/ai-coverletter";
import CreateCourse from "./pages/create-course";

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
            {/* basic routing and interview routing */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/interview/:id" element={<DynamicPage />} />
            <Route path="/interview/:id/start" element={<Start />} />
            <Route path="/interview/:id/feedback" element={<Feedback />} />
            {/* learning and cover letter and etc.. features routing */}
            <Route path="/learning-path" element={<Learning />} />
            <Route path="/cover-letter" element={<AICoverLetter />} />
            <Route path="/learning-path/create-course" element={<CreateCourse />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}
      </Routes>
    </div>
  );
}
