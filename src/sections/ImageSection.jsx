const ImageSection = ({ register, index, errors }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
      <input
        type="url"
        {...register(`content.${index}.value`, { required: "Image URL is required" })}
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="e.g., https://example.com/image.jpg"
      />
      {errors && errors.content?.[index]?.value && (
        <p className="text-red-500 text-xs italic">{errors.content[index].value.message}</p>
      )}
      {/* Basic preview if URL is provided */}
      {register(`content.${index}.value`).value && (
        <img src={register(`content.${index}.value`).value} alt="Preview" className="mt-2 max-w-full h-auto rounded-lg" />
      )}
    </div>
  );
};