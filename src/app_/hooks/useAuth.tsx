import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicApi } from "@/utils/axiosConfig";
import { useAtom } from "jotai";
import { userInfoAtom } from "@/utils/atoms";
import { useEffect, useRef } from "react";
import { AxiosError } from "axios";
import { useUserInfo } from "../sign-in/hooks/useUserInfo";

export function useAuth() {
  const [data, setUserInfo] = useAtom(userInfoAtom);
  const queryClient = useQueryClient();
  const { mutate } = useUserInfo();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh-token`;

        const newRefreshToken = queryClient.getQueryData<string>([
          "refreshToken",
        ]);
        const response = await publicApi.post(url, {
          refreshToken: newRefreshToken,
        });

        // accessToken 갱신
        queryClient.removeQueries({ queryKey: ["accessToken"], exact: true });
        queryClient.setQueryData(["accessToken"], response.data.accessToken);

        // refreshToken 갱신
        queryClient.removeQueries({ queryKey: ["refreshToken"], exact: true });
        queryClient.setQueryData(["refreshToken"], response.data.refreshToken);
      } catch (err) {
        const axiosError = err as AxiosError;
        const status = axiosError?.response?.status;
        setUserInfo({
          isAuth: false,
          userInfo: null,
        });
        clearInterval(interval);
        if (status && status === 400) {
        }

        if (status && status === 401) {
        }
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [mutate, queryClient, setUserInfo]);

  return {
    data,
  };
}
