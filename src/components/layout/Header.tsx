
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Header component
 * Top navigation bar with user profile and theme toggle
 */
const Header = () => {
  const { theme, setTheme, currencySymbol } = useTheme();
  
  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="h-16 bg-primary fixed top-0 right-0 left-56 z-10 flex items-center justify-between px-6 shadow-md">
      <h1 className="text-primary-foreground text-xl font-medium">ADVANTA</h1>
      
      <div className="flex items-center gap-6">
        <div className="text-primary-foreground text-sm bg-primary-foreground/10 px-3 py-1 rounded-full">
          {currencySymbol} Currency
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full w-9 h-9 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        
        <div className="flex items-center gap-3">
          <span className="text-primary-foreground text-sm">Anand Sharma</span>
          <Avatar className="h-9 w-9 bg-white text-primary hover-scale">
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
