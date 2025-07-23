import React, { useState } from 'react';

const InputPassword = ({ id, label, value, onChange, placeholder, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute inset-y-0 right-3 text-sm text-gray-500 focus:outline-none"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;
