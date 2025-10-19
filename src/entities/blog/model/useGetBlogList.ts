"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getBlogList } from "../api/get-blog-list";
import { useSearchParams } from "next/navigation";
import { CATEGORY, PAGE, TERM } from "../config/constants";

export function useGetBlogsList() {
  const searchParams = useSearchParams();

  const page = searchParams?.get(PAGE) ?? "1";
  const category = searchParams?.get(CATEGORY) ?? "";
  const term = searchParams?.get(TERM) ?? "";

  return useSuspenseQuery({
    queryKey: ["blogs", page, category, term],
    queryFn: () => getBlogList({ page, category, term }),
    staleTime: 60_000, 
  });
}
