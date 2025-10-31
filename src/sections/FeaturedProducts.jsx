import { useAsync } from "@/hooks/useAsync";
import { productsService } from "@/services/productsService";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const FeaturedProducts = () => {
  const { loading, value: response, error } = useAsync(
    () => productsService.getAllProducts(),
    []
  );

  const products = response?.results ?? [];

  // Skeleton for loading
  const ProductSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-xl h-64 w-full"></div>
  );

  // Error skeleton
  const ProductError = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-red-50 border border-red-200 rounded-xl h-64 flex flex-col justify-center items-center text-red-500"
        >
          <p className="mb-2">Failed to load</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
        <Button variant="link" className="flex items-center">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {error && <ProductError />}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
