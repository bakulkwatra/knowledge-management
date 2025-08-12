// import React, { useEffect, useRef } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import CodeTool from '@editorjs/code';
// import Embed from '@editorjs/embed'; // KEEP this for text embeds

// const EditorSection = ({ data, onSave }) => {
//   const editorRef = useRef(null);
//   const editorInstance = useRef(null);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     editorInstance.current = new EditorJS({
//       holder: editorRef.current,
//       tools: {
//         header: Header,
//         list: List,
//         code: CodeTool,
//         embed: Embed, // YouTube, Vimeo, etc.
//       },
//       data: data || {},
//       autofocus: true,
//       onReady: () => {
//         console.log('Editor.js is ready');
//       },
//     });

//     return () => {
//       if (editorInstance.current) {
//         try {
//           editorInstance.current.destroy?.();
//           console.log('Editor.js destroyed');
//         } catch (err) {
//           console.error('Failed to destroy Editor.js', err);
//         }
//       }
//     };
//   }, [data]);

//   const handleSave = async () => {
//     const savedData = await editorInstance.current?.save();
//     onSave(savedData);
//   };

//   return (
//     <div className="border rounded p-4 mb-4">
//       <div ref={editorRef} className="editor-js" />
//       <button onClick={handleSave} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
//         Save Section
//       </button>
//     </div>
//   );
// };

// export default EditorSection;


// import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import CodeTool from '@editorjs/code';
// import Embed from '@editorjs/embed'; // For embeds

// // Wrap with forwardRef to expose save()
// const EditorSection = forwardRef(({ data }, ref) => {
//   const editorRef = useRef(null);
//   const editorInstance = useRef(null);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     editorInstance.current = new EditorJS({
//       holder: editorRef.current,
//       tools: {
//         header: Header,
//         list: List,
//         code: CodeTool,
//         embed: Embed,
//       },
//       data: data || {},
//       autofocus: true,
//       onReady: () => {
//         console.log('Editor.js is ready');
//       },
//     });

//     return () => {
//       if (editorInstance.current) {
//         try {
//           editorInstance.current.destroy?.();
//           console.log('Editor.js destroyed');
//         } catch (err) {
//           console.error('Failed to destroy Editor.js', err);
//         }
//       }
//     };
//   }, [data]);

//   // Expose save method to parent via ref
//   useImperativeHandle(ref, () => ({
//     save: async () => {
//       if (editorInstance.current) {
//         return await editorInstance.current.save();
//       }
//       return null;
//     }
//   }));

//   return (
//     <div className="border rounded p-4 mb-4">
//       <div ref={editorRef} className="editor-js" />
//     </div>
//   );
// });
// export default EditorSection;

// import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import CodeTool from '@editorjs/code';
// import Embed from '@editorjs/embed';
// import ImageTool from '@editorjs/image';
// import LinkTool from '@editorjs/link';
// import Paragraph from '@editorjs/paragraph';
// import Underline from '@editorjs/underline';
// import FontColorInlineTool from "../editorTools/FontColorInlineTool";
// import FontFamilyInlineTool from "../editorTools/FontFamilyInlineTool";
// import FontSizeInlineTool from "../editorTools/FontSizeInlineTool";




// const EditorSection = forwardRef(({ data }, ref) => {
//   const editorRef = useRef(null);
//   const editorInstance = useRef(null);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     editorInstance.current = new EditorJS({
//       holder: editorRef.current,
//       tools: {
//         paragraph: {
//     class: Paragraph,
//     inlineToolbar: ['bold', 'italic', 'link', 'underline', 'fontFamily', 'fontSize', 'fontColor'],
//   },
//   header: {
//     class: Header,
//     inlineToolbar: ['bold', 'italic', 'link', 'underline', 'fontFamily',
//       'fontSize',
//       'fontColor'],
//   },
//   list: {
//     class: List,
//     inlineToolbar: true,
//   },
//         code: CodeTool,
//         embed: Embed,
//         image: {
//           class: ImageTool,
//           config: {
//             endpoints: {
//               byFile: '/uploadFile', // Replace with your backend endpoint
//               byUrl: '/uploadUrl',   // Optional if you allow URL uploads
//             },
//           },
//         },
//         linkTool: {
//           class: LinkTool,
//           config: {
//             endpoint: '/fetchUrlMetadata', // Optional backend for fetching link metadata
//           },
//         },
//         underline: Underline,
//         fontFamily: FontFamilyInlineTool,
//         fontSize: FontSizeInlineTool,
//         fontColor: FontColorInlineTool,
//       },
//       data: data || {},
//       autofocus: true,
//       onReady: () => {
//         console.log('Editor.js is ready');
//       },
//     });

//     return () => {
//       if (editorInstance.current) {
//         editorInstance.current.destroy?.();
//         editorInstance.current = null;
//         console.log('Editor.js destroyed');
//       }
//     };
//   }, [data]);

//   useImperativeHandle(ref, () => ({
//     save: async () => {
//       if (editorInstance.current) {
//         return await editorInstance.current.save();
//       }
//       return null;
//     }
//   }));

//   return (
//     <div className="p-4 mb-4 z-[5000]">
//       <div ref={editorRef} className="editor-js" />
//     </div>
//   );
// });

// export default EditorSection;


// import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import CodeTool from '@editorjs/code';
// import Embed from '@editorjs/embed';
// import ImageTool from '@editorjs/image';
// import LinkTool from '@editorjs/link';
// import Paragraph from '@editorjs/paragraph';
// import Underline from '@editorjs/underline';
// import FontColorInlineTool from "../editorTools/FontColorInlineTool";
// import FontFamilyInlineTool from "../editorTools/FontFamilyInlineTool";
// import FontSizeInlineTool from "../editorTools/FontSizeInlineTool";

// const EditorSection = forwardRef(({ data }, ref) => {
//   const editorRef = useRef(null);
//   const editorInstance = useRef(null);
//   const initialRender = useRef(true);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     editorInstance.current = new EditorJS({
//       holder: editorRef.current,
//       tools: {
//         paragraph: {
//           class: Paragraph,
//           inlineToolbar: ['bold', 'italic', 'link', 'underline', 'fontFamily', 'fontSize', 'fontColor'],
//         },
//         header: {
//           class: Header,
//           inlineToolbar: ['bold', 'italic', 'link', 'underline', 'fontFamily', 'fontSize', 'fontColor'],
//         },
//         list: { class: List, inlineToolbar: true },
//         code: CodeTool,
//         embed: Embed,
//         image: {
//           class: ImageTool,
//           config: {
//             endpoints: {
//               byFile: '/uploadFile',
//               byUrl: '/uploadUrl',
//             },
//           },
//         },
//         linkTool: {
//           class: LinkTool,
//           config: { endpoint: '/fetchUrlMetadata' },
//         },
//         underline: Underline,
//         fontFamily: FontFamilyInlineTool,
//         fontSize: FontSizeInlineTool,
//         fontColor: FontColorInlineTool,
//       },
//       data: data || {},
//       autofocus: true,
//       onReady: () => {
//         console.log('Editor.js is ready');
//       },
//     });

//     return () => {
//       editorInstance.current?.destroy();
//       editorInstance.current = null;
//       console.log('Editor.js destroyed');
//     };
//   }, []);

//   // Hot reload when `data` changes (after first mount)
//   useEffect(() => {
//     if (initialRender.current) {
//       initialRender.current = false;
//       return;
//     }
//     if (editorInstance.current && data) {
//       editorInstance.current.render(data).then(() => {
//         console.log('Editor.js content updated via hot reload');
//       });
//     }
//   }, [data]);

//   useImperativeHandle(ref, () => ({
//     save: async () => {
//       if (editorInstance.current) {
//         return await editorInstance.current.save();
//       }
//       return null;
//     }
//   }));

//   return (
//     <div className="p-4 mb-4 z-[5000]">
//       <div ref={editorRef} className="editor-js" />
//     </div>
//   );
// });

// export default EditorSection;
