import { Text } from "@/shared/ui";
import classname from "classnames";
import { motion } from "framer-motion";
import { useBlogCategory } from "../model/useBlogCategory";

interface CategoryBlogButtonProps {
  title: string;
  tabCategory: string;
}

export function CategoryBlogButton({
  title,
  tabCategory,
}: CategoryBlogButtonProps) {
  const { activeTab, selectTab } = useBlogCategory();
  const isActive = activeTab === tabCategory;

  return (
    <button
      key={title}
      onClick={() => selectTab(tabCategory)}
      className="relative py-2 cursor-pointer"
    >
      <Text
        type="body"
        size="1"
        weight={isActive ? "semibold" : "normal"}
        className={classname({
          "text-black": isActive,
          "text-[var(--color-label-500)]": !isActive,
        })}
      >
        {title}
      </Text>
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute left-0 right-0 -bottom-[1px] h-[3px] bg-black rounded"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}
