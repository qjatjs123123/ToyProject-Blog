import { mapBlogList } from "../lib/mapBlogList";
import { BlogListDTO, FetchBlogsParams } from "./types";

export async function getBlogList({ page, category, term }: FetchBlogsParams) {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (category) params.append("category", category);
  if (term) params.append("term", term);
  params.append("pageSize", "12");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data: BlogListDTO = await res.json(); 
  return mapBlogList(data);                    
}
