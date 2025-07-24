import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Fragment } from "react";

const DatePicker = ({ selected, onChange, label }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Popover className="relative">
        <PopoverButton className="w-full border rounded-lg py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {selected ? selected.toLocaleDateString() : "Select date"}
          <CalendarIcon className="h-5 w-5 inline-block ml-2 text-gray-400" />
        </PopoverButton>
        <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
          <PopoverPanel className="absolute z-10 mt-2 w-full">
            <DatePicker selected={selected} onChange={onChange} inline />
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
};

export default DatePicker;