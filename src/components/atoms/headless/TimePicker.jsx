import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ClockIcon } from "@heroicons/react/20/solid";

const TimePicker = ({ selected, onChange, label }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Popover className="relative">
        <PopoverButton className="w-full border rounded-lg py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between">
          <span>{selected ? selected.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Select time"}</span>
          <ClockIcon className="h-5 w-5 text-gray-400" />
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg p-2">
            <DatePicker
              selected={selected}
              onChange={onChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              inline
            />
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
};

export default TimePicker;
