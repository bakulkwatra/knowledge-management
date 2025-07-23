
import { useState } from "react";

export const useFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => setFilters(initialFilters);

  return {
    filters,
    updateFilter,
    resetFilters,
  };
};
