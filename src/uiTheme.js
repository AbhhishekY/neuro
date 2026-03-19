import {
  faBrain,
  faPuzzlePiece,
  faCloudRain,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

export const conditionTheme = {
  adhd: {
    color: "#F59E0B",
    colorHover: "#D97706",
    colorLight: "#FFFBEB",
    colorText: "#78350F",
    colorBorder: "#FDE68A",
    icon: faBrain,
    label: "ADHD",
  },
  autism: {
    color: "#0EA5E9",
    colorHover: "#0284C7",
    colorLight: "#F0F9FF",
    colorText: "#0C4A6E",
    colorBorder: "#BAE6FD",
    icon: faPuzzlePiece,
    label: "Autism",
  },
  depression: {
    color: "#6366F1",
    colorHover: "#4F46E5",
    colorLight: "#EEF2FF",
    colorText: "#312E81",
    colorBorder: "#C7D2FE",
    icon: faCloudRain,
    label: "Depression",
  },
  anxiety: {
    color: "#8B5CF6",
    colorHover: "#7C3AED",
    colorLight: "#F5F3FF",
    colorText: "#4C1D95",
    colorBorder: "#DDD6FE",
    icon: faWind,
    label: "Anxiety",
  },
};

export function getConditionTheme(type) {
  return (
    conditionTheme[type] ?? {
      color: "#4361EE",
      colorHover: "#3451D1",
      colorLight: "#EEF2FF",
      colorText: "#312E81",
      colorBorder: "#C7D2FE",
      icon: faBrain,
      label: "Screening",
    }
  );
}
