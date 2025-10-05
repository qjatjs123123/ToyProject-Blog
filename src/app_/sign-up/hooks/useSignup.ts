import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormValues } from "../types/type";
import { publicApi } from "@/utils/axiosConfig";

export function useSignup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormValues) => {
      const response = await publicApi.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        formData
      );

      return response.data;
    },
    retry: 3,
  });
}
