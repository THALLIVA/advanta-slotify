import * as React from "react";

type Theme = "dark" | "light";
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    // Check if there's a saved theme in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    
    // If there's a saved theme, use it
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    
    // Otherwise, check for system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  React.useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
    
    // Apply theme to the document element
    const root = window.document.documentElement;
    
    // Remove the old theme class
    root.classList.remove("light", "dark");
    
    // Add the new theme class
    root.classList.add(theme);
  }, [theme]);

  const value = React.useMemo(() => ({
    theme,
    setTheme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the theme
export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};
