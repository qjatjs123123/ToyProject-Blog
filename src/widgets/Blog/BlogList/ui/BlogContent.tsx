"use client";

import { useGetBlogsList } from "@/entities/blog";
import { Empty } from "./Empty";
import { BlogList } from "./BlogList";
import { Pagination } from "./Pagination";

export function BlogContent() {
  const { data } = useGetBlogsList();
  const isEmpty = data?.list.length === 0;

  return isEmpty ? (
    <Empty />
  ) : (
    <>
      <BlogList data={data} />
      <Pagination />
    </>
  );
}
