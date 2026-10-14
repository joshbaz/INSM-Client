import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './api';

// Metrics Queries
export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: api.getDashboardMetrics,
  });
};

// Applications/Leads Queries
export const useApplications = (filters = {}) => {
  return useQuery({
    queryKey: ['applications', filters],
    queryFn: () => api.getApplications(filters),
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }) => api.updateApplicationStatus(id, status),
    onSuccess: () => {
      // Invalidate applications list so it refreshes
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (applicationData) => api.createApplication(applicationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

// Articles Queries
export const useArticles = (filters = {}) => {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: () => api.getArticles(filters),
  });
};

export const useArticle = (id) => {
  return useQuery({
    queryKey: ['articles', id],
    queryFn: () => api.getArticle(id),
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (articleData) => api.createArticle(articleData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...articleData }) => api.updateArticle(id, articleData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['articles', variables.id] });
    },
  });
};

export const useArticleImages = (id) => {
  return useQuery({
    queryKey: ['articleImages', id],
    queryFn: () => api.getArticleImages(id),
    enabled: !!id,
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, deleteImages }) => api.deleteArticle(id, { deleteImages }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Photos Queries
export const useUploadPhoto = () => {
  return useMutation({
    mutationFn: ({ file, caption }) => api.uploadPhoto(file, caption),
  });
};

// Investment Tiers Queries
export const useTiers = () => {
  return useQuery({
    queryKey: ['tiers'],
    queryFn: api.getTiers,
  });
};

export const useCreateTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => api.createTier(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tiers'] });
    },
  });
};

export const useUpdateTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => api.updateTier(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tiers'] });
    },
  });
};

export const useDeleteTier = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.deleteTier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tiers'] });
    },
  });
};

// PesaPal Payment Queries
export const useInitiatePayment = () => {
  return useMutation({
    mutationFn: (payload) => api.initiatePayment(payload),
  });
};

export const usePaymentStatus = (orderTrackingId, options = {}) => {
  return useQuery({
    queryKey: ['payment-status', orderTrackingId],
    queryFn: () => api.getPaymentStatus(orderTrackingId),
    enabled: !!orderTrackingId,
    ...options,
  });
};

export const usePayments = (filters = {}) => {
  return useQuery({
    queryKey: ['payments', filters],
    queryFn: () => api.getPayments(filters),
  });
};

export const usePaymentSummary = () => {
  return useQuery({
    queryKey: ['payment-summary'],
    queryFn: api.getPaymentSummary,
  });
};
