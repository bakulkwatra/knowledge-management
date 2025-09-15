// import React from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Placeholder from "@tiptap/extension-placeholder";

// /**
//  * Minimal link-only editor.
//  * value: HTML (links + plain text)
//  */
// export default function LinkSection({ value = "", onChange, placeholder = "Paste a link or type text and link it…" }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bold: false, italic: false, underline: false,
//         codeBlock: false, bulletList: false, orderedList: false,
//       }),
//       Link.configure({
//         openOnClick: false,
//         linkOnPaste: true,
//       }),
//       Placeholder.configure({ placeholder }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
//   });

//   if (!editor) return null;

//   const setLink = () => {
//     const url = window.prompt("Enter URL");
//     if (url === null) return;
//     if (url === "") {
//       editor.chain().focus().unsetLink().run();
//       return;
//     }
//     editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//   };

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={setLink}
//         >
//           Set / Edit Link
//         </button>
//         <button
//           className="px-3 py-1 rounded hover:bg-gray-100"
//           onClick={() => editor.chain().focus().unsetLink().run()}
//         >
//           Remove Link
//         </button>
//       </div>
//       <EditorContent editor={editor} className="min-h-[120px]" />
//     </div>
//   );
// }

// import React from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Placeholder from "@tiptap/extension-placeholder";

// /**
//  * Link-only editor.
//  * Works with no current selection by inserting the URL text as a link.
//  */
// export default function LinkSection({ value = "", onChange, placeholder = "Paste a link or type text and link it…" }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bold: false, italic: false, underline: false,
//         codeBlock: false, bulletList: false, orderedList: false,
//         blockquote: false, heading: false,
//       }),
//       Link.configure({
//         openOnClick: false,
//         linkOnPaste: true,
//         autolink: true,
//       }),
//       Placeholder.configure({ placeholder }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
//   });

//   if (!editor) return null;

//   const setOrInsertLink = () => {
//     const url = window.prompt("Enter URL");
//     if (url === null) return;

//     if (!url) {
//       editor.chain().focus().unsetLink().run();
//       return;
//     }

//     const { state } = editor;
//     const { empty } = state.selection;

//     if (empty) {
//       // insert the URL text and link it
//       editor.chain().focus().insertContent(url).setTextSelection({
//         from: editor.state.selection.from - url.length,
//         to: editor.state.selection.from,
//       }).setLink({ href: url }).run();
//     } else {
//       // apply link to current selection
//       editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//     }
//   };

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={setOrInsertLink}
//         >
//           Set / Edit Link
//         </button>
//         <button
//           className="px-3 py-1 rounded hover:bg-gray-100"
//           onClick={() => editor.chain().focus().unsetLink().run()}
//         >
//           Remove Link
//         </button>
//       </div>
//       <EditorContent editor={editor} className="min-h-[120px]" />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function LinkSection({ value = "", onChange, placeholder = "Paste a link…" }) {
  const [links, setLinks] = useState([]);

  // Parse initial value (HTML) into array of objects { url, label }
  useEffect(() => {
    if (!value) {
      setLinks([]);
      return;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, "text/html");
    const aTags = Array.from(doc.querySelectorAll("a"));
    const parsedLinks = aTags.map(a => ({ url: a.href, label: a.textContent || a.href }));
    setLinks(parsedLinks);
  }, [value]);

  const updateLinks = (newLinks) => {
    setLinks(newLinks);
    const html = newLinks.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join("<br/>");
    onChange?.(html);
  };

  const handleAddLink = () => {
    const url = window.prompt("Enter URL:");
    if (!url) return;
    const label = window.prompt("Enter label (optional):") || url;
    updateLinks([...links, { url, label }]);
  };

  const handleEditLink = (index) => {
    const current = links[index];
    const url = window.prompt("Edit URL:", current.url);
    if (!url) return;
    const label = window.prompt("Edit label:", current.label) || url;
    const newLinks = [...links];
    newLinks[index] = { url, label };
    updateLinks(newLinks);
  };

  const handleDeleteLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    updateLinks(newLinks);
  };

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex gap-2 border-b pb-2 mb-3">
        <button
          type="button"
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleAddLink}
        >
          Add Link
        </button>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-gray-500">{placeholder}</p>
      ) : (
        <ul className="space-y-2">
          {links.map((link, idx) => (
            <li key={idx} className="flex items-center justify-between border rounded p-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link.label}
              </a>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEditLink(idx)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteLink(idx)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
