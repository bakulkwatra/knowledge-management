import Label from "../typography/Label";

const Radio = ({ label, name, value, id, ...rest }) => (
  <div className="flex items-center space-x-2">
    <input type="radio" id={id} name={name} value={value} {...rest} className="h-4 w-4 text-blue-600" />
    {label && <Label htmlFor={id} className="text-sm text-gray-700">{label}</Label>}
  </div>
);

export default Radio;