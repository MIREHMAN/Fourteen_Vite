"use client";

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

  const {
    loading,
    value: response,
    error,
  } = useAsync(() => productsService.getAllProducts(), []);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-20">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 hidden md:block">
          <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-auto">
            <Breadcrumbs />
            <FiltersSideMenu />
          </div>
        </aside>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>

          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="flex-1 mb-4 md:mb-0 md:mr-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
              <div className="md:hidden">
                <FilterSheet />
              </div>
            </div>
          </div>

          {loading && (
            <p className="text-center text-gray-600 text-lg">Loading products...</p>
          )}
          {error && (
            <p className="text-center text-red-500 text-lg">
              Error fetching products.
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline" className="mr-2">1</Button>
            <Button variant="outline" className="mr-2">2</Button>
            <Button variant="outline" className="mr-2">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
