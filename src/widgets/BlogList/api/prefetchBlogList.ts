import { getBlogList } from "@/entities/blog";
import { BlogCardList } from "@/entities/blog";
import { QueryClient } from "@tanstack/react-query";
import { paramsProps } from "./types";

export async function prefetchBlogList({ page, category, term }: paramsProps) {
  const queryClient = new QueryClient();
  const queryKey = ["blogs", { page, category, term }];

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getBlogList({ page, category, term }),
  });

  const data = queryClient.getQueryData<BlogCardList>(queryKey) ?? {
    list: [],
    totalPages: 1,
    page: 1,
  };

  return data;
}
