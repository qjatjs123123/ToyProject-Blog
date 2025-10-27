"use client";

import { Button } from "@/shared/ui";
import { useCopyToLink } from "../model/useCopyToLink";


export function CopyToLinkButton() {
  const { copyLink } = useCopyToLink();
  const linkToCopy = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Button
      type="primary"
      style="outline"
      className="px-3 py-1 text-sm"
      onClick={() => copyLink(linkToCopy)}
    >
      공유하기
    </Button>
  );
}
