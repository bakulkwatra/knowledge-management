import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";


export default function TextSection({ value = "", onChange, placeholder = "Write here..." }) {
  const editor = useEditor({
  extensions: [
    StarterKit.configure({ codeBlock: false }),
    Underline,
    TextStyle,
    Color,
    FontFamily,
    Placeholder.configure({ placeholder }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  content: value,
  onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
});

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-3">
        <button className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>

        <select
          className="px-2 py-1 rounded border"
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          defaultValue=""
        >
          <option value="" disabled>Font</option>
          <option value="Inter">Inter</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Monaco">Monaco</option>
        </select>

        <select
          className="px-2 py-1 rounded border"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "p") editor.chain().focus().setParagraph().run();
            if (val === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run();
            if (val === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
            if (val === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          defaultValue="p"
        >
          <option value="p">Paragraph</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
        </select>

        <input
          type="color"
          title="Text color"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
        />

        <button
            className="px-2 py-1 rounded hover:bg-gray-100"
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          >
            Insert Table
          </button>

          <button
            className="px-2 py-1 rounded hover:bg-gray-100"
            onClick={() => editor.chain().focus().addColumnBefore().run()}
          >
            Add Col
          </button>

          <button
            className="px-2 py-1 rounded hover:bg-gray-100"
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            Add Row
          </button>

          <button
            className="px-2 py-1 rounded hover:bg-gray-100"
            onClick={() => editor.chain().focus().deleteTable().run()}
          >
            Delete Table
          </button>

        <button className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </button>
      </div>

      <EditorContent 
  editor={editor} 
  className="min-h-[160px] prose prose-lg max-w-none list-disc list-decimal" 
/>
    </div>
  );
}
