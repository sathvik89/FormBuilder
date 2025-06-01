import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const { currentForm, setCurrentForm, saveForm, getFormById } =
    useAppContext();

  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (formId) {
      const existingForm = getFormById(formId);
      if (existingForm) {
        setCurrentForm(existingForm);
      } else {
        navigate("/builder");
      }
    } else {
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
    }
  }, [formId]);

  useEffect(() => {
    if (currentForm && currentForm.id) {
      const timer = setTimeout(() => {
        saveForm({
          ...currentForm,
          updatedAt: new Date().toISOString(),
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [currentForm, saveForm]);

  const handleFieldAdd = (fieldType) => {
    if (!currentForm) return;

    const fieldConfig = DEFAULT_FIELDS.find((f) => f.type === fieldType);
    const newField = {
      id: generateId(),
      type: fieldType,
      ...fieldConfig.defaultProps,
    };

    const updatedSteps = [...currentForm.steps];
    const currentStepIndex = currentForm.currentStepIndex || 0;
    updatedSteps[currentStepIndex] = {
      ...updatedSteps[currentStepIndex],
      fields: [...(updatedSteps[currentStepIndex].fields || []), newField],
    };

    setCurrentForm({
      ...currentForm,
      steps: updatedSteps,
    });

    setSelectedFieldId(newField.id);
    setShowSettings(true);
  };

  const handleFieldUpdate = (fieldId, updates) => {
    if (!currentForm) return;

    const updatedSteps = [...currentForm.steps];
    const currentStepIndex = currentForm.currentStepIndex || 0;
    const currentStep = updatedSteps[currentStepIndex];

    currentStep.fields = currentStep.fields.map((field) =>
      field.id === fieldId ? { ...field, ...updates } : field
    );

    setCurrentForm({
      ...currentForm,
      steps: updatedSteps,
    });
  };

  const handleFieldDelete = (fieldId) => {
    if (!currentForm) return;

    const updatedSteps = [...currentForm.steps];
    const currentStepIndex = currentForm.currentStepIndex || 0;
    const currentStep = updatedSteps[currentStepIndex];

    currentStep.fields = currentStep.fields.filter(
      (field) => field.id !== fieldId
    );

    setCurrentForm({
      ...currentForm,
      steps: updatedSteps,
    });

    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
      setShowSettings(false);
    }
  };

  const handleFieldSelect = (fieldId) => {
    setSelectedFieldId(fieldId);
    setShowSettings(true);
  };

  const handleFormUpdate = (updates) => {
    setCurrentForm({
      ...currentForm,
      ...updates,
    });
  };

  const handlePublish = () => {
    if (currentForm) {
      const publishedForm = {
        ...currentForm,
        isPublished: true,
        updatedAt: new Date().toISOString(),
      };
      setCurrentForm(publishedForm);
      saveForm(publishedForm);
      setShowShareModal(true);
    }
  };

  const handleShare = async () => {
    if (currentForm) {
      const shareUrl = getShareableUrl(currentForm.id);
      const success = await copyToClipboard(shareUrl);
      if (success) {
        alert("Form link copied to clipboard!");
      }
    }
  };

  const selectedField = currentForm?.steps[
    currentForm.currentStepIndex || 0
  ]?.fields?.find((field) => field.id === selectedFieldId);

  if (!currentForm) {
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

  return (
    <div className="h-screen flex flex-col">
      <Toolbar
        currentForm={currentForm}
        handleFormUpdate={handleFormUpdate}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        handlePublish={handlePublish}
        navigate={navigate}
      />

      <div className="flex-1 flex overflow-hidden">
        <FieldPalette onFieldAdd={handleFieldAdd} />

        <FormCanvas
          form={currentForm}
          onFieldUpdate={handleFieldUpdate}
          onFieldDelete={handleFieldDelete}
          onFieldSelect={handleFieldSelect}
          selectedFieldId={selectedFieldId}
          onFieldAdd={handleFieldAdd}
        />

        {showSettings && selectedField && (
          <FieldSettings
            field={selectedField}
            onUpdate={(updates) => handleFieldUpdate(selectedField.id, updates)}
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
  );
};

export default BuilderPage;
