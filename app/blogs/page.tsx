import { BlogBanner } from "@/widgets/Blog/BlogBannerList";
import { BlogCategoryList } from "@/widgets/Blog/BlogCategoryList";
import { BlogContent } from "@/widgets/Blog/BlogList";
import { prefetchBlogList } from "@/widgets/Blog/BlogList/api/prefetchBlogList";
import { BlogListHeader } from "@/widgets/Blog/BlogListHeader";
import { BlogSummary } from "@/widgets/Blog/BlogSearchSummary";
import { Layout } from "@/widgets/Layout";
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
  const { queryClient, totalPages } = await prefetchBlogList({
    page,
    category,
    term,
  });

  return (
    <Layout>
      <BlogListHeader />
      <BlogBanner term={term} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div></div>}>
          <BlogCategoryList />
          <div className="flex flex-col">
            <BlogSummary term={term} totalCount={totalPages} />
            <BlogContent />
          </div>
        </ErrorBoundary>
      </HydrationBoundary>
    </Layout>
  );
}
