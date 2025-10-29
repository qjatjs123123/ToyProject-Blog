/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { postVerifyBusinessNumber } from "@/entities/sign-up/api/post-verify-business-number";
import { useProgress } from "@/shared/ui/Progress/model/ProgressProvider";
import { useSetAtom } from "jotai";
import { toastMessage } from "@/shared/ui/Toast/model/action";
import { BUSINESS_ID } from "../config/constants";
import { useToastService } from "@/shared/ui";

export function useVerifyBusinessNumber() {
  const { setProgress, progress } = useProgress();
  const { show } = useToastService();

  const mutation = useMutation({
    mutationFn: async (businessNumber: string) =>
      await postVerifyBusinessNumber(businessNumber),
    onSuccess: () => {
      setProgress(progress + 21);
      show(BUSINESS_ID.success_message);
    },
    onError: (error) => {
      const response = (error as any).response;
      const data = response?.data;

      if (data?.errorCode === "INVALID_REQUEST") {
        show("사업자등록번호가 올바르지 않습니다.");
        return;
      }

      show("서버 오류가 발생했습니다");

    },
    retry: 0,
  });

  return mutation;
}
