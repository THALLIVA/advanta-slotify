
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Check, Info, BarChart3, Users, Target, Banknote } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Define the format recommendation interface
interface FormatRecommendation {
  id: string;
  format: string;
  suitability: number; // 0-100
  costPerImpression: string;
  estimatedReach: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * RecommendationEngine component
 * Provides AI-powered media format recommendations based on campaign parameters
 */
const RecommendationEngine = () => {
  // State for form inputs
  const [budget, setBudget] = useState<number>(250000);
  const [audienceAge, setAudienceAge] = useState<string>("25-34");
  const [targetImpressions, setTargetImpressions] = useState<number>(500000);
  const [objective, setObjective] = useState<string>("awareness");
  const [region, setRegion] = useState<string>("north");
  
  // State for recommendations
  const [recommendations, setRecommendations] = useState<FormatRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  /**
   * Generates recommendations based on user inputs
   * In a real app, this would call an AI service
   */
  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Algorithm to generate recommendations based on inputs
      const newRecommendations: FormatRecommendation[] = [];
      
      // Different recommendations based on age group
      if (audienceAge === "18-24" || audienceAge === "25-34") {
        newRecommendations.push({
          id: "social",
          format: "Social Media",
          suitability: 95,
          costPerImpression: "₹0.50",
          estimatedReach: formatNumber(targetImpressions * 1.2),
          description: "High engagement with younger audiences through Instagram, Facebook and Twitter ads.",
          icon: <Users className="h-8 w-8 text-blue-500" />,
        });
        
        newRecommendations.push({
          id: "digital",
          format: "Digital Display",
          suitability: 85,
          costPerImpression: "₹0.65",
          estimatedReach: formatNumber(targetImpressions * 1.1),
          description: "Banner ads and sponsored content on high-traffic websites.",
          icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
        });
      }
      
      // Add print media for specific objectives or older audiences
      if (objective === "awareness" || audienceAge === "35-44" || audienceAge === "45+") {
        newRecommendations.push({
          id: "print",
          format: "Print Media",
          suitability: audienceAge === "45+" ? 90 : 70,
          costPerImpression: "₹0.85",
          estimatedReach: formatNumber(targetImpressions * 0.8),
          description: "Newspaper and magazine ads for brand credibility and wide reach.",
          icon: <Info className="h-8 w-8 text-gray-500" />,
        });
      }
      
      // Add outdoor media for higher budgets
      if (budget > 200000) {
        newRecommendations.push({
          id: "outdoor",
          format: "Billboard & OOH",
          suitability: region === "metro" ? 80 : 65,
          costPerImpression: "₹1.25",
          estimatedReach: formatNumber(targetImpressions * 0.75),
          description: "High-visibility outdoor advertising at strategic locations.",
          icon: <Target className="h-8 w-8 text-green-500" />,
        });
      }
      
      // Add TV for very high budgets
      if (budget > 500000) {
        newRecommendations.push({
          id: "tv",
          format: "Television",
          suitability: 75,
          costPerImpression: "₹1.75",
          estimatedReach: formatNumber(targetImpressions * 0.9),
          description: "Prime time and targeted TV slots for maximum visibility.",
          icon: <Banknote className="h-8 w-8 text-amber-500" />,
        });
      }
      
      // Sort by suitability
      newRecommendations.sort((a, b) => b.suitability - a.suitability);
      
      setRecommendations(newRecommendations);
      setIsLoading(false);
      
      toast({
        title: "Recommendations ready",
        description: `We've analyzed your campaign needs and found ${newRecommendations.length} recommended formats.`,
      });
    }, 1500);
  };

  /**
   * Helper function to format large numbers
   */
  const formatNumber = (num: number): string => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(1)}M`
      : `${(num / 1000).toFixed(0)}K`;
  };

  /**
   * Format budget for display
   */
  const formatBudget = (value: number): string => {
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Campaign Recommendation Engine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="budget">Campaign Budget</Label>
              <span className="text-sm font-medium">{formatBudget(budget)}</span>
            </div>
            <Slider
              id="budget"
              min={50000}
              max={1000000}
              step={50000}
              value={[budget]}
              onValueChange={(value) => setBudget(value[0])}
              className="hover-scale"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹50K</span>
              <span>₹1M</span>
            </div>
          </div>

          {/* Target audience age */}
          <div className="space-y-2">
            <Label htmlFor="audienceAge">Target Audience Age</Label>
            <Select value={audienceAge} onValueChange={setAudienceAge}>
              <SelectTrigger id="audienceAge" className="hover-scale">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-24">18-24 years</SelectItem>
                <SelectItem value="25-34">25-34 years</SelectItem>
                <SelectItem value="35-44">35-44 years</SelectItem>
                <SelectItem value="45+">45+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target impressions */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="impressions">Target Impressions</Label>
              <span className="text-sm font-medium">{formatNumber(targetImpressions)}</span>
            </div>
            <Slider
              id="impressions"
              min={100000}
              max={2000000}
              step={100000}
              value={[targetImpressions]}
              onValueChange={(value) => setTargetImpressions(value[0])}
              className="hover-scale"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100K</span>
              <span>2M</span>
            </div>
          </div>

          {/* Campaign objective */}
          <div className="space-y-2">
            <Label htmlFor="objective">Campaign Objective</Label>
            <Select value={objective} onValueChange={setObjective}>
              <SelectTrigger id="objective" className="hover-scale">
                <SelectValue placeholder="Select objective" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="consideration">Consideration</SelectItem>
                <SelectItem value="conversion">Conversion</SelectItem>
                <SelectItem value="loyalty">Customer Loyalty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target region */}
          <div className="space-y-2">
            <Label htmlFor="region">Target Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region" className="hover-scale">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
                <SelectItem value="metro">Metro Cities Only</SelectItem>
                <SelectItem value="nationwide">Nationwide</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={generateRecommendations} 
            disabled={isLoading}
            className="w-full hover-scale"
          >
            {isLoading ? "Analyzing..." : "Get Recommendations"}
          </Button>
        </CardFooter>
      </Card>

      {/* Recommendations section */}
      {recommendations.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-xl">Recommended Media Formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="p-4 border rounded-lg transition-all duration-300 hover:shadow-md hover-scale"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-full p-2 bg-gray-100">
                    {rec.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">{rec.format}</h3>
                      <Badge 
                        className={cn(
                          "px-2 font-normal",
                          rec.suitability > 85 ? "bg-green-100 text-green-800 hover:bg-green-100" :
                          rec.suitability > 70 ? "bg-blue-100 text-blue-800 hover:bg-blue-100" :
                          "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        )}
                      >
                        {rec.suitability}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                    <div className="flex flex-wrap gap-4 pt-1">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Cost per impression:</span> <span className="font-medium">{rec.costPerImpression}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Estimated reach:</span> <span className="font-medium">{rec.estimatedReach}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="hover-scale">Save Recommendations</Button>
            <Button className="hover-scale">Create Campaign with These Formats</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default RecommendationEngine;
