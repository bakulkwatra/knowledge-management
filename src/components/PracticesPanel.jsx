import { FaNetworkWired, FaServer } from "react-icons/fa";

const PracticesPanel = () => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded overflow-hidden mt-4">
      <div className="bg-gray-100 px-4 py-2">
        <h2 className="text-base font-bold text-black">Practices</h2>
      </div>
      <ul className="py-3 px-4 space-y-2 text-blue-700 text-sm">
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <FaNetworkWired /> Digital
        </li>
        <li className="flex items-center gap-2 cursor-pointer hover:underline">
          <FaServer /> Infra
        </li>
      </ul>
    </div>
  );
};

export default PracticesPanel;
