"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { validateStep } from "../utils/validation";
import FormHeader from "../components/FormHeader";
import ProgressBar from "../components/ProgressBar";
import StepTitle from "../components/StepTitle";
import FormField from "../components/FormField";
import NavigationButtons from "../components/NavigationButtons";
import LoadingSpinner from "../components/LoadingSpinner";

const FormPreviewPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { getFormById } = useAppContext();

  const [form, setForm] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Preview: Looking for form with ID:", formId);

    // If no formId is provided, use a demo form
    if (!formId || formId === "demo") {
      console.log("📝 Loading demo form");
      import("../data/fieldTypes").then(({ FORM_TEMPLATES }) => {
        const demoForm = {
          ...FORM_TEMPLATES[0],
          id: "demo",
          isPublished: true,
        };
        setForm(demoForm);
        setIsLoading(false);
      });
      return;
    }

    const foundForm = getFormById(formId);

    if (foundForm) {
      console.log("form found:", foundForm.title);
      setForm(foundForm);
    } else {
      console.log("form not found with ID:", formId);
    }

    setIsLoading(false);
  }, [formId, getFormById]);

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error when user starts typing
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

    // starting form submission
    setTimeout(() => {
      alert("Form submitted successfully! (Preview Mode)");
      setIsSubmitting(false);
      navigate("/");
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

  const currentStep = form.steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center text-blue-700 dark:text-blue-300">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Preview Mode</span>
            </div>
          </div>

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

export default FormPreviewPage;
