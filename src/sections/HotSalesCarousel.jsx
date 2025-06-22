import { HotProductsCard } from "@/components/HotProductsCard";
import { useState, useEffect, useRef } from "react";
import { useAsync } from "@/hooks/useAsync";
import { productsService } from "@/services/productsService";

export function HotSalesCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

  const {
    loading,
    value: response,
    error,
  } = useAsync(() => productsService.getCarouselProducts(), []);

  const products = response ?? [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const speed = 0.5;

    let animationFrameId;

    const animate = () => {
      setScrollPosition((prev) => (prev + speed) % (scrollWidth / 2));
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [products]);

  const handleProductClick = (productId) => {
    console.log(`Product clicked: ${productId}`);
    // Optional: Navigate or show modal
  };

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        ref={containerRef}
        className="flex transition-transform duration-100 ease-linear"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex-shrink-0 w-80 mr-4"
          >
            <HotProductsCard
              rating={product.average_rating || 0}
              image="camera.png"
              title={product.name}
              price={product.discount_price || 0}
              onClick={() => handleProductClick(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
