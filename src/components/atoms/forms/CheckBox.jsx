import Label from "../typography/Label";

const Checkbox = ({ label, id, ...rest }) => (
  <div className="flex items-center space-x-2">
    <input id={id} type="checkbox" {...rest} className="h-4 w-4 text-blue-600" />
    {label && <Label htmlFor={id} className="text-sm text-gray-700">{label}</Label>}
  </div>
);

export default Checkbox;