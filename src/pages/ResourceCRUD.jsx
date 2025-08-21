
// import { useEffect, useState } from 'react';
// import MultiSelect from '../components/atoms/headless/MultiSelect';
// import MultiSelectPillInput from '../components/atoms/headless/MultiSelectPillInput';
// import Select from '../components/atoms/headless/Select';
// import Comments from '../components/Comments';
// import { tagService, categoryGroupService, categoryService, resourceService } from '../services/kmService';
// import { useParams, useNavigate } from 'react-router-dom';

// function ResourceCRUD() {
//   const { resourceType: resourceTypeParam, resourceId: resourceIdParam } = useParams();
//   const navigate = useNavigate();

//   const isEditMode = !!resourceIdParam;
//   const [resourceId, setResourceId] = useState(resourceIdParam || null);
//   const [resourceType, setResourceType] = useState(resourceTypeParam || 'blog');
//   const [resourceTitle, setResourceTitle] = useState('');
//   const [summary, setSummary] = useState('');

//   const [tagOptions, setTagOptions] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);

//   const [categoryGroupOptions, setCategoryGroupOptions] = useState([]);
//   const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);

//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const showChapters = resourceType !== 'blog';

//   // Fetch existing resource in edit mode
//   useEffect(() => {
//     if (isEditMode) {
//       const fetchResource = async () => {
//         try {
//           const res = await resourceService.get(resourceTypeParam, resourceIdParam);
//           const data = res?.data?.data;
//           console.log('Fetched resource:', data);
//           setResourceTitle(data.resourceTitle || '');
//           setSummary(data.summary || '');
//           setResourceId(data.id);

//           // Metadata mapping
//           const tags = data.metadata?.Tags || [];
//           const categories = data.metadata?.Category || [];
//           const groupLabel = data.metadata?.CategoryGroup || null;

//           setSelectedTags(tags);
//           setSelectedCategories(categories);
//           setSelectedCategoryGroup(groupLabel);
//         } catch (error) {
//           console.error('Failed to fetch resource:', error);
//           alert('Error loading resource data.');
//         }
//       };
//       fetchResource();
//     }
//   }, [isEditMode, resourceTypeParam, resourceIdParam]);

//   // Fetch tag options
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const response = await tagService.getAllTags(resourceType);
//         const res = response?.data?.data?.map(i => ({
//           id: i.id,
//           tag_name: i.tagName
//         })) || [];
//         setTagOptions(res);
//         if (!isEditMode) setSelectedTags([]); // Clear for create
//       } catch (error) {
//         console.error('Failed to fetch tags:', error);
//         setTagOptions([]);
//         if (!isEditMode) setSelectedTags([]);
//       }
//     };
//     fetchTags();
//   }, [resourceType, isEditMode]);

//   // Fetch category groups
//   useEffect(() => {
//     const fetchCategoryGroups = async () => {
//       try {
//         const response = await categoryGroupService.getAllCategoryGroups(resourceType);
//         const res = response?.data?.data?.map(i => ({
//           label: i.groupName,
//           value: i.id
//         })) || [];
//         setCategoryGroupOptions(res);
//         if (!isEditMode) setSelectedCategoryGroup(null);
//       } catch (error) {
//         console.error('Failed to fetch groups:', error);
//         setCategoryGroupOptions([]);
//         if (!isEditMode) setSelectedCategoryGroup(null);
//       }
//     };
//     fetchCategoryGroups();
//   }, [resourceType, isEditMode]);

//   // Fetch categories for selected group
//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (!selectedCategoryGroup) {
//         setCategoryOptions([]);
//         setSelectedCategories([]);
//         return;
//       }
//       try {
//         const response = await categoryService.getAllCategories(resourceType, selectedCategoryGroup.value);
//         const res = response?.data?.data?.map(i => ({
//           label: i.category,
//           value: i.id
//         })) || [];
//         setCategoryOptions(res);
//         if (!isEditMode) setSelectedCategories([]);
//       } catch (error) {
//         console.error('Failed to fetch Categories:', error);
//         setCategoryOptions([]);
//         if (!isEditMode) setSelectedCategories([]);
//       }
//     };
//     fetchCategories();
//   }, [resourceType, selectedCategoryGroup, isEditMode]);

//   // Save or Update Resource
//   const handleSaveResource = async () => {
//     if (!resourceTitle.trim() || !summary.trim()) {
//       alert("Title and Summary are required.");
//       return;
//     }
//     if (selectedTags.length === 0) {
//       alert("Please select at least one tag.");
//       return;
//     }
//     if (selectedCategories.length === 0) {
//       alert("Please select at least one category.");
//       return;
//     }

//     const metadata = {
//       Tags: selectedTags||[],
//       CategoryGroup: selectedCategoryGroup || null,
//       Category: selectedCategories|| [],
//     };

//     const payload = {
//       resourceTitle,
//       summary,
//       resourceType,
//       metadata,
//       owners: [123], // mock owner
//       processMetadata: {},
//       createdBy: 1,
//       updatedBy: 1
//     };

//     try {
//       if (isEditMode) {
//         await resourceService.update(resourceType, resourceId, payload);
//         alert(`Resource updated (ID ${resourceId})`);
//       } else {
//         const generatedId = Math.floor(Math.random() * 10000);
//         await resourceService.create(resourceType, { ...payload, id: generatedId });
//         setResourceId(generatedId);
//         navigate(`/km/${resourceType}/${generatedId}/edit`);
//         alert(`Resource created (ID ${generatedId})`);
//       }
//     } catch (error) {
//       console.error('Error saving resource:', error);
//       alert('Failed to save resource.');
//     }
//   };

//   return (
//     <div className="flex flex-col p-4 space-y-4">
//       <div className="flex space-x-4">
//         <div className="w-1/4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//           <select
//             value={resourceType}
//             onChange={(e) => setResourceType(e.target.value)}
//             className="border p-2 rounded w-full"
//             disabled={isEditMode} // lock after creation
//           >
//             <option value="blog">Blog</option>
//             <option value="article">Article</option>
//             <option value="manual">Manual</option>
//           </select>
//         </div>

//         <div className="w-1/4">
//           <Select
//             id="categoryGroup"
//             label="Category Group"
//             value={selectedCategoryGroup?.value || ''}
//             onChange={(val) => {
//               const selected = categoryGroupOptions.find(opt => opt.value === val);
//               setSelectedCategoryGroup(selected || null);
//             }}
//             options={categoryGroupOptions}
//             placeholder="Select a group"
//           />
//         </div>

//         <div className="w-1/4">
//           <MultiSelect
//             label="Category"
//             options={categoryOptions}
//             selectedItems={selectedCategories}
//             onChange={setSelectedCategories}
//           />
//         </div>
//       </div>

//       <div className="flex space-x-4">
//         <div className="w-1/4 space-y-4">
//           {showChapters && (
//             <div>
//               <h3 className="font-semibold mb-2">Chapters</h3>
//               {resourceId ? (
//                 <ul className="space-y-2">
//                   <li className="p-2 border rounded cursor-pointer hover:bg-gray-100">Chapter 1</li>
//                   <li className="p-2 border rounded cursor-pointer hover:bg-gray-100">Chapter 2</li>
//                 </ul>
//               ) : (
//                 <p className="text-sm text-gray-500">Chapters will be available after saving the resource.</p>
//               )}
//             </div>
//           )}

//           <div>
//             <h3 className="font-semibold mb-2">Tags</h3>
//             <MultiSelectPillInput
//               label=""
//               options={tagOptions}
//               selectedItems={selectedTags}
//               onChange={setSelectedTags}
//             />
//           </div>
//         </div>

//         <div className="w-3/4 space-y-4">
//           <input
//             type="text"
//             placeholder="Title"
//             value={resourceTitle}
//             onChange={(e) => setResourceTitle(e.target.value)}
//             className="border p-2 w-full rounded"
//           />

//           <textarea
//             placeholder="Summary"
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             className="border p-2 w-full rounded h-24"
//           />

//           <button
//             className={`px-4 py-2 rounded text-white ${
//               resourceTitle && summary && selectedTags.length > 0 && selectedCategories.length > 0
//                 ? 'bg-green-500'
//                 : 'bg-gray-400 cursor-not-allowed'
//             }`}
//             disabled={!resourceTitle || !summary || selectedTags.length === 0 || selectedCategories.length === 0}
//             onClick={handleSaveResource}
//           >
//             {isEditMode ? "Update Resource" : "Save Resource"}
//           </button>
//         </div>
//       </div>

//       {isEditMode && (
//         <div className="mt-8 border-t pt-4">
//           <h2 className="text-lg font-semibold mb-2">Comments</h2>
//           <Comments
//             resourceType={resourceType}
//             resourceId={resourceId}
//             userId={"abcd"}
//             isUserResourceOwner={true}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ResourceCRUD;

// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Select from '../components/atoms/headless/Select';
// import MultiSelect from '../components/atoms/headless/MultiSelect';
// import ChapterCard from '../components/ChapterCard';
// import SectionCard from  '../components/SectionCard';
// import EditorSection from '../components/EditorSection';
// import TagValueInputDropdown from '../components/TagValueInputDropdown';
// import { categoryGroupService, categoryService, resourceService } from '../services/kmService';
// // import ChapterList from '../components/ChapterList';


// function ResourceCRUD() {
//   const { resourceType: resourceTypeParam, resourceId: resourceIdParam } = useParams();
//   const navigate = useNavigate();

//   const isEditMode = !!resourceIdParam;
//   const [resourceId, setResourceId] = useState(resourceIdParam || null);
//   const [resourceType, setResourceType] = useState(resourceTypeParam || 'blog');
//   const [resourceTitle, setResourceTitle] = useState('');

//   const [categoryGroupOptions, setCategoryGroupOptions] = useState([]);
//   const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);

//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const [selectedTags, setSelectedTags] = useState([]);

//   const [showBuilder, setShowBuilder] = useState(false); // Triggers post-creation layout

//   // Initial fetch if editing existing resource
//   useEffect(() => {
//     if (isEditMode) {
//       const fetchResource = async () => {
//         try {
//           const res = await resourceService.get(resourceTypeParam, resourceIdParam);
//           const data = res?.data?.data;
//           setResourceTitle(data.resourceTitle || '');
//           setResourceId(data.id);
//           setShowBuilder(true);

//           const groupLabel = data.metadata?.CategoryGroup || null;
//           const categories = data.metadata?.Category || [];
//           setSelectedCategoryGroup(groupLabel);
//           setSelectedCategories(categories);
//         } catch (error) {
//           alert('Failed to load resource.');
//         }
//       };
//       fetchResource();
//     }
//   }, [isEditMode, resourceTypeParam, resourceIdParam]);

//   // Fetch category groups
//   useEffect(() => {
//     const fetchGroups = async () => {
//       try {
//         const res = await categoryGroupService.getAllCategoryGroups(resourceType);
//         const data = res?.data?.data || [];
//         const mapped = data.map(i => ({ label: i.groupName, value: i.id }));
//         setCategoryGroupOptions(mapped);
//       } catch {
//         setCategoryGroupOptions([]);
//       }
//     };
//     fetchGroups();
//   }, [resourceType]);

//   // Fetch categories for selected group
//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (!selectedCategoryGroup) {
//         setCategoryOptions([]);
//         setSelectedCategories([]);
//         return;
//       }
//       try {
//         const res = await categoryService.getAllCategories(resourceType, selectedCategoryGroup.value);
//         const data = res?.data?.data || [];
//         const mapped = data.map(i => ({ label: i.category, value: i.id }));
//         setCategoryOptions(mapped);
//       } catch {
//         setCategoryOptions([]);
//         setSelectedCategories([]);
//       }
//     };
//     fetchCategories();
//   }, [resourceType, selectedCategoryGroup]);

//   const handleSave = async () => {
//     if (!resourceTitle.trim() || selectedCategories.length === 0) {
//       alert("Title and at least one category are required.");
//       return;
//     }

//     const metadata = {
//       CategoryGroup: selectedCategoryGroup || null,
//       Category: selectedCategories || [],
//     };

//     const payload = {
//       resourceTitle,
//       resourceType,
//       metadata,
//       owners: [123],
//       createdBy: 1,
//       updatedBy: 1
//     };

//     try {
//       if (isEditMode) {
//         await resourceService.update(resourceType, resourceId, payload);
//         alert(`Resource updated (ID ${resourceId})`);
//       } else {
//         const generatedId = Math.floor(Math.random() * 10000);
//         await resourceService.create(resourceType, { ...payload, id: generatedId });
//         setResourceId(generatedId);
//         setShowBuilder(true);
//         navigate(`/km/${resourceType}/${generatedId}/edit`);
//       }
//     } catch (error) {
//       alert('Failed to save resource.');
//     }

//   };

//   // --- Layout Before Creation ---
//   if (!isEditMode && !showBuilder) {
//     return (
//       <div className="p-4 space-y-4">
//         <div className="w-full">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//           <select
//             value={resourceType}
//             onChange={(e) => setResourceType(e.target.value)}
//             className="border p-2 rounded w-1/4"
//           >
//             <option value="blog">Blog</option>
//             <option value="article">Article</option>
//             <option value="manual">Manual</option>
//           </select>
//         </div>

//         <div className="flex space-x-4">
//           <div className="w-1/4">
//             <Select
//               id="categoryGroup"
//               label="Category Group"
//               value={selectedCategoryGroup?.value || ''}
//               onChange={(val) => {
//                 const selected = categoryGroupOptions.find(opt => opt.value === val);
//                 setSelectedCategoryGroup(selected || null);
//               }}
//               options={categoryGroupOptions}
//               placeholder="Select a group"
//             />
//           </div>

//           <div className="w-1/4">
//             <MultiSelect
//               label="Category"
//               options={categoryOptions}
//               selectedItems={selectedCategories}
//               onChange={setSelectedCategories}
//             />
//           </div>
//         </div>

//         <div className="w-2/3">
//           <input
//             type="text"
//             placeholder="Title"
//             value={resourceTitle}
//             onChange={(e) => setResourceTitle(e.target.value)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <button
//           className={`px-4 py-2 rounded text-white ${
//             resourceTitle && selectedCategories.length > 0
//               ? 'bg-green-500'
//               : 'bg-gray-400 cursor-not-allowed'
//           }`}
//           disabled={!resourceTitle || selectedCategories.length === 0}
//           onClick={handleSave}
//         >
//           Save Resource
//         </button>
//       </div>
//     );
//   }

//   // --- Layout After Creation ---
//   return (
//     <div className="flex p-4 space-x-4">
//       {/* Left Panel: Chapters (if not blog) */}
//       <div className="w-1/5 space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//           <select
//             value={resourceType}
//             disabled
//             className="border p-2 rounded w-full bg-gray-100 text-gray-500"
//           >
//             <option value="blog">Blog</option>
//             <option value="article">Article</option>
//             <option value="manual">Manual</option>
//           </select>
//         </div>

//         {resourceType !== 'blog' && (
//           <div>
//             <h3 className="font-semibold mb-2">Chapters</h3>
//             <ChapterCard resourceId={resourceId} resourceType={resourceType} />
//             {/* <ChapterCard/> */}
//             {/* <ChapterList resourceId={resourceId} resourceType={resourceType} /> */}
//           </div>
//         )}
//       </div>

//       {/* Center Panel: Builder */}
//       <div className="w-3/5 space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={resourceTitle}
//           onChange={(e) => setResourceTitle(e.target.value)}
//           className="border p-2 w-full rounded text-lg font-semibold"
//         />
//         <EditorSection resourceId={resourceId} resourceType={resourceType} />
//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded"
//           onClick={handleSave}
//         >
//           Save Changes
//         </button>
//       </div>

//       {/* Right Panel: Category, Tags */}
//       <div className="w-1/5 space-y-4">
//         <Select
//           id="categoryGroup"
//           label="Category Group"
//           value={selectedCategoryGroup?.value || ''}
//           onChange={(val) => {
//             const selected = categoryGroupOptions.find(opt => opt.value === val);
//             setSelectedCategoryGroup(selected || null);
//           }}
//           options={categoryGroupOptions}
//           placeholder="Select group"
//         />

//         <MultiSelect
//           label="Category"
//           options={categoryOptions}
//           selectedItems={selectedCategories}
//           onChange={setSelectedCategories}
//         />

//         <div>
          
//           <TagValueInputDropdown
//       resourceType={resourceTypeParam}
//       selectedTagsWithValues={selectedTags}
//       onChange={setSelectedTags}
//     />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResourceCRUD;

// Responsive and Structured UI: Only className and layout fixes
// All logic untouched

// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Select from '../components/atoms/headless/Select';
// import MultiSelect from '../components/atoms/headless/MultiSelect';
// import ChapterCard from '../components/ChapterCard';
// import SectionCard from '../components/SectionCard';
// import TagValueInputDropdown from '../components/TagValueInputDropdown';
// import { categoryGroupService, categoryService, resourceService } from '../services/kmService';

// function ResourceCRUD() {
//   const { resourceType: resourceTypeParam, resourceId: resourceIdParam } = useParams();
//   const navigate = useNavigate();

//   const isEditMode = !!resourceIdParam;
//   const [resourceId, setResourceId] = useState(resourceIdParam || null);
//   const [resourceType, setResourceType] = useState(resourceTypeParam || 'blog');
//   const [resourceTitle, setResourceTitle] = useState('');

//   const [categoryGroupOptions, setCategoryGroupOptions] = useState([]);
//   const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);

//   const [showBuilder, setShowBuilder] = useState(false);

//   // Sections state
//   const [sections, setSections] = useState([]);

//   const handleAddSection = () => {
//     const newSection = {
//       id: Date.now(),
//       section_title: '',
//       section_type: 'text',
//       section_content: {},
//       files: [],
//     };
//     setSections(prev => [...prev, newSection]);
//   };

//   const handleSectionSave = (updatedSection) => {
//     setSections(prev => prev.map(sec => sec.id === updatedSection.section_id ? updatedSection : sec));
//   };

//   const handleSectionDelete = (sectionId) => {
//     setSections(prev => prev.filter(sec => sec.id !== sectionId));
//   };

//   useEffect(() => {
//     if (isEditMode) {
//       const fetchResource = async () => {
//         try {
//           const res = await resourceService.get(resourceTypeParam, resourceIdParam);
//           const data = res?.data?.data;
//           setResourceTitle(data.resourceTitle || '');
//           setResourceId(data.id);
//           setShowBuilder(true);

//           const groupLabel = data.metadata?.CategoryGroup || null;
//           const categories = data.metadata?.Category || [];
//           setSelectedCategoryGroup(groupLabel);
//           setSelectedCategories(categories);
//         } catch {
//           alert('Failed to load resource.');
//         }
//       };
//       fetchResource();
//     }
//   }, [isEditMode, resourceTypeParam, resourceIdParam]);

//   useEffect(() => {
//     const fetchGroups = async () => {
//       try {
//         const res = await categoryGroupService.getAllCategoryGroups(resourceType);
//         const data = res?.data?.data || [];
//         const mapped = data.map(i => ({ label: i.groupName, value: i.id }));
//         setCategoryGroupOptions(mapped);
//       } catch {
//         setCategoryGroupOptions([]);
//       }
//     };
//     fetchGroups();
//   }, [resourceType]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (!selectedCategoryGroup) {
//         setCategoryOptions([]);
//         setSelectedCategories([]);
//         return;
//       }
//       try {
//         const res = await categoryService.getAllCategories(resourceType, selectedCategoryGroup.value);
//         const data = res?.data?.data || [];
//         const mapped = data.map(i => ({ label: i.category, value: i.id }));
//         setCategoryOptions(mapped);
//       } catch {
//         setCategoryOptions([]);
//         setSelectedCategories([]);
//       }
//     };
//     fetchCategories();
//   }, [resourceType, selectedCategoryGroup]);

//   const handleSave = async () => {
//     if (!resourceTitle.trim() || selectedCategories.length === 0) {
//       alert("Title and at least one category are required.");
//       return;
//     }

//     const metadata = {
//       CategoryGroup: selectedCategoryGroup || null,
//       Category: selectedCategories || [],
//     };

//     const payload = {
//       resourceTitle,
//       resourceType,
//       metadata,
//       owners: [123],
//       createdBy: 1,
//       updatedBy: 1
//     };

//     try {
//       if (isEditMode) {
//         await resourceService.update(resourceType, resourceId, payload);
//         alert(`Resource updated (ID ${resourceId})`);
//       } else {
//         const generatedId = Math.floor(Math.random() * 10000);
//         await resourceService.create(resourceType, { ...payload, id: generatedId });
//         setResourceId(generatedId);
//         setShowBuilder(true);
//         navigate(`/km/${resourceType}/${generatedId}/edit`);
//       }
//     } catch {
//       alert('Failed to save resource.');
//     }
//   };

//   if (!isEditMode && !showBuilder) {
//     return (
//       <div className="p-4 space-y-4 max-w-6xl mx-auto">
//         <div className="flex flex-wrap gap-4 items-end">
//           <div className="w-48">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//             <select
//               value={resourceType}
//               onChange={(e) => setResourceType(e.target.value)}
//               className="border p-2 rounded w-full"
//             >
//               <option value="blog">Blog</option>
//               <option value="article">Article</option>
//               <option value="manual">Manual</option>
//             </select>
//           </div>

//           <div className="w-64">
//             <Select
//               id="categoryGroup"
//               label="Category Group"
//               value={selectedCategoryGroup?.value || ''}
//               onChange={(val) => {
//                 const selected = categoryGroupOptions.find(opt => opt.value === val);
//                 setSelectedCategoryGroup(selected || null);
//               }}
//               options={categoryGroupOptions}
//               placeholder="Select a group"
//             />
//           </div>

//           <div className="w-64">
//             <MultiSelect
//               label="Category"
//               options={categoryOptions}
//               selectedItems={selectedCategories}
//               onChange={setSelectedCategories}
//             />
//           </div>
//         </div>

//         <div className="w-full">
//           <input
//             type="text"
//             placeholder="Title"
//             value={resourceTitle}
//             onChange={(e) => setResourceTitle(e.target.value)}
//             className="border p-2 w-full rounded"
//           />
//         </div>

//         <button
//           className={`px-4 py-2 rounded text-white ${resourceTitle && selectedCategories.length > 0 ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
//           disabled={!resourceTitle || selectedCategories.length === 0}
//           onClick={handleSave}
//         >
//           Save Resource
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col lg:flex-row p-4 gap-4 max-w-7xl mx-auto">
//       <div className="lg:w-1/5 w-full space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//           <select
//             value={resourceType}
//             disabled
//             className="border p-2 rounded w-full bg-gray-100 text-gray-500"
//           >
//             <option value="blog">Blog</option>
//             <option value="article">Article</option>
//             <option value="manual">Manual</option>
//           </select>
//         </div>

//         {resourceType !== 'blog' && (
//           <div className="overflow-y-auto max-h-[60vh]">
//             <h3 className="font-semibold mb-2">Chapters</h3>
//             <ChapterCard resourceId={resourceId} resourceType={resourceType} />
//           </div>
//         )}
//       </div>

//       <div className="lg:w-3/5 w-full space-y-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">TITLE</label>
//         <input
//           type="text"
//           placeholder="Title"
//           value={resourceTitle}
//           onChange={(e) => setResourceTitle(e.target.value)}
//           className="border p-2 w-full rounded text-lg font-semibold"
//         />

//         {sections.map(section => (
//           <SectionCard
//             key={section.id}
//             sectionId={section.id}
//             sectionData={section}
//             onSave={handleSectionSave}
//             onDelete={() => handleSectionDelete(section.id)}
//           />
//         ))}

//         <button
//           onClick={handleAddSection}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           + Add Section
//         </button>

//         <button
//           className="px-4 py-2 bg-green-500 text-white rounded"
//           onClick={handleSave}
//         >
//           Save Changes
//         </button>
//       </div>

//       <div className="lg:w-1/5 w-full space-y-4">
//         <Select
//           id="categoryGroup"
//           label="Category Group"
//           value={selectedCategoryGroup?.value || ''}
//           onChange={(val) => {
//             const selected = categoryGroupOptions.find(opt => opt.value === val);
//             setSelectedCategoryGroup(selected || null);
//           }}
//           options={categoryGroupOptions}
//           placeholder="Select group"
//         />

//         <MultiSelect
//           label="Category"
//           options={categoryOptions}
//           selectedItems={selectedCategories}
//           onChange={setSelectedCategories}
//         />

//         <TagValueInputDropdown
//           resourceType={resourceTypeParam}
//           selectedTagsWithValues={selectedTags}
//           onChange={setSelectedTags}
//         />
//       </div>
//     </div>
//   );
// }

// export default ResourceCRUD;

// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Select from '../components/atoms/headless/Select';
// import MultiSelect from '../components/atoms/headless/MultiSelect';
// import ChapterCard from '../components/ChapterCard';
// import SectionCard from '../components/SectionCard';
// import TagValueInputDropdown from '../components/TagValueInputDropdown';
// import Comments from '../components/Comments';
// import RatingStars from '../components/atoms/media&display/RatingStars';
// import { categoryGroupService, categoryService, resourceService } from '../services/kmService';

// function ResourceCRUD() {
//   const { resourceType: resourceTypeParam, resourceId: resourceIdParam } = useParams();
//   const navigate = useNavigate();

//   const isEditMode = !!resourceIdParam;
//   const [resourceId, setResourceId] = useState(resourceIdParam || null);
//   const [resourceType, setResourceType] = useState(resourceTypeParam || 'blog');
//   const [resourceTitle, setResourceTitle] = useState('');

//   const [categoryGroupOptions, setCategoryGroupOptions] = useState([]);
//   const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedTags, setSelectedTags] = useState([]);

//   const [showBuilder, setShowBuilder] = useState(false);
//   const [sections, setSections] = useState([]);
  

//   // Likes and Rating
//   const [likeCount, setLikeCount] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const [rating, setRating] = useState(0);

//   const userId = 'abcd'; // Mock user
//   const isUserResourceOwner = true; // Mock ownership

  
//   useEffect(() => {
//     if (isEditMode) {
//       const fetchResource = async () => {
//         try {
//           const res = await resourceService.get(resourceTypeParam, resourceIdParam);
//           const data = res?.data?.data;
//           setResourceTitle(data.resourceTitle || '');
//           setResourceId(data.id);
//           setShowBuilder(true);

//           const groupLabel = data.metadata?.CategoryGroup || null;
//           const categories = data.metadata?.Category || [];
//           setSelectedCategoryGroup(groupLabel);
//           setSelectedCategories(categories);
//         } catch {
//           alert('Failed to load resource.');
//         }
//       };
//       fetchResource();
//     }
//   }, [isEditMode, resourceTypeParam, resourceIdParam]);

//   useEffect(() => {
//     const fetchGroups = async () => {
//       try {
//         const res = await categoryGroupService.getAllCategoryGroups(resourceType);
//         const data = res?.data?.data || [];
//         const mapped = data.map(i => ({ label: i.groupName, value: i.id }));
//         setCategoryGroupOptions(mapped);
//       } catch {
//         setCategoryGroupOptions([]);
//       }
//     };
//     fetchGroups();
//   }, [resourceType]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (!selectedCategoryGroup) {
//         setCategoryOptions([]);
//         setSelectedCategories([]);
//         return;
//       }
//       try {
//         const res = await categoryService.getAllCategories(resourceType, selectedCategoryGroup.value);
//         const data = res?.data?.data || [];
//         const mapped = data.map(i => ({ label: i.category, value: i.id }));
//         setCategoryOptions(mapped);
//       } catch {
//         setCategoryOptions([]);
//         setSelectedCategories([]);
//       }
//     };
//     fetchCategories();
//   }, [resourceType, selectedCategoryGroup]);

//   const handleSave = async () => {
//     if (!resourceTitle.trim() || selectedCategories.length === 0) {
//       alert("Title and at least one category are required.");
//       return;
//     }
//     const metadata = {
//       CategoryGroup: selectedCategoryGroup || null,
//       Category: selectedCategories || [],
//     };
//     const payload = {
//       resourceTitle,
//       resourceType,
//       metadata,
//       owners: [123],
//       createdBy: 1,
//       updatedBy: 1
//     };
//     try {
//       if (isEditMode) {
//         await resourceService.update(resourceType, resourceId, payload);
//         alert(`Resource updated (ID ${resourceId})`);
//       } else {
//         const generatedId = Math.floor(Math.random() * 10000);
//         await resourceService.create(resourceType, { ...payload, id: generatedId });
//         setResourceId(generatedId);
//         setShowBuilder(true);
//         navigate(`/km/${resourceType}/${generatedId}/edit`);
//       }
//     } catch {
//       alert('Failed to save resource.');
//     }
//   };

//   const handleLikeToggle = () => {
//     setLiked(prev => !prev);
//     setLikeCount(prev => liked ? prev - 1 : prev + 1);
//   };

//   // ----------------------- Resource Creation-----------------------
//   if (!isEditMode && !showBuilder) {
//     return (
//       <div className="p-4 space-y-4 max-w-6xl mx-auto">
//         <div className="flex flex-wrap gap-4 items-end">
//           <div className="w-48">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//             <select
//               value={resourceType}
//               onChange={(e) => setResourceType(e.target.value)}
//               className="border p-2 rounded w-full"
//             >
//               <option value="blog">Blog</option>
//               <option value="article">Article</option>
//               <option value="manual">Manual</option>
//             </select>
//           </div>
//           <div className="w-64">
//             <Select
//               id="categoryGroup"
//               label="Category Group"
//               value={selectedCategoryGroup?.value || ''}
//               onChange={(val) => {
//                 const selected = categoryGroupOptions.find(opt => opt.value === val);
//                 setSelectedCategoryGroup(selected || null);
//               }}
//               options={categoryGroupOptions}
//               placeholder="Select a group"
//             />
//           </div>
//           <div className="w-64">
//             <MultiSelect
//               label="Category"
//               options={categoryOptions}
//               selectedItems={selectedCategories}
//               onChange={setSelectedCategories}
//             />
//           </div>
//         </div>
//         <div className="w-full">
//           <input
//             type="text"
//             placeholder="Title"
//             value={resourceTitle}
//             onChange={(e) => setResourceTitle(e.target.value)}
//             className="border p-2 w-full rounded"
//           />
//         </div>
//         <button
//           className={`px-4 py-2 rounded text-white ${resourceTitle && selectedCategories.length > 0 ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
//           disabled={!resourceTitle || selectedCategories.length === 0}
//           onClick={handleSave}
//         >
//           Save Resource
//         </button>
//       </div>
//     );
//   }

//   // ----------------------- AFTER Resource Id Created -----------------------
//   return (
//     <div className="flex flex-col p-4 gap-4 max-w-7xl mx-auto">
//       <div className="flex flex-col lg:flex-row gap-4">
//         {/* Left Sticky Panel */}
//         <div className="lg:w-1/5 w-full space-y-4 sticky top-0 self-start h-fit">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
//           <select
//             value={resourceType}
//             disabled
//             className="border p-2 rounded w-full bg-gray-100 text-gray-500"
//           >
//             <option value="blog">Blog</option>
//             <option value="article">Article</option>
//             <option value="manual">Manual</option>
//           </select>
//           {resourceType !== 'blog' && (
//             <div className="overflow-y-auto max-h-[60vh]">
//               <h3 className="font-semibold mb-2">Chapters</h3>
//               <ChapterCard resourceId={resourceId} resourceType={resourceType}/>
//             </div>
//           )}
//         </div>

//         {/* Center Panel */}
//         <div className="lg:w-3/5 w-full space-y-4 mt-0">
//           <label className="block text-sm font-medium text-gray-700 mb-1">TITLE</label>

//           <input
//             type="text"
//             placeholder="Title"
//             value={resourceTitle}
//             onChange={(e) => setResourceTitle(e.target.value)}
//             className="border p-2 w-full rounded text-lg font-semibold"
//           />
//         </div>

//         {/* Right Sticky Panel */}
//         <div className="lg:w-1/5 w-full space-y-4 sticky top-0 self-start h-fit">
//           <Select
//             id="categoryGroup"
//             label="Category Group"
//             value={selectedCategoryGroup?.value || ''}
//             onChange={(val) => {
//               const selected = categoryGroupOptions.find(opt => opt.value === val);
//               setSelectedCategoryGroup(selected || null);
//             }}
//             options={categoryGroupOptions}
//             placeholder="Select group"
//           />
//           <MultiSelect
//             label="Category"
//             options={categoryOptions}
//             selectedItems={selectedCategories}
//             onChange={setSelectedCategories}
//           />
//           <TagValueInputDropdown
//             resourceType={resourceTypeParam}
//             selectedTagsWithValues={selectedTags}
//             onChange={setSelectedTags}
//           />
//           <button
//             onClick={handleLikeToggle}
//             className={`w-full px-4 py-2 text-white text-sm rounded transition duration-200 ${
//               liked ? "bg-red-600" : "bg-red-500 hover:bg-red-600"
//             }`}
//           >
//             {liked ? "❤️ Liked" : "🤍 Like"}
//           </button>
//           <div className="text-center text-sm text-gray-600">
//             {likeCount} {likeCount === 1 ? "like" : "likes"}
//           </div>
//           <div className="mt-2">
//             <RatingStars value={rating} onChange={setRating} />
//           </div>
//         </div>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-4">Comments</h3>
//         <Comments
//           resourceType={resourceType}
//           resourceId={resourceId}
//           userId={userId}
//           isUserResourceOwner={isUserResourceOwner}
//         />
//       </div>
//     </div>
//   );
// }

// export default ResourceCRUD;

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from '../components/atoms/headless/Select';
import MultiSelect from '../components/atoms/headless/MultiSelect';
import ChapterCard from '../components/ChapterCard';
import SectionCard from '../components/SectionCard';
import DropDownButton from '../components/atoms/headless/DropDownButton';
import TagValueInputDropdown from '../components/TagValueInputDropdown';
import Comments from '../components/Comments';
import RatingStars from '../components/atoms/media&display/RatingStars';
import axios from 'axios';
import { categoryGroupService, categoryService, resourceService, chapterService } from '../services/kmService';

function ResourceCRUD() {
  const { resourceType: resourceTypeParam, resourceId: resourceIdParam } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!resourceIdParam;
  const [resourceId, setResourceId] = useState(resourceIdParam || null);
  const [resourceType, setResourceType] = useState(resourceTypeParam || 'blog');
  const [resourceTitle, setResourceTitle] = useState('');
  const[processStatus, setProcessStatus] = useState('DRAFT'); // New state for process status
  const [status, setStatus] = useState('ACTIVE'); // New state for status

  const [categoryGroupOptions, setCategoryGroupOptions] = useState([]);
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTagsWithValues, setSelectedTagsWithValues] = useState([]);

  const [showBuilder, setShowBuilder] = useState(false);

  const [newSections, setNewSections] = useState([]); // holds multiple unsaved section forms
  const [sections, setSections] = useState([]);
  const [selectedChapterId, setSelectedChapterId] = useState(null);

  useEffect(() => {
  if (!resourceType || !resourceId) return;

  const fetchAssignedTags = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9098/km/${resourceType}/${resourceId}/tags`
      );
      const assigned =
        res?.data?.data?.map((t) => ({
          tag_id: t.tagId || t.tag_id,
          tag_name: t.tag?.tagName || t.tag?.tag_name,
          tag_values: t.tagValues || t.tag_values || [],
        })) || [];
      setSelectedTagsWithValues(assigned);
    } catch (err) {
      console.error("Failed to fetch assigned tags", err);
    }
  };

  fetchAssignedTags();
}, [resourceType, resourceId]);


const fetchSectionsForChapter = async (chapterId) => {
  if (!chapterId || !resourceType) return;
  try {
    const res = await axios.get(`http://localhost:9098/km/${resourceType}/chapter/${chapterId}/sections`);
    setSections(res?.data?.data || []);
  } catch (error) {
    console.error("Failed to fetch sections:", error);
    setSections([]);
  }
};

useEffect(() => {
    if (!resourceId || resourceType !== "blog") return;

    const fetchBlogChapter = async () => {
      try {
        const res = await chapterService.getAll(resourceType, resourceId);
        const chapters = res?.data?.data || [];
        if (chapters.length > 0) {
          const blogChapter = chapters[0]; // only 1 auto-created
          setSelectedChapterId(blogChapter.id);
          fetchSectionsForChapter(blogChapter.id);
        }
      } catch (err) {
        console.error("Failed to fetch blog chapter", err);
      }
    };

    fetchBlogChapter();
  }, [resourceId, resourceType]);

const handleAddSectionForm = () => {
  setNewSections(prev => [
    ...prev,
    { id: null, sectionTitle: "", tempId: Math.random() }
  ]);
};

const handleNewSectionSaved = (savedSection, tempId) => {
  setNewSections(prev => prev.filter(sec => sec.tempId !== tempId));
  fetchSectionsForChapter(selectedChapterId);
};

const handleNewSectionDeleted = (tempId) => {
  setNewSections(prev => prev.filter(sec => sec.tempId !== tempId));
};



  
  // Likes and Rating
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [rating, setRating] = useState(0);

  const userId = 124; // Mock user
  const isUserResourceOwner = true; // Mock ownership

  useEffect(() => {
    if (isEditMode) {
      const fetchResource = async () => {
        try {
          const res = await resourceService.get(resourceTypeParam, resourceIdParam);
          const data = res?.data?.data;
          setResourceTitle(data.resourceTitle || '');
          setResourceId(data.id);
          setShowBuilder(true);

          const groupLabel = data.metadata?.CategoryGroup || null;
          const categories = data.metadata?.Category || [];
          setSelectedCategoryGroup(groupLabel);
          setSelectedCategories(categories);
        } catch {
          alert('Failed to load resource.');
        }
      };
      fetchResource();
    }
  }, [isEditMode, resourceTypeParam, resourceIdParam]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await categoryGroupService.getAllCategoryGroups(resourceType);
        const data = res?.data?.data || [];
        const mapped = data.map(i => ({ label: i.groupName, value: i.id }));
        setCategoryGroupOptions(mapped);
      } catch {
        setCategoryGroupOptions([]);
      }
    };
    fetchGroups();
  }, [resourceType]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!selectedCategoryGroup) {
        setCategoryOptions([]);
        setSelectedCategories([]);
        return;
      }
      try {
        const res = await categoryService.getAllCategories(resourceType, selectedCategoryGroup.value);
        const data = res?.data?.data || [];
        const mapped = data.map(i => ({ label: i.category, value: i.id }));
        setCategoryOptions(mapped);
      } catch {
        setCategoryOptions([]);
        setSelectedCategories([]);
      }
    };
    fetchCategories();
  }, [resourceType, selectedCategoryGroup]);

  const handleSave = async () => {
    if (!resourceTitle.trim() || selectedCategories.length === 0) {
      alert("Title and at least one category are required.");
      return;
    }
    const metadata = {
      CategoryGroup: selectedCategoryGroup || null,
      Category: selectedCategories || [],
    };
    const payload = {
      resourceTitle,
      resourceType,
      metadata,
      owners: [123],
      processStatus,
      status,
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
        setShowBuilder(true);
        navigate(`/km/${resourceType}/${generatedId}/edit`);
      }
    } catch {
      alert('Failed to save resource.');
    }
  };

  const handleLikeToggle = async () => {
  try {
    if (liked) {
      await resourceService.unlike(resourceType, resourceId, userId);
      setLikeCount(prev => Math.max(prev - 1, 0));
      setLiked(false);
    } else {
      await resourceService.like(resourceType, resourceId, userId);
      setLikeCount(prev => prev + 1);
      setLiked(true);
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    alert("Something went wrong while updating like status.");
  }
};
  
  // ----------------------- Resource Creation UI -----------------------
  if (!isEditMode && !showBuilder) {
    return (
      <div className="p-4 space-y-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="w-48">
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
          <div className="w-64">
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
          <div className="w-64">
            <MultiSelect
              label="Category"
              options={categoryOptions}
              selectedItems={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div>
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Title"
            value={resourceTitle}
            onChange={(e) => setResourceTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <button
          className={`px-4 py-2 rounded text-white ${resourceTitle && selectedCategories.length > 0 ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!resourceTitle || selectedCategories.length === 0}
          onClick={handleSave}
        >
          Save Resource
        </button>
      </div>
    );
  }

  // ----------------------- AFTER Resource Id Created -----------------------
  return (
    <div className="flex flex-col p-4 gap-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left Sticky Panel */}
        <div className="lg:w-1/5 w-full space-y-4 sticky top-0 self-start h-fit">
          <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type</label>
          <select
            value={resourceType}
            disabled
            className="border p-2 rounded w-full bg-gray-100 text-gray-500"
          >
            <option value="blog">Blog</option>
            <option value="article">Article</option>
            <option value="manual">Manual</option>
          </select>
          {resourceType !== 'blog' && (
            <div className="overflow-y-auto max-h-[60vh]">
              <h3 className="font-semibold mb-2">Chapters</h3>
              <ChapterCard
                resourceId={resourceId}
                resourceType={resourceType}
                onChaptersChange={() => {}}
                onSelectChapter={(chapterId) => {
        setSelectedChapterId(chapterId);
        fetchSectionsForChapter(chapterId);
    }}
              />
            </div>
          )}
        </div>

        {/* Center Panel */}
        <div className="lg:w-3/5 w-full space-y-4 mt-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">TITLE</label>

          <input
            type="text"
            placeholder="Title"
            value={resourceTitle}
            onChange={(e) => setResourceTitle(e.target.value)}
            className="border p-2 w-full rounded text-lg font-semibold"
          />

          

    {selectedChapterId && (
      <div className="flex items-center justify-between mt-4">
        <h3 className="font-semibold mb-2">Sections</h3>
        <button
          onClick={handleAddSectionForm}
          className="text-white bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold"
          title="Add new section"
        >
          +
        </button>
      </div>
    )}

    {/* Render unsaved section forms */}
    {selectedChapterId &&
      newSections.map(sec => (
        <div key={sec.tempId} className="mt-2">
          <SectionCard
            sectionData={sec}
            resourceType={resourceType}
            chapterId={selectedChapterId}
            onSaved={(data) => handleNewSectionSaved(data, sec.tempId)}
            onDeleted={() => handleNewSectionDeleted(sec.tempId)}
          />
        </div>
      ))}

    {/* Render saved sections */}
    {selectedChapterId && sections.length > 0 && (
      <div className="mt-4 space-y-4">
        <h3 className="font-semibold mb-2">Existing Sections</h3>
        {sections.map(section => (
          <SectionCard
            key={section?.id}
            sectionData={section}
            resourceType={resourceType}
            chapterId={selectedChapterId}
            onSaved={() => fetchSectionsForChapter(selectedChapterId)}
            onDeleted={() => fetchSectionsForChapter(selectedChapterId)}
          />
        ))}
      </div>
    )}

    {/* ---- Update button (AFTER resource is created) ---- */}
<div className="mt-6 border-t pt-4 flex justify-end">
  <button
    onClick={handleSave} // reuses your existing create/update logic
    disabled={
      !resourceTitle?.trim() ||
      selectedCategories.length === 0 ||
      !processStatus ||
      !status
    }
    className={`px-4 py-2 rounded text-white
      ${
        !resourceTitle?.trim() || selectedCategories.length === 0 || !processStatus || !status
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
  >
    Update Resource
  </button>
</div>


        </div>

        {/* Right Sticky Panel */}
        <div className="lg:w-1/5 w-full space-y-4 sticky top-0 self-start h-fit">
          <Select
            id="categoryGroup"
            label="Category Group"
            value={selectedCategoryGroup?.value || ''}
            onChange={(val) => {
              const selected = categoryGroupOptions.find(opt => opt.value === val);
              setSelectedCategoryGroup(selected || null);
            }}
            options={categoryGroupOptions}
            placeholder="Select group"
          />
          <MultiSelect
            label="Category"
            options={categoryOptions}
            selectedItems={selectedCategories}
            onChange={setSelectedCategories}
          />
          <TagValueInputDropdown
            resourceType={resourceTypeParam}
            resourceId={resourceId} 
            selectedTagsWithValues={selectedTagsWithValues}
            onChange={setSelectedTagsWithValues}
          />
          <button
            onClick={handleLikeToggle}
            className={`w-full px-4 py-2 text-white text-sm rounded transition duration-200 ${
              liked ? "bg-red-600" : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>
          <div className="text-center text-sm text-gray-600">
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </div>
          <div className="mt-2">
            <RatingStars
              value={rating}
              onChange={setRating}
              resourceType={resourceType} // 
              resourceId={resourceId} // 
              userId={userId} //
            />
          </div>

         <div className="flex gap-1 p-0">
      {/* Process Status */}
      <DropDownButton
        
        label="Process Status"
        value={processStatus}
        onChange={setProcessStatus}
        options={[
          { label: "DRAFT", value: "DRAFT" },
          { label: "POST", value: "POST" },
        ]}
      />

      {/* Status */}
      <DropDownButton
      
        label="Status"
        value={status}
        onChange={setStatus}
        options={[
          { label: "ACTIVE", value: "ACTIVE" },
          { label: "INACTIVE", value: "INACTIVE" },
        ]}
      />
    </div>
        </div>

        
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <Comments
          resourceType={resourceType}
          resourceId={resourceId}
          userId={userId}
          isUserResourceOwner={isUserResourceOwner}
        />
      </div>
    </div>
  );
}

export default ResourceCRUD;
