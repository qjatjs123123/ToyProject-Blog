import { useMutation } from "@tanstack/react-query";
import { postVerifyBusinessNumber } from "@/entities/sign-up/api/post-verify-business-number";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useSetAtom } from "jotai";
import { toastMessage } from "@/shared/ui/Toast/model/action";
import { BUSINESS_ID } from "../config/constants";

export function useVerifyBusinessNumber() {
  const { setProgress, progress } = useProgress();
  const setToastMessage = useSetAtom(toastMessage);

  const mutation = useMutation({
    mutationFn: async (businessNumber: string) =>
      await postVerifyBusinessNumber(businessNumber),
    onSuccess: () => {
      setProgress(progress + 21);
      setToastMessage(BUSINESS_ID.success_message);
    },
    onError: (err) => {
      setToastMessage(BUSINESS_ID.api_error);
    },
    retry: 0,
  });

  return mutation;
}
