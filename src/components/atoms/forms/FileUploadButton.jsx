import Label from "../typography/Label";

const FileUploadButton = ({ id, onChange, label }) => (
  <div>
    {label && <Label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</Label>}
    <input
      id={id}
      name={id}
      type="file"
      onChange={onChange}
      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>
);

export default FileUploadButton;