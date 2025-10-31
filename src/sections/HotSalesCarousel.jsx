import { useState, useEffect, useRef, useMemo } from "react";
import { HotProductsCard } from "@/components/HotProductsCard";
import { useAsync } from "@/hooks/useAsync";
import { productsService } from "@/services/productsService";

export function HotSalesCarousel() {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { loading, value: response, error } = useAsync(
    () => productsService.getCarouselProducts(),
    []
  );

  // Memoize products to stabilize the reference for useEffect
  const products = useMemo(() => response ?? [], [response]);

  useEffect(() => {
    if (!products.length) return;

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      setScrollPosition((prev) => {
        const totalWidth = container.scrollWidth / 2; // duplicated items
        return prev >= totalWidth ? 0 : prev + speed;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [products]); // now safe because products reference is stable

  const handleProductClick = (productId) => {
    console.log(`Product clicked: ${productId}`);
  };

  if (loading) return <p className="text-center py-10">Loading hot products...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load products.</p>;
  if (!products.length) return null;

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        ref={containerRef}
        className="flex transition-transform duration-100 ease-linear"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {[...products, ...products].map((product, index) => (
          <div key={`${product.id}-${index}`} className="flex-shrink-0 w-80 mr-4">
            <HotProductsCard
              rating={product.average_rating || 0}
              image={product.image || "camera.png"}
              title={product.name}
              price={product.discount_price || product.price || 0}
              onClick={() => handleProductClick(product.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
