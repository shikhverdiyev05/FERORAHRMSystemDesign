import { Check } from "lucide-react";
import { Button } from "../ui/button";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface MultiStepFormProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  canGoNext?: boolean;
  canGoPrevious?: boolean;
}

export function MultiStepForm({
  steps,
  currentStep,
  onStepChange,
  children,
  onSubmit,
  onCancel,
  isLoading = false,
  canGoNext = true,
  canGoPrevious = true,
}: MultiStepFormProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (canGoNext && !isLastStep) {
      onStepChange(currentStep + 1);
    } else if (isLastStep) {
      onSubmit();
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious && !isFirstStep) {
      onStepChange(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all ${
                    isCompleted ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="min-h-[300px]">{children}</div>

      {/* Form Actions */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <div className="flex gap-2">
          {!isFirstStep && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={!canGoPrevious || isLoading}
            >
              Previous
            </Button>
          )}
          <Button
            type="button"
            onClick={handleNext}
            disabled={(!canGoNext && !isLastStep) || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Processing...
              </div>
            ) : isLastStep ? (
              "Submit"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
