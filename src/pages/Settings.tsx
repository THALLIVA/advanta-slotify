
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Display</CardTitle>
          <CardDescription>Customize your interface preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-muted-foreground text-sm">
                Switch between light and dark themes
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>Set your preferred currency for all transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select defaultValue="inr">
              <SelectTrigger id="currency" className="w-full md:w-[180px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inr">₹ Indian Rupee (INR)</SelectItem>
                <SelectItem value="usd">$ US Dollar (USD)</SelectItem>
                <SelectItem value="eur">€ Euro (EUR)</SelectItem>
                <SelectItem value="gbp">£ British Pound (GBP)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
