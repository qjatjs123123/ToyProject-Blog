"use client";

import { Button } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="fixed top-0 w-full flex items-center h-[60px] bg-white border-b border-[var(--color-line-400)] z-[100]">
      <div className="container flex justify-between items-center">
        <Link href="/blogs" className="inline-block">
          <Image
            src={`/logo.png`}
            alt="allra logo"
            width={95}
            height={24}
            loading="lazy"
            decoding="async"
            style={{ color: "transparent" }}
          />
        </Link>

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
      </div>
    </div>
  );
}
