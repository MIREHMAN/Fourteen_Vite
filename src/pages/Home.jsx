import Categories from "@/components/Categories";
import { FeaturedCategories } from "@/components/FeaturedCategories/FeaturedCategories";
import { FlashSale } from "@/components/FlashSales/FlashSale";
import SpecialOffers from "@/components/SpecialOffers";
import FeaturedProducts from "@/sections/FeaturedProducts";
import { Hero } from "@/sections/Hero";
import { HotSalesCarousel } from "@/sections/HotSalesCarousel";


const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Products Carousel Section */}
      <HotSalesCarousel />

      {/* FeaturedProducts Section */}
      <FeaturedProducts/>
      {/* Categories Section */}
      <Categories/>

      {/* Special Offers Section */}
      <SpecialOffers/>

      {/* Flash Sale Section */}
      <FlashSale/>

      {/* Featured Categories Section */}
      <FeaturedCategories/>
    </div>
  );
}

export default Home