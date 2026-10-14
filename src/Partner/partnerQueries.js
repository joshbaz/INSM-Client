import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../store/tanstackStore/services/api";

// Partner Terminal data (Community Equippers & Technical Mentors). The server scopes every
// request to the signed-in member, so these never return other people's records.

const get = (path, params) => api.get(`/partner${path}`, { params }).then((r) => r.data);

export const usePartnerMe = () => useQuery({ queryKey: ["partner", "me"], queryFn: () => get("/me") });
export const usePartnerDashboard = () => useQuery({ queryKey: ["partner", "dashboard"], queryFn: () => get("/dashboard") });
export const useMothers = (params = {}) => useQuery({ queryKey: ["partner", "mothers", params], queryFn: () => get("/mothers", params) });
export const useMother = (id) => useQuery({ queryKey: ["partner", "mother", id], queryFn: () => get(`/mothers/${id}`), enabled: !!id });
export const usePartnerTiers = () => useQuery({ queryKey: ["partner", "tiers"], queryFn: () => get("/tiers") });
export const useReports = () => useQuery({ queryKey: ["partner", "reports"], queryFn: () => get("/reports") });
export const useTasks = () => useQuery({ queryKey: ["partner", "tasks"], queryFn: () => get("/tasks") });
export const useSupport = () => useQuery({ queryKey: ["partner", "support"], queryFn: () => get("/support") });
export const useAnnouncements = () => useQuery({ queryKey: ["partner", "announcements"], queryFn: () => get("/announcements") });

const usePartnerMutation = (mutationFn) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["partner"] }),
  });
};

export const useSaveMother = () => usePartnerMutation(({ id, ...mother }) =>
  (id ? api.patch(`/partner/mothers/${id}`, mother) : api.post("/partner/mothers", mother)).then((r) => r.data));
export const useCreateReport = () => usePartnerMutation((report) => api.post("/partner/reports", report).then((r) => r.data));
export const useWithdrawReport = () => usePartnerMutation((id) => api.delete(`/partner/reports/${id}`).then((r) => r.data));
export const useUpdateTask = () => usePartnerMutation(({ id, done }) => api.patch(`/partner/tasks/${id}`, { done }).then((r) => r.data));
export const useCreateSupport = () => usePartnerMutation((request) => api.post("/partner/support", request).then((r) => r.data));
export const useUpdateSupport = () => usePartnerMutation(({ id, ...changes }) => api.patch(`/partner/support/${id}`, changes).then((r) => r.data));
