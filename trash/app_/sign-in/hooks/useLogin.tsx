import { LoginRequestProps } from "@/app_/sign-up/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "@/utils/axiosConfig";
import { AxiosError } from "axios";
import { useUserInfo } from "./useUserInfo";
import { UseFormSetError } from "react-hook-form";

type mutateProps = {
  data: LoginRequestProps;
  checked: boolean;
  setSnackMsg: (a: string) => void;
  callback: () => void;
  setError: UseFormSetError<LoginRequestProps>;
};

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate } = useUserInfo();

  return useMutation({
    mutationFn: async (params: mutateProps) => {
      const response = await publicApi.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        params.data
      );
      return response.data;
    },

    onSuccess: (data, { data: formData, checked, setSnackMsg, callback }) => {
      if (checked) {
        localStorage.setItem("userID", formData.businessNumber);
      } else {
        localStorage.removeItem("userID");
      }

      mutate(formData.businessNumber);

      setSnackMsg("로그인 성공했어요");
      callback();

      queryClient.setQueryData(["accessToken"], data.accessToken);
      queryClient.setQueryData(["refreshToken"], data.refreshToken);
    },

    onError: (error: unknown, { setSnackMsg, setError }) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status && status === 400) {
          setError("businessNumber", {
            type: "server",
            message: "데이터 형식이 올바르지 않아요.",
          });
          setSnackMsg("데이터 형식이 올바르지 않아요.");
        } else if (status && status === 401) {
          setError("businessNumber", {
            type: "server",
            message: "로그인 정보가 일치하지 않아요. 다시 확인해 주세요.",
          });
          setSnackMsg("로그인 정보가 일치하지 않아요. 다시 확인해 주세요.");
        } else {
          setError("businessNumber", {
            type: "server",
            message: "서버 오류에요.",
          });
          setSnackMsg("서버 오류에요.");
        }
      }
    },
  });
}
