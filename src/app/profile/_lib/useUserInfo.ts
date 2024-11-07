import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from './getUserInfo';
import putProfile from './putProfile';
import { IUpdateUser } from '@/types/profile';

export function useUserInfo(userId: number, accessToken: string) {
  const queryClient = useQueryClient();

  const {
    data: userInfo,
    isLoading,
    isError,
    error,
  } = useQuery(['userInfo', userId], () => getUserInfo(userId, accessToken), {
    enabled: !!accessToken,
  });

  const updateUserInfoMutation = useMutation(
    (userInfoData: IUpdateUser) => putProfile(userInfoData, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userInfo', userId]);
      },
      onError: (error) => {
        console.error('Failed to update user info:', error);
      },
    },
  );

  return {
    userInfo,
    updateUserInfo: updateUserInfoMutation.mutate,
    isLoading,
    isError,
    error,
  };
}
