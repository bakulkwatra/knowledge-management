

const VideoSection = ({ register, index, errors }) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <label className="block text-gray-700 text-sm font-bold mb-2">Embed Video URL (e.g., YouTube)</label>
      <input
        type="url"
        {...register(`content.${index}.value`, { required: "Video URL is required" })}
        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="e.g., https://www.youtube.com/embed/dQw4w9WgXcQ"
      />
      {errors && errors.content?.[index]?.value && (
        <p className="text-red-500 text-xs italic">{errors.content[index].value.message}</p>
      )}
      {/* Basic embed preview (might need more robust handling for different video platforms) */}
      {register(`content.${index}.value`).value && (
        <div className="mt-2 aspect-video">
          <iframe
            width="100%"
            height="auto"
            src={register(`content.${index}.value`).value}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
};