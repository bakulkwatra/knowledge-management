import React from "react";

const FormFooter = ({ onCancel, onSubmit, submitText = "Submit" }) => {
  return (
    <div className="bg-white text-gray-500 text-sm py-4 px-4 border-t flex justify-between items-center">
      <span className="text-xs">Need help? Contact admin support.</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitText}
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
