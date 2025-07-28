import { Fragment, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const MultiSelect = ({ label, options, selectedItems, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (item) => {
    const exists = selectedItems.some((i) => i.value === item.value);
    const newSelected = exists
      ? selectedItems.filter((i) => i.value !== item.value)
      : [...selectedItems, item];
    onChange(newSelected);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <Listbox value={selectedItems} onChange={toggleItem} multiple>
        {({ open }) => (
          <div className="relative">
            <ListboxButton
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-full cursor-default rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="block truncate">
                {selectedItems?.length > 0
                  ? selectedItems.map((i) => i.label).join(", ")
                  : "Select options"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition
              as={Fragment}
              show={open || isOpen}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map((option) => (
                  <ListboxOption
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default MultiSelect;