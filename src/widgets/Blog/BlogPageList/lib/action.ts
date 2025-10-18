import { PAGE } from "@/entities/blog/model/constants";

// 
export function getCurrentPage(searchParams: URLSearchParams | null) {
  const pageParam = searchParams?.get(PAGE);
  return pageParam ? Number(pageParam) : 1;
}