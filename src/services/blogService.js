import axios from 'axios';

const API_BASE_URL = 'http://localhost:8040';

// Create Axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};
// topics
const topicService = {
  getAllTopics: () => apiClient.get('/topics'),
  getById: (id) => apiClient.get(`/topics/${id}`),
  create: (data) => apiClient.post('/topics', data),
  update: (id, data) => apiClient.put(`/topics/${id}`, data),
  delete: (id) => apiClient.delete(`/topics/${id}`),
};

//Tag Service
//   const tagService = {
//     getAllTags: () => apiClient.get('/tags'),
//     getById: (id) => apiClient.get(`/tags/${id}`),
//     create: (data) => apiClient.post('/tags', data),
//     update: (id, data) => apiClient.put(`/tags/${id}`, data),
//     delete: (id) => apiClient.delete(`/tags/${id}`),
//   };

const tagService = {
  getAllTags: (resource_type) =>
    apiClient.get(`/km/${resource_type}/admin/tags`),

  create: (resource_type, data) =>
    apiClient.post(`/km/${resource_type}/admin/tag`, data),

  update: (resource_type, id, data) =>
    apiClient.put(`/km/${resource_type}/admin/tag/${id}`, data),

  // Optional: fallback or future use if backend adds them
  getById: (resource_type, id) => {
    console.warn("GET by ID not supported in current API spec.");
    return Promise.reject("Not implemented");
  },

  delete: (resource_type, id) => {
    console.warn("DELETE not supported in current API spec.");
    return Promise.reject("Not implemented");
  }
};

//CategoryGroups
const categoryGroupService = {
  getAllCategoryGroups: (resource_type) => apiClient.get(`/km/${resource_type}/admin/category-groups`),
  
  create: (data) => apiClient.post(`/km/${resource_type}/admin/category-group`, data),
  
};
//categories
const categoryService = {
  getAllCategories: (resource_type,category_group_id) => apiClient.get(`/km/${resource_type}/admin/${category_group_id}categories`),
 
  create: (resource_type, category_group_id, data) => apiClient.post(`/km/${resource_type}/admin/${category_group_id}category`, data),
  update: (id,resource_type, category_group_id, data) => apiClient.put(`/km/${resource_type}/admin/${category_group_id}category/${id}`, data),
  
};


//resouce Service

const resourceService = {
  // Basic CRUD 
  create: (resource_type, data) => apiClient.post(`/km/${resource_type}/create`, data),
  update: (resource_type, resource_id, data) => apiClient.put(`/km/${resource_type}/${resource_id}/update`, data),
  get: (resource_type, resource_id) => apiClient.get(`/km/${resource_type}/${resource_id}`),
  delete: (resource_type, resource_id) => apiClient.delete(`/km/${resource_type}/${resource_id}`),
  list: (resource_type) => apiClient.get(`/km/${resource_type}/list`),
  
  // Search 
  search: (resource_type, filters) => apiClient.get(`/km/${resource_type}/search`, { params: filters }),
  
  // Versioning operations
  clone: (resource_type, resource_id, data) => apiClient.post(`/km/${resource_type}/${resource_id}/clone`, data),
  getVersions: (resource_type, resource_id) => apiClient.get(`/km/${resource_type}/${resource_id}/versions`),
  getLatest: (resource_type, resource_id) => apiClient.get(`/km/${resource_type}/${resource_id}/latest`),
  
  // Status management
  updateStatus: (resource_type, resource_id, data) => apiClient.put(`/km/${resource_type}/${resource_id}/status`, data),
  updateProcessStatus: (resource_type, resource_id, data) => apiClient.put(`/km/${resource_type}/${resource_id}/process-status`, data),

  // Resource-Tag
  getMasterTags: (resource_type) => apiClient.get(`/km/${resource_type}/tags`),
  assignTags: (resource_type, resource_id, tags) => apiClient.post(`/km/${resource_type}/${resource_id}/tags`, { tags }),
  getAssignedTags: (resource_type, resource_id) => apiClient.get(`/km/${resource_type}/${resource_id}/tags`),

  // Resource-Category
  getMasterCategories: (resource_type) => apiClient.get(`/km/${resource_type}/categories`),
  assignCategories: (resource_type, resource_id, categories) => apiClient.post(`/km/${resource_type}/${resource_id}/categories`, { categories }),
  getAssignedCategories: (resource_type, resource_id) => apiClient.get(`/km/${resource_type}/${resource_id}/categories`),
  
  //Comments
  addComment: (resource_type, resource_id, comment) => 
    apiClient.post(`/km/${resource_type}/${resource_id}/comment`, comment),
  
  getComments: (resource_type, resource_id) => 
    apiClient.get(`/km/${resource_type}/${resource_id}/comments`),
  
  deleteComment: (commentId, userId) => 
    apiClient.delete(`/km/comments/${commentId}`, { params: { userId } }),

  // Ratings
  addRating: (resource_type, resource_id, rating, userId) => 
    apiClient.post(`/km/${resource_type}/${resource_id}/rating`, null, { 
      params: { userId, rating } 
    }),
  
  getRatings: (resource_type, resource_id) => 
    apiClient.get(`/km/${resource_type}/${resource_id}/ratings`),

  // Likes
  like: (resource_type, resource_id, userId) => 
    apiClient.post(`/km/${resource_type}/${resource_id}/like`, null, { 
      params: { userId } 
    }),
  
  unlike: (resource_type, resource_id, userId) => 
    apiClient.post(`/km/${resource_type}/${resource_id}/unlike`, null, { 
      params: { userId } 
    }),

  // Views
  trackView: (resource_type, resource_id) => 
    apiClient.post(`/km/${resource_type}/${resource_id}/view`),

  // Bookmarks
  addBookmark: (resource_type, resource_id, userId) => 
    apiClient.post(`/km/${resource_type}/${resource_id}/bookmark`, null, { 
      params: { userId } 
    }),
  
  removeBookmark: (resource_type, resource_id, userId) => 
    apiClient.delete(`/km/${resource_type}/${resource_id}/bookmark`, { 
      params: { userId } 
    })
};

//Chapter Service
const chapterService = {
  // Basic CRUD 
  create: (resource_type, resource_id, data) => 
    apiClient.post(`/km/${resource_type}/${resource_id}/chapter/create`, data),
  
  getAll: (resource_type, resource_id) => 
    apiClient.get(`/km/${resource_type}/${resource_id}/chapters`),
  
  getById: (resource_type, chapter_id) => 
    apiClient.get(`/km/${resource_type}/chapter/${chapter_id}`),
  
  update: (resource_type, chapter_id, data) => 
    apiClient.put(`/km/${resource_type}/chapter/${chapter_id}/update`, data),
  
  delete: (resource_type, chapter_id) => 
    apiClient.delete(`/km/${resource_type}/chapter/${chapter_id}`),
  
  
};



//Section Service
const sectionService = {
  // Section CRUD operations
  // Section creation 
  createSection: (resource_type, chapter_id, data) => 
    apiClient.post(`/km/${resource_type}/chapter/${chapter_id}/section/create`, data),
  
  getSections: (resource_type, chapter_id) => 
    apiClient.get(`/km/${resource_type}/chapter/${chapter_id}/sections`),

  getById: (resource_type, section_id) => 
    apiClient.get(`/km/${resource_type}/section/${section_id}`),
  
  update: (resource_type, section_id, data) => 
    apiClient.put(`/km/${resource_type}/section/${section_id}/update`, data),
  
  delete: (resource_type, section_id) => 
    apiClient.delete(`/km/${resource_type}/section/${section_id}`),
  
  
};



const sectionFileService = {
  // File operations
  upload: (resource_type, section_id, fileData, config) => 
    apiClient.post(`/km/${resource_type}/section/${section_id}/file/upload`, fileData, config),
  
  getAll: (resource_type, section_id) => 
    apiClient.get(`/km/${resource_type}/section/${section_id}/files`),
  
  delete: (resource_type, file_id) => 
    apiClient.delete(`/km/${resource_type}/file/${file_id}`),
};





// Blog Service
const blogService = {
  // Basic CRUD
  getAll: (params = {}) => apiClient.get('/blogs', { params }),
  getById: (id) => apiClient.get(`/blogs/${id}`),
  create: (data) => apiClient.post('/blogs', data),
  update: (id, data) => apiClient.put(`/blogs/${id}`, data),
  delete: (id) => apiClient.delete(`/blogs/${id}`),

  // Topics
  // getTopics: (blogId) => apiClient.get(`/blogs/${blogId}/topics`),
  // assignTopics: (blogId, topicIds) => apiClient.post(`/blogs/${blogId}/topics`, { topicIds }),
  // removeTopics: (blogId, topicIds) => apiClient.delete(`/blogs/${blogId}/topics`, { data: { topicIds } }),
  // getByTopic: (topicId) => apiClient.get(`/blogs/by-topic/${topicId}`),

//   // Likes
//   like: (blogId, userId) => apiClient.post(`/blogs/${blogId}/like`,null, { params: { userId } }).then(res => res.data),
//   unlike: (blogId, userId) => apiClient.delete(`/blogs/${blogId}/like`, { params: { userId } }).then(res => res.data),
//   getLikes: (blogId) => apiClient.get(`/blogs/${blogId}/likes`).then(res => res.data),
//   checkLike: (blogId, userId) => apiClient.get(`/blogs/${blogId}/hasLiked`, { params: { userId } }).then(res => res.data),

//   // Comments
//   getComments: (blogId) => apiClient.get(`/comments/blog/${blogId}`).then(res => res.data),
//   addComment: (blogId, comment) => apiClient.post(`/comments/blog/${blogId}`, comment).then(res => res.data),
//   editComment: (commentId, data, userId) =>
//   apiClient.put(`/comments/${commentId}`, data, {
//     params: { userId }
//   }).then(res => res.data),

// deleteComment: (commentId, userId) =>
//   apiClient.delete(`/comments/${commentId}`, {
//     params: { userId }
//   }).then(res => res.data),
};

// Export services
export { topicService, tagService, blogService, categoryGroupService, categoryService, resourceService, chapterService, sectionService, sectionFileService };