const TextSection = ({ register, index, control }) => {
  // For Lexical editor, you would replace this textarea with the Lexical component.
  // Example: <LexicalEditor name={`content.${index}.value`} control={control} />
  // This would involve setting up Lexical's state and integrating it with React Hook Form.
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <label className="block text-gray-700 text-sm font-bold mb-2">Text Content (Lexical Editor Placeholder)</label>
      <textarea
        {...register(`content.${index}.value`, { required: "Text content is required" })}
        rows="5"
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your blog text here..."
      ></textarea>
    </div>
  );
};