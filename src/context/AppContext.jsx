import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("mindcompass-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "light";
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("mindcompass-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  function setAnswer(type, questionId, answer) {
    setResponses((currentResponses) => ({
      ...currentResponses,
      [type]: {
        ...(currentResponses[type] ?? {}),
        [questionId]: answer,
      },
    }));
  }

  function resetAssessment(type) {
    setResponses((currentResponses) => {
      const nextResponses = { ...currentResponses };
      delete nextResponses[type];
      return nextResponses;
    });

    setResults((currentResults) => {
      const nextResults = { ...currentResults };
      delete nextResults[type];
      return nextResults;
    });
  }

  function saveResult(type, result) {
    setResults((currentResults) => ({
      ...currentResults,
      [type]: result,
    }));
  }

  const value = {
    theme,
    toggleTheme,
    responses,
    results,
    setAnswer,
    resetAssessment,
    saveResult,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider.");
  }

  return context;
}
