import Text from "@/app/_components/Text";
import { BlogDetailProps } from "../type/types";
import Error from "@/app/_components/Error";
import Image from "next/image";
import { BlogDetail } from "./_components/BlogDetail";
import BlogDetailFooter from "./_components/BlogDetailFooter";

export const dynamic = "force-static";

interface SearchParamsProps {
  params?: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SearchParamsProps) {
  const { id } = (await params) ?? {};

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`,
    { cache: "force-cache" }
  );

  if (!res.ok) return {};

  const blog: BlogDetailProps = await res.json();

  return {
    title: `${blog.title}`,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      images: [blog.thumbnail],
    },
  };
}

export default async function Page({ params }: SearchParamsProps) {
  const { id } = (await params) ?? {};

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`,
      { cache: "force-cache" }
    );
    if (!res.ok) throw "Failed to fetch blog";
    const blog: BlogDetailProps = await res.json();

    return (
      <>
        <BlogDetail>
          <BlogDetail.Category category={blog.category} />
          <BlogDetail.Title>{blog.title}</BlogDetail.Title>
          <BlogDetail.CreateAt value={blog.createdAt} />
          <BlogDetail.Thumbnail title={blog.title} thumbnail={blog.thumbnail} />
          <BlogDetail.Summary>{blog.summary}</BlogDetail.Summary>
          <BlogDetail.Content blog={blog.content} />
          <BlogDetail.Footer>
            <BlogDetailFooter />
          </BlogDetail.Footer>
        </BlogDetail>
      </>
    );
  } catch (error) {
    return <Error type="Error" />;
  }
}
