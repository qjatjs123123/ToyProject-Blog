import { useMutation } from "@tanstack/react-query";
import { publicApi } from "@/utils/axiosConfig";
import { useAtom } from "jotai";
import { userInfoAtom } from "@/utils/atoms";

export function useUserInfo() {
  const [, setUserInfo] = useAtom(userInfoAtom);

  return useMutation({
    mutationFn: async (businessNumber: string) => {
      // 쿼리스트링으로 전달
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?businessNumber=${businessNumber}`;
      const response = await publicApi.get(url);

      return response.data;
    },
    onSuccess: (data) => {
      setUserInfo({
        isAuth: true,
        userInfo: data[0],
      });
    },
  });
}
