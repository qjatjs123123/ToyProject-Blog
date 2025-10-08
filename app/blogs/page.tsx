import { BlogBannerList } from "@/widgets/Blog/BlogBannerList";
import { BlogCategoryList } from "@/widgets/Blog/BlogCategoryList";
import { BlogList } from "@/widgets/Blog/BlogList";
import { prefetchBlogList } from "@/widgets/Blog/BlogList/api/prefetchBlogList";
import { BlogListHeader } from "@/widgets/Blog/BlogListHeader";
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div></div>}>
          <BlogListHeader />
          <BlogBannerList />
          <BlogCategoryList/>
          <BlogList />
        </ErrorBoundary>
      </HydrationBoundary>
    </div>
  );
}
