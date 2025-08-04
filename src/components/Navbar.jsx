// Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import { CartDropdown } from "./CartDropDown";
import { useCart } from "@/context/useCart";
import { MobileMenu } from "@/components/mobileMenu";

const pages = ["Home", "Products", "Stores", "About"];

export function Navbar() {
  const location = useLocation();
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile View */}
          <MobileMenu />

          {/* Desktop Logo */}
          <div className="hidden md:flex items-center">
            <Link to="/" className="text-xl font-bold">
              FourteenMart
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <div className="ml-10 flex items-baseline space-x-4">
              {pages.map((page) => (
                <Link
                  key={page}
                  to={
                    page.toLowerCase() === "home"
                      ? "/"
                      : `/${page.toLowerCase()}`
                  }
                  className={`text-foreground hover:bg-accent ${
                    location.pathname === `/${page.toLowerCase()}`
                      ? "bg-accent"
                      : ""
                  } hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center ml-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-background text-foreground placeholder-muted-foreground rounded-md pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="ml-3">
              <CartDropdown count={cartItemsCount} />
            </div>
            <Button variant="outline" className="ml-3 px-8">
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
