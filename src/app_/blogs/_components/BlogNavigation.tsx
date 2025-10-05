'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Text from "@/app_/_components/Text";
import classname from "classnames";
import { blogNavigationData } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function BlogNavigation() {
  const [activeTab, setActiveTab] = useState("-1");
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category") ?? "";
    setActiveTab(categoryFromUrl);
  }, []);

  const handleTabClick = (tabCategory: string) => {
    setActiveTab(tabCategory);

    const params = new URLSearchParams(window.location.search);
    if (tabCategory) params.set("category", tabCategory);
    else params.delete("category");

    params.delete("page")
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  return (
    <nav className="flex justify-start gap-8 border-b border-[var(--color-line-200)] relative mt-8 md:mt-10 lg:mt-11">
      {blogNavigationData.map(({ title, category: tabCategory }) => (
        <button
          key={title}
          onClick={() => handleTabClick(tabCategory)}
          className="relative py-2 cursor-pointer"
        >
          <Text
            type="body"
            size="1"
            weight={activeTab === tabCategory ? "semibold" : "normal"}
            className={classname({
              "text-black": activeTab === tabCategory,
              "text-[var(--color-label-500)]": activeTab !== tabCategory,
            })}
          >
            {title}
          </Text>
          {activeTab === tabCategory && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-black rounded"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}
