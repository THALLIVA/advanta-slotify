
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="h-16 bg-advanta-blue fixed top-0 right-0 left-56 z-10 flex items-center justify-between px-6">
      <h1 className="text-white text-xl font-medium">ADVANTA</h1>
      <div className="flex items-center gap-3">
        <span className="text-white text-sm">Anand Sharma</span>
        <Avatar className="h-9 w-9 bg-white text-advanta-blue">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
