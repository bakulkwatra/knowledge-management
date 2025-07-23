import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";

const AutoCompleteInput = ({
  name,
  control,
  label,
  placeholder = "Start typing...",
  loadOptions = async () => [],
  className = "",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  // fetch suggestions on input
  const handleChange = async (value) => {
    field.onChange(value);
    if (value.trim()) {
      const options = await loadOptions(value);
      setSuggestions(options);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // select from suggestion
  const handleSelect = (value) => {
    field.onChange(value);
    setShowSuggestions(false);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type="text"
        value={field.value || ""}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => field.value && setShowSuggestions(true)}
        placeholder={placeholder}
        className={`w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
          {suggestions.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default AutoCompleteInput;
