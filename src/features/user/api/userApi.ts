import { axiosInstance } from '~/api/apiTransport';
import { FetchUserResponse } from '~/features/user/types/user';

const fetchUser = async (id: number) => {
  const result = await axiosInstance.request<FetchUserResponse>({
    url: `/users/${id}`,
  });

  return result.data;
};

export const userApi = { fetchUser } as const;
