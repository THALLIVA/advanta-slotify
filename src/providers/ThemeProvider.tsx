
import { createContext, useContext, useEffect, useState } from "react";

/**
 * Available themes for the application
 */
type Theme = "light" | "dark";

/**
 * Available currency options
 */
export type Currency = "INR" | "USD" | "EUR" | "GBP";

/**
 * Currency symbols mapping
 */
export const currencySymbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£"
};

/**
 * Theme context interface
 */
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencySymbol: string;
}

/**
 * Theme context with default values
 */
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  setTheme: () => null,
  currency: "INR",
  setCurrency: () => null,
  currencySymbol: "₹"
});

/**
 * Theme provider component
 * Manages theme and currency state for the entire application
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // Use system preference as fallback
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Initialize currency from localStorage or default to INR
  const [currency, setCurrency] = useState<Currency>(() => {
    return (localStorage.getItem("currency") as Currency) || "INR";
  });

  // Get current currency symbol
  const currencySymbol = currencySymbols[currency];

  // Update theme in localStorage and document whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Update currency in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // Expose the theme and currency context to the application
  return (
    <ThemeContext.Provider value={{ theme, setTheme, currency, setCurrency, currencySymbol }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the theme context
 * Provides theme and currency values and setter functions
 */
export const useTheme = () => useContext(ThemeContext);
