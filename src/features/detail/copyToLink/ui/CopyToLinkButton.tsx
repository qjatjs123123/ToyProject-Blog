'use client'

import Button from "@/app_/_components/Button";

export function CopyToLinkButton() {

  const linkToCopy = typeof window !== "undefined" ? window.location.href : "";
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
    } catch (err) {
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
