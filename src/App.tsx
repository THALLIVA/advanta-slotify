
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import MediaSearch from "@/pages/MediaSearch";
import Campaigns from "@/pages/Campaigns";
import Orders from "@/pages/Orders";
import AdsBank from "@/pages/AdsBank";
import Analytics from "@/pages/Analytics";
import AuctionPlace from "@/pages/AuctionPlace";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

/**
 * Create a QueryClient instance for React Query
 * This handles data fetching, caching, and state management
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: import.meta.env.PROD, // Only in production
    },
  },
});

/**
 * App component
 * Main application component that sets up providers and routing
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/media-search" element={<MediaSearch />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/ads-bank" element={<AdsBank />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/auction-place" element={<AuctionPlace />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
