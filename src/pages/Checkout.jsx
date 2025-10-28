import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import Stepper from "@/components/checkout-stepper/Stepper";
import Step1 from "@/components/checkout-stepper/Step1";
import Step2 from "@/components/checkout-stepper/Step2";
import Step3 from "@/components/checkout-stepper/Step3";
import { Button } from "@/components/ui/button";
import { ChevronRight, Check } from "lucide-react";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "pak",
    phone: "",
  });

  const { cart } = useCart();
  const navigate = useNavigate();
  const totalAmount = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  // Navigate to next step with validation
  const handleNext = () => {
    if (currentStep === 1) {
      const { firstName, lastName, address, city, postalCode, phone } = formData;
      if (!firstName || !lastName || !address || !city || !postalCode || !phone) {
        alert("Please fill all shipping fields");
        return;
      }
    }

    if (currentStep === 2 && !paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Submit order and pass data to OrderConfirmationPage
  const handleSubmit = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/order-confirmation", { state: { formData, paymentMethod, cart } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Checkout</h1>
          <p className="text-slate-600">Complete your purchase in a few simple steps</p>
        </div>

        {/* Stepper */}
        <Stepper currentStep={currentStep} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mt-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={(e) => e.preventDefault()}>
              {currentStep === 1 && (
                <Step1 formData={formData} setFormData={setFormData} />
              )}
              {currentStep === 2 && (
                <Step2 paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
              )}
              {currentStep === 3 && (
                <Step3 formData={formData} paymentMethod={paymentMethod} cart={cart} />
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>

                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext}>
                    Continue <ChevronRight className="ml-1" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="mr-2" /> Confirm Order
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">Order Summary</h3>

              {cart && cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <span>{item.name}</span>
                      <span>Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold mt-4">
                    <span>Total</span>
                    <span>Rs. {totalAmount}</span>
                  </div>
                </>
              ) : (
                <p className="text-slate-500 text-sm">Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
