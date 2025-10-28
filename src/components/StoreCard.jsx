
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, ShoppingBag } from "lucide-react";

export function StoreCard({ store }) {
  return (
    <Card className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Cover Image */}
      <div className="relative h-24 md:h-40">
        <img
          src={store.coverImageUrl}
          alt={`${store.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

        {/* Profile Image */}
        <div className="absolute -bottom-6 md:-bottom-10 left-4">
          <img
            src={store.profileImageUrl}
            alt={`${store.name} profile`}
            className="w-12 h-12 md:w-20 md:h-20 rounded-full border-4 border-white object-cover shadow-md"
          />
        </div>
      </div>

      {/* Store Info */}
      <CardContent className="pt-10 md:pt-14 px-4 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-slate-800 leading-tight">
              {store.name}
            </h2>
            <Badge
              variant="secondary"
              className="mt-1 text-[11px] md:text-xs px-2 py-0.5 bg-slate-100 text-slate-600 font-medium"
            >
              {store.category}
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 mt-4 bg-slate-50 p-3 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center mb-0.5 text-slate-700 font-medium text-sm">
              <Star className="text-yellow-400 mr-1 h-4 w-4" />
              {store.rating}
            </div>
            <p className="text-xs text-slate-500">Rating</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-0.5 text-slate-700 font-medium text-sm">
              <MessageSquare className="text-blue-500 mr-1 h-4 w-4" />
              {store.reviews}
            </div>
            <p className="text-xs text-slate-500">Reviews</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-0.5 text-slate-700 font-medium text-sm">
              <ShoppingBag className="text-green-500 mr-1 h-4 w-4" />
              {store.products}
            </div>
            <p className="text-xs text-slate-500">Products</p>
          </div>
        </div>
      </CardContent>

      {/* Button */}
      <CardFooter className="px-4 pb-4 pt-1">
        <Button
          className="w-full h-9 md:h-10 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Visit Store
        </Button>
      </CardFooter>
    </Card>
  );
}
