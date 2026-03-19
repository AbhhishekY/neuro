import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../context/AppContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
    </button>
  );
}
