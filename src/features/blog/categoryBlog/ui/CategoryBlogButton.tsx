import { Text } from "@/shared/ui";
import classname from "classnames";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CategoryBlogButtonProps {
  title: string;
  tabCategory: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export function CategoryBlogButton({
  title,
  tabCategory,
  activeTab,
  setActiveTab,
}: CategoryBlogButtonProps) {
  const router = useRouter();

  const handleTabClick = (tabCategory: string) => {
    setActiveTab(tabCategory);

    const params = new URLSearchParams(window.location.search);
    if (tabCategory) params.set("category", tabCategory);
    else params.delete("category");

    params.delete("page");
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
