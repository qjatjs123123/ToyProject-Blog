'use client';

import { Text } from "@/shared/ui";
import { SearchBlogInput } from "@/features/blog/searchBlog";

export function BlogListHeader() {
  return (
    <header className="flex flex-col justify-between md:flex-row gap-6">
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
