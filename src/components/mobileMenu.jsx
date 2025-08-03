// components/MobileMenu.jsx
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/context/useCart";
import { CartSheet } from "./CartSheet";

const pages = ["Home", "Products", "Stores", "About"];

export function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close mobile menu after navigation
  };

  return (
    <div className="md:hidden flex justify-between items-center w-full px-4 py-2 border-b">
      {/* Mobile Menu Sheet (Left Side) */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-2">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <div className="flex flex-col space-y-4 mt-6">
            {pages.map((page) => (
              <button
                key={page}
                className="text-left text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                onClick={() =>
                  handleNavigate(
                    page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase()}`
                  )
                }
              >
                {page}
              </button>
            ))}
            <div className="relative mt-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-background text-foreground placeholder-muted-foreground rounded-md pl-10"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Branding and Cart */}
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg">FourteenMart</span>

        {/* Cart Sheet Trigger (Right Side) */}
        <Sheet open={cartOpen} onOpenChange={setCartOpen}>
          <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <CartSheet count={cartItemsCount} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
