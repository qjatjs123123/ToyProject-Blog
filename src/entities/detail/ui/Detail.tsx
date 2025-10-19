import { BlogDetail } from "../model/blog-detail";
import RightIcon from "@/shared/ui/Icon/RightIcon";
import Link from "next/link";
import Image from "next/image";
import { getBlogDetail } from "../api/get-blog-detail";

interface DetailProps {
  id: string;
}

export async function Detail({ id }: DetailProps) {
  const { category, title, content, createdAt, thumbnail, summary } =
    (await getBlogDetail(id)) as BlogDetail;

  return (
    <>
      <div className="flex text-[gray] mb-[10px]">
        <Link href={"/blogs"}>블로그</Link>
        <RightIcon />
        <Link href={`/blogs?category=${category}`}>{title}</Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
        {title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        {new Date(createdAt).toLocaleDateString("ko-KR")}
      </p>

      <div className="w-full aspect-[16/9] relative mb-8">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <p className="text-lg text-gray-700 leading-relaxed mb-10">{summary}</p>

      <article
        className="prose max-w-none prose-img:rounded-lg prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}
