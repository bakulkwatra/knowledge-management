const CodeSection = ({ register, index, errors }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <label className="block text-gray-700 text-sm font-bold mb-2">Code Snippet</label>
      <textarea
        {...register(`content.${index}.value`, { required: "Code snippet is required" })}
        rows="8"
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight font-mono bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your code here..."
      ></textarea>
      {errors && errors.content?.[index]?.value && (
        <p className="text-red-500 text-xs italic">{errors.content[index].value.message}</p>
      )}
    </div>
  );
};