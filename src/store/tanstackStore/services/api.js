import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token for CRM/Executive queries
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("insm_user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const getArticleImages = async (id) => {
  const { data } = await api.get(`/articles/${id}/images`);
  return data;
};

export const deleteArticle = async (id, { deleteImages = false } = {}) => {
  const { data } = await api.delete(`/articles/${id}`, { params: { deleteImages } });
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

// Projects
export const getProjects = async () => {
  const { data } = await api.get('/projects');
  return data;
};

export const getProject = async (idOrSlug) => {
  const { data } = await api.get(`/projects/${idOrSlug}`);
  return data;
};

export const getManagedProjects = async () => {
  const { data } = await api.get('/projects/manage');
  return data;
};

export const getManagedProject = async (id) => {
  const { data } = await api.get(`/projects/manage/${id}`);
  return data;
};

export const createProject = async (projectData) => {
  const { data } = await api.post('/projects', projectData);
  return data;
};

export const updateProject = async (id, projectData) => {
  const { data } = await api.patch(`/projects/${id}`, projectData);
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`);
  return data;
};

export const addProjectContribution = async (id, contribution) => {
  const { data } = await api.post(`/projects/${id}/contributions`, contribution);
  return data;
};

export const deleteProjectContribution = async (id, paymentId) => {
  const { data } = await api.delete(`/projects/${id}/contributions/${paymentId}`);
  return data;
};

export const addImpactEntry = async (id, entry) => {
  const { data } = await api.post(`/projects/${id}/impact`, entry);
  return data;
};

export const updateImpactEntry = async (id, entryId, entry) => {
  const { data } = await api.patch(`/projects/${id}/impact/${entryId}`, entry);
  return data;
};

export const deleteImpactEntry = async (id, entryId) => {
  const { data } = await api.delete(`/projects/${id}/impact/${entryId}`);
  return data;
};

export const getExchangeRate = async () => {
  const { data } = await api.get('/projects/manage/exchange-rate');
  return data;
};

export const updateExchangeRate = async (usdToUgxRate) => {
  const { data } = await api.put('/projects/manage/exchange-rate', { usdToUgxRate });
  return data;
};

// Account & admin team (auth routes live outside /v1)
const authApi = (path) => `${api.defaults.baseURL.replace(/\/v1$/, '')}/auth${path}`;

export const updateProfile = async (profile) => {
  const { data } = await api.patch(authApi('/me'), profile);
  return data;
};

export const changePassword = async (passwords) => {
  const { data } = await api.put(authApi('/me/password'), passwords);
  return data;
};

export const getAdmins = async () => {
  const { data } = await api.get(authApi('/admins'));
  return data;
};

export const createAdmin = async (admin) => {
  const { data } = await api.post(authApi('/admins'), admin);
  return data;
};

export const removeAdmin = async (id) => {
  const { data } = await api.delete(authApi(`/admins/${id}`));
  return data;
};

// Seed-a-Cooperative impact (units funded vs delivered per tier)
export const getTierImpact = async () => {
  const { data } = await api.get('/tiers/impact');
  return data;
};

export const getSeedOverview = async () => {
  const { data } = await api.get('/tiers/overview');
  return data;
};

export const getAllDeliveries = async (params = {}) => {
  const { data } = await api.get('/tiers/deliveries', { params });
  return data;
};

export const getTierDeliveries = async (tierId) => {
  const { data } = await api.get(`/tiers/${tierId}/deliveries`);
  return data;
};

export const addTierDelivery = async (tierId, delivery) => {
  const { data } = await api.post(`/tiers/${tierId}/deliveries`, delivery);
  return data;
};

export const updateTierDelivery = async (tierId, deliveryId, delivery) => {
  const { data } = await api.patch(`/tiers/${tierId}/deliveries/${deliveryId}`, delivery);
  return data;
};

export const deleteTierDelivery = async (tierId, deliveryId) => {
  const { data } = await api.delete(`/tiers/${tierId}/deliveries/${deliveryId}`);
  return data;
};

// Executive home (dashboard routes live outside /v1)
export const getExecutiveSummary = async () => {
  const { data } = await api.get(`${api.defaults.baseURL.replace(/\/v1$/, '')}/dashboard/executive`);
  return data;
};

// PesaPal Payments
export const initiatePayment = async (payload) => {
  const { data } = await api.post('/payment/pesapal/donate', payload);
  return data;
};

export const getPaymentStatus = async (orderTrackingId) => {
  const { data } = await api.get(`/payment/pesapal/status`, {
    params: { orderTrackingId }
  });
  return data;
};

export const getPayments = async (filters = {}) => {
  const { data } = await api.get('/payment/pesapal/list', { params: filters });
  return data;
};

export const getPaymentSummary = async () => {
  const { data } = await api.get('/payment/pesapal/summary');
  return data;
};

export default api;
