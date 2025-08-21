import axios from 'axios';

const API_BASE_URL = 'http://localhost:9098/km';


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};



const tagService = {
  getAllTags: (resource_type) =>
    apiClient.get(`/${resource_type}/admin/tags`),

  create: (resource_type, data) =>
    apiClient.post(`/${resource_type}/admin/tag`, data),

  update: (resource_type, id, data) =>
    apiClient.put(`/${resource_type}/admin/tag/${id}`, data),

  // future use
//   getById: (resource_type, id) => {
//     console.warn("GET by ID not supported in current API spec.");
//     return Promise.reject("Not implemented");
//   },

//   delete: (resource_type, id) => {
//     console.warn("DELETE not supported in current API spec.");
//     return Promise.reject("Not implemented");
//   }
};

//CategoryGroups
const categoryGroupService = {
  getAllCategoryGroups: (resource_type) => apiClient.get(`/${resource_type}/admin/category-groups`),
  
  create: (data) => apiClient.post(`/${resource_type}/admin/category-group`, data),
  
};
//categories
const categoryService = {
  getAllCategories: (resource_type,category_group_id) => apiClient.get(`/${resource_type}/admin/${category_group_id}/categories`),
//  getAllCategories: (resource_type, groupIdsArray) =>
//     apiClient.get(`/${resource_type}/admin/categories`, {
//       params: {
//         group_ids: groupIdsArray.join(','), // Send comma-separated group IDs
//       },
//     }),
  create: (resource_type, category_group_id, data) => apiClient.post(`/${resource_type}/admin/${category_group_id}/category`, data),
  update: (id,resource_type, category_group_id, data) => apiClient.put(`/${resource_type}/admin/${category_group_id}/category/${id}`, data),
  
};


//resouce Service

const resourceService = {
  // Basic CRUD 
  create: (resource_type, data) => apiClient.post(`/${resource_type}/create`, data),
  update: (resource_type, resource_id, data) => apiClient.put(`/${resource_type}/${resource_id}/update`, data),
  get: (resource_type, resource_id) => apiClient.get(`/${resource_type}/${resource_id}`),
  delete: (resource_type, resource_id) => apiClient.delete(`/${resource_type}/${resource_id}`),
  list: (resource_type) => apiClient.get(`/${resource_type}/list`),
  
  // Search 
  search: (resource_type, filters) => apiClient.get(`/${resource_type}/search`, { params: filters }),
  
  // Versioning operations
  clone: (resource_type, resource_id, data) => apiClient.post(`/${resource_type}/${resource_id}/clone`, data),
  getVersions: (resource_type, resource_id) => apiClient.get(`/${resource_type}/${resource_id}/versions`),
  getLatest: (resource_type, resource_id) => apiClient.get(`/${resource_type}/${resource_id}/latest`),
  
  // Status management
  updateStatus: (resource_type, resource_id, data) => apiClient.put(`/${resource_type}/${resource_id}/status`, data),
  updateProcessStatus: (resource_type, resource_id, data) => apiClient.put(`/${resource_type}/${resource_id}/process-status`, data),

  // Resource-Tag
  getMasterTags: (resource_type) => apiClient.get(`/${resource_type}/tags`),
  assignTags: (resource_type, resource_id) => apiClient.post(`/${resource_type}/${resource_id}/tags`, payload),
  getAssignedTags: (resource_type, resource_id) => apiClient.get(`/${resource_type}/${resource_id}/tags`),

  // Resource-Category
  getMasterCategories: (resource_type) => apiClient.get(`/${resource_type}/categories`),
  assignCategories: (resource_type, resource_id, categories) => apiClient.post(`/${resource_type}/${resource_id}/categories`, { categories }),
  getAssignedCategories: (resource_type, resource_id) => apiClient.get(`/${resource_type}/${resource_id}/categories`),
  
  //Comments
  addComment: (resource_type, resource_id, comment) =>
  apiClient.post(`/${resource_type}/${resource_id}/comment`, comment),

  getComments: (resource_type, resource_id) =>
    apiClient.get(`/${resource_type}/${resource_id}/comments`),

  deleteComment: (commentId, userId) =>
    apiClient.delete(`/comment/${commentId}`, { params: { userId } }),

  editComment: (commentId, data) =>
    apiClient.put(`${baseURL}/comment/${commentId}`, data).then((res) => res.data), // assuming you’ll wire this

  

  // Ratings
  addRating: (resource_type, resource_id, rating, userId) => 
    apiClient.post(`/${resource_type}/${resource_id}/rating`, null, { 
      params: { userId, rating } 
    }),
  
  getRatings: (resource_type, resource_id) => 
    apiClient.get(`/${resource_type}/${resource_id}/ratings`),

  // Likes
  like: (resource_type, resource_id, userId) => 
    apiClient.post(`/${resource_type}/${resource_id}/like`, null, { 
      params: { userId } 
    }),
  
  unlike: (resource_type, resource_id, userId) => 
    apiClient.post(`/${resource_type}/${resource_id}/unlike`, null, { 
      params: { userId } 
    }),
  getLikes: (resource_type, resource_id) =>
     apiClient.get(`/${resource_type}/${resource_id}/likes`).then(res => res.data),

  checkLike: (blogId, userId) => apiClient.get(`/${resource_type}/${resource_id}/hasLiked`, { 
    params: { userId } }).then(res => res.data),



  // Views
  trackView: (resource_type, resource_id) => 
    apiClient.post(`/${resource_type}/${resource_id}/view`),

  // Bookmarks
  addBookmark: (resource_type, resource_id, userId) => 
    apiClient.post(`/${resource_type}/${resource_id}/bookmark`, null, { 
      params: { userId } 
    }),
  
  removeBookmark: (resource_type, resource_id, userId) => 
    apiClient.delete(`/${resource_type}/${resource_id}/bookmark`, { 
      params: { userId } 
    })
};

//Chapter Service
const chapterService = {
  // Basic CRUD 
  create: (resource_type, resource_id, data) => 
    apiClient.post(`/${resource_type}/${resource_id}/chapter/create`, data),
  
  getAll: (resource_type, resource_id) => 
    apiClient.get(`/${resource_type}/${resource_id}/chapters`),
  
  getById: (resource_type, chapter_id) => 
    apiClient.get(`/${resource_type}/chapter/${chapter_id}`),
  
  update: (resource_type, chapter_id, data) => 
    apiClient.put(`/${resource_type}/chapter/${chapter_id}/update`, data),
  
  delete: (resource_type, chapter_id) => 
    apiClient.delete(`/${resource_type}/chapter/${chapter_id}`),
  
  
};



//Section Service
const sectionService = {
  // Section CRUD operations
  // Section creation 
  createSection: (resource_type, chapter_id, data) => 
    apiClient.post(`/${resource_type}/chapter/${chapter_id}/section/create`, data),
  
  getSections: (resource_type, chapter_id) => 
    apiClient.get(`/${resource_type}/chapter/${chapter_id}/sections`),

  getById: (resource_type, section_id) => 
    apiClient.get(`/${resource_type}/section/${section_id}`),
  
  update: (resource_type, section_id, data) => 
    apiClient.put(`/${resource_type}/section/${section_id}/update`, data),
  
  delete: (resource_type, section_id) => 
    apiClient.delete(`/${resource_type}/section/${section_id}`),
  
  
};



const sectionFileService = {
  // File operations
  upload: (resource_type, section_id, fileData, config) => 
    apiClient.post(`/${resource_type}/section/${section_id}/file/upload`, fileData, config),
  
  getAll: (resource_type, section_id) => 
    apiClient.get(`/${resource_type}/section/${section_id}/files`),
  
  delete: (resource_type, file_id) => 
    apiClient.delete(`/${resource_type}/file/${file_id}`),
};

// Export services
export { tagService, categoryGroupService, categoryService, resourceService, chapterService, sectionService, sectionFileService };