import { ReactNode } from "react";
import Text from "@/app_/_components/Text";
import Image from "next/image";
import Link from "next/link";
import RightIcon from "@/app_/_components/svg/RightIcon";
import { blogNavigationData } from "@/utils/constants";

interface ThumbnailProps {
  thumbnail: string;
  title: string;
}
interface DateTextProps {
  value: string | number | Date;
}

export function BlogDetail({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full md:w-[568px] lg:w-[768px] py-20">
      {children}
    </div>
  );
}

function Category({ category: param }: { category: string }) {
  const { title, category } =
    blogNavigationData.find((item) => item.category === param) ?? {};

  return (
    <div className="flex text-[gray] mb-[10px]">
      <Link href={"/blogs"}>블로그</Link>
      <RightIcon />
      <Link href={`/blogs?category=${category}`}>{title}</Link>
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug mb-4">
      {children}
    </h1>
  );
}

function CreateAt({ value }: DateTextProps) {
  return (
    <p className="text-sm text-gray-500 mb-6">
      {new Date(value).toLocaleDateString("ko-KR")}
    </p>
  );
}

function Thumbnail({ thumbnail, title }: ThumbnailProps) {
  return (
    <div className="w-full aspect-[16/9] relative mb-8">
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="rounded-lg object-cover"
      />
    </div>
  );
}

function Summary({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg text-gray-700 leading-relaxed mb-10">{children}</p>
  );
}

function Content({ blog }: { blog: string }) {
  return (
    <article
      className="prose max-w-none prose-img:rounded-lg prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed"
      dangerouslySetInnerHTML={{ __html: blog }}
    />
  );
}

function Footer({ children }: { children: ReactNode }) {
  return <div className="flex justify-center mt-13">{children}</div>;
}

BlogDetail.Category = Category;
BlogDetail.Title = Title;
BlogDetail.CreateAt = CreateAt;
BlogDetail.Thumbnail = Thumbnail;
BlogDetail.Summary = Summary;
BlogDetail.Content = Content;
BlogDetail.Footer = Footer;
