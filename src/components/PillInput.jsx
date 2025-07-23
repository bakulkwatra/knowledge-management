import { XMarkIcon} from '@heroicons/react/24/outline'; 
import { useState, useEffect } from 'react';
const PillInput = ({ label, options, selectedItems, onAddItem, onRemoveItem }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setFilteredOptions(
        options.filter(opt =>
          opt.toLowerCase().includes(value.toLowerCase()) &&
          !selectedItems.includes(opt)
        )
      );
    } else {
      setFilteredOptions([]);
    }
  };

  const handleAddClick = (itemToAdd) => {
    if (itemToAdd && !selectedItems.includes(itemToAdd)) {
      onAddItem(itemToAdd);
      setInputValue('');
      setFilteredOptions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue && filteredOptions.length === 0) {
      e.preventDefault(); // Prevent form submission
      handleAddClick(inputValue);
    } else if (e.key === 'ArrowDown' && filteredOptions.length > 0) {
      e.preventDefault();
      // Focus on the first filtered option
      const firstOption = document.getElementById(`option-${filteredOptions[0]}`);
      if (firstOption) firstOption.focus();
    }
  };

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={`Add ${label.toLowerCase().slice(0, -1)}...`}
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-1 shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map(option => (
            <li
              key={option}
              id={`option-${option}`}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100 focus:bg-blue-100 focus:outline-none"
              onClick={() => handleAddClick(option)}
              tabIndex="0" // Make it focusable
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item, index) => (
          <div key={index} className="flex items-center bg-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
            <span>{item}</span>
            <button
              type="button"
              onClick={() => onRemoveItem(item)}
              className="ml-2 text-white hover:text-red-300 focus:outline-none"
              aria-label={`Remove ${item}`}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PillInput;