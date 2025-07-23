const BusinessUnitPanel = () => {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded overflow-hidden mt-4">
      <div className="bg-gray-100 px-4 py-2">
        <h2 className="text-base font-bold text-black">Business Unit</h2>
      </div>
      <ul className="py-4 px-10 space-y-2 text-blue-700 text-sm">
        <li className="hover:underline cursor-pointer">CMS</li>
        <li className="hover:underline cursor-pointer">GSD</li>
        <li className="hover:underline cursor-pointer">BSD</li>
        <li className="hover:underline cursor-pointer">SSD</li>
      </ul>
    </div>
  );
};

export default BusinessUnitPanel;
