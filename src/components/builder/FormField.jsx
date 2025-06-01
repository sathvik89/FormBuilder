import { useState } from "react";

const FormField = ({
  field,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  dragHandleProps,
  isDragging,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // this function shows a basic preview based on field type
  const renderFieldPreview = () => {
    const baseInputClasses =
      "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors";

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder || `Enter ${field.type}...`}
            className={baseInputClasses}
            disabled
          />
        );

      case "number":
        return (
          <input
            type="number"
            placeholder={field.placeholder || "Enter number..."}
            min={field.min}
            max={field.max}
            className={baseInputClasses}
            disabled
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder || "Enter your message..."}
            rows={field.rows || 4}
            className={`${baseInputClasses} resize-none`}
            disabled
          />
        );

      case "dropdown":
        return (
          <select className={baseInputClasses} disabled>
            <option>Select an option...</option>
            {field.options &&
              field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled
            />
            <span className="text-gray-700 dark:text-gray-300">
              {field.label}
            </span>
          </div>
        );

      case "date":
        return <input type="date" className={baseInputClasses} disabled />;

      default:
        return (
          <input
            type="text"
            placeholder={field.placeholder}
            className={baseInputClasses}
            disabled
          />
        );
    }
  };

  return (
    <div
      className={`group relative p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800"
      } ${isDragging ? "shadow-2xl" : "hover:shadow-md"}`}
      onClick={onSelect}
    >
      {/* drag handle dots appear when you hover */}
      <div
        {...dragHandleProps}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing ${
          isSelected ? "opacity-100" : ""
        }`}
      >
        <div className="flex flex-col space-y-1">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* main field preview content */}
      <div className="ml-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                {field.type}
              </span>
            </div>
            {renderFieldPreview()}
            {field.helpText && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                💡 {field.helpText}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* buttons for edit and delete, shown only when selected */}
      {isSelected && (
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
            title="edit field"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (
                window.confirm("Are you sure you want to delete this field?")
              ) {
                onDelete();
              }
            }}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            title="delete field"
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
      )}
    </div>
  );
};

export default FormField;
