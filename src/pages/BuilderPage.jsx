"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAppContext } from "../context/AppContext";
import {
  generateFormId,
  generateId,
  getShareableUrl,
  copyToClipboard,
} from "../utils/helpers";
import { DEFAULT_FIELDS } from "../data/fieldTypes";
import FieldPalette from "../components/builder/FieldPalette";
import FormCanvas from "../components/builder/FormCanvas";
import FieldSettings from "../components/builder/FieldSettings";
import Toolbar from "../components/builder/Toolbar";
import ShareModal from "../components/builder/ShareModal";

const BuilderPage = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { saveForm, getFormById } = useAppContext();

  // Local state for the current form being edited
  const [currentForm, setCurrentForm] = useState(null);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [showShareModal, setShowShareModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use refs to track state and prevent infinite loops
  const isInitialized = useRef(false);
  const autoSaveTimeout = useRef(null);
  const lastSavedForm = useRef(null);

  // Initialize form on mount
  useEffect(() => {
    const initializeForm = () => {
      if (formId) {
        const existingForm = getFormById(formId);
        if (existingForm) {
          setCurrentForm(existingForm);
          lastSavedForm.current = JSON.stringify(existingForm);
        } else {
          navigate("/builder");
          return;
        }
      } else {
        // Create new form
        const newForm = {
          id: generateFormId(),
          title: "Untitled Form",
          description: "",
          steps: [
            {
              id: generateId(),
              title: "Step 1",
              fields: [],
            },
          ],
          currentStepIndex: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isPublished: false,
          responses: [],
        };
        setCurrentForm(newForm);
        lastSavedForm.current = JSON.stringify(newForm);
      }
      isInitialized.current = true;
      setIsLoading(false);
    };

    if (!isInitialized.current) {
      initializeForm();
    }
  }, [formId, getFormById, navigate]);

  // Auto-save with debounce - only when form actually changes
  useEffect(() => {
    if (!isInitialized.current || !currentForm) return;

    const currentFormString = JSON.stringify(currentForm);

    // Only save if form has actually changed
    if (lastSavedForm.current === currentFormString) {
      return;
    }

    // Clear existing timeout
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }

    // Set new timeout for auto-save
    autoSaveTimeout.current = setTimeout(() => {
      const formToSave = {
        ...currentForm,
        updatedAt: new Date().toISOString(),
      };
      saveForm(formToSave);
      lastSavedForm.current = JSON.stringify(formToSave);
    }, 1000);

    // Cleanup timeout on unmount
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [currentForm, saveForm]);

  // Handle adding a new field to the current step
  const handleFieldAdd = useCallback(
    (fieldType) => {

      if (!currentForm) {
        return;
      }

      const fieldConfig = DEFAULT_FIELDS.find((f) => f.type === fieldType);
      if (!fieldConfig) {
        return;
      }

      const newField = {
        id: generateId(),
        type: fieldType,
        ...fieldConfig.defaultProps,
      };


      setCurrentForm((prevForm) => {
        const updatedSteps = [...prevForm.steps];
        const currentStepIndex = prevForm.currentStepIndex || 0;

        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          fields: [...(updatedSteps[currentStepIndex].fields || []), newField],
        };

        const updatedForm = {
          ...prevForm,
          steps: updatedSteps,
        };
        return updatedForm;
      });

      // Auto-select the new field and show settings
      setSelectedFieldId(newField.id);
      setShowSettings(true);
    },
    [currentForm]
  );

  // Handle updates to a specific field
  const handleFieldUpdate = useCallback((fieldId, updates) => {

    setCurrentForm((prevForm) => {
      if (!prevForm) return prevForm;

      const updatedSteps = [...prevForm.steps];
      const currentStepIndex = prevForm.currentStepIndex || 0;

      updatedSteps[currentStepIndex] = {
        ...updatedSteps[currentStepIndex],
        fields: updatedSteps[currentStepIndex].fields.map((field) =>
          field.id === fieldId ? { ...field, ...updates } : field
        ),
      };

      return {
        ...prevForm,
        steps: updatedSteps,
      };
    });
  }, []);

  // Handle deleting a specific field
  const handleFieldDelete = useCallback(
    (fieldId) => {
      console.log("deleting field:", fieldId);

      setCurrentForm((prevForm) => {
        if (!prevForm) return prevForm;

        const updatedSteps = [...prevForm.steps];
        const currentStepIndex = prevForm.currentStepIndex || 0;

        updatedSteps[currentStepIndex] = {
          ...updatedSteps[currentStepIndex],
          fields: updatedSteps[currentStepIndex].fields.filter(
            (field) => field.id !== fieldId
          ),
        };

        return {
          ...prevForm,
          steps: updatedSteps,
        };
      });

      if (selectedFieldId === fieldId) {
        setSelectedFieldId(null);
        setShowSettings(false);
      }
    },
    [selectedFieldId]
  );

  // Handle selecting a field to show settings
  const handleFieldSelect = useCallback((fieldId) => {
    console.log("👆 Selecting field:", fieldId);
    setSelectedFieldId(fieldId);
    setShowSettings(true);
  }, []);

  // Handle updates to the form itself (title, description, etc.)
  const handleFormUpdate = useCallback((updates) => {
    console.log("📝 Updating form with:", updates);
    setCurrentForm((prevForm) => ({
      ...prevForm,
      ...updates,
    }));
  }, []);

  // Publish the form
  const handlePublish = useCallback(() => {
    if (!currentForm) return;

    const publishedForm = {
      ...currentForm,
      isPublished: true,
      updatedAt: new Date().toISOString(),
    };

    // Immediately save to ensure it's available for sharing
    saveForm(publishedForm);

    setCurrentForm(publishedForm);
    lastSavedForm.current = JSON.stringify(publishedForm);

    setShowShareModal(true);
  }, [currentForm, saveForm]);

  // Preview the form
  const handlePreview = useCallback(() => {
    if (!currentForm) return;


    // Save current form state before navigating
    const formToSave = {
      ...currentForm,
      updatedAt: new Date().toISOString(),
    };
    saveForm(formToSave);

    // Navigate to preview page
    navigate(`/preview/${currentForm.id}`);
  }, [currentForm, navigate, saveForm]);

  // Copy share URL to clipboard
  const handleShare = useCallback(async () => {
    if (!currentForm) return;

    const shareUrl = getShareableUrl(currentForm.id);

    const success = await copyToClipboard(shareUrl);
    if (success) {
      alert("Form link copied to clipboard!");
    }
  }, [currentForm]);

  // Handle drag end - this is the key function for drag and drop
  const handleDragEnd = useCallback(
    (result) => {

      if (!result.destination) {
        return;
      }

      const { source, destination, draggableId } = result;

      // Handle dragging from palette to canvas
      if (
        source.droppableId === "field-palette" &&
        destination.droppableId === "form-canvas"
      ) {

        // Extract field type from draggableId (format: "palette-fieldType")
        const fieldType = draggableId.replace("palette-", "");

        handleFieldAdd(fieldType);
        return;
      }

      // Handle reordering within canvas
      if (
        source.droppableId === "form-canvas" &&
        destination.droppableId === "form-canvas"
      ) {

        setCurrentForm((prevForm) => {
          if (!prevForm) return prevForm;

          const currentStepIndex = prevForm.currentStepIndex || 0;
          const updatedSteps = [...prevForm.steps];
          const currentStep = updatedSteps[currentStepIndex];
          const fields = Array.from(currentStep.fields);

          // Remove dragged field and insert at new position
          const [removed] = fields.splice(source.index, 1);
          fields.splice(destination.index, 0, removed);

          updatedSteps[currentStepIndex] = {
            ...currentStep,
            fields,
          };

          return {
            ...prevForm,
            steps: updatedSteps,
          };
        });
      }
    },
    [handleFieldAdd]
  );

  // Get selected field
  const selectedField = currentForm?.steps?.[
    currentForm.currentStepIndex || 0
  ]?.fields?.find((field) => field.id === selectedFieldId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading form builder...
          </p>
        </div>
      </div>
    );
  }

  if (!currentForm) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Form Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Unable to load the form. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col">
        <Toolbar
          currentForm={currentForm}
          handleFormUpdate={handleFormUpdate}
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          handlePublish={handlePublish}
          handlePreview={handlePreview}
          navigate={navigate}
        />

        <div className="flex-1 flex overflow-hidden">
          <FieldPalette />

          <FormCanvas
            form={currentForm}
            onFieldUpdate={handleFieldUpdate}
            onFieldDelete={handleFieldDelete}
            onFieldSelect={handleFieldSelect}
            selectedFieldId={selectedFieldId}
            currentStepIndex={currentForm.currentStepIndex || 0}
          />

          {showSettings && selectedField && (
            <FieldSettings
              field={selectedField}
              onUpdate={(updates) =>
                handleFieldUpdate(selectedField.id, updates)
              }
              onClose={() => setShowSettings(false)}
            />
          )}
        </div>

        {showShareModal && (
          <ShareModal
            formId={currentForm.id}
            onClose={() => setShowShareModal(false)}
            onCopy={handleShare}
            navigate={navigate}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default BuilderPage;
