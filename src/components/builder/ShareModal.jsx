import { getShareableUrl } from "../../utils/helpers";

const ShareModal = ({ formId, onClose, onCopy, navigate }) => {
  const shareUrl = getShareableUrl(formId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Form Published!
        </h2>

        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Your form has been published and is now available at the following
          URL:
        </p>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="w-full p-2 border rounded-l mb-0 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <button
            onClick={onCopy}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Copy
          </button>
        </div>

        <div className="flex justify-between gap-3 mt-6">
          <button
            onClick={() => {
              navigate(`/form/${formId}`);
              onClose();
            }}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Form
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
