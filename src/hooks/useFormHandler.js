import { useState } from "react";

export const useFormHandler = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = (rules = {}) => {
    let valid = true;
    const newErrors = {};

    for (let key in rules) {
      const rule = rules[key];
      const value = formData[key];

      if (rule.required && !value) {
        newErrors[key] = `${key} is required`;
        valid = false;
      }

      // here we can add more validations as per our need
    }

    setErrors(newErrors);
    return valid;
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    resetForm,
  };
};