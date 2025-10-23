import { useMutation } from "@tanstack/react-query";
import { postVerifyBusinessNumber } from "@/entities/sign-up/api/post-verify-business-number";

export function useVerifyBusinessNumber() {
  const mutation = useMutation({
    mutationFn: async (businessNumber: string) =>
      await postVerifyBusinessNumber(businessNumber),
    retry: 0,
  });

  return mutation; 
}
