const FormHeader = ({ title, description }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      {title}
    </h1>
    {description && (
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    )}
  </div>
);

export default FormHeader;
