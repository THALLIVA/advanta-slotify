
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isCollapsed: boolean;
}

const Header = ({ isCollapsed }: HeaderProps) => {
  return (
    <header className={cn(
      "h-16 bg-advanta-blue dark:bg-sidebar fixed top-0 right-0 z-10 flex items-center justify-between px-6 transition-all duration-300",
      isCollapsed ? "left-16" : "left-56"
    )}>
      <h1 className="text-white dark:text-foreground text-xl font-medium">ADVANTA</h1>
      <div className="flex items-center gap-3">
        <span className="text-white dark:text-foreground text-sm">Anand Sharma</span>
        <Avatar className="h-9 w-9 bg-white text-advanta-blue dark:bg-primary dark:text-primary-foreground">
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
