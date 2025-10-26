import { pathNameMap } from "@/shared/config/constants";
import { usePathname } from "next/navigation";

export function useNav() {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean);

  // 특정 url만 체크
  if (
    !pathSegments ||
    pathSegments.length === 0 ||
    pathSegments[0] === "blogs" ||
    pathSegments[0] === "sign-up"
  )
    return { navArr: [], isShow: false };

  const result = [];
  const accumulatedPaths: string[] = [""];
  result.push({
    name: "홈",
    href: "/",
  });

  for (const segment of pathSegments) {
    accumulatedPaths.push(segment);

    result.push({
      name: pathNameMap[segment] ?? segment,
      href: accumulatedPaths.join("/"),
    });
  }

  return { navArr: result, isShow: true };
}
