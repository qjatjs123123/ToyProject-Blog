import { PAGE } from "@/entities/blog/config/constants";

// 
export function getCurrentPage(searchParams: URLSearchParams | null) {
  const pageParam = searchParams?.get(PAGE);
  return pageParam ? Number(pageParam) : 1;
}