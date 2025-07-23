

const TextArea = ({ id, label, value, onChange, placeholder, rows = 4, ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block mb-1 font-medium">{label}</label>}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 border rounded resize-none focus:outline-none focus:ring"
        {...props}
      />
    </div>
  );
};

export default TextArea;
