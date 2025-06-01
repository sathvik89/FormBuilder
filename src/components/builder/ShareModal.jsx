import React from "react";
import { getShareableUrl } from "../../utils/helpers";

const ShareModal = ({ formId, onClose, onCopy, navigate }) => {
  const shareUrl = getShareableUrl(formId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Share Form</h2>

        <input
          type="text"
          value={shareUrl}
          readOnly
          className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:text-white"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onCopy}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Copy Link
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
