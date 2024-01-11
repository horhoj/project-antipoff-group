import { axiosInstance } from '~/api/apiTransport';
import { FetchUserListResponse } from '~/features/userList/types/userList';

const fetchUserList = async (page: number) => {
  const result = await axiosInstance.request<FetchUserListResponse>({
    url: '/users',
    params: { page },
  });

  return result.data;
};

export const userListApi = { fetchUserList } as const;
