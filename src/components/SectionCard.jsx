// import React, { useState } from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import EditorSection from './EditorSection';

// function SectionCard({ sectionId, sectionData, onSave, onDelete }) {
//   const [sectionTitle, setSectionTitle] = useState(sectionData?.section_title || '');
//   const [sectionType, setSectionType] = useState(sectionData?.section_type || 'text');
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [linkUrl, setLinkUrl] = useState(''); // NEW
//   const [isSaving, setIsSaving] = useState(false);

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sectionId });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newFiles = files.map(file => ({
//       file,
//       previewUrl: URL.createObjectURL(file),
//     }));
//     setUploadedFiles(prev => [...prev, ...newFiles]);
//   };

//   const handleFileRemove = (index) => {
//     setUploadedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleEditorSave = async (content) => {
//     setIsSaving(true);
//     try {
//       const filesMeta = uploadedFiles.map((f, index) => ({
//         file_name: f.file.name,
//         file_size: f.file.size,
//         file_type: f.file.type.split('/')[0],
//         mime_type: f.file.type,
//         sort: index  1,
//         base_url: '',
//         path_url: f.previewUrl,
//       }));

//       const payload = {
//         section_id: sectionId,
//         section_title: sectionTitle,
//         section_type: sectionType,
//         section_content: sectionType === 'text' ? content :
//                          sectionType === 'link' ? linkUrl : null,
//         files: (sectionType === 'image' || sectionType === 'video') ? filesMeta : [],
//       };

//       onSave(payload);
//       alert('Section saved');
//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded p-4 mb-4 space-y-4 bg-white shadow"
//     >
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={sectionTitle}
//           onChange={(e) => setSectionTitle(e.target.value)}
//           placeholder="Section Title"
//           className="border p-2 rounded w-full"
//         />
//         <select
//           value={sectionType}
//           onChange={(e) => setSectionType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="text">Text</option>
//           <option value="image/video">Image/Video</option>
//           {/* <option value="video">Video</option> */}
//           <option value="link">Link</option>
//         </select>
//       </div>

//       {/* Conditionally render based on sectionType */}
//       {/* Show Editor only for TEXT */}
// {sectionType === 'text' && (
//   <div className="relative border p-2 rounded bg-white min-h-[100px] max-h-[300px] overflow-auto">
//     <EditorSection data={sectionData?.section_content} onSave={handleEditorSave} />
//   </div>
// )}

// {/* Show Upload for TEXT or IMAGE/VIDEO */}
// {sectionType === 'text' || sectionType === 'image/video' ? (
//   <div>
//     <label className="block font-medium mb-1">
//       Upload Files (Image/Video)
//     </label>
//     <input
//       type="file"
//       multiple
//       accept="image/*,video/*"
//       onChange={handleFileChange}
//     />
//     <div className="mt-2 space-y-2">
//       {uploadedFiles.map((fileObj, idx) => (
//         <div key={idx} className="flex items-center justify-between border p-2 rounded">
//           <span>{fileObj.file.name}</span>
//           <button
//             onClick={() => handleFileRemove(idx)}
//             className="text-red-500 text-sm"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   </div>
// ) : null}

// {/* Show Link Input for TEXT or LINK */}
// {sectionType === 'text' || sectionType === 'link' ? (
//   <div>
//     <label className="block font-medium mb-1">Enter Link URL</label>
//     <input
//       type="url"
//       value={linkUrl}
//       onChange={(e) => setLinkUrl(e.target.value)}
//       className="border p-2 rounded w-full"
//     />
//   </div>
// ) : null}


//       <div className="flex space-x-4">
//         <button
//           onClick={() => handleEditorSave(sectionData?.section_content)}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         <button
//           onClick={onDelete}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SectionCard;


// import React, { useState, useRef } from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import EditorSection from './EditorSection';

// function SectionCard({ sectionId, sectionData, onSave, onDelete }) {
//   const [sectionTitle, setSectionTitle] = useState(sectionData?.section_title || '');
//   const [sectionType, setSectionType] = useState(sectionData?.section_type || 'text');
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [linkUrl, setLinkUrl] = useState('');
//   const [isSaving, setIsSaving] = useState(false);
//   const editorRef = useRef(null);  // For accessing save()

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sectionId });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newFiles = files.map(file => ({
//       file,
//       previewUrl: URL.createObjectURL(file),
//     }));
//     setUploadedFiles(prev => [...prev, ...newFiles]);
//   };

//   const handleFileRemove = (index) => {
//     setUploadedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSaveClick = async () => {
//     setIsSaving(true);
//     try {
//       let content = null;

//       if (sectionType === 'text' && editorRef.current) {
//         content = await editorRef.current.save();
//       } else if (sectionType === 'link') {
//         content = linkUrl;
//       }

//       const filesMeta = uploadedFiles.map((f, index) => ({
//         file_name: f.file.name,
//         file_size: f.file.size,
//         file_type: f.file.type.split('/')[0],
//         mime_type: f.file.type,
//         sort: index  1,
//         base_url: '',
//         path_url: f.previewUrl,
//       }));

//       const payload = {
//         section_id: sectionId,
//         section_title: sectionTitle,
//         section_type: sectionType,
//         section_content: content,
//         files: sectionType === 'image/video' || sectionType === 'text' ? filesMeta : [],
//       };

//       onSave(payload);
//       alert('Section saved');
//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded p-4 mb-4 space-y-4 bg-white shadow"
//     >
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={sectionTitle}
//           onChange={(e) => setSectionTitle(e.target.value)}
//           placeholder="Section Title"
//           className="border p-2 rounded w-full"
//         />
//         <select
//           value={sectionType}
//           onChange={(e) => setSectionType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="text">Text</option>
//           <option value="image/video">Image/Video</option>
//           <option value="link">Link</option>
//         </select>
//       </div>

//       {sectionType === 'text' && (
//         <div className="relative border p-2 rounded bg-white min-h-[100px] max-h-[300px] overflow-auto">
//           <EditorSection ref={editorRef} data={sectionData?.section_content} />
//         </div>
//       )}

//       {(sectionType === 'text' || sectionType === 'image/video') && (
//         <div>
//           <label className="block font-medium mb-1">
//             Upload Files (Image/Video)
//           </label>
//           <input
//             type="file"
//             multiple
//             accept="image/*,video/*"
//             onChange={handleFileChange}
//           />
//           <div className="mt-2 space-y-2">
//             {uploadedFiles.map((fileObj, idx) => (
//               <div key={idx} className="flex items-center justify-between border p-2 rounded">
//                 <span>{fileObj.file.name}</span>
//                 <button
//                   onClick={() => handleFileRemove(idx)}
//                   className="text-red-500 text-sm"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {(sectionType === 'text' || sectionType === 'link') && (
//         <div>
//           <label className="block font-medium mb-1">Enter Link URL</label>
//           <input
//             type="url"
//             value={linkUrl}
//             onChange={(e) => setLinkUrl(e.target.value)}
//             className="border p-2 rounded w-full"
//           />
//         </div>
//       )}

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         <button
//           onClick={onDelete}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Section
//         </button> 
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef } from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import EditorSection from './EditorSection';

// function SectionCard({ sectionId, sectionData, onSave, onDelete }) {
//   const [sectionTitle, setSectionTitle] = useState(sectionData?.section_title || '');
//   const [isSaving, setIsSaving] = useState(false);
//   const editorRef = useRef(null);

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sectionId });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleSaveClick = async () => {
//     setIsSaving(true);
//     try {
//       const content = await editorRef.current?.save();

//       const payload = {
//         section_id: sectionId,
//         section_title: sectionTitle,
//         section_type: 'text',  // fixed as everything is now inside Editor.js
//         section_content: content,
//         files: [],  // No manual upload anymore; images handled inside Editor.js
//       };

//       onSave(payload);
//       alert('Section saved');
//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded p-4 mb-4 space-y-4 bg-white shadow"
//     >
//       <input
//         type="text"
//         value={sectionTitle}
//         onChange={(e) => setSectionTitle(e.target.value)}
//         placeholder="Section Title"
//         className="border p-2 rounded w-full"
//       />

//       <div className="relative p-2 bg-white h-fit overflow-auto z-10">
//         <EditorSection ref={editorRef} data={sectionData?.section_content} />
//       </div>

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         <button
//           onClick={onDelete}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef, forwardRef } from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import EditorSection from './EditorSection';

// function SectionCard({ sectionId, sectionData = {}, onSave, onDelete }) {
//   const [sectionTitle, setSectionTitle] = useState(sectionData.section_title || '');
//   const [isSaving, setIsSaving] = useState(false);
//   const editorRef = useRef(null);

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sectionId });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleSaveClick = async () => {
//     setIsSaving(true);
//     try {
//       const content = await editorRef.current?.save();

//       const payload = {
//         section_id: sectionId,
//         section_title: sectionTitle,
//         section_type: 'text', // fixed since all content is Editor.js now
//         section_content: content || {},
//         files: [], // handled inside Editor.js now
//       };

//       if (typeof onSave === 'function') {
//         await onSave(payload);
//       }

//       alert('Section saved');
//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded p-4 mb-4 space-y-4 bg-white shadow"
//     >
//       {/* Section title */}
//       <input
//         type="text"
//         value={sectionTitle}
//         onChange={(e) => setSectionTitle(e.target.value)}
//         placeholder="Section Title"
//         className="border p-2 rounded w-full"
//       />

//       {/* Editor.js instance */}
//       <div className="relative p-2 bg-white h-fit overflow-auto z-10">
//         <EditorSection ref={editorRef} data={sectionData.section_content || {}} />
//       </div>

//       {/* Actions */}
//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         <button
//           onClick={() => onDelete?.(sectionId)}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import EditorSection from './EditorSection';

// function SectionCard({
//   sectionId,
//   sectionData = {},
//   onSaved,         // parent callback after successful create/update, receives saved section object
//   onCreated,       // same as onSaved (keeps naming clarity)
//   onDeleted,       // parent callback after successful delete, receives section_id
//   onDelete,        // optional parent-provided delete handler (backwards-compatible)
//   resourceType,    // e.g. 'article'
//   chapterId,       // required for creating a new section under a chapter
// }) {
//   const tempId = sectionId || sectionData.section_id || `temp-${Date.now()}`;
//   const [localId, setLocalId] = useState(tempId);
//   const [sectionTitle, setSectionTitle] = useState(sectionData.section_title || '');
//   const [isSaving, setIsSaving] = useState(false);
//   const editorRef = useRef(null);

//   useEffect(() => {
//     setSectionTitle(sectionData.section_title || '');
//     setLocalId(sectionData.section_id || sectionId || tempId);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sectionData.section_id, sectionData.section_title, sectionId]);

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: localId });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const saveToServer = async (payload) => {
//     // payload should contain section_id when updating; for create it might be temp id
//     try {
//       if (!resourceType || !chapterId) {
//         // no resource/chapter info — try to delegate to parent
//         if (typeof onSaved === 'function') {
//           await onSaved(payload);
//         }
//         return payload;
//       }

//       // Determine create vs update:
//       const isTemp = String(payload.section_id || '').startsWith('temp-') || !payload.section_id;

//       if (isTemp) {
//         // CREATE
//         const url = `http://localhost:9098/km/${resourceType}/chapter/${chapterId}/section/create`;
//         const res = await axios.post(url, payload);
//         const created = res?.data?.data || res?.data || null;
//         return created;
//       } else {
//         // UPDATE
//         const url = `http://localhost:9098/km/${resourceType}/section/${payload.section_id}/update`;
//         const res = await axios.put(url, payload);
//         const updated = res?.data?.data || res?.data || null;
//         return updated || payload;
//       }
//     } catch (err) {
//       console.error('Section save to server failed', err);
//       throw err;
//     }
//   };

//   const handleSaveClick = async () => {
//     setIsSaving(true);
//     try {
//       const content = await editorRef.current?.save();
//       const payload = {
//         section_id: localId,
//         section_title: sectionTitle,
//         section_type: 'text',
//         section_content: content || {},
//         files: [],
//       };

//       // If parent provided an onSaved handler, prefer to delegate.
//       // Otherwise, SectionCard will attempt to call the API directly (if resourceType & chapterId provided).
//       let saved;
//       if (typeof onSaved === 'function') {
//         saved = await onSaved(payload);
//         // If parent returned the saved object, adopt it
//         if (saved && saved.section_id) {
//           setLocalId(saved.section_id);
//           onCreated?.(saved);
//         }
//       } else {
//         saved = await saveToServer(payload);
//         if (saved) {
//           // when SectionCard itself created/updated the section, notify parent
//           onCreated?.(saved);
//           onSaved?.(saved);
//           if (saved.section_id) setLocalId(saved.section_id);
//         }
//       }

//       alert('Section saved');
//       return saved;
//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//       throw err;
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteClick = async () => {
//     // If parent passed onDelete (explicit), call it.
//     if (typeof onDelete === 'function') {
//       onDelete(localId);
//       return;
//     }

//     // Otherwise try server-side delete if we have non-temp id & resourceType
//     try {
//       const isTemp = String(localId).startsWith('temp-');
//       if (!isTemp && resourceType) {
//         await axios.delete(`http://localhost:9098/km/${resourceType}/section/${localId}`);
//       }
//       onDeleted?.(localId);
//     } catch (err) {
//       console.error('Delete failed:', err);
//       alert('Error deleting section');
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded p-4 mb-4 space-y-4 bg-white shadow"
//     >
//       <div className="flex justify-between items-center">
//         <input
//           type="text"
//           value={sectionTitle}
//           onChange={(e) => setSectionTitle(e.target.value)}
//           placeholder="Section Title"
//           className="border p-2 rounded w-full mr-4"
//         />
//         {/* show small badge for unsaved temp sections */}
//         {String(localId).startsWith('temp-') && (
//           <span className="text-xs text-gray-500 ml-2">unsaved</span>
//         )}
//       </div>

//       {/* <div className="relative p-2 bg-white h-fit overflow-auto z-10">
//         <EditorSection ref={editorRef} data={sectionData.section_content || {}} />
//       </div> */}

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         <button
//           onClick={handleDeleteClick}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// function SectionCard({
//   sectionData = {},
//   resourceType,  // e.g. 'article'
//   chapterId,     // required for creation
//   onSaved,       // callback after save
//   onDeleted      // callback after delete
// }) {
//   const [sectionId, setSectionId] = useState(sectionData.section_id || null);
//   const [sectionTitle, setSectionTitle] = useState(sectionData.section_title || '');
//   const [isSaving, setIsSaving] = useState(false);

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sectionId || Math.random() });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleSaveClick = async () => {
//     if (!resourceType || !chapterId) {
//       alert("Missing resourceType or chapterId");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const payload = {
//         section_id: sectionId || Math.floor(Math.random() * 10000),
//         section_title: sectionTitle,
//         section_type: 'text',
//         section_content: {}, // EditorSection is disabled for now
//         files: []
//       };

//       let res;
//       if (sectionId) {
//         // UPDATE
//         res = await axios.put(
//           `http://localhost:9098/km/${resourceType}/section/${sectionId}/update`,
//           payload
//         );
//         alert(`Section updated (ID ${sectionId})`);
//       } else {
//         // CREATE
//         res = await axios.post(
//           `http://localhost:9098/km/${resourceType}/chapter/${chapterId}/section/create`,
//           payload
//         );
//         const created = res?.data?.data || res?.data;
//         if (created?.section_id) {
//           setSectionId(created.section_id);
//         }
//         alert(`Section created (ID ${created?.section_id || payload.section_id})`);
//       }

//       if (typeof onSaved === 'function') {
//         onSaved(res?.data?.data || res?.data || payload);
//       }

//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteClick = async () => {
//     try {
//       if (sectionId) {
//         await axios.delete(`http://localhost:9098/km/${resourceType}/section/${sectionId}`);
//       }
//       if (typeof onDeleted === 'function') {
//         onDeleted(sectionId);
//       }
//       alert(`Section deleted (ID ${sectionId || 'temp'})`);
//     } catch (err) {
//       console.error('Delete failed:', err);
//       alert('Error deleting section');
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded p-4 mb-4 space-y-4 bg-white shadow"
//     >
//       <input
//         type="text"
//         value={sectionTitle}
//         onChange={(e) => setSectionTitle(e.target.value)}
//         placeholder="Section Title"
//         className="border p-2 rounded w-full"
//       />

//       {/* EditorSection will come later */}

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         <button
//           onClick={handleDeleteClick}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// function SectionCard({
//   sectionData = {},
//   resourceType, // e.g. 'article'
//   chapterId, // required for creation
//   onSaved, // callback after save
//   onDeleted // callback after delete
// }) {
//   // Use a ref to store a stable ID for new sections that haven't been saved yet.
//   // This prevents the dnd-kit hook from causing a re-render loop.
//   const newIdRef = useRef(Math.random());
  
//   const [sectionId, setSectionId] = useState(sectionData.id || null);
//   const [sectionTitle, setSectionTitle] = useState(sectionData.sectionTitle || '');
//   const [isSaving, setIsSaving] = useState(false);

//   // The ID for the sortable hook is now stable.
//   // It uses the existing sectionId, or a stable ref ID if it's a new section.
//   const sortableId = sectionId || newIdRef.current;

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sortableId });
  
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const handleSaveClick = async () => {
//     if (!resourceType || !chapterId) {
//       alert("Missing resourceType or chapterId");
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const payload = {
//         id: sectionId || Math.floor(Math.random() * 10000),
//         sectionTitle: sectionTitle,
//         sectionType: 'text',
//         sectionContent: null, // EditorSection is disabled for now
//         processStatus: 'DRAFT',
//         status: 'ACTIVE',
//         isVersion: false,
//         isLatest: false
//       };

//       let res;
//       if (sectionId) {
//         // UPDATE
//         res = await axios.put(
//           `http://localhost:9098/km/${resourceType}/section/${sectionId}/update`,
//           payload
//         );
//         alert(`Section updated (ID ${sectionId})`);
//       } else {
//         // CREATE
//         console.log('Payload for new section:', payload);
//         res = await axios.post(
//           `http://localhost:9098/km/${resourceType}/chapter/${chapterId}/section/create`,
//           payload
//         );
//         console.log('Section created response:', res);
//         const created = res?.data?.data || res?.data;
//         if (created?.sectionId) {
//           setSectionId(created.sectionId);
//         }
//         alert(`Section created (ID ${created?.sectionId || payload.sectionId})`);
//       }

//       if (typeof onSaved === 'function') {
//         onSaved(res?.data?.data || res?.data || payload);
//       }

//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteClick = async () => {
//     try {
//       if (sectionId) {
//         await axios.delete(`http://localhost:9098/km/${resourceType}/section/${sectionId}`);
//       }
//       if (typeof onDeleted === 'function') {
//         onDeleted(sectionId);
//       }
//       alert(`Section deleted (ID ${sectionId })`);
//     } catch (err) {
//       console.error('Delete failed:', err);
//       alert('Error deleting section');
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded p-4 mb-4 space-y-4 bg-white shadow"
//     >
//       <input
//         type="text"
//         value={sectionTitle}
//         onChange={(e) => setSectionTitle(e.target.value)}
//         placeholder="Section Title"
//         className="border p-2 rounded w-full"
//       />

//       {/* EditorSection will come later */}
//        {/* <div className="relative p-2 bg-white h-fit overflow-auto z-10">
// //         <EditorSection ref={editorRef} data={sectionData.section_content || {}} />
// //       </div> */}

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         <button
//           onClick={handleDeleteClick}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Delete Section
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { sectionService } from '../services/kmService';
// // import EditorSection from './EditorSection';

// function SectionCard({
//   sectionData = {},
//   resourceType, // e.g. 'article'
//   chapterId, // required for creation
//   onSaved, // callback after save
//   onDeleted // callback after delete
// }) {
//   // Use a ref to store a stable ID for new sections that haven't been saved yet.
//   // This prevents the dnd-kit hook from causing a re-render loop.
//   const newIdRef = useRef(Math.random());
  
//   const [sectionId, setSectionId] = useState(sectionData.id || null);
//   const [sectionTitle, setSectionTitle] = useState(sectionData.sectionTitle || '');
//   const [sectionType, setSectionType] = useState(sectionData.sectionType || 'text');
//   const [isSaving, setIsSaving] = useState(false);

//   // The ID for the sortable hook is now stable.
//   // It uses the existing sectionId, or a stable ref ID if it's a new section.
//   const sectionContentRef = useRef(null);

//   const sortableId = sectionId || newIdRef.current;

//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sortableId });
  
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   // const renderSectionContent = () => {
//   //   // The EditorSection is now smart enough to handle different types.
//   //   // We just pass the selected sectionType to it.
//   //   return <EditorSection ref={sectionContentRef} data={sectionData.sectionContent || null} sectionType={sectionType} />;
//   // };


//   const handleSaveClick = async () => {
//     if (!resourceType || !chapterId) {
//       alert("Missing resourceType or chapterId");
//       return;
//     }

//     setIsSaving(true);
//     // let sectionContent = {};
//     // if (sectionContentRef.current && sectionContentRef.current.save) {
//     //     sectionContent = await sectionContentRef.current.save();
//     // }
//     try {
//       const payload = {
//         id: sectionId || Math.floor(Math.random() * 10000),
//         sectionTitle: sectionTitle,
//         sectionType: sectionType,
//         sectionContent: null, // EditorSection is disabled for now
//         processStatus: 'DRAFT',
//         status: 'ACTIVE',
//         isVersion: false,
//         isLatest: false
//       };

//       let res;
//       if (sectionId) {
//         // UPDATE
//          res = await sectionService.update(resourceType, sectionId, payload);
//         alert(`Section updated (ID ${sectionId})`);
//       } else {
//         // CREATE
//         console.log('Payload for new section:', payload);
//         res = await sectionService.createSection(resourceType, chapterId, payload);
//         console.log('Section created response:', res);
//         const created = res?.data?.data || res?.data;
//         if (created?.sectionId) {
//           setSectionId(created.sectionId);
//         }
//         // alert(`Section created (ID ${created?.sectionId || payload.sectionId})`);
//         alert("Section created ");

//       }

//       if (typeof onSaved === 'function') {
//         onSaved(res?.data?.data || res?.data || { ...payload, id: sectionId || res?.data?.sectionId });
//       }

//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteClick = async () => {
//     // Only attempt to delete if the section has an ID (i.e., it exists on the server)
//     if (sectionId) {
//       try {
//         await sectionService.delete(resourceType, sectionId);
//         // Call the parent's onDeleted callback after a successful API delete
//         if (typeof onDeleted === 'function') {
//           onDeleted(sectionId);
//         }
//         alert(`Section deleted (ID ${sectionId })`);
//       } catch (err) {
//         console.error('Delete failed:', err);
//         alert('Error deleting section');
//       }
//     } else {
//       // For unsaved sections, just call the onDeleted callback to remove the card
//       if (typeof onDeleted === 'function') {
//         onDeleted(null); // Pass null as no section was deleted from the server
//       }
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded-lg p-4 mb-4 space-y-4 bg-white shadow-md"
//     >
//       <div className="flex space-x-4 mb-4">
//         <div className="w-2/3">
//             <label className="block text-sm font-medium text-gray-700">Section Title</label>
//             <input
//               type="text"
//               value={sectionTitle}
//               onChange={(e) => setSectionTitle(e.target.value)}
//               placeholder="Section Title"
//               className="mt-1 border p-2 rounded-lg w-full h-10 focus:ring-2 focus:ring-blue-500"
//             />
//         </div>
//         <div className="w-1/3">
//             <label className="block text-sm font-medium text-gray-700 ">Section Type</label>
//             <select
//               value={sectionType}
//               onChange={(e) => setSectionType(e.target.value)}
//               className="mt-1 w-full border p-2 rounded-lg h-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//             >
//               <option value="text">Text</option>
//               <option value="link">Link</option>
//               <option value="embedded_video">Embed Video</option>
//               <option value="image">Image</option>
//               <option value="files">Files</option>
//               <option value="script_code">Script/Code</option>
//             </select>
//         </div>
//       </div>

//       {/* {renderSectionContent()} */}

//       {/* EditorSection will come later */}
//         {/* <div className="relative p-2 bg-white h-fit overflow-auto z-10">
// //           <EditorSection ref={editorRef} data={sectionData.section_content || {}} />
// //         </div> */}

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
        
//         {/* Conditional button rendering for delete/cancel */}
//         {sectionId ? (
//           <button
//             onClick={handleDeleteClick}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Delete Section
//           </button>
//         ) : (
//           <button
//             onClick={() => onDeleted()} // Simply call the parent callback to hide the card
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef } from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { sectionService, sectionFileService } from '../services/kmService';

// import EditorSection from "../components/EditorSection";

// function SectionCard({
//   sectionData = {},
//   resourceType,
//   chapterId,
//   onSaved,
//   onDeleted
// }) {
//   const newIdRef = useRef(Math.random());

//   const [sectionId, setSectionId] = useState(sectionData.id || null);
//   const [sectionTitle, setSectionTitle] = useState(sectionData.sectionTitle || '');
//   const [sectionType, setSectionType] = useState(sectionData.sectionType || 'text');
//   const [sectionContent, setSectionContent] = useState(sectionData.sectionContent || null);
//   const [isSaving, setIsSaving] = useState(false);

//   const sortableId = sectionId || newIdRef.current;
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sortableId });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   // Handle image uploads via API
//   const handleUploadImage = async (file) => {
//     if (!sectionId) {
//       alert('Save the section first before uploading images.');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const res = await sectionFileService.upload(resourceType, sectionId, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       return res?.data; // Return uploaded file info
//     } catch (err) {
//       console.error('Image upload failed:', err);
//       alert('Image upload failed');
//     }
//   };

//   // Handle file uploads via API
//   const handleUploadFile = async (file) => {
//     if (!sectionId) {
//       alert('Save the section first before uploading files.');
//       return;
//     }
//     const formData = new FormData();
//     formData.append('file', file);
//     try {
//       const res = await sectionFileService.upload(resourceType, sectionId, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       return res?.data;
//     } catch (err) {
//       console.error('File upload failed:', err);
//       alert('File upload failed');
//     }
//   };

//   const handleSaveClick = async () => {
//     if (!resourceType || !chapterId) {
//       alert("Missing resourceType or chapterId");
//       return;
//     }
//     setIsSaving(true);
//     try {
//       const payload = {
//         id: sectionId || Math.floor(Math.random() * 10000),
//         sectionTitle,
//         sectionType,
//         sectionContent,
//         processStatus: 'DRAFT',
//         status: 'ACTIVE',
//         isVersion: false,
//         isLatest: false
//       };

//       let res;
//       if (sectionId) {
//         // UPDATE
//         res = await sectionService.update(resourceType, sectionId, payload);
//         alert(`Section updated (ID ${sectionId})`);
//       } else {
//         // CREATE
//         res = await sectionService.createSection(resourceType, chapterId, payload);
//         const created = res?.data?.data || res?.data;
//         if (created?.sectionId) {
//           setSectionId(created.sectionId);
//         }
//         alert("Section created");
//       }

//       if (typeof onSaved === 'function') {
//         onSaved(res?.data?.data || res?.data || { ...payload, id: sectionId });
//       }
//     } catch (err) {
//       console.error('Save failed:', err);
//       alert('Error saving section');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteClick = async () => {
//     if (sectionId) {
//       try {
//         await sectionService.delete(resourceType, sectionId);
//         if (typeof onDeleted === 'function') {
//           onDeleted(sectionId);
//         }
//         alert(`Section deleted (ID ${sectionId})`);
//       } catch (err) {
//         console.error('Delete failed:', err);
//         alert('Error deleting section');
//       }
//     } else {
//       if (typeof onDeleted === 'function') {
//         onDeleted(null);
//       }
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded-lg p-4 mb-4 space-y-4 bg-white shadow-md"
//     >
//       <div className="flex space-x-4 mb-4">
//         <div className="w-2/3">
//           <label className="block text-sm font-medium text-gray-700">Section Title</label>
//           <input
//             type="text"
//             value={sectionTitle}
//             onChange={(e) => setSectionTitle(e.target.value)}
//             placeholder="Section Title"
//             className="mt-1 border p-2 rounded-lg w-full h-10 focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div className="w-1/3">
//           <label className="block text-sm font-medium text-gray-700">Section Type</label>
//           <select
//             value={sectionType}
//             onChange={(e) => setSectionType(e.target.value)}
//             className="mt-1 w-full border p-2 rounded-lg h-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//           >
//             <option value="text">Text</option>
//             <option value="link">Link</option>
//             <option value="video">Embed Video</option>
//             <option value="image">Image</option>
//             <option value="file">Files</option>
//             <option value="code">Script/Code</option>
//           </select>
//         </div>
//       </div>

//       <EditorSection
//         type={sectionType}
//         value={sectionContent}
//         onChange={setSectionContent}
//         onUploadImage={handleUploadImage}
//         onUploadFile={handleUploadFile}
//         placeholder="Write here..."
//       />

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>
//         {sectionId ? (
//           <button
//             onClick={handleDeleteClick}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Delete Section
//           </button>
//         ) : (
//           <button
//             onClick={() => onDeleted()}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

// import React, { useState, useRef, useEffect } from 'react';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { sectionService, sectionFileService } from '../services/kmService';
// import EditorSection from "../components/EditorSection";

// function SectionCard({
//   sectionData = {},
//   resourceType,
//   chapterId,
//   onSaved,
//   onDeleted
// }) {
//   const newIdRef = useRef(Math.random());

//   const [sectionId, setSectionId] = useState(sectionData.id || null);
//   const [sectionTitle, setSectionTitle] = useState(sectionData.sectionTitle || '');
//   const [sectionType, setSectionType] = useState(sectionData.sectionType || 'text');
//   const [sectionContent, setSectionContent] = useState(sectionData.sectionContent ?? null);
//   const [isSaving, setIsSaving] = useState(false);

//   // when incoming sectionData changes (e.g., editing an existing one), hydrate state
//   useEffect(() => {
//     if (sectionData?.id) {
//       setSectionId(sectionData.id);
//       setSectionTitle(sectionData.sectionTitle || '');
//       setSectionType(sectionData.sectionType || 'text');
//       setSectionContent(sectionData.sectionContent ?? null);
//     }
//   }, [sectionData?.id]);

//   const sortableId = sectionId || newIdRef.current;
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sortableId });

//   const style = { transform: CSS.Transform.toString(transform), transition };

//   const handleChangeType = (nextType) => {
//     if (sectionId) return; // locked after save
//     // pre-save: discard any temp editor content when switching type
//     setSectionType(nextType);
//     setSectionContent(null);
//   };

//   // const handleSaveClick = async () => {
//   //   if (!resourceType || !chapterId) {
//   //     alert("Missing resourceType or chapterId");
//   //     return;
//   //   }
//   //   setIsSaving(true);
//   //   try {
//   //     const payload = {
//   //       id: sectionId || Math.floor(Math.random() * 10000),
//   //       sectionTitle,
//   //       sectionType,
//   //       sectionContent, // text/link/video/code HTML (files/images are handled in their own stores)
//   //       processStatus: 'DRAFT',
//   //       status: 'ACTIVE',
//   //       isVersion: false,
//   //       isLatest: false,
//   //     };

//   //     let res;
//   //     if (sectionId) {
//   //       res = await sectionService.update(resourceType, sectionId, payload);
//   //       alert(`Section updated (ID ${sectionId})`);
//   //     } else {
//   //       res = await sectionService.createSection(resourceType, chapterId, payload);
//   //       const created = res?.data?.data || res?.data;
//   //       const newId = created?.sectionId || created?.id;
//   //       if (newId) setSectionId(newId);
//   //       alert("Section created");
//   //     }

//   //     if (typeof onSaved === 'function') {
//   //       onSaved(res?.data?.data || res?.data || { ...payload, id: sectionId });
//   //     }
//   //   } catch (err) {
//   //     console.error('Save failed:', err);
//   //     alert('Error saving section');
//   //   } finally {
//   //     setIsSaving(false);
//   //   }
//   // };
//   const handleSaveClick = async () => {
//   if (!resourceType || !chapterId) {
//     alert("Missing resourceType or chapterId");
//     return;
//   }
//   setIsSaving(true);
//   try {
//     let currentSectionId = sectionId;

//     // 1. If no section exists → create it first
//     if (!currentSectionId) {
//       const payload = {
//         id: Math.floor(Math.random() * 10000),
//         sectionTitle,
//         sectionType,
//         sectionContent: typeof sectionContent === "string" ? sectionContent : "",
//         processStatus: 'DRAFT',
//         status: 'ACTIVE',
//         isVersion: false,
//         isLatest: false,
//       };

//       const res = await sectionService.createSection(resourceType, chapterId, payload);
//       const created = res?.data?.data || res?.data;
//       currentSectionId = created?.sectionId || created?.id;
//       setSectionId(currentSectionId);
//     }

//     let fileRefs = [];
// if (Array.isArray(sectionContent) && sectionContent.length > 0) {
//   for (const f of sectionContent) {
//     if (f.file) { // local file → needs upload
//       const formData = new FormData();
//       formData.append("file", f.file);
//       formData.append("description", f.name || "");

//       const uploadRes = await sectionFileService.upload(
//         resourceType,
//         currentSectionId,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       const uploaded = uploadRes?.data?.data || uploadRes?.data;
//       fileRefs.push(uploaded?.id); // ✅ use DB auto-generated ID
//     } else if (f.id) {
//       // already saved file, just keep its id
//       fileRefs.push(f.id);
//     }
//   }
// }

// // 2.5 Normalize sectionContent → always string
// let finalContent = sectionContent;
// if (sectionType === "file") {
//   // ✅ store DB IDs as CSV
//   finalContent = fileRefs.join(",");
// }
//     // 3. Update section with file references (if any)
//     const finalPayload = {
//       id: currentSectionId,
//       sectionTitle,
//       sectionType,
//       sectionContent: finalContent,
//       processStatus: 'DRAFT',
//       status: 'ACTIVE',
//       isVersion: false,
//       isLatest: false,
//     };

//     await sectionService.update(resourceType, currentSectionId, finalPayload);

//     alert(sectionId ? "Section updated" : "Section created ");

//     if (typeof onSaved === "function") {
//       onSaved(finalPayload);
//     }
//   } catch (err) {
//     console.error("Save failed:", err);
//     alert("Error saving section");
//   } finally {
//     setIsSaving(false);
//   }
// };


//   const handleDeleteClick = async () => {
//     if (sectionId) {
//       try {
//         await sectionService.delete(resourceType, sectionId);
//         if (typeof onDeleted === 'function') onDeleted(sectionId);
//         alert(`Section deleted (ID ${sectionId})`);
//       } catch (err) {
//         console.error('Delete failed:', err);
//         alert('Error deleting section');
//       }
//     } else {
//       if (typeof onDeleted === 'function') onDeleted(null);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded-lg p-4 mb-4 space-y-4 bg-white shadow-md"
//     >
//       <div className="flex space-x-4 mb-4">
//         <div className="w-2/3">
//           <label className="block text-sm font-medium text-gray-700">Section Title</label>
//           <input
//             type="text"
//             value={sectionTitle}
//             onChange={(e) => setSectionTitle(e.target.value)}
//             placeholder="Section Title"
//             className="mt-1 border p-2 rounded-lg w-full h-10 focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="w-1/3">
//           <label className="block text-sm font-medium text-gray-700">Section Type</label>
//           <select
//             value={sectionType}
//             disabled={!!sectionId} // lock after save
//             onChange={(e) => handleChangeType(e.target.value)}
//             className={`mt-1 w-full border p-2 rounded-lg h-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${sectionId ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
//           >
//             <option value="text">Text</option>
//             <option value="link">Link</option>
//             <option value="video">Embed Video</option>
//             <option value="image">Image</option>
//             <option value="file">Files</option>
//             <option value="code">Script/Code</option>
//           </select>
//         </div>
//       </div>

//       <EditorSection
//         type={sectionType}
//         value={sectionContent}
//         onChange={setSectionContent}
//         // These are only used by ImageSection/FileSection; other sections ignore them
//         // FileSection internally switches between local (pre-save) and API (post-save)
//         resourceType={resourceType}
//         sectionId={sectionId}
//         placeholder="Write here..."
//       />

//       <div className="flex space-x-4">
//         <button
//           onClick={handleSaveClick}
//           disabled={isSaving}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors"
//         >
//           {isSaving ? 'Saving...' : 'Save Section'}
//         </button>

//         {sectionId ? (
//           <button
//             onClick={handleDeleteClick}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Delete Section
//           </button>
//         ) : (
//           <button
//             onClick={() => onDeleted?.()}
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SectionCard;

import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { sectionService, sectionFileService } from '../services/kmService';
import EditorSection from "../components/EditorSection";

function SectionCard({
  sectionData = {},
  resourceType,
  chapterId,
  onSaved,
  onDeleted
}) {
  const newIdRef = useRef(Math.random());

  const [sectionId, setSectionId] = useState(sectionData.id || null);
  const [sectionTitle, setSectionTitle] = useState(sectionData.sectionTitle || '');
  const [sectionType, setSectionType] = useState(sectionData.sectionType || 'text');
  const [tempFileArray, setTempFileArray] = useState([]);
  const [sectionContent, setSectionContent] = useState(sectionData.sectionContent ?? null);
  const [isSaving, setIsSaving] = useState(false);
  const [fileData, setFileData] = useState([]);

  // When incoming sectionData changes, parse the sectionContent string
  useEffect(() => {
    if (sectionData?.id) {
      setSectionId(sectionData.id);
      setSectionTitle(sectionData.sectionTitle || '');
      setSectionType(sectionData.sectionType || 'text');
      setSectionContent(sectionData.sectionContent ?? null);

       if ((sectionData.sectionType === 'file' || sectionData.sectionType === 'image') && sectionData.sectionContent) {
        try {
          // Parse the JSON string from the API into a JS array
          const parsedContent = JSON.parse(sectionData.sectionContent);
          setTempFileArray(parsedContent);
        } catch (error) {
          console.error("Failed to parse sectionContent:", error);
          setTempFileArray([]);
        }
      } else {
        setTempFileArray([]);
      }
    }
  }, [sectionData?.id, sectionData.sectionContent, sectionData.sectionType]);

  const sortableId = sectionId || newIdRef.current;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sortableId });

  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleChangeType = (nextType) => {
    if (sectionId) return;
    setSectionType(nextType);
    setSectionContent(null);
    setTempFileArray([]);
  };
  
  const handleSaveClick = async () => {
    if (!resourceType || !chapterId) {
      alert("Missing resourceType or chapterId");
      return;
    }
    setIsSaving(true);
    try {
      let currentSectionId = sectionId;

      // 1. If no section exists, create it first to get an ID for file uploads
      if (!currentSectionId) {
        const payload = {
          id: sectionId || Math.floor(Math.random() * 10000),
          sectionTitle,
          sectionType,
          sectionContent: null, // Initially empty string
          processStatus: 'DRAFT',
          status: 'ACTIVE',
          isVersion: false,
          isLatest: false,
        };
        const res = await sectionService.createSection(resourceType, chapterId, payload);
        console.log("Section created response:", res);
        currentSectionId = res?.data?.data?.id || res?.data?.id;
        setSectionId(currentSectionId);
        console.log("Section created with ID:", currentSectionId);
      }

      // 2. Handle file uploads and update the file array
      let finalFileArray = [...tempFileArray];
      const uploadPromises = tempFileArray.map(f => {
        if (f.file) { // This is a local file that needs to be uploaded
          const formData = new FormData();
          formData.append("file", f.file);
          formData.append("description", f.name || "");
          return sectionFileService.upload(
            resourceType,
            currentSectionId,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        }
        return Promise.resolve(null); // Already saved file
      });
      
      const uploadResults = await Promise.all(uploadPromises);

      // Replace local file objects with the new API-returned file objects
      let uploadIndex = 0;
      finalFileArray = tempFileArray.map(file => {
        if (file.file) {
          const uploadedFile = uploadResults[uploadIndex]?.data?.data || uploadResults[uploadIndex]?.data;
          uploadIndex++;
          return { id: uploadedFile?.id, name: uploadedFile?.fileName, mimeType: uploadedFile?.mimeType, size: uploadedFile?.size };
        }
        return file;
      });

      // 3. Normalize sectionContent to a JSON string
      let finalContent;
 if (sectionType === "file" || sectionType === "image") {
  //  finalContent = JSON.stringify(finalFileArray.filter(f => f.id));
      finalContent= finalFileArray.filter(f => f.id).map(f => f.name || f.fileName).join(", ");
 } else {
   finalContent = sectionContent;
 }

      // 4. Update the section in the database
      const finalPayload = {
        id: currentSectionId,
        sectionTitle,
        sectionType,
        sectionContent: finalContent,
        processStatus: 'DRAFT',
        status: 'ACTIVE',
        isVersion: false,
        isLatest: false,
      };

      await sectionService.update(resourceType, currentSectionId, finalPayload);
      setSectionContent(finalContent); // Update state to reflect the saved string
      setTempFileArray(finalFileArray.filter(f => f.id)); // Update temp array with final data
      alert(sectionId ? "Section updated" : "Section created");

      if (typeof onSaved === "function") {
        onSaved({ ...finalPayload, id: currentSectionId });
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving section");
    } finally {
      setIsSaving(false);
    }
  };

  


  const handleDeleteClick = async () => {
    if (sectionId) {
      try {
        await sectionService.delete(resourceType, sectionId);
        if (typeof onDeleted === 'function') onDeleted(sectionId);
        alert(`Section deleted (ID ${sectionId})`);
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Error deleting section');
      }
    } else {
      if (typeof onDeleted === 'function') onDeleted(null);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border rounded-lg p-4 mb-4 space-y-4 bg-white shadow-md"
    >
      <div className="flex space-x-4 mb-4">
        <div className="w-2/3">
          <label className="block text-sm font-medium text-gray-700">Section Title</label>
          <input
            type="text"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder="Section Title"
            className="mt-1 border p-2 rounded-lg w-full h-10 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Section Type</label>
          <select
            value={sectionType}
            disabled={!!sectionId} // lock after save
            onChange={(e) => handleChangeType(e.target.value)}
            className={`mt-1 w-full border p-2 rounded-lg h-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${sectionId ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
          >
            <option value="text">Text</option>
            <option value="link">Link</option>
            <option value="video">Embed Video</option>
            <option value="image">Image</option>
            <option value="file">Files</option>
            <option value="code">Script/Code</option>
          </select>
        </div>
      </div>

      {/* <EditorSection
        type={sectionType}
        value={sectionContent}
        onChange={setSectionContent}
        // These are only used by ImageSection/FileSection; other sections ignore them
        // FileSection internally switches between local (pre-save) and API (post-save)
        resourceType={resourceType}
        sectionId={sectionId}
        placeholder="Write here..."
      /> */}
      <EditorSection
   type={sectionType}
   value={['file', 'image'].includes(sectionType) ? tempFileArray : sectionContent}
   onChange={['file', 'image'].includes(sectionType) ? setTempFileArray : setSectionContent}
   resourceType={resourceType}
   sectionId={sectionId}
   placeholder="Write here..."
 />

      <div className="flex space-x-4">
        <button
          onClick={handleSaveClick}
          disabled={isSaving}
          className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-green-600 transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Section'}
        </button>

        {sectionId ? (
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete Section
          </button>
        ) : (
          <button
            onClick={() => onDeleted?.()}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default SectionCard;
