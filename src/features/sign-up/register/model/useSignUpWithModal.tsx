import { useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postSignUpForm } from "../api/post-sign-up-form";
import { SignUpFormProps } from "../../inputField";
import { useState } from "react";
import { useToastService } from "@/shared/ui";
import { SuccessModal } from "../ui/SuccessModal";

export function useSignUpWithModal() {
  const { getValues } = useFormContext<SignUpFormProps>();
  const { show } = useToastService();
  const [isOpen, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const allValues = getValues();
      return await postSignUpForm(allValues);
    },
    onSuccess: () => {
      setOpen(true);
    },
    onError: () => {
      show("회원가입 실패했습니다.");
    },
    retry: 0,
  });

  const modal = isOpen ? <SuccessModal setOpen={setOpen} /> : null;

  return { mutate: mutation.mutate, modal };
}
