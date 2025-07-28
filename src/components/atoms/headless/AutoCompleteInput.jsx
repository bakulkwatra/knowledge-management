import React, { useEffect, useState } from "react";
import { useController } from "react-hook-form";

function AutoCompleteInputs({
  name,
  control,
  loadOptions,
  placeholder = "Start typing...",
}) {
  if (!name || !control) {
    return null; // Prevents component from rendering and crashing
  }

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [query, setQuery] = useState(field.value || "");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      if (query.trim()) {
        try {
          const result = await loadOptions(query);
          setOptions(result);
        } catch (err) {
          console.error("Failed to load options:", err);
          setOptions([]);
        }
      } else {
        setOptions([]);
      }
    };
    const handler = setTimeout(() => {
      fetchOptions();
    }, 300); // Debounce

    return () => {
      clearTimeout(handler);
    };
  }, [query, loadOptions]);

  const handleSelect = (option) => {
    setQuery(option); // Update query
    field.onChange(option); // Update form value
    setOptions([]); // Clear dropdown
  };

  return (
    <div className="relative w-full">
      <input
        {...field}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          field.onChange(e); // Keep form in sync
        }}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-3 py-2 w-full"
      />
      {options.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-48 overflow-auto rounded shadow">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}

export default AutoCompleteInputs;
