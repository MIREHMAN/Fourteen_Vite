import { Star } from "lucide-react"; // Assuming you use lucide-react for icons

// Mock data
const reviews = [
  {
    id: 1,
    customer: {
      avatar_url:
        "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      display_name: "John Doe",
    },
    rating: 5,
    heading: "Great product!",
    body: "I love this product! It's amazing.",
    media: [
      {
        id: 1,
        url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      },
    ],
  },
  {
    id: 2,
    customer: {
      avatar_url:
        "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      display_name: "Jane Doe",
    },
    rating: 4,
    heading: "Good product!",
    body: "I like this product! It's good.",
    media: [
      {
        id: 1,
        url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      },
    ],
  },
];

const MAX_RATING = 5;

const Reviews = () => {
  return (
    <div className="flex flex-col gap-8">
      {reviews.map((review) => (
        <div className="flex flex-col gap-4 border-b pb-6 last:border-b-0" key={review.id}>
          {/* USER & AVATAR */}
          <div className="flex items-center gap-4 font-medium">
            <img // Replaced Next.js Image with standard <img>
              src={review.customer.avatar_url}
              alt={`${review.customer.display_name}'s avatar`}
              width={32}
              height={32}
              className="rounded-full object-cover h-8 w-8" // Added explicit h-8 w-8 for sizing
            />
            <span className="text-gray-700 font-semibold">
              {review.customer.display_name}
            </span>
          </div>

          {/* STARS */}
          <div className="flex gap-1">
            {/* Display Filled Stars */}
            {Array.from({ length: review.rating }).map((_, index) => (
              <Star
                key={`filled-${review.id}-${index}`}
                className="h-4 w-4 text-yellow-500 fill-yellow-500"
              />
            ))}
            {/* Display Empty Stars */}
            {Array.from({ length: MAX_RATING - review.rating }).map((_, index) => (
              <Star
                key={`empty-${review.id}-${index}`}
                className="h-4 w-4 text-gray-300"
              />
            ))}
          </div>

          {/* HEADING & BODY */}
          {review.heading && (
            <p className="text-lg font-bold text-gray-900">{review.heading}</p>
          )}
          {review.body && <p className="text-gray-600">{review.body}</p>}
          
          {/* MEDIA/IMAGES */}
          <div className="flex gap-4 mt-2">
            {review.media.map((media) => (
              <img // Replaced Next.js Image with standard <img>
                src={media.url}
                key={media.id}
                alt="Customer provided image"
                width={100}
                height={100}
                className="object-cover rounded-md aspect-square"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;