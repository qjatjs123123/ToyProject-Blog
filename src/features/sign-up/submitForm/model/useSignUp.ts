import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { postSignUpForm } from "../api/post-sign-up-form";
import { toastMessage } from "@/shared/ui/Toast/model/action";
import { SignUpFormProps } from "../../inputFieldForm";
import { Dispatch, SetStateAction } from "react";

interface UseSignUpParams {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useSignUp({ setOpen }: UseSignUpParams) {
  const { getValues } = useFormContext<SignUpFormProps>();
  const setToastMessage = useSetAtom(toastMessage);

  const mutation = useMutation({
    mutationFn: async () => {
      const allValues = getValues();
      return await postSignUpForm(allValues);
    },
    onSuccess: () => {
      setOpen(true);
    },
    onError: () => {
      setToastMessage("회원가입 실패했습니다.");
    },
    retry: 0,
  });

  return mutation;
}
