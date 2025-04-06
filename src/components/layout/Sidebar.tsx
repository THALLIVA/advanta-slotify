import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  BarChart, 
  FileText, 
  Settings, 
  Image,
  PieChart,
  Gavel,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * SidebarLink component
 * Renders a navigation link in the sidebar with active state styling
 */
interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarLink = ({ to, icon, label }: SidebarLinkProps) => {
  const { isCollapsed } = useSidebar();
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 py-3 transition-all duration-200 hover-scale",
          isCollapsed 
            ? "justify-center px-2" 
            : "px-4",
          isActive
            ? "bg-advanta-darkblue/10 text-advanta-blue font-medium"
            : "text-white/80 hover:text-white hover:bg-advanta-darkblue/20"
        )
      }
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};

/**
 * Sidebar component
 * Main navigation sidebar for the application
 */
const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  
  return (
    <aside 
      className={cn(
        "h-screen bg-advanta-darkblue fixed left-0 top-0 z-10 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className={cn(
        "p-4 pb-2 animate-fade-in flex items-center",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
        {!isCollapsed && (
          <div>
            <h1 className="text-white text-xl font-bold">ADVANTA</h1>
            <p className="text-white/60 text-xs">Next-Gen Media Intelligence Platform</p>
          </div>
        )}
        {isCollapsed && (
          <h1 className="text-white text-xl font-bold">A</h1>
        )}
      </div>
      
      <nav className="flex-1 py-6 stagger-children">
        <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarLink to="/media-search" icon={<Search size={18} />} label="Media Search" />
        <SidebarLink to="/campaigns" icon={<BarChart size={18} />} label="My Campaigns" />
        <SidebarLink to="/orders" icon={<FileText size={18} />} label="Orders" />
        <SidebarLink to="/ads-bank" icon={<Image size={18} />} label="Ads Bank" />
        <SidebarLink to="/analytics" icon={<PieChart size={18} />} label="Analytics" />
        <SidebarLink to="/auction-place" icon={<Gavel size={18} />} label="Auction Place" />
        <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>
      
      <div className="p-4 flex justify-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          className="text-white/70 hover:text-white hover:bg-advanta-darkblue/20"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
