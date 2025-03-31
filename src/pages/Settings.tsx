import React from "react";
import { useTheme, Currency, currencySymbols } from "@/providers/ThemeProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, CreditCard } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";

/**
 * Settings component
 * Allows users to customize app appearance and preferences
 */
const Settings = () => {
  const { theme, setTheme, currency, setCurrency } = useTheme();
  const { toast } = useToast();

  // Handle theme toggle
  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      description: "Your preference has been saved",
    });
  };

  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    if (value && Object.keys(currencySymbols).includes(value)) {
      setCurrency(value as Currency);
      
      toast({
        title: "Currency updated",
        description: `Currency changed to ${value} (${currencySymbols[value as Currency]})`,
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-semibold">Settings</h1>
      
      {/* Appearance Settings */}
      <Card className="neo-border card-hover-effect">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how the application looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 text-primary" />
                ) : (
                  <Sun className="h-5 w-5 text-primary" />
                )}
              </div>
              <div>
                <Label htmlFor="theme-toggle" className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
            </div>
            <Switch 
              id="theme-toggle"
              checked={theme === "dark"}
              onCheckedChange={handleThemeToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
          
          {/* Currency Selection */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Label className="text-base">Display Currency</Label>
                <p className="text-sm text-muted-foreground">
                  Select your preferred currency for the application
                </p>
              </div>
            </div>
            
            <ToggleGroup 
              type="single" 
              className="justify-start mt-4"
              value={currency}
              onValueChange={handleCurrencyChange}
            >
              <ToggleGroupItem value="INR" aria-label="Indian Rupee">
                ₹ (INR)
              </ToggleGroupItem>
              <ToggleGroupItem value="USD" aria-label="US Dollar">
                $ (USD)
              </ToggleGroupItem>
              <ToggleGroupItem value="EUR" aria-label="Euro">
                € (EUR)
              </ToggleGroupItem>
              <ToggleGroupItem value="GBP" aria-label="British Pound">
                £ (GBP)
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>
      
      {/* Other settings sections could be added here */}
    </div>
  );
};

export default Settings;
