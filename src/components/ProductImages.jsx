import { useState } from "react";

// The component is now a standard functional component in pure JSX
const ProductImages = ({ media }) => {
  // Using React's useState hook
  const [index, setIndex] = useState(0);

  // Fallback for an empty or missing media array
  if (!media || media.length === 0) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center h-96 bg-gray-100 rounded-lg text-gray-500 shadow-inner p-8">
        <span className="text-xl font-semibold">No Product Images Available</span>
        <p className="text-sm">Please check the product data source.</p>
      </div>
    );
  }

  // A generic placeholder for fallbacks (since Next.js's fill/sizes are gone)
  const placeholderUrl = "https://placehold.co/800x600/E5E7EB/4B5563?text=Product+Image";

  return (
    <div className="flex flex-col gap-4">
      {/* Main Display Image */}
      <div className="relative h-[500px] w-full overflow-hidden rounded-xl shadow-xl bg-white flex items-center justify-center border border-gray-100">
        <img
          src={media[index]?.url || placeholderUrl}
          alt={`Main product view ${index + 1}`}
          // Replaced Next.js 'fill' with w-full h-full and object-contain
          className="object-contain w-full h-full transition-opacity duration-300"
        />
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex justify-start gap-3 overflow-x-auto py-1">
        {media.map((image, i) => (
          <div
            // Adjusted classes for better responsiveness and visual feedback
            className={`flex-shrink-0 w-24 h-24 relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 
              ${
                i === index
                  ? "border-4 border-blue-500 ring-4 ring-blue-200 shadow-md"
                  : "opacity-80 hover:opacity-100 border border-gray-300"
              }`
            }
            key={image.index || i}
            onClick={() => setIndex(i)}
          >
            <img // Replaced Next.js Image with standard <img>
              src={image.url || placeholderUrl}
              alt={`Thumbnail ${i + 1}`}
              // Standard image sizing
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
