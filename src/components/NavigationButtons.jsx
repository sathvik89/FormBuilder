import Button from "../components/common/Button";

const NavigationButtons = ({
  currentStepIndex,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
}) => {
  const isLastStep = currentStepIndex === totalSteps - 1;

  return (
    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
      <div>
        {currentStepIndex > 0 && (
          <Button variant="outline" type="button" onClick={onPrevious}>
            ← Previous
          </Button>
        )}
      </div>

      <div>
        {isLastStep ? (
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="min-w-32"
            type="button"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              "Submit Form"
            )}
          </Button>
        ) : (
          <Button type="button" onClick={onNext}>Next →</Button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;
