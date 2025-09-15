// import React, { useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import YouTube from "@tiptap/extension-youtube";
// import Placeholder from "@tiptap/extension-placeholder";

// /**
//  * value: HTML containing YouTube embeds (iframe nodes)
//  */
// export default function VideoSection({ value = "", onChange, placeholder = "Paste a YouTube link and insert…" }) {
//   const [url, setUrl] = useState("");

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bold: false, italic: false, underline: false,
//         codeBlock: false, bulletList: false, orderedList: false,
//       }),
//       YouTube.configure({
//         controls: true,
//       }),
//       Placeholder.configure({ placeholder }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
//   });

//   if (!editor) return null;

//   const addVideo = () => {
//     if (!url) return;
//     editor.commands.setYoutubeVideo({
//       src: url,
//       width: 640,
//       height: 360,
//     });
//     setUrl("");
//   };

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <input
//           type="url"
//           className="flex-1 px-2 py-1 border rounded"
//           placeholder="https://www.youtube.com/watch?v=..."
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={addVideo}
//         >
//           Insert
//         </button>
//       </div>
//       <EditorContent editor={editor} className="min-h-[140px]" />
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import YouTube from "@tiptap/extension-youtube";
// import Placeholder from "@tiptap/extension-placeholder";

// /**
//  * YouTube embed editor.
//  * Validates URL and inserts an iframe.
//  */
// export default function VideoSection({ value = "", onChange, placeholder = "Paste a YouTube link and insert…" }) {
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bold: false, italic: false, underline: false,
//         codeBlock: false, bulletList: false, orderedList: false,
//         blockquote: false, heading: false,
//       }),
//       YouTube.configure({
//         controls: true,
//         nocookie: false,
//         modestBranding: true,
//       }),
//       Placeholder.configure({ placeholder }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
//   });

//   if (!editor) return null;

//   const isYouTubeUrl = (u) =>
//     /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+/.test(u);

//   const addVideo = () => {
//     setError("");
//     if (!url) return;

//     if (!isYouTubeUrl(url)) {
//       setError("Please enter a valid YouTube watch URL or youtu.be short link.");
//       return;
//     }

//     editor.commands.setYoutubeVideo({
//       src: url,
//       width: 640,
//       height: 360,
//     });
//     setUrl("");
//   };

//   return (
//     <div className="border rounded-lg p-3 bg-white">
//       <div className="flex items-center gap-2 border-b pb-2 mb-3">
//         <input
//           type="url"
//           className="flex-1 px-2 py-1 border rounded"
//           placeholder="https://www.youtube.com/watch?v=..."
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />
//         <button
//           className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
//           onClick={addVideo}
//         >
//           Insert
//         </button>
//       </div>
//       {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
//       <EditorContent editor={editor} className="min-h-[140px]" />
//     </div>
//   );
// }

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import YouTube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";

/**
 * YouTube embed editor.
 * Accepts any YouTube URL (watch, youtu.be, embed) and normalizes to embed.
 */
export default function VideoSection({
  value = "",
  onChange,
  placeholder = "Paste a YouTube link and insert…",
}) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
        underline: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        heading: false,
      }),
      YouTube.configure({
        controls: true,
        nocookie: false,
        modestBranding: true,
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  if (!editor) return null;

  // 🔑 Normalize any YouTube URL into a valid embed link
  const normalizeYouTubeUrl = (url) => {
    try {
      const u = new URL(url);

      // Short link: youtu.be/<id>
      if (u.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
      }

      // Normal watch URL: youtube.com/watch?v=<id>
      if (u.searchParams.has("v")) {
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
      }

      // Already embed
      if (u.pathname.startsWith("/embed/")) {
        return url;
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const addVideo = () => {
    setError("");
    if (!url) return;

    const normalized = normalizeYouTubeUrl(url);
    if (!normalized) {
      setError("Please enter a valid YouTube link.");
      return;
    }

    editor.commands.setYoutubeVideo({
      src: normalized,
      width: 640,
      height: 360,
    });
    setUrl("");
  };

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex items-center gap-2 border-b pb-2 mb-3">
        <input
          type="url"
          className="flex-1 px-2 py-1 border rounded"
          placeholder="Paste YouTube link (watch, youtu.be, embed)…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={addVideo}
        >
          Insert
        </button>
      </div>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      <EditorContent editor={editor} className="min-h-[140px]" />
    </div>
  );
}
