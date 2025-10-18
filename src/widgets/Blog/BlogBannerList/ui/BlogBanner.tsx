import { validateShowBanner } from "../lib/validateShowBanner";
import { BlogBannerList } from "./BlogBannerList";

interface BlogBannerProps {
  term: string;
}

export async function BlogBanner({ term }: BlogBannerProps) {
  return validateShowBanner(term) ? null : <BlogBannerList />;
}
