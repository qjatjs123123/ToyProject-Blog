import { CATEGORY, PAGE, TERM } from "@/entities/blog";
import { useNavigationHistory } from "@/shared/model/useNavigationHistory";
import { useSearchParams } from "next/navigation";

export function useBlogCategory() {
  const { replace } = useNavigationHistory();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get(CATEGORY) ?? "";

  const selectTab = (tabCategory: string) => {
    const params = new URLSearchParams(window.location.search);

    if (tabCategory) params.set(CATEGORY, tabCategory);
    else params.delete(CATEGORY);

    params.delete(TERM);
    params.delete(PAGE);

    replace(`${window.location.pathname}?${params.toString()}`);
  };

  return { activeTab, selectTab };
}
