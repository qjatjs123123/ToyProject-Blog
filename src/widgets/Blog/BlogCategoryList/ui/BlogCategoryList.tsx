"use client";
import { blogNavigationData } from "@/entities/blog/model/constants";
import { CategoryBlogButton } from "@/features/blog/categoryBlog";

export function BlogCategoryList() {
  return (
    <nav className="flex justify-start gap-8 border-b border-[var(--color-line-200)] relative mt-8 md:mt-10 lg:mt-11">
      {blogNavigationData.map(({ title, category: tabCategory }, id) => (
        <CategoryBlogButton
          key={id}
          title={title}
          tabCategory={tabCategory}
        />
      ))}
    </nav>
  );
}
