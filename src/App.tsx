import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { CurrencyProvider } from "@/providers/CurrencyProvider";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import MediaSearch from "@/pages/MediaSearch";
import Campaigns from "@/pages/Campaigns";
import Orders from "@/pages/Orders";
import AdsBank from "@/pages/AdsBank";
import Analytics from "@/pages/Analytics";
import AuctionPlace from "@/pages/AuctionPlace";
import Settings from "@/pages/Settings";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Welcome from "@/pages/auth/Welcome";
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
  <ThemeProvider>
    <CurrencyProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/auth/login" element={<Login />} />
                  <Route path="/auth/signup" element={<Signup />} />
                  <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                  <Route path="/auth/reset-password" element={<ResetPassword />} />
                  <Route path="/welcome" element={<Welcome />} />
                  
                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/media-search" element={<MediaSearch />} />
                      <Route path="/campaigns" element={<Campaigns />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/ads-bank" element={<AdsBank />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/auction-place" element={<AuctionPlace />} />
                      <Route path="/settings" element={<Settings />} />
                    </Route>
                  </Route>
                  
                  {/* Root redirect */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SidebarProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </CurrencyProvider>
  </ThemeProvider>
);

export default App;