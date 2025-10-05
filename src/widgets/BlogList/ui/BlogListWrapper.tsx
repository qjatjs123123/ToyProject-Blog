import { getBlogList } from "@/entities/blog/api/getBlogList";
import { QueryClient } from "@tanstack/react-query";


interface Props {
  page: string;
  category: string;
  term: string;
}

export default async function BlogList({ page, category, term }: Props) {
  const queryClient = new QueryClient();

  const queryKey = ["blogs", { page, category, term }];
  try {
    await queryClient.prefetchQuery({
      queryKey,
      queryFn: () => getBlogList({ page, category, term }),
    });

    const data = queryClient.getQueryData<{
      totalPages: number;
      page: number;
    }>(queryKey) ?? { totalPages: 1, page: 1 };

    console.log(data);

    return (
      <div></div>
    );
  } catch (error) {
    console.log("블로그 조회 API 에러");
    return <div></div>
  }
}
