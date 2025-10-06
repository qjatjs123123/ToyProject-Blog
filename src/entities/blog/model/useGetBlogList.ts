"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getBlogList } from "../api/getBlogList";
import { useSearchParams } from "next/navigation";

export function useGetBlogsList() {
  const searchParams = useSearchParams();

  const page = searchParams?.get("page") ?? "1";
  const category = searchParams?.get("category") ?? "";
  const term = searchParams?.get("term") ?? "";

  return useSuspenseQuery({
    queryKey: ["blogs", page, category, term],
    queryFn: () => getBlogList({ page, category, term }),
    staleTime: 60_000, 
  });
}
