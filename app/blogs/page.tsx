import { BlogBannerList } from "@/widgets/Blog/BlogBannerList";
import { BlogCategoryList } from "@/widgets/Blog/BlogCategoryList";
import { BlogList } from "@/widgets/Blog/BlogList";
import { prefetchBlogList } from "@/widgets/Blog/BlogList/api/prefetchBlogList";
import { BlogListHeader } from "@/widgets/Blog/BlogListHeader";
import { PageList } from "@/widgets/Blog/BlogPageList/ui/PageList";
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
  const { queryClient } = await prefetchBlogList({
    page,
    category,
    term,
  });

  return (
    <Layout>
      <BlogListHeader />
      <BlogBannerList />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<div></div>}>
          <BlogCategoryList />
          <BlogList />
          <PageList />
        </ErrorBoundary>
      </HydrationBoundary>
    </Layout>
  );
}
