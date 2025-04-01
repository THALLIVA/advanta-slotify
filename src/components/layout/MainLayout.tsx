
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const { isCollapsed } = useSidebar();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-advanta-lightgray dark:bg-background">
      <Sidebar />
      <Header isCollapsed={isCollapsed || isMobile} />
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300",
        isMobile ? "pl-0" : (isCollapsed ? "pl-16" : "pl-56")
      )}>
        <div className="container mx-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
