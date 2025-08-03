import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/useCart";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export function CartDropdown({ count }) {
  const { cart, updateQuantity, clearCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <div className="max-h-96 overflow-auto px-2 py-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 py-2 border-b last:border-none"
            >
              <div className="w-10 h-10 overflow-hidden rounded relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} x RS. {item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, item.quantity - 1);
                  }}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, item.quantity + 1);
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="border-t p-4 space-y-3">
            <p className="font-semibold">
              Subtotal: RS. {subtotal.toLocaleString()}
            </p>
            <div className="flex gap-2">
              <Link to="/cart" className="flex-1">
                <Button className="w-full">View Cart</Button>
              </Link>
              <Link to="/checkout" className="flex-1">
                <Button className="w-full">Checkout</Button>
              </Link>
            </div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => clearCart()}
            >
              Clear Cart
            </Button>
          </div>
        ) : (
          <div className="p-4 text-center">Your cart is empty</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
