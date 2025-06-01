import FieldRenderer from "./FieldRenderer";

const FormField = ({ field, value, errors = [], onChange }) => (
  <div>
    {/* Show label only for all except checkbox because checkbox shows label inside */}
    {field.type !== "checkbox" && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}

    <FieldRenderer
      field={field}
      value={value}
      errorList={errors}
      onChange={onChange}
    />

    {field.helpText && (
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {field.helpText}
      </p>
    )}

    {errors.length > 0 && (
      <div className="mt-1">
        {errors.map((error, idx) => (
          <p key={idx} className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        ))}
      </div>
    )}
  </div>
);

export default FormField;
