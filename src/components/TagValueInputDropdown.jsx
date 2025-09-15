// import { useEffect, useState } from "react";
// import { PencilIcon } from "@heroicons/react/20/solid";
// import { resourceService, tagService } from "../services/kmService";

// export default function TagValueInputDropdown({ resourceType, resourceId }) {
//   const [masterTags, setMasterTags] = useState([]); // all tags
//   const [assignedTags, setAssignedTags] = useState([]); // tags with values
//   const [currentTag, setCurrentTag] = useState(null); // tag being edited/added
//   const [tagValueInput, setTagValueInput] = useState("");

//   // Fetch master tags
//   useEffect(() => {
//     if (!resourceType) return;

//     const fetchTags = async () => {
//       try {
//         const res = await tagService.getAllTags(resourceType);
//         setMasterTags(res?.data?.data || []);
//       } catch (err) {
//         console.error("Failed to fetch master tags:", err);
//         setMasterTags([]);
//       }
//     };

//     fetchTags();
//   }, [resourceType]);

//   // Fetch assigned tags for this resource
//   useEffect(() => {
//     if (!resourceType || !resourceId) return;

//     const fetchAssigned = async () => {
//       try {
//         const res = await resourceService.getAssignedTags(resourceType, resourceId);
//         setAssignedTags(res?.data?.data || []);
//       } catch (err) {
//         console.error("Failed to fetch assigned tags:", err);
//         setAssignedTags([]);
//       }
//     };

//     fetchAssigned();
//   }, [resourceType, resourceId]);

//   const handleSelectTag = (tag) => {
//     setCurrentTag(tag);
//     const existing = assignedTags.find((t) => t.id.tagId === tag.id);
//     setTagValueInput(existing ? existing.tagValues.join(", ") : "");
//   };

//   const handleSaveTagValues = async () => {
//     if (!currentTag) return;
//     const values = tagValueInput
//       .split(",")
//       .map((v) => v.trim())
//       .filter(Boolean);

//     if (values.length === 0) return;

//     try {
//       // Payload expects { id: { tagId }, tagValues: [] }
//       await resourceService.assignTags(resourceType, resourceId, {
//         id: { tagId: currentTag.id },
//         tagValues: values,
//       });

//       // Refresh assigned tags
//       const res = await resourceService.getAssignedTags(resourceType, resourceId);
//       setAssignedTags(res?.data?.data || []);

//       setCurrentTag(null);
//       setTagValueInput("");
//     } catch (err) {
//       console.error("Failed to save tag values:", err);
//       alert("Error saving tag values");
//     }
//   };

//   const usedTagIds = new Set(assignedTags.map((t) => t.id.tagId));

//   return (
//     <div className="space-y-4">
//       {/* Add/Edit Tag */}
//       {!currentTag && (
//         <div className="flex gap-2 items-center">
//           <select
//             className="border p-1 rounded"
//             onChange={(e) => {
//               const tag = masterTags.find((t) => t.id === parseInt(e.target.value));
//               handleSelectTag(tag);
//             }}
//             defaultValue=""
//           >
//             <option value="">Select a tag</option>
//             {masterTags.map((tag) => (
//               <option key={tag.id} value={tag.id} disabled={usedTagIds.has(tag.id)}>
//                 {tag.tagName || tag.tag_name || "Unnamed Tag"}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Tag Input */}
//       {currentTag && (
//         <div className="border p-2 rounded space-y-2 bg-gray-50">
//           <div className="font-medium">{currentTag.tagName || currentTag.tag_name}</div>
//           <input
//             type="text"
//             value={tagValueInput}
//             placeholder="Enter values, comma separated"
//             onChange={(e) => setTagValueInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSaveTagValues()}
//             className="border p-1 rounded w-full text-sm"
//           />
//           <div className="flex justify-end gap-2">
//             <button
//               onClick={() => {
//                 setCurrentTag(null);
//                 setTagValueInput("");
//               }}
//               className="text-gray-500 text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSaveTagValues}
//               className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Display assigned tags */}
//       <div className="space-y-2">
//         {assignedTags.map((tag) => (
//           <div
//             key={tag.id.tagId}
//             className="border p-2 rounded flex justify-between items-center bg-white"
//           >
//             <div>
//               <div className="font-medium">{tag.tagName}</div>
//               <div className="text-sm text-gray-600">{tag.tagValues.join(", ")}</div>
//             </div>
//             <button
//               onClick={() =>
//                 handleSelectTag({ id: tag.id.tagId, tagName: tag.tagName })
//               }
//               className="text-blue-500 text-sm"
//             >
//               <PencilIcon className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { resourceService, tagService } from "../services/kmService";

export default function TagValueInputDropdown({ resourceType, resourceId }) {
  const [masterTags, setMasterTags] = useState([]); // all tags
  const [assignedTags, setAssignedTags] = useState([]); // tags with values
  const [currentTag, setCurrentTag] = useState(null); // tag being edited/added
  const [tagValueInput, setTagValueInput] = useState("");

  // Fetch master tags
  useEffect(() => {
    if (!resourceType) return;

    const fetchTags = async () => {
      try {
        const res = await tagService.getAllTags(resourceType);
        setMasterTags(res?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch master tags:", err);
        setMasterTags([]);
      }
    };

    fetchTags();
  }, [resourceType]);

  // Fetch assigned tags for this resource
  const fetchAssigned = async () => {
    if (!resourceType || !resourceId) return;
    try {
      const res = await resourceService.getAssignedTags(resourceType, resourceId);
      setAssignedTags(res?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch assigned tags:", err);
      setAssignedTags([]);
    }
  };

  useEffect(() => {
    fetchAssigned();
  }, [resourceType, resourceId]);

  const handleSelectTag = (tag) => {
    setCurrentTag(tag);
    const existing = assignedTags.find((t) => t.id.tagId === tag.id);
    setTagValueInput(existing ? existing.tagValues.join(", ") : "");
  };

  const handleSaveTagValues = async () => {
    if (!currentTag) return;
    const values = tagValueInput
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    if (values.length === 0) return;

    try {
      // Payload expects { id: { tagId }, tagValues: [] }
      await resourceService.assignTags(resourceType, resourceId, {
        id: { tagId: currentTag.id },
        tagValues: values,
      });

      await fetchAssigned();

      setCurrentTag(null);
      setTagValueInput("");
    } catch (err) {
      console.error("Failed to save tag values:", err);
      alert("Error saving tag values");
    }
  };

  const handleRemoveTag = async (tagId) => {
    try {
      await resourceService.deleteTag(resourceType, resourceId, tagId);
      await fetchAssigned();
    } catch (err) {
      console.error("Failed to remove tag:", err);
      alert("Error removing tag");
    }
  };

  const usedTagIds = new Set(assignedTags.map((t) => t.id.tagId));

  return (
    <div className="space-y-4">
      {/* Add/Edit Tag */}
      {!currentTag && (
        <div className="flex gap-2 items-center">
          <select
            className="border p-1 rounded"
            onChange={(e) => {
              const tag = masterTags.find((t) => t.id === parseInt(e.target.value));
              handleSelectTag(tag);
            }}
            defaultValue=""
          >
            <option value="">Select a tag</option>
            {masterTags.map((tag) => (
              <option key={tag.id} value={tag.id} disabled={usedTagIds.has(tag.id)}>
                {tag.tagName || tag.tag_name || "Unnamed Tag"}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tag Input */}
      {currentTag && (
        <div className="border p-2 rounded space-y-2 bg-gray-50">
          <div className="font-medium">{currentTag.tagName || currentTag.tag_name}</div>
          <input
            type="text"
            value={tagValueInput}
            placeholder="Enter values, comma separated"
            onChange={(e) => setTagValueInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveTagValues()}
            className="border p-1 rounded w-full text-sm"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setCurrentTag(null);
                setTagValueInput("");
              }}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTagValues}
              className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Display assigned tags */}
      <div className="space-y-2">
        {assignedTags.map((tag) => (
          
          <div
            key={tag.id.tagId}
            className="border p-2 rounded flex justify-between items-center bg-white relative"
          >
            
            <div>
              <div className=" flex gap-2 font-medium">{tag.tagName}
                <div className=" items-center">
              <button
                onClick={() =>
                  handleSelectTag({ id: tag.id.tagId, tagName: tag.tagName })
                }
                className="text-blue-500 text-sm"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              
            </div>
              </div>
              <div className="text-sm text-gray-600">{tag.tagValues.join(", ")}</div>
            </div>
            <div className="absolute right-[-4px] top-[-4px] bg-red-500 rounded h-5">
              <button
                onClick={() => handleRemoveTag(tag.id.tagId)}
                className="  text-white text-sm"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
            
            
            
            
          </div>
        ))}
      </div>
    </div>
  );
}
