"use client"

import BlogCard from "@/entities/blog/ui/BlogCard";
import { useGetBlogsList } from "@/entities/blog";

export function BlogList() {
  const { data } = useGetBlogsList();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-15 mt-9 md:mt-10">
      {data?.list.map((blog) => (
        <BlogCard key={blog.id} data={blog} />
      ))}
    </div>
  );
}
