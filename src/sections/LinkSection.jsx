const LinkSection = ({ register, index, errors }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <label className="block text-gray-700 text-sm font-bold mb-2">Link URL</label>
      <input
        type="url"
        {...register(`content.${index}.value`, { required: "Link URL is required" })}
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="e.g., https://www.example.com"
      />
      {errors && errors.content?.[index]?.value && (
        <p className="text-red-500 text-xs italic">{errors.content[index].value.message}</p>
      )}
      <label className="block text-gray-700 text-sm font-bold mb-2 mt-2">Link Text (Optional)</label>
      <input
        type="text"
        {...register(`content.${index}.linkText`)}
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="e.g., Visit our website"
      />
      {register(`content.${index}.value`).value && (
        <a href={register(`content.${index}.value`).value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 block">
          {register(`content.${index}.linkText`).value || register(`content.${index}.value`).value}
        </a>
      )}
    </div>
  );
};