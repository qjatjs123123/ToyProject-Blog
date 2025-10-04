"use client";


import Error from "@/app/_components/Error";
import BlogCard from "./BlogCard";
import BlogSearchSummary from "./BlogSearchSummary";
import Pagination from "./BlogPagination";
import { useBlogsQuery } from "../hooks/useBlogsQuery";
import { useSearchParams } from "next/navigation";



export default function BlogList() {
  const searchParams = useSearchParams();
  const { data } = useBlogsQuery();

  const term = searchParams.get('term') ?? "";


  if (data?.list.length === 0) return <Error type="Empty" />;

  return (
    <div className="flex flex-col">
      <BlogSearchSummary term={term} totalCount={data?.totalCount ?? 0} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-15 mt-9 md:mt-10">
        {data?.list.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>
    </div>
  );
}
