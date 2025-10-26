import { useMutation, useQuery } from "@tanstack/react-query";
import { mapUserInfo } from "../lib/mapUserInfo";
import { getUserInfo } from "../api/get-user-info";

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: false,
  });
}
