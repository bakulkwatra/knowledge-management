// import React, { useState } from 'react';
// import SectionCard from './SectionCard';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { v4 as uuidv4 } from 'uuid';

// const ChapterCard = ({ chapter, onUpdate, onDelete }) => {
//   const [sections, setSections] = useState(chapter?.sections || []);
//   const [chapterTitle, setChapterTitle] = useState(chapter?.title || 'Untitled Chapter');

//   const handleAddSection = () => {
//     const newSection = {
//       id: uuidv4(),
//       section_type: 'text',
//       section_title: '',
//       section_content: '',
//     };
//     setSections(prev => [...prev, newSection]);
//   };

//   const handleSectionUpdate = (id, updatedData) => {
//     const updated = sections?.map(sec => (sec.id === id ? { ...sec, ...updatedData } : sec));
//     setSections(updated);
//   };

//   const handleSectionDelete = (id) => {
//     setSections(prev => prev.filter(sec => sec.id !== id));
//   };

//   const handleSaveChapter = () => {
//     const payload = {
//       chapterId: chapter?.id,
//       title: chapterTitle,
//       sections,
//     };
//     console.log('Saved Chapter:', payload);
//     if (onUpdate) onUpdate(payload);
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       const oldIndex = sections.findIndex(sec => sec.id === active.id);
//       const newIndex = sections.findIndex(sec => sec.id === over.id);
//       setSections(prev => arrayMove(prev, oldIndex, newIndex));
//     }
//   };

//   return (
//     <div className="border rounded p-4 mb-4 bg-white shadow">
//       <div className="flex justify-between items-center mb-3">
//         <input
//           type="text"
//           value={chapterTitle}
//           onChange={(e) => setChapterTitle(e.target.value)}
//           className="text-lg font-semibold border-b p-1 w-2/3"
//           placeholder="Chapter Title"
//         />
//         <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete Chapter</button>
//       </div>

//       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={sections.map(sec => sec.id)} strategy={verticalListSortingStrategy}>
//           {sections.map(section => (
//             <SectionCard
//               key={section.id}
//               section={section}
//               onUpdate={(data) => handleSectionUpdate(section.id, data)}
//               onDelete={() => handleSectionDelete(section.id)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>

//       <div className="flex space-x-4 mt-4">
//         <button onClick={handleAddSection} className="px-3 py-1 bg-blue-500 text-white rounded">+ Add Section</button>
//         <button onClick={handleSaveChapter} className="px-3 py-1 bg-green-500 text-white rounded">Save Chapter</button>
//       </div>
//     </div>
//   );
// };

// export default ChapterCard;


// import React, { useState } from "react";
// import axios from "axios";

// const ChapterCard = ({chapter}) => {
//   const [chapters, setChapters] = useState([
//     {
//       chapter_id: null,
//       chapter_title: "",
//       process_status: "DRAFT",
//       status: "ACTIVE",
//       is_content: true,
//       saved: false,
//       isEditing: false,
//     },
//   ]);

//   const handleAddChapter = (index) => {
//     const newChapter = {
//       chapter_id: null, // Don't hardcode an ID
//       chapter_title: "",
//       process_status: "DRAFT",
//       status: "ACTIVE",
//       is_content: true,
//       saved: false,
//       isEditing: false,
//     };
//     const updated = [...chapters];
//     updated.splice(index + 1, 0, newChapter);
//     setChapters(updated);
//   };

//   const handleChapterChange = (index, field, value) => {
//     const updated = [...chapters];
//     updated[index][field] = value;
//     setChapters(updated);
//   };

//  const handleSaveChapter = (index) => {
//   const updated = [...chapters];
//   const chapterToSave = updated[index];

//   const isUpdate = chapterToSave.chapter_id !== null;

// //   const payload = {
// //     id: chapter?.id,
// //     chapterTitle: chapterToSave.chapter_title,
// //     isContent: chapterToSave.is_content,
// //     sort: index + 1,
// //     processStatus: chapterToSave.process_status.toUpperCase(),
// //     status: chapterToSave.status.toUpperCase(),
// //   };
// const payload = {
//       chapterId: chapter?.id,
//       title: chapterTitle,
//       sections,
//     };

//   if (isUpdate) {
//     // UPDATE request
//     axios
//       .put(
//         `http://localhost:9098/km/article/chapter/${payload.id}/update`,
//         payload
//       )
//       .then((response) => {
//         updated[index] = {
//           ...chapterToSave,
//           saved: true,
//           isEditing: false,
//         };
//         setChapters(updated);
//       })
//       .catch((error) => {
//         console.error("Error updating chapter:", error);
//       });
//   } else {
//     // CREATE request
//     axios
//       .post(`http://localhost:9098/km/${resource_type}/${resource_id}/chapter/create`, payload)
//       .then((response) => {
//         const newId = response.data?.data?.chapterId;
//         updated[index] = {
//           ...chapterToSave,
//           saved: true,
//           isEditing: false,
//           chapter_id: newId,
//         };
//         setChapters(updated);
//       })
//       .catch((error) => {
//         console.error("Error creating chapter:", error);
//       });
//   }
// };


//   const handleEditChapter = (index) => {
//     const updated = [...chapters];
//     updated[index].isEditing = true;
//     setChapters(updated);
//   };

//   const handleDeleteChapter = (index) => {
//     const updated = [...chapters];
//     updated.splice(index, 1);
//     setChapters(updated);
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-xl font-semibold">Chapters</h2>

//       {chapters.map((chapter, cIdx) => (
//         <div
//           key={cIdx}
//           className="border p-4 rounded-md space-y-4 bg-white shadow"
//         >
//           <div className="space-y-2">
//             <label className="block font-medium">Chapter Title</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 className="w-full border px-3 py-2 rounded"
//                 value={chapter.chapter_title}
//                 onChange={(e) =>
//                   handleChapterChange(cIdx, "chapter_title", e.target.value)
//                 }
//                 disabled={chapter.saved && !chapter.isEditing}
//               />

//               {chapter.saved && !chapter.isEditing && (
//                 <>
//                   <button
//                     onClick={() => handleEditChapter(cIdx)}
//                     className="text-blue-600 hover:underline"
//                     title="Edit"
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     onClick={() => handleDeleteChapter(cIdx)}
//                     className="text-red-600 hover:underline"
//                     title="Delete"
//                   >
//                     🗑️
//                   </button>
//                 </>
//               )}
//             </div>

//             {(!chapter.saved || chapter.isEditing) && (
//               <button
//                 onClick={() => handleSaveChapter(cIdx)}
//                 className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
//               >
//                 Save Chapter
//               </button>
//             )}
//           </div>

//           <button
//             onClick={() => handleAddChapter(cIdx)}
//             className="mt-4 px-3 py-1 bg-indigo-600 text-white rounded"
//           >
//             + Add Chapter
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChapterCard;

//Amulya Chapter


// import React, { useState } from "react";
// import axios from "axios";
// const ChapterCard = ({resourceId,resourceType}) => {
//   const [chapters, setChapters] = useState([
//     {
//       id: null,
//       chapterTitle: "",
//       processStatus: "DRAFT",
//       status: "ACTIVE",
//       isContent: true,
//       saved: false,
//       isEditing: false,
//     },
//   ]);
//   const handleAddChapter = (index) => {
//     const newChapter = {
//       id: null,
//       processStatus: "DRAFT",
//       chapterTitle: "",
//       status: "ACTIVE",
//       isContent: true,
//       saved: false,
//       isEditing: false,
//     };
//     const updated = [...chapters];
//     updated.splice(index + 1, 0, newChapter);
//     setChapters(updated);
//   };
//   const handleChapterChange = (index, field, value) => {
//     const updated = [...chapters];
//     updated[index][field] = value;
//     setChapters(updated);
//   };
//  const handleSaveChapter = (index) => {
//   const updated = [...chapters];
//   const chapterToSave = updated[index];
//   const isUpdate = chapterToSave.id !== null;
// const payload = {
//   id: chapterToSave?.id || 1,
//   chapterTitle: chapterToSave.chapterTitle,
//   isContent: chapterToSave.isContent,
//   sort: index + 1,
//   processStatus: chapterToSave.processStatus.toUpperCase(),
//   status: chapterToSave.status.toUpperCase(),
// };
//   if (isUpdate) {
//     // UPDATE request
//     axios
//       .put(
//         `http://localhost:9098/km/article/chapter/${payload.id}/update`,
//         payload
//       )
//       .then((response) => {
//         updated[index] = {
//           ...chapterToSave,
//           saved: true,
//           isEditing: false,
//         };
//         setChapters(updated);
//       })
//       .catch((error) => {
//         console.error("Error updating chapter:", error);
//       });
//   } else {
//     // CREATE request
//     axios
//       .post(`http://localhost:9098/km/${resourceType}/${resourceId}/chapter/create`, payload)
//       .then((response) => {
//         const newId = response.data?.data?.chapterId;
//         updated[index] = {
//           ...chapterToSave,
//           saved: true,
//           isEditing: false,
//           chapter_id: newId,
//         };
//         setChapters(updated);
//       })
//       .catch((error) => {
//         console.error("Error creating chapter:", error);
//       });
//   }
// };
//   const handleEditChapter = (index) => {
//     const updated = [...chapters];
//     updated[index].isEditing = true;
//     setChapters(updated);
//   };
//   const handleDeleteChapter = (index) => {
//     const updated = [...chapters];
//     updated.splice(index, 1);
//     setChapters(updated);
//   };
//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-xl font-semibold">Chapters</h2>
//       {chapters.map((chapter, index) => (
//   <div key={index} className="border p-4 rounded-md space-y-4 bg-white shadow">
//     <div className="space-y-2">
//       <label className="block font-medium">Chapter Title</label>
//       <div className="flex items-center space-x-2">
//         <input
//           className="w-full border px-3 py-2 rounded"
//           value={chapter.chapterTitle}
//           onChange={(e) =>
//             handleChapterChange(index, "chapterTitle", e.target.value)
//           }
//           disabled={chapter.saved && !chapter.isEditing}
//         />
//         {chapter.saved && !chapter.isEditing && (
//           <>
//             <button
//               onClick={() => handleEditChapter(index)}
//               className="text-blue-600 hover:underline"
//               title="Edit"
//             >
//               :pencil2:
//             </button>
//             <button
//               onClick={() => handleDeleteChapter(index)}
//               className="text-red-600 hover:underline"
//               title="Delete"
//             >
//               :wastebasket:
//             </button>
//           </>
//         )}
//       </div>
//       {(!chapter.saved || chapter.isEditing) && (
//         <button
//           onClick={() => handleSaveChapter(index)}
//           className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
//         >
//           Save Chapter
//         </button>
//       )}
//     </div>
//     <button
//       onClick={() => handleAddChapter(index)}
//       className="mt-4 px-3 py-1 bg-indigo-600 text-white rounded"
//     >
//       + Add Chapter
//     </button>
//   </div>
// ))}
//     </div>
//   );
// };
// export default ChapterCard;

// import React, { useState } from 'react';
// import SectionCard from './SectionCard';
// import { DndContext, closestCenter } from '@dnd-kit/core';
// import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { v4 as uuidv4 } from 'uuid';
// import { chapterService } from '../services/kmService'; 

// const ChapterCard = ({ chapter, resourceType, resourceId, sortIndex, onUpdate, onDelete }) => {
//   const [chapterTitle, setChapterTitle] = useState(chapter?.title || 'Untitled Chapter');
//   const [sections, setSections] = useState(chapter?.sections || []);

//   const handleAddSection = () => {
//     const newSection = {
//       id: uuidv4(),
//       section_type: 'text',
//       section_title: '',
//       section_content: '',
//     };
//     setSections(prev => [...prev, newSection]);
//   };

//   const handleSectionUpdate = (id, updatedData) => {
//     const updated = sections.map(sec => (sec.id === id ? { ...sec, ...updatedData } : sec));
//     setSections(updated);
//   };

//   const handleSectionDelete = (id) => {
//     setSections(prev => prev.filter(sec => sec.id !== id));
//   };

//   const handleSaveChapter = () => {

//     const generatedId = chapter?.id || Math.floor(Math.random() * 10000);

//     const payload = {
//     id: generatedId,
//     chapterTitle: chapterTitle,
//     isContent: true,
//     sort: sortIndex + 1,
//     processStatus: "DRAFT",
//     status: "ACTIVE",
//     };

//     if (chapter?.id) {
//       chapterService.update(resourceType, chapter.id, payload)
//         .then(() => onUpdate && onUpdate(payload))
//         .catch(console.error);
//     } else {
//       console.log('Chapter created:', payload);
//       chapterService.create(resourceType, resourceId, { ...payload, id: generatedId })
      
//         .then(res => {
//           const newId = res.data?.data?.chapterId;
//           onUpdate && onUpdate({ ...payload, chapterId: newId });
//         })
//         .catch(console.error);
        
//     }
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over.id) {
//       const oldIndex = sections.findIndex(sec => sec.id === active.id);
//       const newIndex = sections.findIndex(sec => sec.id === over.id);
//       setSections(prev => arrayMove(prev, oldIndex, newIndex));
//     }
//   };

//   return (
//     <div className="border rounded p-4 mb-4 bg-white shadow">
//       <div className="flex justify-between items-center mb-3">
//         <input
//           type="text"
//           value={chapterTitle}
//           onChange={(e) => setChapterTitle(e.target.value)}
//           className="text-lg font-semibold border-b p-1 w-2/3"
//           placeholder="Chapter Title"
//         />
//         <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete Chapter</button>
//       </div>

//       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={sections.map(sec => sec.id)} strategy={verticalListSortingStrategy}>
//           {sections.map(section => (
//             <SectionCard
//               key={section.id}
//               section={section}
//               onUpdate={(data) => handleSectionUpdate(section.id, data)}
//               onDelete={() => handleSectionDelete(section.id)}
//             />
//           ))}
//         </SortableContext>
//       </DndContext>

//       <div className="flex space-x-4 mt-4">
//         <button onClick={handleAddSection} className="px-3 py-1 bg-blue-500 text-white rounded">+ Add Section</button>
//         <button onClick={handleSaveChapter} className="px-3 py-1 bg-green-500 text-white rounded">Save Chapter</button>
//       </div>
//     </div>
//   );
// };

// export default ChapterCard;

//Amulya ChapterCard

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MdEdit, MdOutlineDelete } from 'react-icons/md';
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
// } from '@hello-pangea/dnd';

// const Chaptercard = ({ resourceId, resourceType }) => {
//   const [chapters, setChapters] = useState([]);
//   const [originalOrder, setOriginalOrder] = useState([]);
//   const [chapter, setChapter] = useState({
//     id: null,
//     chapterTitle: '',
//     processStatus: '',
//     sort: 1,
//     status: '',
//     isContent: false,
//   });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const fetchChapters = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:9098/km/${resourceType}/${resourceId}/chapters`
//       );
//       const sorted = (res.data.data || []).sort((a, b) => a.sort - b.sort);
//       setChapters(sorted);
//       setOriginalOrder(sorted);
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
//   }, []);

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(chapters);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     const updated = reordered.map((ch, index) => ({ ...ch, sort: index + 1 }));
//     setChapters(updated);
//     for (const ch of updated) {
//       await axios.put(
//         `http://localhost:9098/km/${resourceType}/chapter/${ch.id}/update`,
//         ch
//       );
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setChapter((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       if (!isEditMode) {
//         chapter.id = 10;
//       }
//       const url = isEditMode
//         ? `http://localhost:9098/km/${resourceType}/chapter/${chapter.id}/update`
//         : `http://localhost:9098/km/${resourceType}/${resourceId}/chapter/create`;
//       const method = isEditMode ? axios.put : axios.post;
//       await method(url, chapter);
//       alert(`${isEditMode ? 'Updated' : 'Created'} successfully`);
//       handleCancel();
//       fetchChapters();
//     } catch (err) {
//       alert('Save failed');
//       console.error(err);
//     }
//   };

//   const handleEdit = (data) => {
//     setChapter(data);
//     setIsEditMode(true);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this chapter?')) {
//       try {
//         await axios.delete(
//           `http://localhost:9098/km/${resourceType}/chapter/${id}`
//         );
//         fetchChapters();
//       } catch (err) {
//         alert('Delete failed');
//         console.error(err);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setChapter({
//       id: null,
//       chapterTitle: '',
//       processStatus: '',
//       sort: 1,
//       status: '',
//       isContent: false,
//     });
//     setShowForm(false);
//     setIsEditMode(false);
//   };

//   const resetToOriginal = async () => {
//     setChapters(originalOrder);
//     for (let i = 0; i < originalOrder.length; i++) {
//       const updated = { ...originalOrder[i], sort: i + 1 };
//       await axios.put(
//         `http://localhost:9098/km/${resourceType}/chapter/${updated.id}/update`,
//         updated
//       );
//     }
//     alert('Chapters reset to original order');
//   };

//   return (
//     <div className="p-4 w-full max-w-full">
//       <h2 className="text-lg font-bold mb-4">Chapters</h2>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="chapterList">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="flex flex-col gap-2"
//             >
//               {chapters.map((ch, index) => (
//                 <Draggable key={ch.id} draggableId={String(ch.id)} index={index}>
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="bg-white p-3 rounded shadow flex justify-between items-center w-full"
//                     >
//                       <span className="truncate max-w-xs">{ch.chapterTitle}</span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEdit(ch)}
//                           className="text-lg text-green-600 hover:text-green-800"
//                         >
//                           <MdEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(ch.id)}
//                           className="text-lg text-red-600 hover:text-red-800"
//                         >
//                           <MdOutlineDelete />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <div className="flex gap-6 mt-3">
//         <button
//           className="bg-blue-600 text-sm text-white px-2 py-0 rounded"
//           onClick={() => {
//             setShowForm(true);
//             setIsEditMode(false);
//             setChapter({
//               id: null,
//               chapterTitle: '',
//               processStatus: '',
//               sort: chapters.length + 1,
//               status: '',
//               isContent: false,
//             });
//           }}
//         >
//           Add Chapter
//         </button>
//         <button
//           className="bg-gray-700 text-sm text-white px-2 py-1 rounded"
//           onClick={resetToOriginal}
//         >
//           Reset Order
//         </button>
//       </div>

//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[9999]">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl mb-4">{isEditMode ? 'Edit' : 'Add'} Chapter</h2>
//             <div className="mb-3">
//               <label>Title:</label>
//               <input
//                 type="text"
//                 name="chapterTitle"
//                 value={chapter.chapterTitle}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div className="mb-3">
//               <label>Process Status:</label>
//               <input
//                 type="text"
//                 name="processStatus"
//                 value={chapter.processStatus}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div className="mb-3">
//               <label>Status:</label>
//               <input
//                 type="text"
//                 name="status"
//                 value={chapter.status}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   name="isContent"
//                   checked={chapter.isContent}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Is Content
//               </label>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={handleSave}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 {isEditMode ? 'Update' : 'Save'}
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-400 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chaptercard;


// import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
// import { MdEdit, MdOutlineDelete } from 'react-icons/md';
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
// } from '@hello-pangea/dnd';
// import SectionCard from './SectionCard';

// const Chaptercard = ({ resourceId, resourceType, onChaptersChange }) => {
//   const [chapters, setChapters] = useState([]);
//   const [originalOrder, setOriginalOrder] = useState([]);
//   const [chapter, setChapter] = useState({
//     id: null,
//     chapterTitle: '',
//     processStatus: '',
//     sort: 1,
//     status: '',
//     isContent: false,
//   });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const [activeChapterId, setActiveChapterId] = useState(null);
//   const [sections, setSections] = useState([]);

//   const fetchChapters = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:9098/km/${resourceType}/${resourceId}/chapters`
//       );
//       const sorted = (res.data.data || []).sort((a, b) => a.sort - b.sort);
//       setChapters(sorted);
//       setOriginalOrder(sorted);
//       if (typeof onChaptersChange === 'function') onChaptersChange(sorted);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setChapters([]);
//       setOriginalOrder([]);
//       if (typeof onChaptersChange === 'function') onChaptersChange([]);
//     }
//   };

//   // 🆕 CHANGE: Fetch sections for a chapter
//   const fetchSections = async (chapterId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:9098/km/${resourceType}/chapter/${chapterId}/sections`
//       );
//       setSections(res.data.data || []);
//     } catch (err) {
//       console.error('Error fetching sections:', err);
//       setSections([]);
//     }
//   };

//   // 🆕 CHANGE: Toggle chapter & fetch sections
//   const handleChapterClick = (chapterId) => {
//     if (activeChapterId === chapterId) {
//       setActiveChapterId(null);
//       setSections([]);
//     } else {
//       setActiveChapterId(chapterId);
//       fetchSections(chapterId);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [resourceId, resourceType]);

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const reordered = Array.from(chapters);
//     const [moved] = reordered.splice(result.source.index, 1);
//     reordered.splice(result.destination.index, 0, moved);
//     const updated = reordered.map((ch, index) => ({ ...ch, sort: index + 1 }));
//     setChapters(updated);
//     for (const ch of updated) {
//       await axios.put(
//         `http://localhost:9098/km/${resourceType}/chapter/${ch.id}/update`,
//         ch
//       );
//     }
//     if (typeof onChaptersChange === 'function') onChaptersChange(updated);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setChapter((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSave = async () => {
//   try {
//     if (isEditMode) {
//       // Update existing chapter
//       await axios.put(
//         `http://localhost:9098/km/${resourceType}/chapter/${chapter.id}/update`,
//         chapter
//       );
//       alert(`Chapter updated (ID ${chapter.id})`);
//     } else {
//       // Generate a random ID for the new chapter
//       const generatedId = Math.floor(Math.random() * 10000);

//       // Immediately set it so it can be used for sections right after save
//       const newChapter = { ...chapter, id: generatedId };

//       await axios.post(
//         `http://localhost:9098/km/${resourceType}/${resourceId}/chapter/create`,
//         newChapter
//       );

//       setChapter(newChapter); // store locally
//       alert(`Chapter created (ID ${generatedId})`);
//     }

//     handleCancel();
//     await fetchChapters();
//   } catch (err) {
//     alert("Save failed");
//     console.error(err);
//   }
// };

// const handleEdit = (data) => {
//   if (!data.id) {
//     alert("This chapter has no ID — cannot edit or add sections.");
//     return;
//   }
//   setChapter(data);
//   setIsEditMode(true);
//   setShowForm(true);
// };


//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this chapter?')) {
//       try {
//         await axios.delete(
//           `http://localhost:9098/km/${resourceType}/chapter/${id}`
//         );
//         await fetchChapters();
//       } catch (err) {
//         alert('Delete failed');
//         console.error(err);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setChapter({
//       id: null,
//       chapterTitle: '',
//       processStatus: '',
//       sort: 1,
//       status: '',
//       isContent: false,
//     });
//     setShowForm(false);
//     setIsEditMode(false);
//   };

//   const resetToOriginal = async () => {
//     setChapters(originalOrder);
//     for (let i = 0; i < originalOrder.length; i++) {
//       const updated = { ...originalOrder[i], sort: i + 1 };
//       await axios.put(
//         `http://localhost:9098/km/${resourceType}/chapter/${updated.id}/update`,
//         updated
//       );
//     }
//     await fetchChapters();
//     alert('Chapters reset to original order');
//   };

//   const handleSectionSave = async (payload) => {
//     try {
//       if (payload.section_id) {
//         await axios.put(
//           `http://localhost:9098/km/${resourceType}/section/${payload.section_id}/update`,
//           payload
//         );
//       } else {
//         const generatedId = Math.floor(Math.random() * 10000);
//         await axios.post(
//           `http://localhost:9098/km/${resourceType}/chapter/${activeChapterId}/section/create`,
//           { ...payload, section_id: generatedId }
//         );
//       }
//       await fetchSections(activeChapterId);
//     } catch (err) {
//       console.error("Save section failed:", err);
//     }
//   };

//   const handleSectionDelete = async (sectionId) => {
//     try {
//       await axios.delete(
//         `http://localhost:9098/km/${resourceType}/section/${sectionId}`
//       );
//       await fetchSections(activeChapterId);
//     } catch (err) {
//       console.error("Delete section failed:", err);
//     }
//   };

//   // Modal portal renderer
//   const renderModal = () => {
//     if (!showForm) return null;
//     return ReactDOM.createPortal(
//       <div
//         className="fixed inset-0 bg-black/50 flex justify-center items-center"
//         style={{ zIndex: 99999 }}
//         onMouseDown={(e) => {
//           // click outside closes
//           if (e.target === e.currentTarget) handleCancel();
//         }}
//       >
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-xl mb-4">{isEditMode ? 'Edit' : 'Add'} Chapter</h2>
//           <div className="mb-3">
//             <label>Title:</label>
//             <input
//               type="text"
//               name="chapterTitle"
//               value={chapter.chapterTitle}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div className="mb-3">
//             <label>Process Status:</label>
//             <input
//               type="text"
//               name="processStatus"
//               value={chapter.processStatus}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div className="mb-3">
//             <label>Status:</label>
//             <input
//               type="text"
//               name="status"
//               value={chapter.status}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 name="isContent"
//                 checked={chapter.isContent}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               Is Content
//             </label>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={handleSave}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               {isEditMode ? 'Update' : 'Save'}
//             </button>
//             <button
//               onClick={handleCancel}
//               className="bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>,
//       document.body
//     );
//   };

//   return (
//     <div className="p-4 w-full max-w-full">
//       {/* <h2 className="text-lg font-bold mb-4">Chapters</h2> */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Droppable droppableId="chapterList">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="flex flex-col gap-2"
//             >
//               {chapters.map((ch, index) => (
//                 <Draggable key={ch.id} draggableId={String(ch.id)} index={index}>
//                   {(providedDr) => (
//                     <div
//                       ref={providedDr.innerRef}
//                       {...providedDr.draggableProps}
//                       {...providedDr.dragHandleProps}
//                       className="bg-white p-3 rounded shadow w-full"
//                     >
//                       <div
//                         className="flex justify-between items-center cursor-pointer"
//                         onClick={() => handleChapterClick(ch.id)} // 🆕 CHANGE
//                       >
//                         <span className="truncate max-w-xs">{ch.chapterTitle}</span>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleEdit(ch);
//                             }}
//                             className="text-lg text-green-600 hover:text-green-800"
//                           >
//                             <MdEdit />
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(ch.id);
//                             }}
//                             className="text-lg text-red-600 hover:text-red-800"
//                           >
//                             <MdOutlineDelete />
//                           </button>
//                         </div>
//                       </div>

//                       {/* 🆕 CHANGE: Section list under active chapter */}
//                       {activeChapterId === ch.id && (
//                         <div className="mt-3 pl-4 border-l">
//                           {sections.map((sec) => (
//                             <SectionCard
//                               key={sec.section_id}
//                               sectionId={sec.section_id}
//                               sectionData={sec}
//                               onSave={handleSectionSave}
//                               onDelete={() => handleSectionDelete(sec.section_id)}
//                             />
//                           ))}

//                           <button
//                             onClick={() =>
//                               handleSectionSave({
//                                 section_title: '',
//                                 section_content: {},
//                               })
//                             }
//                             className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
//                           >
//                             + Add Section
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       <div className="flex gap-6 mt-3">
//         <button
//           className="bg-blue-600 text-sm text-white px-2 py-0 rounded"
//           onClick={() => {
//             setShowForm(true);
//             setIsEditMode(false);
//             setChapter({
//               id: null,
//               chapterTitle: '',
//               processStatus: '',
//               sort: chapters.length + 1,
//               status: '',
//               isContent: false,
//             });
//           }}
//         >
//           Add Chapter
//         </button>
//         <button
//           className="bg-gray-700 text-sm text-white px-2 py-1 rounded"
//           onClick={resetToOriginal}
//         >
//           Reset Order
//         </button>
//       </div>

//       {renderModal()}
//     </div>
//   );
// };

// export default Chaptercard;

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { MdEdit, MdOutlineDelete } from 'react-icons/md';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd';

const ChapterCard = ({ resourceId, resourceType, onChaptersChange, onSelectChapter }) => {
  const [chapters, setChapters] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);
  const [chapter, setChapter] = useState({
    id: null,
    chapterTitle: '',
    processStatus: '',
    sort: 1,
    status: '',
    isContent: false,
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchChapters = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9098/km/${resourceType}/${resourceId}/chapters`
      );
      const sorted = (res.data.data || []).sort((a, b) => a.sort - b.sort);
      setChapters(sorted);
      setOriginalOrder(sorted);
      if (typeof onChaptersChange === 'function') onChaptersChange(sorted);
    } catch (err) {
      console.error('Fetch error:', err);
      setChapters([]);
      setOriginalOrder([]);
      if (typeof onChaptersChange === 'function') onChaptersChange([]);
    }
  };

  useEffect(() => {
    if (resourceId) fetchChapters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceId, resourceType]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const reordered = Array.from(chapters);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    const updated = reordered.map((ch, index) => ({ ...ch, sort: index + 1 }));
    setChapters(updated);
    for (const ch of updated) {
      await axios.put(
        `http://localhost:9098/km/${resourceType}/chapter/${ch.id}/update`,
        ch
      );
    }
    if (typeof onChaptersChange === 'function') onChaptersChange(updated);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setChapter((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:9098/km/${resourceType}/chapter/${chapter.id}/update`,
          chapter
        );
        alert(`Chapter updated (ID ${chapter.id})`);
      } else {
        const generatedId = Math.floor(Math.random() * 10000);
        const newChapter = { ...chapter, id: generatedId };
        console.log('Creating chapter:', newChapter);
        await axios.post(
          `http://localhost:9098/km/${resourceType}/${resourceId}/chapter/create`,
          newChapter
        );
        setChapter(newChapter);
        alert(`Chapter created (ID ${generatedId})`);
      }

      handleCancel();
      await fetchChapters();
    } catch (err) {
      alert("Save failed");
      console.error(err);
    }
  };

  const handleEdit = (data) => {
    if (!data.id) {
      alert("This chapter has no ID — cannot edit or add sections.");
      return;
    }
    setChapter(data);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this chapter?')) {
      try {
        await axios.delete(
          `http://localhost:9098/km/${resourceType}/chapter/${id}`
        );
        await fetchChapters();
      } catch (err) {
        alert('Delete failed');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setChapter({
      id: null,
      chapterTitle: '',
      processStatus: '',
      sort: 1,
      status: '',
      isContent: false,
    });
    setShowForm(false);
    setIsEditMode(false);
  };

  const resetToOriginal = async () => {
    setChapters(originalOrder);
    for (let i = 0; i < originalOrder.length; i++) {
      const updated = { ...originalOrder[i], sort: i + 1 };
      await axios.put(
        `http://localhost:9098/km/${resourceType}/chapter/${updated.id}/update`,
        updated
      );
    }
    await fetchChapters();
    alert('Chapters reset to original order');
  };

  // Modal portal renderer
  const renderModal = () => {
    if (!showForm) return null;
    return ReactDOM.createPortal(
      <div
        className="fixed inset-0 bg-black/50 flex justify-center items-center"
        style={{ zIndex: 99999 }}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) handleCancel();
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl mb-4">{isEditMode ? 'Edit' : 'Add'} Chapter</h2>
          <div className="mb-3">
            <label>Title:</label>
            <input
              type="text"
              name="chapterTitle"
              value={chapter.chapterTitle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label>Process Status:</label>
            <input
              type="text"
              name="processStatus"
              value={chapter.processStatus}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-3">
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={chapter.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isContent"
                checked={chapter.isContent}
                onChange={handleChange}
                className="mr-2"
              />
              Is Content
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {isEditMode ? 'Update' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="p-4 w-full max-w-full">
      <h2 className="text-lg font-bold mb-4">Chapters</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="chapterList">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-2"
            >
              {chapters.map((ch, index) => (
                <Draggable key={ch.id} draggableId={String(ch.id)} index={index}>
                  {(providedDr) => (
                    <div
                      ref={providedDr.innerRef}
                      {...providedDr.draggableProps}
                      {...providedDr.dragHandleProps}
                      onClick={() => onSelectChapter?.(ch.id)}
                      className="bg-white p-3 rounded shadow flex justify-between items-center w-full cursor-pointer"
                    >
                      <span className="truncate max-w-xs">{ch.chapterTitle}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEdit(ch); }}
                          className="text-lg text-green-600 hover:text-green-800"
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(ch.id); }}
                          className="text-lg text-red-600 hover:text-red-800"
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex gap-6 mt-3">
        <button
          className="bg-blue-600 text-sm text-white px-2 py-0 rounded"
          onClick={() => {
            setShowForm(true);
            setIsEditMode(false);
            setChapter({
              id: null,
              chapterTitle: '',
              processStatus: '',
              sort: chapters.length + 1,
              status: '',
              isContent: false,
            });
          }}
        >
          Add Chapter
        </button>
        <button
          className="bg-gray-700 text-sm text-white px-2 py-1 rounded"
          onClick={resetToOriginal}
        >
          Reset Order
        </button>
      </div>

      {renderModal()}
    </div>
  );
};

export default ChapterCard;

