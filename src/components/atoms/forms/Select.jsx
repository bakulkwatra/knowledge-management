import React from 'react';

const Select = ({ id, label, value, onChange, options = [], placeholder, ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block mb-1 font-medium">{label}</label>}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
