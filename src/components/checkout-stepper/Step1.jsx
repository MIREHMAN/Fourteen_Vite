import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Step1({ formData, setFormData }) {
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
      <h2 className="text-xl font-semibold">Shipping Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" value={formData.city} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" value={formData.postalCode} onChange={handleInputChange} required />
        </div>
      </div>
    </div>
  );
}
