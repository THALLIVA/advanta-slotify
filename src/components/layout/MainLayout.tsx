
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen bg-advanta-lightgray dark:bg-background">
      <Sidebar />
      <Header isCollapsed={isCollapsed} />
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300",
        isCollapsed ? "pl-16" : "pl-56"
      )}>
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
