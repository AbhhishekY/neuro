import React from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Intro from "./pages/Intro";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Referral from "./pages/Referral";
import Results from "./pages/Results";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/assessment/:type/intro" element={<Intro />} />
            <Route path="/assessment/:type/quiz" element={<Quiz />} />
            <Route path="/assessment/:type/results" element={<Results />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}
