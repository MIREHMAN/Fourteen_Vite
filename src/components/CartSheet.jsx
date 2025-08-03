import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/useCart";
import { Link } from "react-router-dom";

export function CartSheet() {
  const { cart, updateQuantity, clearCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SheetContent side="right" className="w-[90%] sm:w-96 flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-4 flex-1 overflow-y-auto  space-y-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="w-8 h-8 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × RS. {item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground mt-8">
            Your cart is empty
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="pt-4 border-t bg-white">
          <p className="font-semibold mb-2 px-2">
            Subtotal: RS. {subtotal.toLocaleString()}
          </p>

          <div className="flex gap-2 px-2 pb-2">
            <Link to="/cart" className="w-1/2">
              <Button className="w-full">View Cart</Button>
            </Link>
            <Link to="/checkout" className="w-1/2">
              <Button className="w-full">Checkout</Button>
            </Link>
          </div>

          <div className="px-2">
            <Button
              variant="destructive"
              className="w-full"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      )}
    </SheetContent>
  );
}
