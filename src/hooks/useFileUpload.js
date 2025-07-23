
import { useState } from "react";

export const useFileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!allowedTypes.includes(selected.type)) {
        setError("Unsupported file type");
        return;
      }
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError("");
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError("");
  };

  return {
    file,
    preview,
    error,
    handleFileChange,
    clearFile,
  };
};
