import { SignUpPayload } from '../types/auth';
import { axiosAuthInstance } from '~/api/apiTransport';

const signUp = async (payload: SignUpPayload): Promise<string> => {
  await axiosAuthInstance.request({
    url: '/register',
    method: 'post',
    data: payload,
  });

  const resultAuth = await axiosAuthInstance.request({
    url: '/login',
    method: 'post',
    data: {
      email: payload.email,
      password: payload.password,
    },
  });

  return resultAuth.data.token;
};

export const authApi = { signUp } as const;
