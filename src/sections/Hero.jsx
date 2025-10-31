import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productsService } from "@/services/productsService";
import { useAsync } from "@/hooks/useAsync";

export function Hero() {
  const { loading, value: items = [], error } = useAsync(
    () => productsService.getHeroItems(),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [items]);

  const handlePrevClick = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNextClick = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  // Skeleton matching exact layout
  const HeroSkeleton = () => (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex flex-col justify-center items-center p-8 gap-4">
        <div className="h-10 md:h-16 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-5 md:h-7 w-2/3 bg-gray-300 rounded"></div>
        <div className="h-12 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  // Error UI keeping same layout
  const HeroError = () => (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl bg-red-50 border border-red-200 flex flex-col justify-center items-center p-8 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">
        Failed to load hero items
      </h2>
      <p className="text-base md:text-lg text-red-500 mb-6">
        Please try again later.
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );

  if (loading) return <HeroSkeleton />;
  if (error) return <HeroError />;
  if (items.length === 0)
    return (
      <div className="h-[400px] flex items-center justify-center text-gray-500">
        No hero items found.
      </div>
    );

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.image_url || "https://via.placeholder.com/1350x400"}
            alt={item.alt_text || ""}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-8 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{item.title}</h2>
            <p className="text-md md:text-xl mb-8">{item.description}</p>
            <Button variant="secondary" size="lg">
              {item.cta_text}
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full shadow-md p-1 sm:p-2 md:p-3"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </button>

      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-gray-800 rounded-full shadow-md p-1 sm:p-2 md:p-3"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === activeIndex ? "bg-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
