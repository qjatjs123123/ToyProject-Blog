"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useAuth } from "../hooks/useAuth";
import Text from "./Text";

export default function Header() {
  const { data } = useAuth();

  return (
    <div className="flex items-center h-[60px] w-full bg-white fixed border-b border-[var(--color-line-400)] z-[100]">
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

        {data.userInfo && data.isAuth ? (
          <Text type="body" size="1" weight="bold">{data.userInfo.companyName}님</Text>
        ) : (
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
        )}
      </div>
    </div>
  );
}
