

export function SpecialOfferCard({ title, discount, image }) {
  return (
    <div className="bg-white text-black rounded-lg shadow-md overflow-hidden">
      <div className="relative h-40 w-full">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">{discount}</p>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
    </div>
  );
}
