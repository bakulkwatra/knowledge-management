import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

/**
 * value: HTML string containing image nodes (or empty string)
 * onUploadImage(file) => Promise<string>  // must return a URL
 */
export default function ImageSection({
  value = "",
  onChange,
  onUploadImage,
  placeholder = "Insert images…",
}) {
  const fileRef = useRef(null);

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
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  const handleSelectImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    try {
      let url;
      if (onUploadImage) {
        url = await onUploadImage(file); // your backend
      } else {
        // fallback: local blob (not persisted)
        url = URL.createObjectURL(file);
      }
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    } finally {
      e.target.value = "";
    }
  };

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 bg-white">
      <div className="flex items-center gap-2 border-b pb-2 mb-3">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => fileRef.current?.click()}
        >
          Upload Image
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelectImage}
        />
      </div>

      <EditorContent editor={editor} className="min-h-[140px]" />
    </div>
  );
}
