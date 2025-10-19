import { BlogDetail } from "@/entities/blog";
import { getBlogDetail } from "@/entities/blog/api/get-blog-detail";


interface SearchParamsProps {
  params?: Promise<{ id: string }>;
}


export default async function Page({ params }: SearchParamsProps) {
  const { id } = (await params) ?? {};
  if (!id) return null;

  const blog : BlogDetail = await getBlogDetail(id);
  console.log(blog);

  return <>d</>
}
