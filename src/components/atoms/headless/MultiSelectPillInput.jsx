// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxOption,
//   ComboboxOptions,
//   ComboboxButton,
// } from "@headlessui/react";
// import {
//   XMarkIcon,
//   CheckIcon,
//   ChevronUpDownIcon,
// } from "@heroicons/react/20/solid";
// import { useState } from "react";

// // Helper: Check if tag with same name exists in selectedItems
// const tagExists = (tags, name) =>
//   tags.some(
//     (tag) =>
//       typeof tag?.tag_name === "string" &&
//       tag.tag_name.toLowerCase() === name.toLowerCase()
//   );

// const MultiSelectPillInput = ({ label, options = [], selectedItems, onChange }) => {
//   const [query, setQuery] = useState("");

//   // Filter options to exclude already selected tags and match query
//   const filteredOptions = Array.isArray(options)
//     ? options.filter(
//         (opt) =>
//           typeof opt.tag_name === "string" &&
//           !tagExists(selectedItems, opt.tag_name) &&
//           opt.tag_name.toLowerCase().includes(query.toLowerCase())
//       )
//     : [];

//   const handleAdd = (tag) => {
//     let normalizedTag;

//     if (typeof tag === "string") {
//       const existing = Array.isArray(options)
//         ? options.find(
//             (opt) =>
//               typeof opt.tag_name === "string" &&
//               opt.tag_name.toLowerCase() === tag.trim().toLowerCase()
//           )
//         : undefined;

//       normalizedTag = existing
//         ? existing
//         : { id: null, tag_name: tag.trim(), isNew: true };
//     } else {
//       normalizedTag = tag;
//     }

//     if (!tagExists(selectedItems, normalizedTag.tag_name)) {
//      onChange([normalizedTag]);
//     }
//     setQuery("");
//   };

//   const handleRemove = (tag) => {
//     onChange(selectedItems.filter((t) => t.tag_name !== tag.tag_name));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && query.trim()) {
//       e.preventDefault();
//       handleAdd(query.trim());
//     }
//   };

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//         </label>
//       )}

//       <Combobox as="div" value={selectedItems} onChange={handleAdd} multiple>
//         <div className="relative">
//           {/* Input + Pills */}
//           <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
//             <div className="flex flex-wrap gap-1">
//               {selectedItems?.flat(100).map((tag) => (
//                 console.log('Selected tag1:', tag),
              
//                 <span
//                   key={`${tag.tag_name}-${tag.id ?? "manual"}`}
//                   className={`flex items-center text-xs px-2 py-1 rounded-full ${
//                     tag.id
//                       ? "bg-blue-500 text-white"
//                       : "bg-yellow-400 text-black"
//                   }`}
//                 >
//                   {tag.tag_name}

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleRemove(tag);
//                     }}
//                     className="ml-1 hover:text-red-500"
//                     aria-label={`Remove ${tag.tag_name}`}
//                   >
//                     <XMarkIcon className="h-4 w-4" />
//                   </button>
//                 </span>
//               ))}
//               <ComboboxInput
//                 className="flex-1 border-none focus:ring-0 text-sm text-gray-700"
//                 onChange={(event) => setQuery(event.target.value)}
//                 value={query}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Add tag..."
//               />
//             </div>
//             <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
//               <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//             </ComboboxButton>
//           </div>

//           {/* Dropdown Options */}
//           {filteredOptions.length > 0 && (
//             <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//               {filteredOptions.map((option) => (
//                 <ComboboxOption
//                   key={`${option.tag_name}-${option.id ?? "manual"}`}
//                   value={option}
//                   className={({ active }) =>
//                     `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
//                       active ? "bg-blue-600 text-white" : "text-gray-900"
//                     }`
//                   }
//                 >
//                   {({ selected }) => (
//                     <>
//                       <span
//                         className={`block truncate ${
//                           selected ? "font-medium" : "font-normal"
//                         }`}
//                       >
//                         {option.tag_name}
//                       </span>
//                       {selected && (
//                         <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                           <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </ComboboxOption>
//               ))}
//             </ComboboxOptions>
//           )}
//         </div>
//       </Combobox>
//     </div>
//   );
// };

// export default MultiSelectPillInput;


import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import {
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

const tagExists = (tags, name) =>
  tags.some(
    (tag) =>
      typeof tag?.tag_name === "string" &&
      tag.tag_name.toLowerCase() === name.toLowerCase()
  );

const MultiSelectPillInput = ({ label, options = [], selectedItems, onChange }) => {
  const [query, setQuery] = useState("");

  // Filter options based on query and remove already selected
  const filteredOptions = options.filter(
    (opt) =>
      typeof opt.tag_name === "string" &&
      !tagExists(selectedItems, opt.tag_name) &&
      opt.tag_name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (tag) => {
    if (!tag) return;
    let normalizedTag;

    if (typeof tag === "string") {
      const existing = options.find(
        (opt) =>
          typeof opt.tag_name === "string" &&
          opt.tag_name.toLowerCase() === tag.trim().toLowerCase()
      );

      normalizedTag = existing
        ? existing
        : { id: null, tag_name: tag.trim(), isNew: true };
    } else {
      normalizedTag = tag;
    }

    if (!tagExists(selectedItems, normalizedTag.tag_name)) {
      const updated = [...selectedItems, normalizedTag];
      console.log("Added tag:", normalizedTag);
      console.log("Selected tags:", updated);
      onChange(updated);
    }

    setQuery("");
  };

  const handleRemove = (tag) => {
    const updated = selectedItems.filter((t) => t.tag_name !== tag.tag_name);
    console.log("Removed tag:", tag);
    console.log("Selected tags:", updated);
    onChange(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      handleAdd(query.trim());
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <Combobox as="div" value={null} onChange={handleAdd} multiple={false}>
        <div className="relative">
          {/* Input + Pills */}
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div className="flex flex-wrap gap-1">
              {selectedItems.map((tag) => (
                <span
                  key={`${tag.tag_name?.toLowerCase()}-${tag.id ?? "manual"}`}
                  className={`flex items-center text-xs px-2 py-1 rounded-full ${
                    tag.id
                      ? "bg-blue-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {tag.tag_name}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(tag);
                    }}
                    className="ml-1 hover:text-red-500"
                    aria-label={`Remove ${tag.tag_name}`}
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
                placeholder="Add tag..."
              />
            </div>
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
          </div>

          {/* Dropdown Options */}
          {filteredOptions.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={`${option.tag_name.toLowerCase()}-${option.id ?? "manual"}`}
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
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.tag_name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
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
