import { BlogBannerDTO } from "../api/types";
import { BlogBanner } from "../model/types";

export function mapBanner(dto: BlogBannerDTO): BlogBanner {
  return {
    id: dto.id,
    title: dto.title,
    thumbnail: dto.thumbnail,
    summary: dto.summary,
  }
}
