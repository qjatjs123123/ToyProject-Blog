"use client";

import Button from "@/app_/_components/Button";
import { toastMessage } from "@/shared/ui/Toast/model/action";
import { useSetAtom } from "jotai";

export function CopyToLinkButton() {
  const setToastMessage = useSetAtom(toastMessage);
  const linkToCopy = typeof window !== "undefined" ? window.location.href : "";
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setToastMessage("링크가 복사되었어요")
    } catch (err) {
      setToastMessage("오류가 발생했어요")
    }
  };

  return (
    <Button
      type="primary"
      style="outline"
      className="px-3 py-1 text-sm"
      onClick={handleCopy}
    >
      공유하기
    </Button>
  );
}
