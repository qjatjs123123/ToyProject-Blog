"use client";

import Button from "@/app/_components/Button";
import { useState } from "react";
import Text from "@/app/_components/Text";
import Link from "next/link";
import { useAtom } from "jotai";
import { snackMsg } from "@/utils/atoms";

interface CopyLinkProps {
  url?: string; // 기본값은 현재 페이지
}

export default function BlogDetailFooter({ url }: CopyLinkProps) {
  const [copied, setCopied] = useState(false);
  const [, setSnackMsg] = useAtom(snackMsg);
  const linkToCopy =
    url || typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 복사 상태 해제
      setSnackMsg("링크가 복사되었어요")
    } catch (err) {
      setSnackMsg("오류가 발생했어요")
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href="/blogs">
        <Button type="default" style="outline">
          목록으로 돌아가기
        </Button>
      </Link>

      <Button
        type="primary"
        style="outline"
        className="px-3 py-1 text-sm"
        onClick={handleCopy}
      >
        공유하기
      </Button>
    </div>
  );
}
