// import { useEffect, useState } from "react";
// import { XMarkIcon } from "@heroicons/react/20/solid";
// import { tagService } from "../services/kmService";

// function TagValueInputDropdown({ resourceType, selectedTagsWithValues = [], onChange }) {
//   const [tagOptions, setTagOptions] = useState([]);
//   const [currentTag, setCurrentTag] = useState(null);
//   const [tagValueInput, setTagValueInput] = useState("");
//   const [showTagDropdown, setShowTagDropdown] = useState(false);

//   // Fetch tags when resourceType changes
//   useEffect(() => {
//     if (!resourceType) return;
//     const fetchTags = async () => {
//       try {
//         const res = await tagService.getAllTags(resourceType);
//         const data = res?.data?.data?.map(t => ({
//           id: t.id,
//           tag_name: t.tag_name || t.tagName || "Unnamed Tag"
//         })) || [];
//         setTagOptions(data);
//       } catch (err) {
//         console.error("Failed to fetch tags", err);
//         setTagOptions([]);
//       }
//     };
//     fetchTags();
//   }, [resourceType]);

//   const handleSelectTag = (tag) => {
//     if (!selectedTagsWithValues.some(t => t.tag_id === tag.id)) {
//       setCurrentTag(tag);
//       setTagValueInput("");
//     }
//   };

//   const handleAddTagWithValues = () => {
//     if (!currentTag || !tagValueInput.trim()) return;

//     const tagValues = tagValueInput
//       .split(",")
//       .map(v => v.trim())
//       .filter(v => v);

//     if (tagValues.length === 0) return;

//     const newTag = {
//       tag_id: currentTag.id,
//       tag_name: currentTag.tag_name,
//       tag_values: tagValues,
//     };

//     onChange?.([...selectedTagsWithValues, newTag]);

//     // Reset for next selection & keep dropdown open
//     setCurrentTag(null);
//     setTagValueInput("");
//     setShowTagDropdown(true);
//   };

//   const handleRemoveTag = (tagId) => {
//     const updated = selectedTagsWithValues.filter(t => t.tag_id !== tagId);
//     onChange?.(updated);
//   };

//   return (
//     <div className="space-y-2">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-1">
//         <label className="font-medium">Tags</label>
//         {!currentTag && !showTagDropdown && (
//           <button
//             onClick={() => setShowTagDropdown(true)}
//             className="text-blue-500 text-sm"
//           >
//             + Add Tag
//           </button>
//         )}
//       </div>

//       {/* Dropdown */}
//       {showTagDropdown && !currentTag && (
//         <div className="border p-2 rounded bg-white shadow max-h-40 overflow-y-auto">
//           <div className="text-sm font-medium mb-1">Select Tag</div>
//           {tagOptions.length === 0 ? (
//             <div className="text-gray-500 text-sm">No tags found</div>
//           ) : (
//             tagOptions
//               .filter(tag => !selectedTagsWithValues.some(t => t.tag_id === tag.id))
//               .map(tag => (
//                 <button
//                   key={tag.id}
//                   onClick={() => handleSelectTag(tag)}
//                   className="block w-full text-left px-2 py-1 hover:bg-blue-100 rounded text-sm"
//                 >
//                   {tag.tag_name}
//                 </button>
//               ))
//           )}
//         </div>
//       )}

//       {/* Selected tag & input */}
//       {currentTag && (
//         <div className="border p-2 rounded space-y-2">
//           <div className="font-medium text-blue-600">{currentTag.tag_name}</div>
//           <input
//             type="text"
//             placeholder="Enter values (comma separated)"
//             value={tagValueInput}
//             onChange={(e) => setTagValueInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault(); // Prevent form submission
//                 handleAddTagWithValues();
//               }
//             }}
//             className="border p-1 rounded w-full text-sm"
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => {
//                 setCurrentTag(null);
//                 setTagValueInput("");
//                 setShowTagDropdown(true);
//               }}
//               className="text-sm text-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAddTagWithValues}
//               className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Add Tag
//             </button>
//           </div>
//         </div>
//       )}

//       {/* List of added tags */}
//       <div className="space-y-1">
//         {selectedTagsWithValues.map(tag => (
//           <div
//             key={tag.tag_id}
//             className="border p-1 rounded flex justify-between items-center"
//           >
//             <div>
//               <div className="font-medium">{tag.tag_name}</div>
//               <div className="text-sm text-gray-600">
//                 {tag.tag_values.join(", ")}
//               </div>
//             </div>
//             <button
//               onClick={() => handleRemoveTag(tag.tag_id)}
//               className="text-red-500 text-sm ml-2"
//             >
//               <XMarkIcon className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TagValueInputDropdown;

// // import { useEffect, useState } from "react";
// // import { XMarkIcon } from "@heroicons/react/20/solid";
// // import { tagService } from "../services/kmService";

// // function TagValueInputDropdown({ resourceType, selectedTagsWithValues = [], onChange }) {
// //   const [tagOptions, setTagOptions] = useState([]);
// //   const [tagValuesMap, setTagValuesMap] = useState({}); // { tag_id: "value1, value2" }

// //   // Fetch tags when resourceType changes
// //   useEffect(() => {
// //     if (!resourceType) return;
// //     const fetchTags = async () => {
// //       try {
// //         const res = await tagService.getAllTags(resourceType);
// //         const data =
// //           res?.data?.data?.map((t) => ({
// //             id: t.id,
// //             tag_name: t.tag_name || t.tagName || "Unnamed Tag",
// //           })) || [];
// //         setTagOptions(data);
// //       } catch (err) {
// //         console.error("Failed to fetch tags", err);
// //         setTagOptions([]);
// //       }
// //     };
// //     fetchTags();
// //   }, [resourceType]);

// //   // Handle selecting a new tag
// //   const handleAddTag = (tagId) => {
// //     const tag = tagOptions.find((t) => t.id === tagId);
// //     if (!tag) return;
// //     if (selectedTagsWithValues.some((t) => t.tag_id === tag.id)) return;

// //     const newTags = [
// //       ...selectedTagsWithValues,
// //       { tag_id: tag.id, tag_name: tag.tag_name, tag_values: [] },
// //     ];
// //     onChange?.(newTags);
// //     setTagValuesMap({ ...tagValuesMap, [tag.id]: "" });
// //   };

// //   // Handle value change for a tag
// //   const handleValueChange = (tagId, value) => {
// //     setTagValuesMap({ ...tagValuesMap, [tagId]: value });

// //     const updatedTags = selectedTagsWithValues.map((t) =>
// //       t.tag_id === tagId
// //         ? {
// //             ...t,
// //             tag_values: value
// //               .split(",")
// //               .map((v) => v.trim())
// //               .filter(Boolean),
// //           }
// //         : t
// //     );
// //     onChange?.(updatedTags);
// //   };

// //   // Remove tag row
// //   const handleRemoveTag = (tagId) => {
// //     const updated = selectedTagsWithValues.filter((t) => t.tag_id !== tagId);
// //     onChange?.(updated);

// //     const updatedMap = { ...tagValuesMap };
// //     delete updatedMap[tagId];
// //     setTagValuesMap(updatedMap);
// //   };

// //   return (
// //     <div className="space-y-3">
// //       {/* Dropdown for adding tags */}
// //       <div>
// //         <select
// //           className="border p-2 rounded w-full text-sm"
// //           onChange={(e) => {
// //             if (e.target.value) {
// //               handleAddTag(e.target.value);
// //               e.target.value = "";
// //             }
// //           }}
// //         >
// //           <option value="">+ Add Tag</option>
// //           {tagOptions.map((tag) => (
// //             <option
// //               key={tag.id}
// //               value={tag.id}
// //               disabled={selectedTagsWithValues.some((t) => t.tag_id === tag.id)}
// //             >
// //               {tag.tag_name}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Table-like tag rows */}
// //       <div className="space-y-2">
// //         {selectedTagsWithValues.map((tag) => (
// //           <div
// //             key={tag.tag_id}
// //             className="flex items-center gap-3 border p-2 rounded"
// //           >
// //             {/* Tag pill */}
// //             <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
// //               {tag.tag_name}
// //             </div>

// //             {/* Value input */}
// //             <input
// //               type="text"
// //               placeholder="Enter values (comma separated)"
// //               className="flex-1 border p-1 rounded text-sm"
// //               value={tagValuesMap[tag.tag_id] || ""}
// //               onChange={(e) => handleValueChange(tag.tag_id, e.target.value)}
// //             />

// //             {/* Remove button */}
// //             <button
// //               onClick={() => handleRemoveTag(tag.tag_id)}
// //               className="text-red-500 hover:text-red-700"
// //             >
// //               <XMarkIcon className="h-5 w-5" />
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default TagValueInputDropdown;

// import { useEffect, useRef, useState } from "react";
// import { XMarkIcon } from "@heroicons/react/20/solid";
// import { tagService } from "../services/kmService";

// function TagValueInputDropdown({ resourceType, selectedTagsWithValues = [], onChange }) {
//   const [tagOptions, setTagOptions] = useState([]);
//   const [currentTag, setCurrentTag] = useState(null);
//   const [tagValueInput, setTagValueInput] = useState("");
//   const [showTagDropdown, setShowTagDropdown] = useState(false);

//   const dropdownRef = useRef(null);

//   // Fetch tags
//   useEffect(() => {
//     if (!resourceType) return;
//     const fetchTags = async () => {
//       try {
//         const res = await tagService.getAllTags(resourceType);
//         const data =
//           res?.data?.data?.map((t) => ({
//             id: t.id,
//             tag_name: t.tag_name || t.tagName || "Unnamed Tag",
//           })) || [];
//         setTagOptions(data);
//       } catch (err) {
//         console.error("Failed to fetch tags", err);
//         setTagOptions([]);
//       }
//     };
//     fetchTags();
//   }, [resourceType]);

//   // Close dropdown on outside click
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowTagDropdown(false);
//       }
//     }
//     if (showTagDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showTagDropdown]);

//   const handleSelectTag = (tag) => {
//     if (!selectedTagsWithValues.some((t) => t.tag_id === tag.id)) {
//       setCurrentTag(tag);
//       setTagValueInput("");
//     }
//   };

//   const handleAddTagWithValues = () => {
//     if (!currentTag || !tagValueInput.trim()) return;

//     const tagValues = tagValueInput
//       .split(",")
//       .map((v) => v.trim())
//       .filter((v) => v);

//     if (tagValues.length === 0) return;

//     const newTag = {
//       tag_id: currentTag.id,
//       tag_name: currentTag.tag_name,
//       tag_values: tagValues,
//     };

//     onChange?.([...selectedTagsWithValues, newTag]);

//     // Close dropdown after adding
//     setCurrentTag(null);
//     setTagValueInput("");
//     setShowTagDropdown(false);
//   };

//   const handleRemoveTag = (tagId) => {
//     const updated = selectedTagsWithValues.filter((t) => t.tag_id !== tagId);
//     onChange?.(updated);
//   };

//   return (
//     <div className="space-y-2">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-1">
//         <label className="font-medium">Tags</label>
//         {!currentTag && !showTagDropdown && (
//           <button
//             onClick={() => setShowTagDropdown(true)}
//             className="text-blue-500 text-sm"
//           >
//             + Add Tag
//           </button>
//         )}
//       </div>

//       {/* Dropdown */}
//       {showTagDropdown && !currentTag && (
//         <div
//           ref={dropdownRef}
//           className="border p-2 rounded bg-white shadow max-h-40 overflow-y-auto"
//         >
//           <div className="text-sm font-medium mb-1">Select Tag</div>
//           {tagOptions.length === 0 ? (
//             <div className="text-gray-500 text-sm">No tags found</div>
//           ) : (
//             tagOptions
//               .filter(
//                 (tag) =>
//                   !selectedTagsWithValues.some((t) => t.tag_id === tag.id)
//               )
//               .map((tag) => (
//                 <button
//                   key={tag.id}
//                   onClick={() => handleSelectTag(tag)}
//                   className="block w-full text-left px-2 py-1 hover:bg-blue-100 rounded text-sm"
//                 >
//                   {tag.tag_name}
//                 </button>
//               ))
//           )}
//         </div>
//       )}

//       {/* Selected tag input */}
//       {currentTag && (
//         <div className="border p-2 rounded space-y-2">
//           <div className="font-medium text-blue-600">{currentTag.tag_name}</div>
//           <input
//             type="text"
//             placeholder="Enter values (comma separated)"
//             value={tagValueInput}
//             onChange={(e) => setTagValueInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 handleAddTagWithValues();
//               }
//             }}
//             className="border p-1 rounded w-full text-sm"
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => {
//                 setCurrentTag(null);
//                 setTagValueInput("");
//                 setShowTagDropdown(false);
//               }}
//               className="text-sm text-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleAddTagWithValues}
//               className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Add Tag
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Added tags list */}
//       <div className="space-y-1">
//         {selectedTagsWithValues.map((tag) => (
//           <div
//             key={tag.tag_id}
//             className="border p-1 rounded flex justify-between items-center"
//           >
//             <div>
//               <div className="font-medium">{tag.tag_name}</div>
//               <div className="text-sm text-gray-600">
//                 {tag.tag_values.join(", ")}
//               </div>
//             </div>
//             <button
//               onClick={() => handleRemoveTag(tag.tag_id)}
//               className="text-red-500 text-sm ml-2"
//             >
//               <XMarkIcon className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TagValueInputDropdown;

// import { useEffect, useRef, useState } from "react";
// import { XMarkIcon, PencilIcon } from "@heroicons/react/20/solid";
// import { tagService } from "../services/kmService";
// import axios from "axios";

// export default function TagValueInputDropdown({
//   resourceType,
//   resourceId,
//   selectedTagsWithValues = [],
//   onChange,
// }) {
//   const [tagOptions, setTagOptions] = useState([]);
//   const [currentTag, setCurrentTag] = useState(null);
//   const [tagValueInput, setTagValueInput] = useState("");
//   const [showTagDropdown, setShowTagDropdown] = useState(false);

//   const dropdownRef = useRef(null);

//   // Fetch tags
//   useEffect(() => {
//     if (!resourceType) return;
//     const fetchTags = async () => {
//       try {
//         const res = await tagService.getAllTags(resourceType);
//         const data =
//           res?.data?.data?.map((t) => ({
//             id: t.id,
//             tag_name: t.tag_name || t.tagName || "Unnamed Tag",
//           })) || [];
//         setTagOptions(data);
//       } catch (err) {
//         console.error("Failed to fetch tags", err);
//         setTagOptions([]);
//       }
//     };
//     fetchTags();
//   }, [resourceType]);

//   // Close dropdown on outside click
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowTagDropdown(false);
//       }
//     }
//     if (showTagDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showTagDropdown]);

//   const handleSelectTag = (tag) => {
//     setCurrentTag(tag);
//     const existing = selectedTagsWithValues.find((t) => t.tag_id === tag.id);
//     setTagValueInput(existing ? existing.tag_values.join(", ") : "");
//     setShowTagDropdown(false);
//   };

//   const handleSaveTagValues = async () => {
//     if (!currentTag) return;
//     const values = tagValueInput
//       .split(",")
//       .map((v) => v.trim())
//       .filter((v) => v);

//     try {
//       await axios.post(
//         `http://localhost:9098/km/${resourceType}/${resourceId}/tags`,
//         {
//           id: { tagId: currentTag.id },
//           tagValues: values, // can be [] to remove
//         }
//       );

//       let updated;
//       if (values.length === 0) {
//         updated = selectedTagsWithValues.filter(
//           (t) => t.tag_id !== currentTag.id
//         );
//       } else {
//         const existingIndex = selectedTagsWithValues.findIndex(
//           (t) => t.tag_id === currentTag.id
//         );
//         if (existingIndex >= 0) {
//           updated = [...selectedTagsWithValues];
//           updated[existingIndex] = {
//             ...updated[existingIndex],
//             tag_values: values,
//           };
//         } else {
//           updated = [
//             ...selectedTagsWithValues,
//             {
//               tag_id: currentTag.id,
//               tag_name: currentTag.tag_name,
//               tag_values: values,
//             },
//           ];
//         }
//       }

//       onChange?.(updated);
//       setCurrentTag(null);
//       setTagValueInput("");
//     } catch (err) {
//       console.error("Failed to save tag values", err);
//       alert("Error saving tag values");
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-1">
//         <label className="font-medium">Tags</label>
//         {!currentTag && (
//           <button
//             onClick={() => setShowTagDropdown((s) => !s)}
//             className="text-blue-500 text-sm"
//           >
//             + Add / Edit Tag
//           </button>
//         )}
//       </div>

//       {/* Dropdown */}
//       {showTagDropdown && !currentTag && (
//         <div
//           ref={dropdownRef}
//           className="border p-2 rounded bg-white shadow max-h-40 overflow-y-auto"
//         >
//           <div className="text-sm font-medium mb-1">Select Tag</div>
//           {tagOptions.length === 0 ? (
//             <div className="text-gray-500 text-sm">No tags found</div>
//           ) : (
//             tagOptions.map((tag) => (
//               <button
//                 key={tag.id}
//                 onClick={() => handleSelectTag(tag)}
//                 className="block w-full text-left px-2 py-1 hover:bg-blue-100 rounded text-sm"
//               >
//                 {tag.tag_name}
//               </button>
//             ))
//           )}
//         </div>
//       )}

//       {/* Tag value input */}
//       {currentTag && (
//         <div className="border p-2 rounded space-y-2 bg-gray-50">
//           <div className="font-medium text-blue-600">{currentTag.tag_name}</div>
//           <input
//             type="text"
//             placeholder="Enter values (comma separated)"
//             value={tagValueInput}
//             onChange={(e) => setTagValueInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 handleSaveTagValues();
//               }
//             }}
//             className="border p-1 rounded w-full text-sm"
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => {
//                 setCurrentTag(null);
//                 setTagValueInput("");
//               }}
//               className="text-sm text-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSaveTagValues}
//               className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Added tags list */}
//       <div className="space-y-1">
//         {selectedTagsWithValues.map((tag) => (
//           <div
//             key={tag.tag_id}
//             className="border p-1 rounded flex justify-between items-center bg-white"
//           >
//             <div>
//               <div className="font-medium">{tag.tag_name}</div>
//               <div className="text-sm text-gray-600">
//                 {tag.tag_values.join(", ")}
//               </div>
//             </div>
//             <div className="flex space-x-1">
//               <button
//                 onClick={() =>
//                   handleSelectTag({
//                     id: tag.tag_id,
//                     tag_name: tag.tag_name,
//                   })
//                 }
//                 className="text-blue-500 text-sm"
//                 title="Edit values"
//               >
//                 <PencilIcon className="h-4 w-4" />
//               </button>
//               <button
//                 onClick={() => {
//                   setCurrentTag({
//                     id: tag.tag_id,
//                     tag_name: tag.tag_name,
//                   });
//                   setTagValueInput("");
//                   handleSaveTagValues(tag.tag_id, []);
//                 }}
//                 className="text-red-500 text-sm"
//                 title="Remove tag"
//               >
//                 <XMarkIcon className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useRef, useState } from "react";
// import { PencilIcon } from "@heroicons/react/20/solid";
// import { tagService } from "../services/kmService";
// import axios from "axios";

// export default function TagValueInputDropdown({
//   resourceType,
//   resourceId,
//   selectedTagsWithValues = [],
//   onChange,
// }) {
//   const [tagOptions, setTagOptions] = useState([]);
//   const [currentTag, setCurrentTag] = useState(null);
//   const [tagValueInput, setTagValueInput] = useState("");
//   const [showTagDropdown, setShowTagDropdown] = useState(false);

//   const dropdownRef = useRef(null);

//   // Fetch tags
//   useEffect(() => {
//     if (!resourceType) return;
//     const fetchTags = async () => {
//       try {
//         const res = await tagService.getAllTags(resourceType);
//         const data =
//           res?.data?.data?.map((t) => ({
//             id: t.id,
//             tag_name: t.tag_name || t.tagName || "Unnamed Tag",
//           })) || [];
//         setTagOptions(data);
//       } catch (err) {
//         console.error("Failed to fetch tags", err);
//         setTagOptions([]);
//       }
//     };
//     fetchTags();
//   }, [resourceType]);

//   // Close dropdown on outside click
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowTagDropdown(false);
//       }
//     }
//     if (showTagDropdown) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showTagDropdown]);

//   const handleSelectTag = (tag) => {
//     setCurrentTag(tag);
//     const existing = selectedTagsWithValues.find((t) => t.tag_id === tag.id);
//     setTagValueInput(existing ? existing.tag_values.join(", ") : "");
//     setShowTagDropdown(false);
//   };

//   const handleSaveTagValues = async () => {
//     if (!currentTag) return;
//     const newValues = tagValueInput
//       .split(",")
//       .map((v) => v.trim())
//       .filter((v) => v);

//     const existing = selectedTagsWithValues.find(
//       (t) => t.tag_id === currentTag.id
//     );
//     const mergedValues = existing
//       ? Array.from(new Set([...existing.tag_values, ...newValues]))
//       : newValues;

//     try {
//       await axios.post(
//         `http://localhost:9098/km/${resourceType}/${resourceId}/tags`,
//         {
//           id: { tagId: currentTag.id },
//           tagValues: mergedValues,
//         }
//       );

//       let updated;
//       if (existing) {
//         updated = selectedTagsWithValues.map((t) =>
//           t.tag_id === currentTag.id
//             ? { ...t, tag_values: mergedValues }
//             : t
//         );
//       } else {
//         updated = [
//           ...selectedTagsWithValues,
//           {
//             tag_id: currentTag.id,
//             tag_name: currentTag.tag_name,
//             tag_values: mergedValues,
//           },
//         ];
//       }

//       onChange?.(updated);
//       setCurrentTag(null);
//       setTagValueInput("");
//     } catch (err) {
//       console.error("Failed to save tag values", err);
//       alert("Error saving tag values");
//     }
//   };

//   return (
//     <div className="space-y-3">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-1">
//         <label className="font-medium">Tags</label>
//         {!currentTag && (
//           <button
//             onClick={() => setShowTagDropdown((s) => !s)}
//             className="text-blue-500 text-sm"
//           >
//             + Add / Edit Tag
//           </button>
//         )}
//       </div>

//       {/* Dropdown */}
//       {showTagDropdown && !currentTag && (
//         <div
//           ref={dropdownRef}
//           className="border p-2 rounded bg-white shadow max-h-40 overflow-y-auto"
//         >
//           <div className="text-sm font-medium mb-1">Select Tag</div>
//           {tagOptions.length === 0 ? (
//             <div className="text-gray-500 text-sm">No tags found</div>
//           ) : (
//             tagOptions.map((tag) => (
//               <button
//                 key={tag?.id}
//                 onClick={() => handleSelectTag(tag)}
//                 className="block w-full text-left px-2 py-1 hover:bg-blue-100 rounded text-sm"
//               >
//                 {tag.tag_name}
//               </button>
//             ))
//           )}
//         </div>
//       )}

//       {/* Tag value input */}
//       {currentTag && (
//         <div className="border p-2 rounded space-y-2 bg-gray-50">
//           <div className="font-medium text-blue-600">{currentTag.tag_name}</div>
//           <input
//             type="text"
//             placeholder="Enter values (comma separated)"
//             value={tagValueInput}
//             onChange={(e) => setTagValueInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 handleSaveTagValues();
//               }
//             }}
//             className="border p-1 rounded w-full text-sm"
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => {
//                 setCurrentTag(null);
//                 setTagValueInput("");
//               }}
//               className="text-sm text-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSaveTagValues}
//               className="bg-green-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Added tags list */}
//       <div className="space-y-1">
//         {selectedTagsWithValues.map((tag) => (
//           <div
//             key={tag?.tag_id}
//             className="border p-1 rounded flex justify-between items-center bg-white"
//           >
//             <div>
//               <div className="font-medium">{tag.tag_name}</div>
//               <div className="text-sm text-gray-600">
//                 {tag.tag_values.join(", ")}
//               </div>
//             </div>
//             <button
//               onClick={() =>
//                 handleSelectTag({
//                   id: tag.tag_id,
//                   tag_name: tag.tag_name,
//                 })
//               }
//               className="text-blue-500 text-sm"
//               title="Edit values"
//             >
//               <PencilIcon className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { tagService } from "../services/kmService";
import axios from "axios";

export default function TagValueInputDropdown({
  resourceType,
  resourceId,
  selectedTagsWithValues = [],
  onChange,
}) {
  const [tagOptions, setTagOptions] = useState([]);
  const [currentTag, setCurrentTag] = useState(null);
  const [tagValueInput, setTagValueInput] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Fetch tags
  useEffect(() => {
    if (!resourceType) return;
    const fetchTags = async () => {
      try {
        const res = await tagService.getAllTags(resourceType);
        const data =
          res?.data?.data?.map((t) => ({
            id: t.id,
            tag_name: t.tag_name || t.tagName || "Unnamed Tag",
          })) || [];
        setTagOptions(data);
      } catch (err) {
        console.error("Failed to fetch tags", err);
        setTagOptions([]);
      }
    };
    fetchTags();
  }, [resourceType]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTagDropdown(false);
      }
    }
    if (showTagDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTagDropdown]);

  const handleSelectTag = (tag) => {
    console.log("Selected tag", tag);
    setCurrentTag(tag);
    const existing = selectedTagsWithValues.find((t) => t.tag_id === tag.id);
    setTagValueInput(existing ? existing.tag_values.join(", ") : "");
    setShowTagDropdown(false);
  };

  const handleSaveTagValues = async () => {

    console.log("Saving tag values", currentTag, tagValueInput);
    if (!currentTag) return;

    alert("Saving tag values...");
    const newValues = tagValueInput
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v);

    const existing = selectedTagsWithValues.find(
      (t) => t.tag_id === currentTag.id
    );
    const mergedValues = existing
      ? Array.from(new Set([...existing.tag_values, ...newValues]))
      : newValues;

         console.log("Saving tag values", currentTag);


    try {
      
      await axios.post(
        `http://localhost:9098/km/${resourceType}/${resourceId}/tags`,
        {

         
          id: { 
            tagId: currentTag.id },
          tagValues: mergedValues,
        }
      );


      let updated;
      if (existing) {
        updated = selectedTagsWithValues.map((t) =>
          t.tag_id === currentTag.id
            ? { ...t, tag_values: mergedValues }
            : t
        );
      } else {
        updated = [
          ...selectedTagsWithValues,
          {
            tag_id: currentTag.id,
            tag_name: currentTag.tag_name,
            tag_values: mergedValues,
          },
        ];
      }

      onChange?.(updated);
      setCurrentTag(null);
      setTagValueInput("");
    } catch (err) {
      
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <label className="font-medium">Tags</label>
        {!currentTag && (
          <button
            onClick={() => setShowTagDropdown((s) => !s)}
            className="text-blue-500 text-sm"
          >
            + Add / Edit Tag
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showTagDropdown && !currentTag && (
        <div
          ref={dropdownRef}
          className="border p-2 rounded bg-white shadow max-h-40 overflow-y-auto"
        >
          <div className="text-sm font-medium mb-1">Select Tag</div>
          {tagOptions.length === 0 ? (
            <div className="text-gray-500 text-sm">No tags found</div>
          ) : (
            tagOptions.map((tag, index) => {
              const isTagAlreadySelected = selectedTagsWithValues.some(
                (selectedTag) => selectedTag.tag_id === tag.id
              );
              return (
                <button
                  key={tag?.id || index}
                  onClick={() => handleSelectTag(tag)}
                  disabled={isTagAlreadySelected}
                  className={`block w-full text-left px-2 py-1 rounded text-sm ${
                    isTagAlreadySelected
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-blue-100"
                  }`}
                >
                  {tag.tag_name}
                </button>
              );
            })
          )}
        </div>
      )}

      {/* Tag value input */}
      {currentTag && (
        <div className="border p-2 rounded space-y-2 bg-gray-50">
          <div className="font-medium text-blue-600">{currentTag.tag_name}</div>
          <input
            type="text"
            placeholder="Enter values (comma separated)"
            value={tagValueInput}
            onChange={(e) => setTagValueInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSaveTagValues();
              }
            }}
            className="border p-1 rounded w-full text-sm"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setCurrentTag(null);
                setTagValueInput("");
              }}
              className="text-sm text-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTagValues}
              className="bg-green-500 text-white px-2 py-1 rounded text-sm"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Added tags list */}
      <div className="space-y-1">
        {selectedTagsWithValues.map((tag, index) => (
          <div
            key={tag?.tag_id || index}
            className="border p-1 rounded flex justify-between items-center bg-white"
          >
            <div>
              <div className="font-medium">{tag.tag_name}</div>
              <div className="text-sm text-gray-600">
                {tag.tag_values.join(", ")}
              </div>
            </div>
            <button
              onClick={() =>
                handleSelectTag({
                  id: tag.tag_id,
                  tag_name: tag.tag_name,
                })
              }
              className="text-blue-500 text-sm"
              title="Edit values"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

