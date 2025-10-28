import { MapPin, CreditCard, Package, Check } from "lucide-react";

const steps = [
  { number: 1, title: "Shipping", icon: MapPin },
  { number: 2, title: "Payment", icon: CreditCard },
  { number: 3, title: "Review", icon: Package },
];

export default function Stepper({ currentStep }) {
  return (
    <div className="mb-8 md:mb-12">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isCurrent
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                </div>
                <span
                  className={`mt-2 text-xs md:text-sm font-medium ${
                    isCurrent || isCompleted ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mb-6">
                  <div className={`h-full ${currentStep > step.number ? "bg-green-500" : "bg-slate-300"}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
