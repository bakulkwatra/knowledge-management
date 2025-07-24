import { Combobox } from "@headlessui/react";
import { useController } from "react-hook-form";
import { useEffect, useState } from "react";

const AutoCompleteInput = ({ name, control, label, loadOptions, placeholder = "Start typing..." }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const [query, setQuery] = useState(field.value || "");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (query.trim()) {
        const result = await loadOptions(query);
        setOptions(result);
      } else {
        setOptions([]);
      }
    };
    fetch();
  }, [query, loadOptions]);

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <Combobox value={field.value} onChange={field.onChange}>
        <div className="relative">
          <ComboboxInput
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              field.onChange(e.target.value);
            }}
            placeholder={placeholder}
            className={`w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          <ComboboOptions className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
            {options.map((option, idx) => (
              <ComboboxOption
                key={idx}
                value={option}
                className={({ active }) => `px-3 py-2 cursor-pointer ${active ? "bg-blue-100" : ""}`}
              >
                {option}
              </ComboboxOption>
            ))}
          </ComboboOptions>
        </div>
      </Combobox>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default AutoCompleteInput;
