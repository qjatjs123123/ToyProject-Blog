// BlogListWrapper.tsx
import BlogList from "./BlogList";
import { fetchBlogs } from "../hooks/fetchBlog";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import { withSuspense } from "../../_components/WithSuspense";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import Error from "@/app/_components/Error";
import { ErrorBoundary } from "react-error-boundary";
import Pagination from "./BlogPagination";

interface Props {
  page: string;
  category: string;
  term: string;
}

const BlogListWithSuspense = withSuspense(
  BlogList,
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-15 mt-9 md:mt-10">
    {Array.from({ length: 12 }).map((_, idx) => (
      <BlogCardSkeleton key={idx} />
    ))}
  </div>
);

export default async function BlogListWrapper({ page, category, term }: Props) {
  const queryClient = new QueryClient();

  const queryKey = ["blogs", { page, category, term }];
  try {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: () => fetchBlogs({ page, category, term }),
    });

    const data = queryClient.getQueryData<{
      totalPages: number;
      page: number;
    }>(queryKey) ?? { totalPages: 1, page: 1 };

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<Error type="Error" />}>
          <BlogListWithSuspense />
        </ErrorBoundary>
        <Pagination />
      </HydrationBoundary>
    );
  } catch (error) {
    console.log("블로그 조회 API 에러");
    return <Error type="Error" />;
  }
}
