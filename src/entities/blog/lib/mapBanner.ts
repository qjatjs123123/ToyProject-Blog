import { BlogBannerDTO } from "../api/dto/get-blog-banner-list-DTO";
import { BlogBanner } from "../model/blog-banner";

export function mapBanner(dto: BlogBannerDTO): BlogBanner {
  return {
    id: dto.id,
    title: dto.title,
    thumbnail: dto.thumbnail,
    summary: dto.summary,
  }
}
