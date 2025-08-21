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

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

/**
 * Link-only editor.
 * Works with no current selection by inserting the URL text as a link.
 */
export default function LinkSection({ value = "", onChange, placeholder = "Paste a link or type text and link it…" }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false, italic: false, underline: false,
        codeBlock: false, bulletList: false, orderedList: false,
        blockquote: false, heading: false,
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  if (!editor) return null;

  const setOrInsertLink = () => {
    const url = window.prompt("Enter URL");
    if (url === null) return;

    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const { state } = editor;
    const { empty } = state.selection;

    if (empty) {
      // insert the URL text and link it
      editor.chain().focus().insertContent(url).setTextSelection({
        from: editor.state.selection.from - url.length,
        to: editor.state.selection.from,
      }).setLink({ href: url }).run();
    } else {
      // apply link to current selection
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex items-center gap-2 border-b pb-2 mb-3">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={setOrInsertLink}
        >
          Set / Edit Link
        </button>
        <button
          className="px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Remove Link
        </button>
      </div>
      <EditorContent editor={editor} className="min-h-[120px]" />
    </div>
  );
}
