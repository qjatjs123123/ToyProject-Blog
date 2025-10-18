import { BlogBannerList } from "./BlogBannerList";

interface BlogBannerProps {
  term: string;
}

export async function BlogBanner({ term }: BlogBannerProps) {
  return term ? null : <BlogBannerList />;
}
