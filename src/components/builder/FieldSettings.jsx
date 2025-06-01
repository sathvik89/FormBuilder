import { useState, useEffect } from "react";
import Button from "../common/Button";

const FieldSettings = ({ field, onUpdate, onClose }) => {
  const [settings, setSettings] = useState({});
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (field) {
      setSettings({ ...field });
    }
  }, [field]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onUpdate(settings);
    onClose();
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...(settings.options || [])];
    newOptions[index] = value;
    setSettings((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const addOption = () => {
    const newOptions = [
      ...(settings.options || []),
      `Option ${(settings.options || []).length + 1}`,
    ];
    setSettings((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const removeOption = (index) => {
    const newOptions = (settings.options || []).filter((_, i) => i !== index);
    setSettings((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  if (!field) return null;

  const tabs = [
    { id: "basic", label: "Basic", icon: "⚙️" },
    { id: "validation", label: "Validation", icon: "✅" },
    { id: "advanced", label: "Advanced", icon: "🔧" },
  ];

  return (
    <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Field Settings
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Configure {settings.type} field properties
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* tabs are hereee */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "basic" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Field Label
              </label>
              <input
                type="text"
                value={settings.label || ""}
                onChange={(e) => handleChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter field label"
              />
            </div>

            {["text", "email", "phone", "textarea", "number"].includes(
              settings.type
            ) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Placeholder Text
                </label>
                <input
                  type="text"
                  value={settings.placeholder || ""}
                  onChange={(e) => handleChange("placeholder", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter placeholder text"
                />
              </div>
            )}

            {/* helping text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Help Text
              </label>
              <textarea
                value={settings.helpText || ""}
                onChange={(e) => handleChange("helpText", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                placeholder="Provide helpful instructions"
              />
            </div>

            {/* options for dropdown */}
            {settings.type === "dropdown" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Dropdown Options
                </label>
                <div className="space-y-3">
                  {(settings.options || []).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          className="w-full px-3 py-2 pl-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          placeholder={`Option ${index + 1}`}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          {index + 1}.
                        </div>
                      </div>
                      <button
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remove option"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    className="w-full border-dashed"
                  >
                    <span className="mr-2">+</span>
                    Add Option
                  </Button>
                </div>
              </div>
            )}

            {/* textarea rows */}
            {settings.type === "textarea" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Rows
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={settings.rows || 4}
                  onChange={(e) =>
                    handleChange("rows", parseInt(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === "validation" && (
          <div className="space-y-6">
            {/* required field  */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Required Field
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Users must fill this field to submit the form
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.required || false}
                  onChange={(e) => handleChange("required", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* text length reviewing */}
            {["text", "textarea"].includes(settings.type) && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Length
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={settings.minLength || ""}
                    onChange={(e) => handleChange("minLength", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="No minimum"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Length
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={settings.maxLength || ""}
                    onChange={(e) => handleChange("maxLength", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="No maximum"
                  />
                </div>
              </>
            )}

            {/* number validationing */}
            {settings.type === "number" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Value
                  </label>
                  <input
                    type="number"
                    value={settings.min || ""}
                    onChange={(e) => handleChange("min", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="No minimum"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Value
                  </label>
                  <input
                    type="number"
                    value={settings.max || ""}
                    onChange={(e) => handleChange("max", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="No maximum"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "advanced" && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <div className="text-blue-500 text-lg">💡</div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Advanced Settings
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Additional configuration options for power users
                  </p>
                </div>
              </div>
            </div>

            {/* field ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Field ID
              </label>
              <input
                type="text"
                value={settings.id || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                disabled
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Unique identifier for this field (auto-generated)
              </p>
            </div>

            {/* field types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Field Type
              </label>
              <input
                type="text"
                value={settings.type || ""}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                disabled
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Cannot be changed after creation
              </p>
            </div>
          </div>
        )}
      </div>

      {/* footer of the page */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FieldSettings;
