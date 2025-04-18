import { fetchUser, updateUser } from '@/lib/queries/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    placeholderData: (prev) => prev,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
