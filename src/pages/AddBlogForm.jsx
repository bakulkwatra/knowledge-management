import { topicService, blogService } from "../services/blogService";
import { tagService } from "../services/blogService";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import MultiSelectPillInput from "../components/atoms/headless/MultiSelectPillInput";
import FormFooter from "../components/atoms/forms/FormFooter"
import { categoryGroupService } from "../services/kmService";


const AddBlogForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      // topics: [],
      categoryGroups: [],
      tags: [],
      content: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "content",
  });

  // const [availableTopics, setAvailableTopics] = useState([]);
  const [availableCategoryGroups, setAvailableCategoryGroups] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  // const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingCategoryGroups, setLoadingCategoryGroups] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // useEffect(() => {
  //   const fetchTopics = async () => {
  //     try {
  //       const response = await topicService.getAllTopics();
  //       setAvailableTopics(response.data.map((topic) => topic.topic));
  //     } catch (error) {
  //       console.error("Error fetching topics:", error);
  //     } finally {
  //       setLoadingTopics(false);
  //     }
  //   };
  //   fetchTopics();
  // }, []);

  useEffect(() => {
    const fetchCategoryGroups = async () => {
      try {
        const response = await categoryGroupService.getAllCategoryGroups();
        setAvailableCategoryGroups(response.data.map((group) => group.name));
      } catch (error) {
        console.error("Error fetching category groups:", error);
      } finally {
        setLoadingCategoryGroups(false);
      }
    };
    fetchCategoryGroups();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await tagService.getAllTags();
        setAvailableTags(response.data.map((tag) => tag.tag));
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoadingTags(false);
      }
    };
    fetchTags();
  }, []);

  // const selectedTopics = watch("topics");
  const selectedTags = watch("tags");
  const selectedCategoryGroups = watch("categoryGroups");

  // const handleAddTopic = (topic) => {
  //   if (!selectedTopics.includes(topic)) {
  //     setValue("topics", [...selectedTopics, topic]);
  //   }
  // };

  // const handleRemoveTopic = (topicToRemove) => {
  //   setValue(
  //     "topics",
  //     selectedTopics.filter((topic) => topic !== topicToRemove)
  //   );
  // };

  // const handleAddTag = (tag) => {
  //   if (!selectedTags.includes(tag)) {
  //     setValue("tags", [...selectedTags, tag]);
  //   }
  // };

  // const handleRemoveTag = (tagToRemove) => {
  //   setValue(
  //     "tags",
  //     selectedTags.filter((tag) => tag !== tagToRemove)
  //   );
  // };

  const onSubmit = async (data) => {
    setSubmitError(null);
    // if (data.topics.length === 0) {
    //   alert("Please select at least one topic.");
    //   return;
    // }
    if (data.tags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }
    if (data.categoryGroups.length === 0) {
      alert("Please select at least one category group.");
      return;
    }

    try {
      const response = await fetch("/api/km", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("Blog submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting blog:", error);
      setSubmitError(error.message || "Failed to submit blog. Please try again.");
      alert(`Error: ${error.message || "Failed to submit blog."}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[100vh] overflow-y-auto overflow-hidden hover:overflow-y-auto p-6 sm:p-8 ...">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create New Blog</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close form"
          >
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Blog Title</label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Blog title is required" })}
              className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Topics */}
          {/* {loadingTopics ? (
            <p className="text-gray-600">Loading topics...</p>
          ) : (
            <PillInput
              label="Topics (Mandatory)"
              options={availableTopics}
              selectedItems={selectedTopics}
              onAddItem={handleAddTopic}
              onRemoveItem={handleRemoveTopic}
            />
          )} */}

          {loadingCategoryGroups ? (
            <p className="text-gray-600">Loading categoryGroups...</p>
          ) : (
            <MultiSelectPillInput
              label="CategoryGroup (Mandatory)"
              options={availableCategoryGroups.map((t) => ({ value: t, label: t }))}
              selectedItems={selectedCategoryGroups.map((t) => ({ value: t, label: t }))}
              onChange={(newItems) =>
                setValue("categoryGroups", newItems.map((item) => item.value))
              }
              placeholder="Select categoryGroups"
            />
            )}

          {/* Tags */}
          {/* {loadingTags ? (
            <p className="text-gray-600">Loading tags...</p>
          ) : (
            <PillInput
              label="Tags (Mandatory)"
              options={availableTags}
              selectedItems={selectedTags}
              onAddItem={handleAddTag}
              onRemoveItem={handleRemoveTag}
            />
          )} */}

          {loadingTags ? (
            <p className="text-gray-600">Loading tags...</p>
          ) : (
            <MultiSelectPillInput
              label="Tags (Mandatory)"
              options={availableTags.map((t) => ({ value: t, label: t }))}
              selectedItems={selectedTags.map((t) => ({ value: t, label: t }))}
              onChange={(newItems) =>
                setValue("tags", newItems.map((item) => item.value))
              }
              placeholder="Select tags"
            />
          )}

          {/* Dynamic Content Sections */}
          <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900">Blog Content Sections</h3>
          <div className="space-y-4">
            {fields.map((item, index) => (
              <div key={item.id} className="relative border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label="Remove section"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
                <div className="flex justify-end gap-2 mb-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => move(index, index - 1)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      ↑ Move Up
                    </button>
                  )}
                  {index < fields.length - 1 && (
                    <button
                      type="button"
                      onClick={() => move(index, index + 1)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      ↓ Move Down
                    </button>
                  )}
                </div>
                {/* Content Section Renderers */}
                {item.type === "text" && <TextSection register={register} index={index} control={control} />}
                {item.type === "image" && <ImageSection register={register} index={index} errors={errors} />}
                {item.type === "video" && <VideoSection register={register} index={index} errors={errors} />}
                {item.type === "link" && <LinkSection register={register} index={index} errors={errors} />}
                {item.type === "code" && <CodeSection register={register} index={index} errors={errors} />}
              </div>
            ))}
          </div>

          {/* Section Add Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 justify-center">
            <button type="button" onClick={() => append({ type: "text", value: "" })}
              className="px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-200 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Text
            </button>
            <button type="button" onClick={() => append({ type: "image", value: "" })}
              className="px-4 py-2 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition duration-200 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Image
            </button>
            <button type="button" onClick={() => append({ type: "video", value: "" })}
              className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-200 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Video
            </button>
            <button type="button" onClick={() => append({ type: "link", value: "", linkText: "" })}
              className="px-4 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition duration-200 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Link
            </button>
            <button type="button" onClick={() => append({ type: "code", value: "" })}
              className="px-4 py-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-800 transition duration-200 flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-1" /> Add Code
            </button>
          </div>

          {/* Error Message */}
          {submitError && (
            <p className="text-red-600 text-center mt-4">{submitError}</p>
          )}

          {/* Submit */}
          <FormFooter/>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;
