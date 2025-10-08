'use client';

import { Text } from "@/shared/ui";
import { SearchBlogInput } from "@/features/blog/termInQuery";

export function BlogListHeader() {
  return (
    <header className="flex flex-col justify-between md:flex-row gap-6 pb-10 pt-[24px] md:pt-[40px] lg:pt-[80px]">
      <h2>
        <Text type="title" size="1" weight="bold">
          블로그
        </Text>
      </h2>
      <div>
        <SearchBlogInput />
      </div>
    </header>
  );
}
