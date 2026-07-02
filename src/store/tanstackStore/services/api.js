import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Applications
export const getApplications = async (filters = {}) => {
  const { data } = await api.get('/applications', { params: filters });
  return data;
};

export const updateApplicationStatus = async (id, status) => {
  const { data } = await api.patch(`/applications/${id}/status`, { status });
  return data;
};

export const createApplication = async (applicationData) => {
  const { data } = await api.post('/applications', applicationData);
  return data;
};

// Metrics
export const getDashboardMetrics = async () => {
  const { data } = await api.get('/metrics');
  return data;
};

// Articles
export const getArticles = async (filters = {}) => {
  const { data } = await api.get('/articles', { params: filters });
  return data;
};

export const getArticle = async (id) => {
  const { data } = await api.get(`/articles/${id}`);
  return data;
};

export const createArticle = async (articleData) => {
  const { data } = await api.post('/articles', articleData);
  return data;
};

export const updateArticle = async (id, articleData) => {
  const { data } = await api.patch(`/articles/${id}`, articleData);
  return data;
};

export const incrementArticleView = async (id) => {
  const { data } = await api.patch(`/articles/${id}/view`);
  return data;
};

export const incrementArticleRead = async (id) => {
  const { data } = await api.patch(`/articles/${id}/read`);
  return data;
};

// Photos
export const uploadPhoto = async (file, caption = '') => {
  const formData = new FormData();
  formData.append('image', file);
  if (caption) formData.append('caption', caption);

  const { data } = await api.post('/photos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Investment Tiers
export const getTiers = async () => {
  const { data } = await api.get('/tiers');
  return data;
};

export const createTier = async (formData) => {
  const { data } = await api.post('/tiers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const updateTier = async (id, formData) => {
  const { data } = await api.put(`/tiers/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteTier = async (id) => {
  const { data } = await api.delete(`/tiers/${id}`);
  return data;
};

export default api;
