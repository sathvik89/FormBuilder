import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { validateStep } from "../utils/validation";
import { generateId } from "../utils/helpers";

import FormHeader from "../components/FormHeader";
import ProgressBar from "../components/ProgressBar";
import StepTitle from "../components/StepTitle";
import FormField from "../components/FormField";
import NavigationButtons from "../components/NavigationButtons";
import LoadingSpinner from "../components/LoadingSpinner";

const FormFillerPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { getFormById, saveForm } = useAppContext();

  const [form, setForm] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Looking for form with ID:", formId);
    const foundForm = getFormById(formId);

    if (foundForm) {
      setForm(foundForm);
    }

    setIsLoading(false);
  }, [formId, getFormById]);

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: null,
      }));
    }
  };

  const handleNext = () => {
    const currentStep = form.steps[currentStepIndex];
    const { isValid, errors: stepErrors } = validateStep(
      currentStep.fields,
      formData
    );

    if (isValid) {
      setCurrentStepIndex((prev) => prev + 1);
      setErrors({});
    } else {
      setErrors(stepErrors);
    }
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    const currentStep = form.steps[currentStepIndex];
    const { isValid, errors: stepErrors } = validateStep(
      currentStep.fields,
      formData
    );

    if (!isValid) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);

    const response = {
      id: generateId(),
      data: formData,
      submittedAt: new Date().toISOString(),
    };

    const updatedForm = {
      ...form,
      responses: [...(form.responses || []), response],
    };

    saveForm(updatedForm);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Form Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The form you're looking for doesn't exist or hasn't been published
            yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Your response has been submitted successfully.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/")}
          >
            Create Your Own Form
          </button>
        </div>
      </div>
    );
  }

  const currentStep = form.steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <FormHeader title={form.title} description={form.description} />

          {form.steps.length > 1 && (
            <ProgressBar
              currentStepIndex={currentStepIndex}
              totalSteps={form.steps.length}
            />
          )}

          <StepTitle title={currentStep.title} />

          <div className="space-y-6">
            {currentStep.fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id] || ""}
                errors={errors[field.id] || []}
                onChange={handleInputChange}
              />
            ))}
          </div>

          <NavigationButtons
            currentStepIndex={currentStepIndex}
            totalSteps={form.steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFillerPage;
