"use client";
import { CategoryBlogButton } from "@/features/blog/categoryBlog";
import { useEffect, useState } from "react";

const blogNavigationData = [
  { title: "전체", category: "" },
  { title: "트렌드", category: "TREND" },
  { title: "운영 팁", category: "TIP" },
  { title: "올라가이드", category: "GUIDE" },
  { title: "올라소식", category: "NEWS" },
  { title: "고객사례", category: "EXPERIENCE" },
];

export function BlogCategoryList() {
  const [activeTab, setActiveTab] = useState("-1");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category") ?? "";
    setActiveTab(categoryFromUrl);
  }, []);

  return (
    <nav className="flex justify-start gap-8 border-b border-[var(--color-line-200)] relative mt-8 md:mt-10 lg:mt-11">
      {blogNavigationData.map(({ title, category: tabCategory }, id) => (
        <CategoryBlogButton
          key={id}
          title={title}
          tabCategory={tabCategory}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </nav>
  );
}
