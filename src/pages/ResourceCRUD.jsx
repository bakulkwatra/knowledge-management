import { useEffect, useState } from 'react';
import MultiSelect from '../components/atoms/headless/MultiSelect';
import MultiSelectPillInput from '../components/atoms/headless/MultiSelectPillInput';
import { tagService, categoryGroupService,categoryService } from '../services/kmService'; // Your backend API service

function ResourceCRUD() {
  const [resourceType, setResourceType] = useState('blog');

  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [categoryGroupOptions, setCategoryGroupOptions] = useState([]);
  const [selectedCategoryGroups, setSelectedCategoryGroups] = useState([]);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  

  console.log('Selected tags:', selectedTags);
  console.log('Selected CategoryGroups:', selectedCategoryGroups);
  console.log('Selected Categories:', selectedCategories);

//   const categoryGroupOptions = [
//     { label: 'Tech', value: 'tech' },
//     { label: 'HR', value: 'hr' },
//   ];

//   const categoryOptions = [
//     { label: 'React', value: 'react' },
//     { label: 'Node.js', value: 'node' },
//   ];

  const showChapters = resourceType !== 'blog';

  // Fetch tags for selected resourceType
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const response = await tagService.getAllTags(resourceType);
//         console.log('Fetched tags:', response.data);

//         let res= response?.data?.data?.map((i,index)=>{
//             return {
//                 id: i.id,
//                 tag_name: i.tagName
//             }
//         })

//         setTagsOptions(res || []);
//       } catch (error) {
//         console.error('Failed to fetch tags:', error);
//         setTagsOptions([]);
//       }
//     };

//     fetchTags();
//   }, [resourceType]);

useEffect(() => {
  const fetchTags = async () => {
    try {
      const response = await tagService.getAllTags(resourceType);
      console.log('Fetched tags:', response.data);

      let res = response?.data?.data?.map((i) => ({
        id: i.id,
        tag_name: i.tagName
      })) || [];

      setTagOptions(res);
      setSelectedTags([]); // RESET tags on resource type change
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      setTagOptions([]);
      setSelectedTags([]); // Also reset on error
    }
  };

  fetchTags();
}, [resourceType]);

// useEffect(() => {
//   const fetchCategoryGroups = async () => {
//     try {
//       const response = await categoryGroupService.getAllCategoryGroups(resourceType);
//       console.log('Fetched Cat_Groups:', response.data);

//       let res = response?.data?.data?.map((i) => ({
//         id: i.id,
//         group_name: i.groupName
//       })) || [];

//       setCategoryGroupOptions(res);
//       setSelectedCategoryGroups([]); // RESET Cat_groups on resource type change
//     } catch (error) {
//       console.error('Failed to fetch groups:', error);
//       setCategoryGroupOptions([]);
//       setSelectedCategoryGroups([]); // Also reset on error
//     }
//   };

//   fetchCategoryGroups();
// }, [resourceType]);

useEffect(() => {
  const fetchCategoryGroups = async () => {
    try {
      const response = await categoryGroupService.getAllCategoryGroups(resourceType);
      console.log('Fetched Cat_Groups:', response.data);

      let res = response?.data?.data?.map((i) => ({
        label: i.groupName,
        value: i.id,
        // raw: i, // Optional for reference
      })) || [];

      setCategoryGroupOptions(res);
      setSelectedCategoryGroups([]); // Reset on type change
    } catch (error) {
      console.error('Failed to fetch groups:', error);
      setCategoryGroupOptions([]);
      setSelectedCategoryGroups([]);
    }
  };

  fetchCategoryGroups();
}, [resourceType]);


// useEffect(() => {
//   const fetchCategories = async () => {
//     try {
//       const response = await categoryService.getAllCategories(resourceType, selectedCategoryGroups.map(cg => cg.id).join(','));
//       console.log('Fetched Categories:', response.data);

//       let res = response?.data?.data?.map((i) => ({
//         id: i.id,
//         category: i.category
//       })) || [];

//       setCategoryOptions(res);
//       setSelectedCategories([]); // RESET Cat_groups on resource type change
//     } catch (error) {
//       console.error('Failed to fetch Categories:', error);
//       setCategoryOptions([]);
//       setSelectedCategories([]); // Also reset on error
//     }
//   };

//   fetchCategories();
// }, [resourceType]);

useEffect(() => {
  const fetchCategories = async () => {
    if (selectedCategoryGroups.length === 0) {
      setCategoryOptions([]);
      setSelectedCategories([]);
      return;
    }

    try {
      const groupIdsArray = selectedCategoryGroups.map(cg => cg.value);  // NOTE: using `id` not `value`
      const response = await categoryService.getAllCategories(resourceType, groupIdsArray);
      console.log('Fetched Categories:', response.data);

      const res = response?.data?.data?.map((i) => ({
        label: i.category,
        value: i.value,
        // raw: i,
      })) || [];

      setCategoryOptions(res);
      setSelectedCategories([]); // Reset selection on group change
    } catch (error) {
      console.error('Failed to fetch Categories:', error);
      setCategoryOptions([]);
      setSelectedCategories([]); // Also reset on error
    }
  };

  fetchCategories();
}, [resourceType, selectedCategoryGroups]);


  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Top Controls */}
      <div className="flex space-x-4">
        {/* Resource Type Selector */}
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="blog">Blog</option>
            <option value="article">Article</option>
            <option value="manual">Manual</option>
          </select>
        </div>

        {/* Category Group */}
        <div className="w-1/4">
          <MultiSelect
            label="Category Group"
            options={categoryGroupOptions}
            selectedItems={selectedCategoryGroups}
            onChange={setSelectedCategoryGroups}
          />
        </div>

        {/* Category */}
        <div className="w-1/4">
          <MultiSelect
            label="Category"
            options={categoryOptions}
            selectedItems={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex space-x-4">
        {/* Left Panel */}
        <div className="w-1/4 space-y-4">
          {showChapters && (
            <div>
              <h3 className="font-semibold mb-2">Chapters</h3>
              <ul className="space-y-2">
                <li className="p-2 border rounded cursor-pointer hover:bg-gray-100">Chapter 1</li>
                <li className="p-2 border rounded cursor-pointer hover:bg-gray-100">Chapter 2</li>
              </ul>
            </div>
          )}

          {/* Tags */}
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

        {/* Right Panel */}
        <div className="w-3/4 space-y-4">
          <input type="text" placeholder="Title" className="border p-2 w-full rounded" />

          <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Add Section</button>

          <div className="border p-4 rounded bg-gray-50">
            <p>Section blocks like Files, Images, Links will appear here...</p>
          </div>

          <textarea placeholder="Summary" className="border p-2 w-full rounded h-24" />
        </div>
      </div>
    </div>
  );
}

export default ResourceCRUD;
