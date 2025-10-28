export default function Step3({ formData, paymentMethod }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
      <h2 className="text-xl font-semibold">Review Your Order</h2>
      <div className="border rounded-lg p-4 bg-slate-50 space-y-2">
        <p>
          <strong>Shipping to:</strong> {formData.firstName} {formData.lastName}, {formData.address},{" "}
          {formData.city}, {formData.country}
        </p>
        <p>
          <strong>Payment:</strong> {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod}
        </p>
      </div>
    </div>
  );
}
