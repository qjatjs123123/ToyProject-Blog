import { postSignInForm, SignInFormProps } from "@/entities/sign-in";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

export function useLogin() {
  const queryClient = useQueryClient();
  const { getValues } = useFormContext<SignInFormProps>();
  
  return useMutation({
    mutationFn: async () =>{
      const allValues = getValues();
      await postSignInForm(allValues)
    },
  });
}
