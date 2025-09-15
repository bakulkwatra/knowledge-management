// import React, { useRef } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Placeholder from "@tiptap/extension-placeholder";

// /**
//  * value: HTML string containing image nodes (or empty string)
//  * onUploadImage(file) => Promise<string>  // must return a URL
//  */
// export default function ImageSection({
//   value = "",
//   onChange,
//   onUploadImage,
//   placeholder = "Insert images…",
// }) {
//   const fileRef = useRef(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bold: false,
//         italic: false,
//         underline: false,
//         codeBlock: false,
//         bulletList: false,
//         orderedList: false,
//         blockquote: false,
//       }),
//       Image.configure({
//         inline: false,
//         allowBase64: true,
//       }),
//       Placeholder.configure({ placeholder }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
//   });

//   const handleSelectImage = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !editor) return;

//     try {
//       let url;
//       if (onUploadImage) {
//         url = await onUploadImage(file); // your backend
//       } else {
//         // fallback: local blob (not persisted)
//         url = URL.createObjectURL(file);
//       }
//       editor.chain().focus().setImage({ src: url, alt: file.name }).run();
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       alert("Image upload failed");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   if (!editor) return null;

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={() => fileRef.current?.click()}
//         >
//           Upload Image
//         </button>
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleSelectImage}
//         />
//       </div>

//       <EditorContent editor={editor} className="min-h-[140px]" />
//     </div>
//   );
// }

// import React, { useRef } from "react";
// import { Download, Eye, Trash2 } from "lucide-react";
// import { sectionFileService } from "../services/kmService";

// export default function ImageSection({
//   value = [],             // array of image objects
//   onChange,
//   resourceType,
//   sectionId,
//   placeholder = "Insert images…",
// }) {
//   const fileRef = useRef(null);

//   const handleSelectImage = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file || !sectionId) return;

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await sectionFileService.upload(
//         resourceType,
//         sectionId,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const uploadedFile = res?.data?.data || res?.data;
//       const newImage = {
//         id: uploadedFile.id,
//         name: uploadedFile.fileName,
//         mimeType: uploadedFile.mimeType,
//         size: uploadedFile.size,
//         fileData: uploadedFile.fileData, // base64 from backend
//       };

//       onChange([...(value || []), newImage]);
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       alert("Image upload failed");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleDelete = (id) => {
//     onChange(value.filter((img) => img.id !== id));
//   };

//   const handleDownload = (img) => {
//     const link = document.createElement("a");
//     link.href = img.fileData;
//     link.download = img.name;
//     link.click();
//   };

//   const handleView = (img) => {
//     const newWindow = window.open();
//     newWindow.document.write(
//       `<img src="${img.fileData}" alt="${img.name}" style="max-width:100%;"/>`
//     );
//   };

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={() => fileRef.current?.click()}
//         >
//           Upload Image
//         </button>
//         <input
//           ref={fileRef}
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleSelectImage}
//         />
//       </div>

//       {(!value || value.length === 0) && (
//         <p className="text-gray-500 text-sm">{placeholder}</p>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
//         {value.map((img) => (
//           <div
//             key={img.id}
//             className="border rounded-lg overflow-hidden shadow-sm"
//           >
//             <img
//               src={img.fileData}
//               alt={img.name}
//               className="w-full h-32 object-cover"
//             />
//             <div className="flex justify-between items-center p-2 bg-gray-50">
//               <span className="text-xs truncate">{img.name}</span>
//               <div className="flex space-x-2">
//                 <button
//                   className="text-blue-600 hover:text-blue-800"
//                   onClick={() => handleView(img)}
//                   title="View"
//                 >
//                   <Eye size={16} />
//                 </button>
//                 <button
//                   className="text-green-600 hover:text-green-800"
//                   onClick={() => handleDownload(img)}
//                   title="Download"
//                 >
//                   <Download size={16} />
//                 </button>
//                 <button
//                   className="text-red-600 hover:text-red-800"
//                   onClick={() => handleDelete(img.id)}
//                   title="Delete"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { sectionFileService } from "../services/kmService";


export default function ImageSection({
  value = [],               // pre-save local array: [{ file, name, size, mimeType }]
  onChange,                 // setter for the array above
  resourceType,
  sectionId,
  
}) {
  const fileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState([]); // post-save list from API (images only)

  // --- utils ---
  const ensureArray = (raw) => (Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : []);
  const isImage = (m) => typeof m === "string" && m.startsWith("image/");

  // Convert data URL -> Blob and open in new tab (bypasses data: URL restrictions)
  const openDataUrlInNewTab = (dataUrl) => {
    try {
      const [header, base64] = dataUrl.split(",");
      const mime = (header.match(/data:(.*?);base64/) || [])[1] || "application/octet-stream";
      const bin = atob(base64);
      const len = bin.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
      const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
      const win = window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      if (!win) alert("Pop-up blocked. Allow pop-ups to view the image.");
    } catch (e) {
      console.error("openDataUrlInNewTab failed:", e);
    }
  };

  const downloadDataUrl = (dataUrl, filename = "image") => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- local (pre-save) ---
  const handlePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isImage(file.type)) {
      alert("Only image files are allowed.");
      e.target.value = "";
      return;
    }
    const next = [
      ...(value || []),
      { file, name: file.name, size: file.size, mimeType: file.type },
    ];
    onChange?.(next);
    e.target.value = "";
  };

  const handleDeleteLocal = (idx) => {
    const next = [...(value || [])];
    next.splice(idx, 1);
    onChange?.(next);
  };

  // --- saved (post-save) ---
  const fetchImages = async () => {
    if (!sectionId) return;
    setIsLoading(true);
    try {
      const resp = await sectionFileService.getAll(resourceType, sectionId);
      const list = ensureArray(resp?.data);
      // keep only images
      setFetched(list.filter((f) => isImage(f?.mimeType)));
    } catch (err) {
      console.error("Error fetching images:", err);
      setFetched([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceType, sectionId]);

  const handleDeleteSaved = async (fileId) => {
    try {
      await sectionFileService.delete(resourceType, fileId);
      setFetched((curr) => curr.filter((f) => f.id !== fileId));
    } catch (e) {
      console.error("Delete failed:", e);
      alert("Error deleting image");
    }
  };

  // Which list to show: post-save or pre-save
  const items = sectionId ? fetched : value;

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex items-center gap-2 border-b pb-2 mb-3">
        <button
          type="button"
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => fileRef.current?.click()}
        >
          Upload Image
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePick}
        />
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading images...</p>
      ) : !items || items.length === 0 ? (
        <p className="text-sm text-gray-500">No images attached.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((f, i) => {
            const name = f.name || f.fileName;
            const sizeKb =
              typeof f.size === "number" ? `${(f.size / 1024).toFixed(0)} KB` : "";
            const canView = !!f.fileData; // backend returns data:...;base64,...
            return (
              <li
                key={f.id || i}
                className="flex items-center justify-between border rounded p-2"
              >
                <div className="flex items-center gap-3">
                  {/* preview if we have data url */}
                  {f.fileData ? (
                    <img
                      src={f.fileData}
                      alt={name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded border bg-gray-50 flex items-center justify-center text-xs text-gray-500">
                      img
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-blue-600">{name}</span>
                    <span className="text-xs text-gray-500">{sizeKb}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {canView && (
                    <button
                      type="button"
                      onClick={() => openDataUrlInNewTab(f.fileData)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </button>
                  )}
                  {canView && (
                    <button
                      type="button"
                      onClick={() => downloadDataUrl(f.fileData, name)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Download
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-red-600 hover:underline text-sm"
                    onClick={() =>
                      sectionId ? handleDeleteSaved(f.id) : handleDeleteLocal(i)
                    }
                  >
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
