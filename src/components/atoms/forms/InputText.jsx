const InputText = ({ id, name, type = "text", placeholder, ...rest }) => {
  return (
    <input
      id={id || name}
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full rounded border px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      {...rest}
    />
  );
};

export default InputText;
