import { useAsync } from "@/hooks/useAsync";
import { categoryService } from "@/services/categoryService";

// --- SUB-COMPONENTS ---

const CategoryCard = ({ name, icon: Icon, color, onClick }) => (
  <button
    onClick={onClick}
    className="
      flex flex-col items-center justify-center p-4 bg-white border border-gray-200 
      shadow-sm hover:shadow-md transition-all duration-200 
      focus:outline-none focus:ring-2 focus:ring-indigo-400
      text-center
    "
    style={{ aspectRatio: "1 / 1" }} // makes it perfectly square
  >
    <div className={`mb-3 ${color || "text-gray-600"}`}>
      {Icon ? <Icon className="w-10 h-10 mx-auto" /> : <div className="w-10 h-10 bg-gray-300 mx-auto"></div>}
    </div>
    <span className="text-sm font-medium text-gray-800 dark:text-gray-900">{name}</span>
  </button>
);

const CategorySkeleton = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 shadow-sm animate-pulse text-center" style={{ aspectRatio: "1 / 1" }}>
    <div className="w-10 h-10 bg-gray-200 mb-3"></div>
    <div className="w-3/4 h-4 bg-gray-200"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="p-6 text-center border border-red-300 bg-red-50 rounded-lg text-red-700">
    <h3 className="font-bold text-lg mb-2">Failed to load categories</h3>
    <p>{message || "Please check your connection and try again."}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-3 px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
    >
      Retry
    </button>
  </div>
);

// --- MAIN COMPONENT ---

export default function CategoriesSection() {
  const { loading, value: categories = [], error } = useAsync(
    () => categoryService.getAllCategories(),
    []
  );

  const skeletonCount = 8;

  const handleCategoryClick = (id) => {
    console.log(`Navigating to category: ${id}`);
    // router.navigate can be used in real app
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white rounded-lg">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 border-b pb-4 border-gray-200">
        Browse Top Categories
      </h2>

      {error && <ErrorMessage message={error.message} />}

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && !error && categories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <CategoryCard
                key={category.id}
                name={category.name}
                icon={Icon}
                color={category.color}
                onClick={() => handleCategoryClick(category.id)}
              />
            );
          })}
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          We are currently setting up our inventory. Please check back later!
        </p>
      )}
    </section>
  );
}
