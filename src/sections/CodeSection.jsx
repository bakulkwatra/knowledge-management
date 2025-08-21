// import React from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";

// export default function CodeSection({ value = "", onChange, placeholder = "Write code here…" }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bold: false,
//         italic: false,
//         underline: false,
//         bulletList: false,
//         orderedList: false,
//         blockquote: false,
//         heading: false,
//       }),
//       Placeholder.configure({ placeholder }),
//     ],
//     content: value || "<pre><code></code></pre>",
//     onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
//   });

//   if (!editor) return null;

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <button
//           className="px-3 py-1 rounded hover:bg-gray-100"
//           onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//         >
//           Toggle Code Block
//         </button>
//       </div>
//       <EditorContent
//         editor={editor}
//         className="min-h-[160px] prose max-w-none font-mono"
//       />
//     </div>
//   );
// }

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function CodeSection({ value = "", onChange, placeholder = "Write code here…" }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        underline: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        heading: false,
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "<pre><code></code></pre>",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex items-center gap-2 border-b pb-2 mb-3">
        <button
          className="px-3 py-1 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Toggle Code Block
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[160px] prose max-w-none font-mono"
      />
    </div>
  );
}
