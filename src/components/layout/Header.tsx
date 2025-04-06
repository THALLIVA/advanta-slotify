import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  isCollapsed: boolean;
}

const Header = ({ isCollapsed }: HeaderProps) => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <header className={cn(
      "h-16 bg-advanta-blue dark:bg-sidebar fixed top-0 right-0 z-10 flex items-center justify-between px-6 transition-all duration-300",
      isCollapsed ? "left-16" : "left-56"
    )}>
      <h1 className="text-white dark:text-foreground text-xl font-medium">ADVANTA</h1>
      
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-white dark:text-foreground text-sm hidden sm:inline-block">{user.email}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 bg-white text-advanta-blue dark:bg-primary dark:text-primary-foreground cursor-pointer">
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-white" asChild>
            <a href="/auth/login">Login</a>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;