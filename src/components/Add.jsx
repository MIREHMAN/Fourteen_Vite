import  { useState } from "react";
import { Button } from "@/components/ui/button";

const Add = ({ onAddToCart, onBuyNow, stockNumber }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (type === "inc" && quantity < stockNumber) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    onAddToCart(quantity);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(quantity);
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-muted py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("dec")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity("inc")}
              disabled={quantity === stockNumber}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stockNumber} items</span>{" "}
              left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={handleAddToCart}
          disabled={isLoading || stockNumber < 1}
          className="flex-1"
        >
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
        <Button
          onClick={handleBuyNow}
          disabled={stockNumber < 1}
          variant="secondary"
          className="flex-1"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default Add;