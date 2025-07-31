
import { Button } from "@/components/ui/button";
import { useAsync } from "@/hooks/useAsync";
import { offerService } from "@/services/offerService";

const PLACEHOLDER_IMAGE = "/offer-placeholder.png";

const SpecialOffers = () => {
  const {
    loading,
    value: offers,
    error,
  } = useAsync(() => offerService.getSpecialOffers(), []);

  return (
    <section className="bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Special Offers
        </h2>

        {loading && (
          <p className="text-center text-muted-foreground">Loading offers...</p>
        )}

        {error && (
          <p className="text-center text-destructive">
            Failed to load offers. Please try again later.
          </p>
        )}

        {!loading && offers?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {offers.map(({ id, title, discount_percentage, image }) => (
              <div
                key={id}
                className="bg-card text-card-foreground rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={image?.trim() || PLACEHOLDER_IMAGE}
                    alt={title || "Special Offer"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {title || "Untitled Offer"}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-4">
                    {discount_percentage
                      ? `${discount_percentage}% OFF`
                      : "Discount Available"}
                  </p>
                  <Button className="w-full">Shop Now</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-muted-foreground">
              No special offers at the moment.
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default SpecialOffers;
