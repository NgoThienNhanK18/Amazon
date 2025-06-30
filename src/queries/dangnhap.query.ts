import { BaseRequestV2 } from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';

export const useHandleLogin = () => {
  return useMutation({
    mutationKey: ['handle-login'],
    mutationFn: async (payload: any) => {
      const loginResponse = await BaseRequestV2.Post(
        'https://api.fitverse.autopass.blog/auth/login-v2',
        payload
      );
      return loginResponse;
    }
  });
};
