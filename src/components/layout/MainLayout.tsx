
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-advanta-lightgray">
      <Sidebar />
      <Header />
      <main className="pl-56 pt-16 min-h-screen">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
