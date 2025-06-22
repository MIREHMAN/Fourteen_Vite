import { Star } from "lucide-react";

const PLACEHOLDER_IMAGE = "/camera.png";

export function HotProductsCard({ rating, image, title, price, onClick }) {
  const imageUrl = image?.trim() ? image : PLACEHOLDER_IMAGE;

  return (
    <button
      onClick={onClick}
      className="flex w-full md:w-80 h-24 bg-card text-card-foreground shadow-md rounded-xl cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={imageUrl}
          alt={title || "Product Image"}
          className="w-full h-full object-cover rounded-l-xl"
        />
      </div>
      <div className="flex-1 p-3 text-left">
        <h3 className="text-sm font-semibold mb-1 line-clamp-1">{title}</h3>
        <div className="flex items-center mb-1">
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 text-yellow-500 mr-1" />
            <span className="text-xs font-semibold text-yellow-700">
              {rating}/5
            </span>
          </div>
        </div>
        <p className="text-lg font-bold text-primary">
          RS. {price.toLocaleString()}
        </p>
      </div>
    </button>
  );
}
