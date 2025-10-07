import { mapBannerList } from "../lib/mapBannerList";
import { BlogBannerListDTO } from "./types";

export async function getBlogBannerList() {
  console.log("1");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/banners`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data: BlogBannerListDTO = await res.json();
  return mapBannerList(data);
}
