"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui";

export function BackToBlogButton() {
  const router = useRouter();

  return (
    <Button type="default" style="outline" onClick={() => router.back()}>
      목록으로 돌아가기
    </Button>
  );
}
