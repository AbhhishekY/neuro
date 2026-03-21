import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faHouse,
  faLifeRing,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import DarkModeToggle from "./DarkModeToggle";
import useScrolled from "../hooks/useScrolled";

function navLinkClass({ isActive }) {
  return "nav-link" + (isActive ? " active" : "");
}

export default function Navbar() {
  const scrolled = useScrolled(10);

  return (
    <nav className={scrolled ? "nav--scrolled" : undefined}>
      <NavLink to="/" className="nav-brand">
        <span className="nav-brand-icon">
          <FontAwesomeIcon icon={faBrain} />
        </span>
        MindCompass
      </NavLink>

      <div className="nav-right">
        <div className="nav-links">
          <NavLink to="/" className={navLinkClass} end>
            <FontAwesomeIcon icon={faHouse} />
            Home
          </NavLink>
          <NavLink to="/referral" className={navLinkClass}>
            <FontAwesomeIcon icon={faLifeRing} />
            Support
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            <FontAwesomeIcon icon={faCircleInfo} />
            About
          </NavLink>
        </div>
        <DarkModeToggle />
      </div>
    </nav>
  );
}
