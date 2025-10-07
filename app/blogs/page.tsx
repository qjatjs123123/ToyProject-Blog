import { BlogBannerList } from "@/widgets/BlogBannerList";
import { BlogList } from "@/widgets/BlogList";
import { prefetchBlogList } from "@/widgets/BlogList/api/prefetchBlogList";
import { BlogListHeader } from "@/widgets/BlogListHeader";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

interface SearchParamsProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    term?: string;
    pageSize: string;
  }>;
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { page = "1", category = "", term = "" } = (await searchParams) ?? {};
  const { data, queryClient } = await prefetchBlogList({
    page,
    category,
    term,
  });


  return (
    <div>
      <BlogListHeader />
      <BlogBannerList />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div></div>}>

          <BlogList />
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
