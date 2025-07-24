import { Switch } from "@headlessui/react";
import Label from "../typography/Label";

const ToggleSwitch = ({ id, checked, onChange, label }) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onChange={onChange}
        className={`$ {
          checked ? "bg-blue-600" : "bg-gray-300"
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
      >
        <span className="inline-block h-4 w-4 transform bg-white rounded-full transition-transform" />
      </Switch>
      {label && <Label htmlFor={id} className="text-sm text-gray-700">{label}</Label>}
    </div>
  );
};

export default ToggleSwitch;
