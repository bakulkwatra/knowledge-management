import { Fragment, useState } from "react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton} from "@headlessui/react";
import { XMarkIcon, CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const MultiSelectPillInput = ({ label, options = [], selectedItems, onChange }) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options.filter((opt) => !selectedItems.includes(opt))
      : options.filter(
          (opt) =>
            opt.toLowerCase().includes(query.toLowerCase()) &&
            !selectedItems.includes(opt)
        );

  const handleAdd = (item) => {
    if (!selectedItems.includes(item)) {
      onChange([...selectedItems, item]);
    }
    setQuery("");
  };

  const handleRemove = (item) => {
    onChange(selectedItems.filter((i) => i !== item));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() && !filteredOptions.includes(query)) {
      e.preventDefault();
      handleAdd(query.trim()); // Add free text
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      <Combobox as="div" value={selectedItems} onChange={handleAdd} multiple>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div className="flex flex-wrap gap-1">
              {selectedItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  {item}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item);
                    }}
                    className="ml-1 hover:text-red-300"
                    aria-label={`Remove ${item}`}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </span>
              ))}
              <ComboboxInput
                className="flex-1 border-none focus:ring-0 text-sm text-gray-700"
                onChange={(event) => setQuery(event.target.value)}
                value={query}
                onKeyDown={handleKeyDown}
                placeholder="Add item..."
              />
            </div>
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
          </div>

          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default MultiSelectPillInput;
