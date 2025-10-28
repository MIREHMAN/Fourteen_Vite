
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "./ui/toaster";


const Layout = () => {
  return (
  
        <div className="flex flex-col min-h-screen">
          {/* Toast Notifications */}
          <Toaster />

          {/* Header/Navbar */}
          <Navbar/>

          {/* Main Content */}
          <main className="flex-1 ">
            <Outlet />
          </main>

          {/* Footer */}
          <Footer />
        </div>
  
  );
};

export default Layout;
