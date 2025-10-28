import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Slider } from "@radix-ui/react-slider";
import { Filter } from "lucide-react";
import { useState } from "react";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Sports & Outdoors",
];
const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony", "LG"];

export function FilterSheet() {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleApplyFilters = () => {
    // Implement filter application logic here
    console.log("Applying filters:", {
      priceRange,
      selectedCategories,
      selectedBrands,
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-8">
          <Filter />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Apply Filters</SheetTitle>
        </SheetHeader>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Price Range</h3>
          <Slider
            min={0}
            max={100000}
            step={1000}
            value={priceRange}
            onValueChange={handlePriceChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>RS. {priceRange[0].toLocaleString()}</span>
            <span>RS. {priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Categories</h3>
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Brands</h3>
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandChange(brand)}
              />
            </div>
          ))}
        </div>

        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </SheetContent>
    </Sheet>
  );
}