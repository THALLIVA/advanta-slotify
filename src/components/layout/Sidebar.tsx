
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  BarChart, 
  FileText, 
  Settings, 
  Image,
  PieChart,
  FilePlus
} from "lucide-react";

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
        `flex items-center gap-3 py-3 px-4 text-sm transition-colors ${
          isActive
            ? "bg-advanta-darkblue/10 text-advanta-blue font-medium"
            : "text-white/80 hover:text-white hover:bg-advanta-darkblue/20"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <aside className="h-screen bg-advanta-darkblue fixed left-0 top-0 w-56 z-10 flex flex-col">
      <div className="p-4 pb-2">
        <h1 className="text-white text-xl font-bold">ADVANTA</h1>
        <p className="text-white/60 text-xs">The Traditional Media Marketplace</p>
      </div>
      
      <nav className="flex-1 py-6">
        <SidebarLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <SidebarLink to="/media-search" icon={<Search size={18} />} label="Media Search" />
        <SidebarLink to="/campaigns" icon={<BarChart size={18} />} label="My Campaigns" />
        <SidebarLink to="/orders" icon={<FileText size={18} />} label="Orders" />
        <SidebarLink to="/ads-bank" icon={<Image size={18} />} label="Ads Bank" />
        <SidebarLink to="/analytics" icon={<PieChart size={18} />} label="Analytics" />
        <SidebarLink to="/reports" icon={<FilePlus size={18} />} label="Reports" />
        <SidebarLink to="/settings" icon={<Settings size={18} />} label="Settings" />
      </nav>
    </aside>
  );
};

export default Sidebar;
