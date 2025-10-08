"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getBlogList } from "../api/getBlogList";
import { useSearchParams } from "next/navigation";
import { CATEGORY, PAGE, TERM } from "./constants";

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
