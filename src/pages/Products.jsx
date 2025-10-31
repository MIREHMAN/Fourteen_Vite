
import { useState } from "react";
import { FiltersSideMenu } from "@/components/FiltersSideMenu";
import { FilterSheet } from "@/components/FilterSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import { useAsync } from "@/hooks/useAsync";
import { productsService } from "@/services/productsService";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { loading, value: response, error } = useAsync(
    () => productsService.getAllProducts(),
    []
  );

  const products = response?.results ?? [];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.average_rating - a.average_rating;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Explore Products
        </h1>
        <p className="text-slate-500 text-sm md:text-base mt-1">
          Discover our best picks for your next purchase
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar for Desktop */}
        <aside className="lg:w-64 hidden lg:block">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sticky top-20">
            <Breadcrumbs />
            <FiltersSideMenu />
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-2 md:mb-4">
          <FilterSheet />
        </div>

        {/* Main Section */}
        <div className="flex-1">
          {/* Search + Sort Controls */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4 mb-6 flex flex-col md:flex-row justify-between gap-3">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-sm md:text-base bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
            />

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px] text-sm bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading / Error States */}
          {loading && (
            <p className="text-center text-gray-500 text-lg py-20">
              Loading products...
            </p>
          )}
          {error && (
            <p className="text-center text-red-500 text-lg py-20">
              Failed to fetch products. Try again later.
            </p>
          )}

          {/* Product Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <Button
              variant="outline"
              className="rounded-xl border-slate-200 text-gray-700 hover:bg-gray-50"
            >
              Previous
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-200">
              1
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-200">
              2
            </Button>
            <Button variant="outline" className="rounded-xl border-slate-200">
              3
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-slate-200 text-gray-700 hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
