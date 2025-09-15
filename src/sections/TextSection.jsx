import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaTable,
} from "react-icons/fa";

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
    <div className="border rounded-lg p-3 bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-2 mb-3">
        {/* Formatting Group */}
        <div className="flex items-center space-x-1">
          <button
            className={`p-2 rounded ${editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <FaBold />
          </button>
          <button
            className={`p-2 rounded ${editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <FaItalic />
          </button>
          <button
            className={`p-2 rounded ${editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <FaUnderline />
          </button>
        </div>

        {/* Font & Heading Group */}
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

        {/* List Group */}
        <div className="flex items-center space-x-1">
          <button
            className={`p-2 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <FaListUl />
          </button>
          <button
            className={`p-2 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"}`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <FaListOl />
          </button>
        </div>

        {/* Table Group */}
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <FaTable />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          <FaTable />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[160px] prose prose-lg max-w-none list-disc list-decimal p-2"
      />
    </div>
  );
}