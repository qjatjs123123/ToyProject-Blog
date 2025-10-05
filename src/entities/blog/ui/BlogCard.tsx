import Image from "next/image";
import Link from "next/link";
import Text from "@/app_/_components/Text";
import { BlogCard as BlogCardType} from "../model/types";

interface Params {
  data: BlogCardType;
}

export default function BlogCard({ data }: Params) {
  return (
    <Link href={`/blogs/${data.id}`}>
      <div className="flex flex-col gap-2">
        <div className="relative aspect-[2/1] overflow-hidden rounded-2xl">
          <Image src={data.thumbnail} loading="lazy" alt={data.title} fill/>
        </div>
        <p>
          <Text
            type="body"
            size="3"
            weight="medium"
            className="text-[var(--color-secondary-400)]"
          >
            {data.category}
          </Text>
        </p>
        <h3 className="line-clamp-2">
          <Text type="title" size="4" weight="medium">
            {data.title}
          </Text>
        </h3>
        <p className=" text-[var(--color-label-500)]">
          <Text type="body" size="3">
            {data.createdAt}
          </Text>
        </p>
      </div>
    </Link>
  );
}
