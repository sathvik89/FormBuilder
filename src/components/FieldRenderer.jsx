const FieldRenderer = ({ field, value, errorList, onChange }) => {
  const fieldClasses = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    errorList.length > 0
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 dark:border-gray-600"
  } dark:bg-gray-700 dark:text-white`;

  switch (field.type) {
    case "text":
    case "email":
    case "phone":
      return (
        <input
          type={field.type}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className={fieldClasses}
          required={field.required}
        />
      );

    case "textarea":
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          className={`${fieldClasses} resize-none`}
          required={field.required}
        />
      );

    case "dropdown":
      return (
        <select
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={fieldClasses}
          required={field.required}
        >
          <option value="">Select an option...</option>
          {field.options &&
            field.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
        </select>
      );

    case "checkbox":
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(field.id, e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            required={field.required}
          />
          <label className="ml-2 text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
        </div>
      );

    case "date":
      return (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={fieldClasses}
          required={field.required}
        />
      );

    default:
      return null;
  }
};

export default FieldRenderer;
