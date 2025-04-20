import {
  createPrintRequest,
  deletePrintRequest,
  fetchPrintRequestById,
  fetchPrintRequests,
  updatePrintRequest,
} from '@/lib/queries/printRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const usePrintRequets = () => {
  return useQuery({
    queryKey: ['printRequests'],
    queryFn: () => fetchPrintRequests(),
    placeholderData: (prev) => prev,
  });
};

export const usePrintRequetById = (id: string) => {
  return useQuery({
    queryKey: ['printRequest', id],
    queryFn: () => fetchPrintRequestById(id),
  });
};

export const useCreatePrintRequet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrintRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['printRequets'] });
    },
  });
};

export const useUpdatePrintRequet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePrintRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['printRequets'] });
      queryClient.invalidateQueries({ queryKey: ['printRequet', data._id] });
    },
  });
};

export const useDeletePrintRequet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePrintRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['printRequets'] });
    },
  });
};
