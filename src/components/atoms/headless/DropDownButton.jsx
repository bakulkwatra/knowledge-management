import { Menu, MenuItem, MenuItems, MenuButton } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const DropDownButton = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="flex flex-col gap-2 w-40">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <MenuButton className="inline-flex w-full items-center justify-between rounded bg-white px-4 py-2 text-sm text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {value}
            <ChevronDown size={16} className="ml-2" />
          </MenuButton>
        </div>

        <MenuItems className="absolute left-0 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg border border-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none z-10" >
          <div className="py-1">
            {options.map((opt, idx) => (
              <MenuItem key={idx}>
                {({ active }) => (
                  <button
                    onClick={() => onChange(opt.value)}
                    className={`${
                      active ? "bg-blue-100" : ""
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    {opt.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default DropDownButton;
