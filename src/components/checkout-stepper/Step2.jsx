import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Step2({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
      <h2 className="text-xl font-semibold">Payment Method</h2>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="border-2 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod">Cash on Delivery</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
