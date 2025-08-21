// import React, { useRef } from "react";

// /**
//  * File upload section
//  * value: array of { name, url, size? }
//  * onUploadFile(file) => Promise<{ name, url, size? }>
//  */
// export default function FileSection({ value = [], onChange, onUploadFile }) {
//   const fileRef = useRef(null);

//   const handlePick = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       let meta;
//       if (onUploadFile) {
//         meta = await onUploadFile(file); // Call backend if provided
//       } else {
//         // fallback: local preview only
//         meta = {
//           name: file.name,
//           url: URL.createObjectURL(file),
//           size: file.size,
//         };
//       }
//       onChange?.([...(value || []), meta]);
//     } catch (err) {
//       console.error("File upload failed:", err);
//       alert("File upload failed");
//     } finally {
//       e.target.value = "";
//     }
//   };

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={() => fileRef.current?.click()}
//         >
//           Attach File
//         </button>
//         <input
//           ref={fileRef}
//           type="file"
//           className="hidden"
//           onChange={handlePick}
//         />
//       </div>

//       {(!value || value.length === 0) ? (
//         <p className="text-sm text-gray-500">No files attached.</p>
//       ) : (
//         <ul className="space-y-2">
//           {value?.map((f, i) => (
//             <li
//               key={i}
//               className="flex items-center justify-between border rounded p-2"
//             >
//               <a
//                 href={f.url}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 {f.name}
//               </a>
//               <span className="text-xs text-gray-500">
//                 {f.size ? `${Math.round(f.size / 1024)} KB` : ""}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from "react";
// import { sectionFileService } from "../services/kmService";
// import axios from "axios";

/**
 * File upload section
 * PRE-SAVE (no sectionId): maintains a local list in `value` via onChange
 * POST-SAVE (has sectionId): persists via API (upload/list/delete)
 *
 * value: array of { name, url?, size?, id? }  (used only pre-save)
 */
// export default function FileSection({ value = [], onChange, resourceType, sectionId }) {
//   const fileRef = useRef(null);

//   const handlePick = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const meta = {
//       // ⚡ no manual id here, backend will generate
//       file,
//       name: file.name,
//       size: file.size,
//       previewUrl: URL.createObjectURL(file),
//     };

//     onChange?.([...(value || []), meta]);
//     e.target.value = "";
//   };

//   const handleDelete = (idx) => {
//     const next = [...(value || [])];
//     next.splice(idx, 1);
//     onChange?.(next);
//   };


//     const [pdfUrl, setPdfUrl] = useState(null);

// useEffect(() => {
//     const fetchPdf = async () => {
//       try {
//         // ✅ call your API
//         const response = await sectionFileService.getAll(resourceType, sectionId);
        

//         console.log("API Response:", response.data.data);

//         // map
//         // Assuming your API returns something like { fileData: "base64string..." }
//         const base64Data = response.data.data?.[0]?.fileData; // Adjust based on your actual API response structure
//         console.log("Base64 Data:", base64Data);

//         if (!base64Data) return;

//         // ✅ Convert Base64 → Blob → Object URL
//         const byteCharacters = atob(base64Data);
//         const byteNumbers = new Array(byteCharacters.length);
//         for (let i = 0; i < byteCharacters.length; i++) {
//           byteNumbers[i] = byteCharacters.charCodeAt(i);
//         }
//         const byteArray = new Uint8Array(byteNumbers);
//         const blob = new Blob([byteArray], { type: "application/pdf" });
//         const url = URL.createObjectURL(blob);

//         setPdfUrl(url);

//         return () => URL.revokeObjectURL(url); // cleanup
//       } catch (error) {
//         console.error("Error fetching PDF:", error);
//       }
//     };

//     fetchPdf();
//   }, []);


//   console.log("PDF URL:", pdfUrl);





//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           type="button"
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={() => fileRef.current?.click()}
//         >
//           Attach File
//         </button>
//         <input
//           ref={fileRef}
//           type="file"
//           className="hidden"
//           onChange={handlePick}
//         />
//       </div>

//       {(!value || value.length === 0) ? (

//           <div className="flex flex-col items-center gap-4">
//       {/* Display PDF in iframe */}
//       {/* <iframe src={pdfUrl} width="600" height="500" title="PDF Viewer" /> */}

//      {/* <img
//   src={`${pdfUrl}`}
//   alt="Fetched"
//   className="max-w-[60px] max-h-[50px] object-contain border rounded"
// /> */}



//       {/* Download Button */}
//       <a
//         href={pdfUrl}
//          download="downloaded-image.jpg"  
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//       >
//         Download PDF
//       </a>
//     </div>
//         // <p className="text-sm text-gray-500">
//         //   {/* No files attached. */}
         
        
//         // </p>
//       ) : (
//         <ul className="space-y-2">
//           {value.map((f, i) => (
//             <li
//               key={i} // 👈 use index for now (id comes after backend save)
//               className="flex items-center justify-between border rounded p-2"
//             >
//               <span className="text-blue-600">{f.name}</span>
//               <div className="flex items-center gap-3">
//                 <span className="text-xs text-gray-500">
//                   {f.size ? `${Math.round(f.size / 1024)} KB` : ""}
//                 </span>
//                 <button
//                   type="button"
//                   className="text-red-600 hover:underline"
//                   onClick={() => handleDelete(i)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// FileSection.jsx

// import React, { useEffect, useRef, useState } from "react";
// import { sectionFileService } from "../services/kmService";

// export default function FileSection({ value = [], onChange, resourceType, sectionId }) {
//   const fileRef = useRef(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedFiles, setFetchedFiles] = useState([]);

//   // Handle local file selection
//   const handlePick = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const newFile = {
//       file, // Temporary local file object
//       name: file.name,
//       mimeType: file.type,
//       size: file.size,
//     };
//     onChange([...value, newFile]);
//     e.target.value = "";
//   };
  
//   // Handle local file deletion (pre-save)
//   const handleDeleteLocal = (idx) => {
//     const next = [...value];
//     next.splice(idx, 1);
//     onChange(next);
//   };

//   // Handle a saved file deletion (post-save)
//   const handleDeleteSaved = async (fileId) => {
//     if (!sectionId) return;
//     try {
//       await sectionFileService.delete(resourceType, fileId);
//       // Remove the file from the local state
//       const nextFetched = fetchedFiles.filter(f => f.id !== fileId);
//       setFetchedFiles(nextFetched);
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       alert("Error deleting file");
//     }
//   };

//   // Fetch files from the API when the sectionId becomes available
//   useEffect(() => {
//     const fetchFiles = async () => {
//       if (!sectionId) return;
//       setIsLoading(true);
//       try {
//         const response = await sectionFileService.getAll(resourceType, sectionId);
//         console.log("Fetched files:", response.data.data);
//         setFetchedFiles(response.data.data || []);
//       } catch (error) {
//         console.error("Error fetching files:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchFiles();
//   }, [resourceType, sectionId]);

//   const displayFiles = sectionId ? fetchedFiles : value;

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           type="button"
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={() => fileRef.current?.click()}
//         >
//           Attach File
//         </button>
//         <input ref={fileRef} type="file" className="hidden" onChange={handlePick} />
//       </div>

//       {isLoading ? (
//         <p className="text-sm text-gray-500">Loading files...</p>
//       ) : displayFiles.length === 0 ? (
//         <p className="text-sm text-gray-500">No files attached.</p>
//       ) : (
//         <ul className="space-y-2">
//           {displayFiles.map((f, i) => (
//             <li key={f.id || i} className="flex items-center justify-between border rounded p-2">
//               <span className="text-blue-600">{f.name||f.fileName}</span>
//               <div className="flex items-center gap-3">
//                 <span className="text-xs text-gray-500">
//                   {f.size ? `${(f.size / 1024).toFixed(0)} KB` : ""}
//                 </span>
                
//                 {/* View Button */}
//                 {f.fileData && (
//                   <a
//                     href={f.fileData}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     View
//                   </a>
//                 )}

//                 {/* Download Button */}
//                 <a
//                   href={f.fileData || "#"}
//                   download={ f.name|| f.fileName}
//                   className="text-blue-600 hover:underline text-sm"
//                 >
//                   Download
//                 </a>

//                 <button
//                   type="button"
//                   className="text-red-600 hover:underline text-sm"
//                   onClick={() => sectionId ? handleDeleteSaved(f.id) : handleDeleteLocal(i)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { sectionFileService } from "../services/kmService";

export default function FileSection({ value = [], onChange, resourceType, sectionId }) {
  const fileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedFiles, setFetchedFiles] = useState([]);

  // Handle local file selection
  const handlePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFile = {
      file, // Temporary local file object
      name: file.name,
      mimeType: file.type,
      size: file.size,
    };
    onChange([...value, newFile]);
    e.target.value = "";
  };

  // Handle local file deletion (pre-save)
  const handleDeleteLocal = (idx) => {
    const next = [...value];
    next.splice(idx, 1);
    onChange(next);
  };

  // Handle a saved file deletion (post-save)
  const handleDeleteSaved = async (fileId) => {
    if (!sectionId) return;
    try {
      await sectionFileService.delete(resourceType, fileId);
      const nextFetched = fetchedFiles.filter(f => f.id !== fileId);
      setFetchedFiles(nextFetched);
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error deleting file");
    }
  };

  // ✅ New and Correct handleView logic
  // const handleView = (fileData) => {
  //   const link = document.createElement("a");
  //   link.href = fileData;
  //   link.target = "_blank";
  //   link.rel = "noopener noreferrer";
  //   link.style.display = "none";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const handleView = (fileData) => {
  try {
    // split prefix (data:application/pdf;base64,....)
    const [meta, base64Data] = fileData.split(",");
    const mimeType = meta.match(/:(.*?);/)[1]; // extract "application/pdf"

    // decode base64 → binary
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // create blob
    const blob = new Blob([byteArray], { type: mimeType });

    // create object URL and open in new tab
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank","noopener,noreferrer");

    // revoke later (cleanup)
    setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
  } catch (err) {
    console.error("Error opening file:", err);
    alert("Could not open file.");
  }
};
  
  // ✅ Correct handleDownload logic (already in your code, but here for clarity)
  const handleDownload = (fileData, fileName) => {
    const link = document.createElement("a");
    link.href = fileData;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fetch files from the API when the sectionId becomes available
  useEffect(() => {
    const fetchFiles = async () => {
      if (!sectionId) return;
      setIsLoading(true);
      try {
        const response = await sectionFileService.getAll(resourceType, sectionId);
        setFetchedFiles(response.data.data || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFiles();
  }, [resourceType, sectionId]);

  const displayFiles = sectionId ? fetchedFiles : value;

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex items-center gap-2 border-b pb-2 mb-3">
        <button
          type="button"
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => fileRef.current?.click()}
        >
          Attach File
        </button>
        <input ref={fileRef} type="file" className="hidden" onChange={handlePick} />
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading files...</p>
      ) : displayFiles.length === 0 ? (
        <p className="text-sm text-gray-500">No files attached.</p>
      ) : (
        <ul className="space-y-2">
          {displayFiles.map((f, i) => (
            <li key={f.id || i} className="flex items-center justify-between border rounded p-2">
              <span className="text-blue-600">{f.name || f.fileName}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  {f.size ? `${(f.size / 1024).toFixed(0)} KB` : ""}
                </span>
                
                {f.fileData && (
                  // ✅ Use a button with a click handler for the view functionality
                  <button
                    type="button"
                    onClick={() => handleView(f.fileData)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                )}

                {f.fileData && (
                  // ✅ Use a button with a click handler for the download functionality
                  <button
                    type="button"
                    onClick={() => handleDownload(f.fileData, f.name || f.fileName)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Download
                  </button>
                )}
                
                <button
                  type="button"
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => sectionId ? handleDeleteSaved(f.id) : handleDeleteLocal(i)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}