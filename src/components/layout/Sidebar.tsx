
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  BarChart, 
  FileText, 
  Settings, 
  Image,
  PieChart,
  Gavel
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

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
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 py-3 px-4 text-sm transition-all duration-200 hover-scale ${
          isActive
            ? "bg-sidebar-accent text-sidebar-primary font-medium"
            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

/**
 * Sidebar component
 * Main navigation sidebar for the application
 */
const Sidebar = () => {
  const { theme } = useTheme();
  
  return (
    <aside className="h-screen bg-sidebar fixed left-0 top-0 w-56 z-10 flex flex-col">
      <div className="p-4 pb-2 animate-fade-in border-b border-sidebar-border">
        <h1 className="text-sidebar-foreground text-xl font-bold">ADVANTA</h1>
        <p className="text-sidebar-foreground/60 text-xs">Next-Gen Media Intelligence Platform</p>
      </div>
      
      <nav className="flex-1 py-6 stagger-children">
        <SidebarLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarLink to="/media-search" icon={<Search size={18} />} label="Media Search" />
        <SidebarLink to="/campaigns" icon={<BarChart size={18} />} label="My Campaigns" />
        <SidebarLink to="/orders" icon={<FileText size={18} />} label="Orders" />
        <SidebarLink to="/ads-bank" icon={<Image size={18} />} label="Ads Bank" />
        <SidebarLink to="/analytics" icon={<PieChart size={18} />} label="Analytics" />
        <SidebarLink to="/auction-place" icon={<Gavel size={18} />} label="Auction Place" />
        <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>
      
      <div className="p-4 text-xs text-sidebar-foreground/40 border-t border-sidebar-border">
        <p>© 2025 Advanta</p>
      </div>
    </aside>
  );
};

export default Sidebar;
