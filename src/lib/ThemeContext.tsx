import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isTransitioning: boolean;
  transitionType: "darkToLight" | "lightToDark" | null;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isTransitioning: false,
  transitionType: null,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const providerId = Math.random();

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("com_theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<"darkToLight" | "lightToDark" | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("com_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (isTransitioning) return;

    const nextTheme = theme === "dark" ? "light" : "dark";
    const type = theme === "dark" ? "darkToLight" : "lightToDark";

    setIsTransitioning(true);
    setTransitionType(type);

    // Swap theme at peak burst time (~650ms into 1300ms transition)
    setTimeout(() => {
      setTheme(nextTheme);
    }, 650);

    // End transition state
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionType(null);
    }, 1300);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning, transitionType }}>
      {children}
    </ThemeContext.Provider>
  );
};
