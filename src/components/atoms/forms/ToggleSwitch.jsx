import Label from "../typography/Label";

const ToggleSwitch = ({ id, checked, onChange, label }) => (
  <div className="flex items-center space-x-2">
    <label htmlFor={id} className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={checked}
        onChange={onChange}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
      />
      <span className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></span>
    </label>
    {label && <Label htmlFor={id} className="text-sm text-gray-700">{label}</Label>}
  </div>
);

export default ToggleSwitch;