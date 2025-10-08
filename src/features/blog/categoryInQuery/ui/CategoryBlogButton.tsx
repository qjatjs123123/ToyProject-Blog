import { CATEGORY, PAGE, TERM } from "@/entities/blog";
import { Text } from "@/shared/ui";
import classname from "classnames";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryBlogButtonProps {
  title: string;
  tabCategory: string;

}

export function CategoryBlogButton({
  title,
  tabCategory,
}: CategoryBlogButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get(CATEGORY) ?? "";

  const handleTabClick = (tabCategory: string) => {
    const params = new URLSearchParams(window.location.search);
    
    if (tabCategory) params.set(CATEGORY, tabCategory);
    else params.delete(CATEGORY);

    params.delete(TERM);
    params.delete(PAGE);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  return (
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
  );
}
