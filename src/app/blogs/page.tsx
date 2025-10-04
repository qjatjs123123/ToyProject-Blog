import Container from "../_components/Container";
import BlogBanner from "./_components/BlogBanner";
import BlogNavigation from "./_components/BlogNavigation";
import BlogTitle from "./_components/BlogTitle";
import { BlogProvider } from "./_providers/BlogProvider";
import BlogListWrapper from "./_components/BlogListWrapper";

interface SearchParamsProps {
  searchParams: Promise<{ page?: string; category?: string; term?: string, pageSize: string }>;
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { page = "", category = "", term = "" } = (await searchParams) ?? {};

  return (
    <Container>
      <BlogProvider>
        <article className="pb-13 pt-[24px] md:py-[40px] lg:py-[80px]">
          <BlogTitle />
        </article>

        {/* <BlogBanner /> */}

        <article>
          <BlogNavigation />
          <BlogListWrapper page={page} category={category} term={term}/>
        </article>
      </BlogProvider>
    </Container>
  );
}
