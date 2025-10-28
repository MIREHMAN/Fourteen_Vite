import { useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/useCart";

const ProductCard = ({
  id,
  name,
  price,
  discount_price,
  average_rating,
  discount_percentage,
}) => {
  const navigate = useNavigate();
  const { addToCart, buyNow } = useCart();

  const product = {
    id,
    name,
    price,
    discount_price,
    average_rating,
    discount_percentage,
    image: "/camera.png",
  };

  // Buy Now: replace cart with this item and go to checkout
  const handleBuyNow = () => {
    buyNow(product);
    navigate("/checkout");
  };

  // Add to cart: adds or increments quantity
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-card text-card-foreground shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl transform flex flex-col h-full">
      <div className="relative cursor-pointer" onClick={() => navigate(`/products/${id}`)}>
        <img
          src={product.image}
          alt={name}
          className="w-full h-32 sm:h-40 object-contain"
        />
        <div className="absolute top-1 left-1 sm:top-2 sm:left-2">
          <span className="text-[10px] sm:text-xs font-semibold text-white rounded-full bg-red-500 px-1.5 sm:px-2 py-0.5 shadow-md">
            -{discount_percentage}%
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-background rounded-full shadow-md p-1"
        >
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hover:text-red-500" />
        </Button>
      </div>

      <div className="p-2 sm:p-4 flex-grow">
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
            New
          </span>
          <div className="flex items-center bg-yellow-100 px-1.5 sm:px-2 py-0.5 rounded-full">
            <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
            <span className="text-[10px] sm:text-xs font-semibold text-yellow-700">
              {average_rating}
            </span>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-bold mb-1 sm:mb-2 hover:text-primary transition-colors duration-300 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-baseline mb-2 sm:mb-4">
          <span className="text-base sm:text-xl font-bold text-primary mr-1 sm:mr-2">
            RS. {discount_price.toLocaleString()}
          </span>
          <span className="text-xs sm:text-sm font-medium line-through text-muted-foreground">
            RS. {price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="px-2 sm:px-4 pb-2 sm:pb-4 mt-auto">
        <div className="flex justify-between gap-2">
          <Button
            onClick={handleBuyNow}
            className="flex-grow text-xs sm:text-sm py-2"
          >
            Buy Now
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="p-2 sm:p-3"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
