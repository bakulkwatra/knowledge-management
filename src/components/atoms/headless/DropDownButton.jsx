import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const DropDownButton = ({ label = "Options", items = [] }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-between rounded bg-white px-4 py-2 text-sm text-gray-700 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {label}
          <ChevronDown size={16} className="ml-2" />
        </Menu.Button>
      </div>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
        <div className="py-1">
          {items.map((item, idx) => (
            <Menu.Item key={idx}>
              {({ active }) => (
                <button
                  onClick={item.onClick}
                  className={`$ {
                    active ? "bg-blue-100" : ""
                  } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                >
                  {item.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default DropDownButton;
