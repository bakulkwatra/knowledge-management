
import { useEffect, useState } from 'react';
import MultiSelect from '../components/atoms/headless/MultiSelect';
import MultiSelectPillInput from '../components/atoms/headless/MultiSelectPillInput';
import Select from '../components/atoms/headless/Select';
import Comments from '../components/Comments';
import { tagService, categoryGroupService, categoryService, resourceService } from '../services/kmService';
import { useParams, useNavigate } from 'react-router-dom';

function ResourceCRUD() {
  const { resourceType: resourceTypeParam, resourceId: resourceIdParam } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!resourceIdParam;
  const [resourceId, setResourceId] = useState(resourceIdParam || null);
  const [resourceType, setResourceType] = useState(resourceTypeParam || 'blog');
  const [resourceTitle, setResourceTitle] = useState('');
  const [summary, setSummary] = useState('');

  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [categoryGroupOptions, setCategoryGroupOptions] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const showChapters = resourceType !== 'blog';

  // Fetch existing resource in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchResource = async () => {
        try {
          const res = await resourceService.get(resourceTypeParam, resourceIdParam);
          const data = res?.data?.data;
          console.log('Fetched resource:', data);
          setResourceTitle(data.resourceTitle || '');
          setSummary(data.summary || '');
          setResourceId(data.id);

          // Metadata mapping
          const tags = data.metadata?.Tags || [];
          const categories = data.metadata?.Category || [];
          const groupLabel = data.metadata?.CategoryGroup || null;

          setSelectedTags(tags);
          setSelectedCategories(categories);
          setSelectedCategoryGroup(groupLabel);
        } catch (error) {
          console.error('Failed to fetch resource:', error);
          alert('Error loading resource data.');
        }
      };
      fetchResource();
    }
  }, [isEditMode, resourceTypeParam, resourceIdParam]);

  // Fetch tag options
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await tagService.getAllTags(resourceType);
        const res = response?.data?.data?.map(i => ({
          id: i.id,
          tag_name: i.tagName
        })) || [];
        setTagOptions(res);
        if (!isEditMode) setSelectedTags([]); // Clear for create
      } catch (error) {
        console.error('Failed to fetch tags:', error);
        setTagOptions([]);
        if (!isEditMode) setSelectedTags([]);
      }
    };
    fetchTags();
  }, [resourceType, isEditMode]);

  // Fetch category groups
  useEffect(() => {
    const fetchCategoryGroups = async () => {
      try {
        const response = await categoryGroupService.getAllCategoryGroups(resourceType);
        const res = response?.data?.data?.map(i => ({
          label: i.groupName,
          value: i.id
        })) || [];
        setCategoryGroupOptions(res);
        if (!isEditMode) setSelectedCategoryGroup(null);
      } catch (error) {
        console.error('Failed to fetch groups:', error);
        setCategoryGroupOptions([]);
        if (!isEditMode) setSelectedCategoryGroup(null);
      }
    };
    fetchCategoryGroups();
  }, [resourceType, isEditMode]);

  // Fetch categories for selected group
  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedCategoryGroup) {
        setCategoryOptions([]);
        setSelectedCategories([]);
        return;
      }
      try {
        const response = await categoryService.getAllCategories(resourceType, selectedCategoryGroup.value);
        const res = response?.data?.data?.map(i => ({
          label: i.category,
          value: i.id
        })) || [];
        setCategoryOptions(res);
        if (!isEditMode) setSelectedCategories([]);
      } catch (error) {
        console.error('Failed to fetch Categories:', error);
        setCategoryOptions([]);
        if (!isEditMode) setSelectedCategories([]);
      }
    };
    fetchCategories();
  }, [resourceType, selectedCategoryGroup, isEditMode]);

  // Save or Update Resource
  const handleSaveResource = async () => {
    if (!resourceTitle.trim() || !summary.trim()) {
      alert("Title and Summary are required.");
      return;
    }
    if (selectedTags.length === 0) {
      alert("Please select at least one tag.");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    const metadata = {
      Tags: selectedTags||[],
      CategoryGroup: selectedCategoryGroup || null,
      Category: selectedCategories|| [],
    };

    const payload = {
      resourceTitle,
      summary,
      resourceType,
      metadata,
      owners: [123], // mock owner
      processMetadata: {},
      createdBy: 1,
      updatedBy: 1
    };

    try {
      if (isEditMode) {
        await resourceService.update(resourceType, resourceId, payload);
        alert(`Resource updated (ID ${resourceId})`);
      } else {
        const generatedId = Math.floor(Math.random() * 10000);
        await resourceService.create(resourceType, { ...payload, id: generatedId });
        setResourceId(generatedId);
        navigate(`/km/${resourceType}/${generatedId}/edit`);
        alert(`Resource created (ID ${generatedId})`);
      }
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Failed to save resource.');
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isEditMode} // lock after creation
          >
            <option value="blog">Blog</option>
            <option value="article">Article</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        <div className="w-1/4">
          <Select
            id="categoryGroup"
            label="Category Group"
            value={selectedCategoryGroup?.value || ''}
            onChange={(val) => {
              const selected = categoryGroupOptions.find(opt => opt.value === val);
              setSelectedCategoryGroup(selected || null);
            }}
            options={categoryGroupOptions}
            placeholder="Select a group"
          />
        </div>

        <div className="w-1/4">
          <MultiSelect
            label="Category"
            options={categoryOptions}
            selectedItems={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="w-1/4 space-y-4">
          {showChapters && (
            <div>
              <h3 className="font-semibold mb-2">Chapters</h3>
              {resourceId ? (
                <ul className="space-y-2">
                  <li className="p-2 border rounded cursor-pointer hover:bg-gray-100">Chapter 1</li>
                  <li className="p-2 border rounded cursor-pointer hover:bg-gray-100">Chapter 2</li>
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Chapters will be available after saving the resource.</p>
              )}
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <MultiSelectPillInput
              label=""
              options={tagOptions}
              selectedItems={selectedTags}
              onChange={setSelectedTags}
            />
          </div>
        </div>

        <div className="w-3/4 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={resourceTitle}
            onChange={(e) => setResourceTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />

          <textarea
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="border p-2 w-full rounded h-24"
          />

          <button
            className={`px-4 py-2 rounded text-white ${
              resourceTitle && summary && selectedTags.length > 0 && selectedCategories.length > 0
                ? 'bg-green-500'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!resourceTitle || !summary || selectedTags.length === 0 || selectedCategories.length === 0}
            onClick={handleSaveResource}
          >
            {isEditMode ? "Update Resource" : "Save Resource"}
          </button>
        </div>
      </div>

      {isEditMode && (
        <div className="mt-8 border-t pt-4">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          <Comments
            resourceType={resourceType}
            resourceId={resourceId}
            userId={"abcd"}
            isUserResourceOwner={true}
          />
        </div>
      )}
    </div>
  );
}

export default ResourceCRUD;
