import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import ProductImages from "@/components/ProductImages";
import CustomizeProducts from "@/components/CustomizeProducts";
import Add from "@/components/Add";
import { useCart } from "@/context/useCart";
import { useToast } from "@/hooks/use-toast";
import Reviews from "@/components/Reviews";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// Convert the product data
const product = {
  id: "1",
  title: "Wireless Bluetooth Earbuds",
  description:
    "High-quality wireless earbuds with noise cancellation and long battery life.",
  price: 999,
  rating: 4.5,
  reviews: 120,
  media: [
    {
      index: 1,
      url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      index: 2,
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      index: 3,
      url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ],
  originalPrice: 1299,
  features: [
    "True wireless stereo",
    "Active noise cancellation",
    "24-hour battery life",
    "Water-resistant (IPX4)",
    "Touch controls",
  ],
  storeInfo: {
    name: "TechGadgets",
    rating: 4.8,
    products: 500,
  },
};

export default function ProductDetailPage() {
  const { addToCart, buyNow } = useCart();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState({});

   const { toast } = useToast()

  const handleAddToCart = (quantity) => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      image: product.media[0].url,
      ...selectedOptions,
    };

    addToCart(cartItem);

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleBuyNow = (quantity) => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: quantity,
      image: product.media[0].url,
      ...selectedOptions,
    };

    buyNow(cartItem);
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages media={product.media} />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviews} reviews)
            </span>
          </div>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold text-primary mr-2">
              RS. {product.price.toLocaleString()}
            </span>
            <span className="text-lg font-medium line-through text-muted-foreground">
              RS. {product.originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <CustomizeProducts
            options={[
              { name: "Color", choices: ["Red", "Blue", "Green"] },
              { name: "Size", choices: ["Small", "Medium", "Large"] },
            ]}
            onOptionSelect={(name, value) =>
              setSelectedOptions((prev) => ({ ...prev, [name]: value }))
            }
          />
          <div className="mt-6">
            <Add
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              stockNumber={10}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="store">About Store</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <h2 className="text-xl font-bold mb-2">Product Description</h2>
          <p className="mb-4">{product.description}</p>
          <h3 className="text-lg font-bold mb-2">Features</h3>
          <ul className="list-disc list-inside">
            {product.features.map((feature, index) => (
              <li key={index} className="mb-1">
                {feature}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="reviews">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <Reviews />
        </TabsContent>
        <TabsContent value="store">
          <h2 className="text-xl font-bold mb-2">
            About {product.storeInfo.name}
          </h2>
          <p className="mb-2">Store Rating: {product.storeInfo.rating}/5</p>
          <p>Total Products: {product.storeInfo.products}</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}