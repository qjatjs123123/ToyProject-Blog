'use client'

import {
  LoginToken,
  postSignInForm,
  SignInFormProps,
} from "@/entities/sign-in";
import { toastMessage } from "@/shared/ui/Toast/model/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useCheck } from "../../saveBusinessID/model/CheckProvider";
import { deleteIdInLocalStorage, saveIdInLocalStorage } from "../../saveBusinessID";
import { useUserInfo } from "@/entities/user/model/useUserInfo";
import { useNavigationHistory } from "@/shared/model/useRouterHistory";
import { useToastService } from "@/shared/ui";
import { MESSAGE } from "../config/constants";

export function useLoginService() {
  const queryClient = useQueryClient();
  const { checked } = useCheck();
  const { getValues } = useFormContext<SignInFormProps>();
  const { goTo } = useNavigationHistory();
  const { show } = useToastService();
  const { refetch } = useUserInfo();

  return useMutation({
    mutationFn: async () => {
      const allValues = getValues();
      return await postSignInForm(allValues);
    },

    onSuccess: (data: LoginToken) => {
      show(MESSAGE.success);
      queryClient.setQueryData(["accessToken"], data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      goTo("/");

      const allValues = getValues();
      if (checked) saveIdInLocalStorage(allValues.businessNumber);
      else deleteIdInLocalStorage();

      refetch();
    },

    onError: (error: unknown) => {
      show(MESSAGE.error);
    },
  });
}
