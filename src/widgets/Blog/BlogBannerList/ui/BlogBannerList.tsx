import { BlogBannerCard, BlogBannerList as BannerType, getBlogBannerList } from "@/entities/banner";

export async function BlogBannerList() {
  const data: BannerType = await getBlogBannerList();

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {data.map((banner) => (
        <BlogBannerCard key={banner.id} banner={banner} />
      ))}
    </div>
  );
}
