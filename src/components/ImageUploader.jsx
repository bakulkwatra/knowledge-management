import { useRef, useState, useEffect } from "react";
import { resourceService } from "../services/kmService";

export default function ImageUploader({ 
  type, // "card" or "banner"
  resourceId, 
  resourceType, 
  existingCardId,
  initialPreview,
  onChange 
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initialPreview || null);
  const [saved, setSaved] = useState(!!initialPreview);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setPreview(initialPreview || null);
    setSaved(!!initialPreview);
  }, [initialPreview]);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(selected);
      setPreview(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  const removeImage = async () => {
    if (!saved) {
      setFile(null);
      setPreview(null);
      return;
    }
    setIsLoading(true);
    try {
      await resourceService.updateCard(
        resourceType,
        existingCardId,
        type === "card" ? null : undefined,
        type === "banner" ? null : undefined
      );
      setFile(null);
      setPreview(null);
      setSaved(false);
      if (onChange) onChange(null);
    } finally {
      setIsLoading(false);
    }
  };

  const saveImage = async () => {
    if (!file && !preview) return;
    setIsLoading(true);
    try {
      if (existingCardId) {
        await resourceService.updateCard(
          resourceType,
          existingCardId,
          type === "card" ? file : undefined,
          type === "banner" ? file : undefined
        );
      } else {
        await resourceService.uploadCard(
          resourceType,
          resourceId,
          type === "card" ? file : null,
          type === "banner" ? file : null
        );
      }
      setFile(null);
      setSaved(true);
      if (onChange) onChange(preview);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-2 border rounded w-full">
      <h4 className="mb-2 font-medium">
        {type === "card" ? "Card Image" : "Banner Image"}
      </h4>

      {preview ? (
        <div className="relative w-full flex justify-center">
          <img
            src={preview}
            alt={type}
            className={type === "banner" ? "w-full h-64 object-cover rounded" : "w-40 h-64 object-cover rounded"}
          />
          <button
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
            onClick={removeImage}
            disabled={isLoading}
          >
            Remove
          </button>
        </div>
      ) : (
        <button
          className={`border-dashed border-2 border-gray-300 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 ${
            type === "banner" ? "w-full h-64" : "w-40 h-28"
          }`}
          onClick={() => inputRef.current?.click()}
          disabled={isLoading}
        >
          Upload {type === "card" ? "Card" : "Banner"} Image
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {preview && (
        <button
          onClick={saveImage}
          disabled={isLoading}
          className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      )}
    </div>
  );
}
