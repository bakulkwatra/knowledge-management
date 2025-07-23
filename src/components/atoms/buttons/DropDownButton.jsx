import { ChevronDown } from "lucide-react";

const DropDownButton = ({ children, ...rest }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-between rounded bg-white px-4 py-2 text-sm text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...rest}
    >
      {children}
      <ChevronDown size={16} className="ml-2" />
    </button>
  );
};

export default DropDownButton;
