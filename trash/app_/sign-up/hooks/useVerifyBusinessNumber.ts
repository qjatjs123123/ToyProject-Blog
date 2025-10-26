import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "@/utils/axiosConfig";

export function useVerifyBusinessNumber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (businessNumber: string) => {
      const response = await publicApi.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-business-number`,
        {
          businessNumber,
        }
      );

      return response.data;
    },
    retry: 0,
  });
}
