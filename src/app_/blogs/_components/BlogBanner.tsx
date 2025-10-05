import Error from "@/app_/_components/Error";
import { BlogBannerProps } from "../type/types";
import BlogBannerCard from "./BlogBannerCard";

const fetchBannerData = async (): Promise<BlogBannerProps | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/banners`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw "Network response was not ok";
    const data: BlogBannerProps = await response.json();
    return data;
  } catch (error) {
    console.error("배너 API 오류");
    return null;
  }
};

export default async function BlogBanner() {
  const data: BlogBannerProps | null = await fetchBannerData();

  if (!data) return <Error type="Empty" />;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {data.map((banner) => (
        <BlogBannerCard key={banner.id} banner={banner} />
      ))}
    </div>
  );
}
