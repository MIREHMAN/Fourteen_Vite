import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
  const location = useLocation();
  // You can pass order data via state from CheckoutPage
  const { formData, paymentMethod, cart } = location.state || {};

  const totalAmount = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  useEffect(() => {
    if (!cart || cart.length === 0) {
      // If someone opens this page directly, redirect back to shop
      window.location.href = "/";
    }
  }, [cart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Thank you for your order!</h1>
        <p className="text-slate-600 mb-6">
          Your order has been placed successfully. We will process it and deliver to you soon.
        </p>

        <div className="text-left border border-slate-200 rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
          <p>{formData?.firstName} {formData?.lastName}</p>
          <p>{formData?.address}</p>
          <p>{formData?.city}, {formData?.postalCode}</p>
          <p>{formData?.country}</p>
          <p className="pt-1">{formData?.phone}</p>
        </div>

        <div className="text-left border border-slate-200 rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
          <p>{paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod}</p>
        </div>

        <div className="text-left border border-slate-200 rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cart?.map((item) => (
            <div key={item.id} className="flex justify-between py-1">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t border-slate-200 pt-2 mt-2">
            <span>Total</span>
            <span>Rs. {totalAmount}</span>
          </div>
        </div>

        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
