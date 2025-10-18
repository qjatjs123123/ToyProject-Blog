"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useChangePageQuery() {
  const router = useRouter();
  const pathname = usePathname();

  const changePageQuery = useCallback(
    (page: number) => {
      const params = new URLSearchParams(window.location.search);

      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }

      const newUrl = `${pathname}?${params.toString()}`;
      router.replace(newUrl);
    },
    [router, pathname]
  );

  return changePageQuery;
}