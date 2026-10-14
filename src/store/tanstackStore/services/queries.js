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

// Projects Queries
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects', 'public'],
    queryFn: api.getProjects,
  });
};

export const useProject = (idOrSlug) => {
  return useQuery({
    queryKey: ['projects', 'public', idOrSlug],
    queryFn: () => api.getProject(idOrSlug),
    enabled: !!idOrSlug,
    retry: false,
  });
};

export const useManagedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'manage'],
    queryFn: api.getManagedProjects,
  });
};

export const useManagedProject = (id) => {
  return useQuery({
    queryKey: ['projects', 'manage', id],
    queryFn: () => api.getManagedProject(id),
    enabled: !!id,
  });
};

// Any project change can move totals, so refresh every project query (and payment summaries)
const useProjectMutation = (mutationFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

export const useCreateProject = () => useProjectMutation((projectData) => api.createProject(projectData));
export const useUpdateProject = () => useProjectMutation(({ id, ...projectData }) => api.updateProject(id, projectData));
export const useDeleteProject = () => useProjectMutation((id) => api.deleteProject(id));
export const useAddProjectContribution = () => useProjectMutation(({ id, ...contribution }) => api.addProjectContribution(id, contribution));
export const useDeleteProjectContribution = () => useProjectMutation(({ id, paymentId }) => api.deleteProjectContribution(id, paymentId));
export const useAddImpactEntry = () => useProjectMutation(({ id, ...entry }) => api.addImpactEntry(id, entry));
export const useUpdateImpactEntry = () => useProjectMutation(({ id, entryId, ...entry }) => api.updateImpactEntry(id, entryId, entry));
export const useDeleteImpactEntry = () => useProjectMutation(({ id, entryId }) => api.deleteImpactEntry(id, entryId));
export const useExchangeRate = () => {
  return useQuery({
    queryKey: ['projects', 'exchange-rate'],
    queryFn: api.getExchangeRate,
  });
};

export const useUpdateExchangeRate = () => useProjectMutation((rate) => api.updateExchangeRate(rate));

// Account & Admin Team Queries
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profile) => api.updateProfile(profile),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'] }),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwords) => api.changePassword(passwords),
  });
};

export const useAdmins = () => {
  return useQuery({
    queryKey: ['admins'],
    queryFn: api.getAdmins,
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (admin) => api.createAdmin(admin),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'] }),
  });
};

export const useRemoveAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.removeAdmin(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'] }),
  });
};

// Seed-a-Cooperative Impact Queries
export const useTierImpact = () => {
  return useQuery({
    queryKey: ['tiers', 'impact'],
    queryFn: api.getTierImpact,
  });
};

export const useDefaultTier = () => {
  return useQuery({
    queryKey: ['tiers', 'default'],
    queryFn: api.getDefaultTier,
  });
};

export const useSetDefaultTier = () => useTierMutation((tierId) => api.setDefaultTier(tierId));

export const useSeedOverview = () => {
  return useQuery({
    queryKey: ['tiers', 'overview'],
    queryFn: api.getSeedOverview,
  });
};

export const useAllDeliveries = (params = {}) => {
  return useQuery({
    queryKey: ['tiers', 'all-deliveries', params],
    queryFn: () => api.getAllDeliveries(params),
  });
};

export const useTierDeliveries = (tierId) => {
  return useQuery({
    queryKey: ['tiers', 'deliveries', tierId],
    queryFn: () => api.getTierDeliveries(tierId),
    enabled: !!tierId,
  });
};

const useTierMutation = (mutationFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tiers'] });
      queryClient.invalidateQueries({ queryKey: ['executive-summary'] });
    },
  });
};

export const useAddTierDelivery = () => useTierMutation(({ tierId, ...delivery }) => api.addTierDelivery(tierId, delivery));
export const useUpdateTierDelivery = () => useTierMutation(({ tierId, deliveryId, ...delivery }) => api.updateTierDelivery(tierId, deliveryId, delivery));
export const useDeleteTierDelivery = () => useTierMutation(({ tierId, deliveryId }) => api.deleteTierDelivery(tierId, deliveryId));

export const useExecutiveSummary = () => {
  return useQuery({
    queryKey: ['executive-summary'],
    queryFn: api.getExecutiveSummary,
  });
};

// Programme Queries
export const usePrograms = () => {
  return useQuery({
    queryKey: ['programs', 'public'],
    queryFn: api.getPrograms,
  });
};

export const useManagedPrograms = () => {
  return useQuery({
    queryKey: ['programs', 'manage'],
    queryFn: api.getManagedPrograms,
  });
};

export const useManagedProgram = (id, params = {}) => {
  return useQuery({
    queryKey: ['programs', 'manage', id, params],
    queryFn: () => api.getManagedProgram(id, params),
    enabled: !!id,
  });
};

const useProgramMutation = (mutationFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['executive-summary'] });
      queryClient.invalidateQueries({ queryKey: ['payment-summary'] });
    },
  });
};

export const useCreateProgram = () => useProgramMutation((program) => api.createProgram(program));
export const useUpdateProgram = () => useProgramMutation(({ id, ...program }) => api.updateProgram(id, program));
export const useDeleteProgram = () => useProgramMutation((id) => api.deleteProgram(id));
export const useAddProgramContribution = () => useProgramMutation(({ id, ...contribution }) => api.addProgramContribution(id, contribution));
export const useDeleteProgramContribution = () => useProgramMutation(({ id, paymentId }) => api.deleteProgramContribution(id, paymentId));

// Same USD↔UGX rate the dashboard uses, for converting amounts on donation forms
export const usePublicExchangeRate = () => {
  return useQuery({
    queryKey: ['exchange-rate', 'public'],
    queryFn: api.getPublicExchangeRate,
    staleTime: 10 * 60 * 1000,
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
