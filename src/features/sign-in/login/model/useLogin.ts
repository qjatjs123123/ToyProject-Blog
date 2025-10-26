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

export function useLogin() {
  const queryClient = useQueryClient();
  const { checked } = useCheck();
  const { getValues } = useFormContext<SignInFormProps>();
  const setToastMessage = useSetAtom(toastMessage);
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const allValues = getValues();
      return await postSignInForm(allValues);
    },

    onSuccess: (data: LoginToken) => {
      setToastMessage("로그인 성공했어요");
      queryClient.setQueryData(["accessToken"], data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      router.push("/");

      const allValues = getValues();
      if (checked) saveIdInLocalStorage(allValues.businessNumber);
      else deleteIdInLocalStorage();
    },

    onError: (error: unknown) => {
      setToastMessage("로그인 실패했어요");
    },
  });
}
