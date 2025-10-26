"use client";

import { useUserInfo } from "@/entities/user/model/useUserInfo";
import { UserInfo } from "@/entities/user/ui/UserInfo";
import { Button } from "@/shared/ui";
import Nav from "@/shared/ui/Nav/ui/Nav";
import Image from "next/image";
import Link from "next/link";
import { BeforeLogin } from "./BeforeLogin";

export function Header() {
  const { data } = useUserInfo();
  const isAuth = !data ? false : true;

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
        {isAuth ? <UserInfo data={data} /> : <BeforeLogin />}
      </div>
      <Nav />
    </div>
  );
}
