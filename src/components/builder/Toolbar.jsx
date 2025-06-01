const Toolbar = ({
  currentForm,
  handleFormUpdate,
  previewMode,
  setPreviewMode,
  handlePublish,
  handlePreview,
  navigate,
}) => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <input
        type="text"
        value={currentForm.title}
        onChange={(e) => handleFormUpdate({ title: e.target.value })}
        className="text-xl font-semibold outline-none bg-transparent dark:text-white"
        placeholder="Untitled Form"
      />

      <div className="flex items-center gap-3">
        <select
          value={previewMode}
          onChange={(e) => setPreviewMode(e.target.value)}
          className="border rounded px-2 py-1 text-sm dark:bg-gray-800 dark:text-white"
        >
          <option value="desktop">Desktop</option>
          <option value="tablet">Tablet</option>
          <option value="mobile">Mobile</option>
        </select>

        <button
          onClick={handlePreview}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Preview
        </button>

        <button
          onClick={handlePublish}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Publish
        </button>

        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-600 dark:text-gray-300 underline"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
