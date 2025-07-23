import React from 'react';
import { Search } from 'lucide-react';

const InputSearch = ({ id, value, onChange, placeholder, ...props }) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search...'}
        className="w-full px-10 py-2 border rounded focus:outline-none focus:ring"
        {...props}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default InputSearch;
