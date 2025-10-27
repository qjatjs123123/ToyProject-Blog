// src/application/copyLinkUseCase.ts
import { copyTextToClipboard } from "@/shared/lib/copyTextToClipboard";
import { useToastService } from "@/shared/ui";
import { MESSAGE } from "../config/constants";

export function useCopyToLink() {
  const toast = useToastService();

  const copyLink = async (link: string) => {
    try {
      await copyTextToClipboard(link);
      toast.show(MESSAGE.success);
    } catch {
      toast.show(MESSAGE.error);
    }
  };

  return { copyLink };
}
