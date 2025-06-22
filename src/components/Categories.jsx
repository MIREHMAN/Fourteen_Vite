import { useAsync } from "@/hooks/useAsync";
import { categoryService } from "@/services/categoryService";

function Categories() {
  const {
    loading,
    value: categories = [],
    error,
  } = useAsync(() => categoryService.getAllCategories(), []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Shop by Category</h2>

      {loading && <p>Loading categories...</p>}
      {error && (
        <p className="text-red-500">Failed to load categories. Please try again.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.length > 0 ? (
            categories.map(({ id, name, image }) => (
              <button
                key={id}
                className="flex flex-col items-center justify-center h-24 text-center border border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105"
              >
                <span className="text-2xl mb-2">{image || "📦"}</span>
                <span className="text-sm capitalize">{name}</span>
              </button>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default Categories;
