import Button from "@/app_/_components/Button";
import Link from "next/link";

export function BackToBlogButton() {
  return (
    <Link href="/blogs">
      <Button type="default" style="outline">
        목록으로 돌아가기
      </Button>
    </Link>
  );
}
