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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar for Desktop */}
        <aside className="lg:w-72 hidden lg:block">
          <div className="sticky top-20 bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <Breadcrumbs />
            <FiltersSideMenu />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                Explore Products
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Discover our best picks for your next purchase
              </p>
            </div>

            {/* Sort Select for Desktop */}
            <div className="hidden sm:block">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-white border border-gray-200 rounded-xl shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search + Filter (Mobile Friendly) */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 mb-8">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 rounded-xl border-gray-200 shadow-sm"
            />

            {/* Sort + Filters for Mobile */}
            <div className="flex items-center gap-2 sm:hidden">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px] bg-white border-gray-200 rounded-xl shadow-sm">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Low to High</SelectItem>
                  <SelectItem value="price-desc">High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <FilterSheet />
            </div>
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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <Button
              variant="outline"
              className="rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Previous
            </Button>
            <Button variant="outline" className="rounded-xl border-gray-200">
              1
            </Button>
            <Button variant="outline" className="rounded-xl border-gray-200">
              2
            </Button>
            <Button variant="outline" className="rounded-xl border-gray-200">
              3
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
