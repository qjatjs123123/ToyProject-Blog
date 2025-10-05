import {  useSuspenseQuery } from "@tanstack/react-query";
import { fetchBlogs } from "./fetchBlog";
import { useSearchParams } from "next/navigation";


export function useBlogsQuery() {
    const searchParams = useSearchParams();
  
    const page = searchParams.get('page') ?? "";
    const category = searchParams.get('category') ?? "";
    const term = searchParams.get('term') ?? "";

  return useSuspenseQuery({
    queryKey: ["blogs", {page, category, term}],
    queryFn: () => fetchBlogs({ page, category, term }),
    staleTime: 1000 * 60, 
  });
}
