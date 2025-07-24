import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const Select = ({ id, label, value, onChange, options = [], placeholder }) => {
  const selected = options.find((opt) => opt.value === value);

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block mb-1 font-medium">{label}</label>}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full px-3 py-2 border rounded focus:outline-none focus:ring flex justify-between items-center">
            <span>{selected ? selected.label : placeholder}</span>
            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <Listbox.Option key={opt.value} value={opt.value} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`px-3 py-2 cursor-pointer ${active ? "bg-blue-100" : ""} ${selected ? "font-semibold" : ""}`}
                  >
                    {opt.label}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;