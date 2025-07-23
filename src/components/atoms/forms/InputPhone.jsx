import React from 'react';

const InputPhone = ({ id, value, onChange, placeholder, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block mb-1 font-medium">
        Phone
      </label>
      <input
        id={id}
        type="tel"
        value={value}
        onChange={onChange}
        placeholder={placeholder || '+91-XXXXXXXXXX'}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
        {...props}
      />
    </div>
  );
};

export default InputPhone;
