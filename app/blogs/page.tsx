import BlogList from "@/widgets/BlogList/ui/BlogListWrapper";

interface SearchParamsProps {
  searchParams: Promise<{ page?: string; category?: string; term?: string, pageSize: string }>;
}

export default async function Page({ searchParams }: SearchParamsProps) {
  const { page = "", category = "", term = "" } = (await searchParams) ?? {};

  return (
    <div>
      <BlogList page={page} category={category} term={term}/>
    </div>
  );
}
