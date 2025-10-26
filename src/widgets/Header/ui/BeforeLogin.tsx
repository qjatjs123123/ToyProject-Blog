import { Button } from "@/shared/ui";
import Link from "next/link";

export function BeforeLogin() {
  return (
    <div className="flex gap-3">
      <Link href="/sign-up">
        <Button type="primary" style="outline" className="!h-[35px]">
          회원가입
        </Button>
      </Link>
      <Link href="/sign-in">
        <Button type="default" style="outline" className="!h-[35px]">
          로그인
        </Button>
      </Link>
    </div>
  );
}
