import { toastMessage } from "@/shared/ui/Toast/model/action";
import { useSetAtom } from "jotai";

export function useToastService() {
  const setToastMessage = useSetAtom(toastMessage);
  return {
    show: (msg: string) => setToastMessage(msg),
  };
}
