"use client";
import { useNav } from "../model/useNav";
import Link from "next/link";
import RightIcon from "../../Icon/RightIcon";
import { Text } from "../../Text/Text";

export default function Nav() {
  const { navArr, isShow } = useNav();

  if (!isShow) return null; // 깔끔한 early return

  return (
    <div className="fixed top-[60px] w-full h-[40px] bg-[var(--color-label-100)] text-[0.875rem] text-[var(--color-label-700)] z-[100]">
      <div className="container flex items-center justify-end h-full">
        {navArr.map((item, index) => {
          const isLast = index === navArr.length - 1;
          return (
            <Text key={item.href} className="flex items-center gap-1">
              <Link href={item.href}>{item.name}</Link>
              {!isLast && <RightIcon />}
            </Text>
          );
        })}
      </div>
    </div>
  );
}
