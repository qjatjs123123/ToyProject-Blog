import { mapBlogDetail } from "../lib/mapBlogDetail";
import { BlogDetailDTO } from "./dto/get-blog-detail-DTO";



export async function getBlogDetail(id : string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`,
    { cache: "force-cache" }
  );

  if (!res.ok) return {};

  const blog: BlogDetailDTO = await res.json();
  return mapBlogDetail(blog);
}
