// import React, { useState, useEffect } from 'react';
// import ChapterCard from './ChapterCard';
// import { chapterService } from '../services/kmService';

// const ChapterList = ({ resourceType, resourceId }) => {
//   const [chapters, setChapters] = useState([]);

//   useEffect(() => {
//     chapterService.getAll(resourceType, resourceId)
//       .then(res => {
//         setChapters(res.data?.data || []);
//       })
//       .catch(console.error);
//   }, [resourceType, resourceId]);

//   const handleAddChapter = () => {
//     const newChapter = {
//       id: null,
//       title: 'Untitled Chapter',
//       sections: [],
//     };
//     setChapters(prev => [...prev, newChapter]);
//   };

//   const handleUpdateChapter = (updatedChapter) => {
//     setChapters(prev =>
//       prev.map(ch =>
//         ch?.id === updatedChapter.chapterId ? { ...ch, ...updatedChapter } : ch
//       )
//     );
//   };

//   const handleDeleteChapter = (chapterId) => {
//     if (chapterId) {
//       chapterService.delete(resourceType, chapterId)
//         .then(() => {
//           setChapters(prev => prev.filter(ch => ch?.id !== chapterId));
//         })
//         .catch(console.error);
//     } else {
//       // Delete unsaved chapter
//       setChapters(prev => prev.filter(ch => ch.id !== chapterId));
//     }
//   };

//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-xl font-semibold">Chapters</h2>
//       {chapters.map((chapter, idx) => (
//         <ChapterCard
//           key={chapter.id || idx}
//           chapter={chapter}
//           resourceType={resourceType}
//           resourceId={resourceId}
//           sortIndex={idx}
//           onUpdate={handleUpdateChapter}
//           onDelete={() => handleDeleteChapter(chapter.id)}
//         />
//       ))}

//       <button
//         onClick={handleAddChapter}
//         className="px-4 py-2 bg-indigo-600 text-white rounded"
//       >
//         + Add Chapter
//       </button>
//     </div>
//   );
// };

// export default ChapterList;
