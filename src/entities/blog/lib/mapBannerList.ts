import { BlogBannerList } from '../model/blog-banner';
import { mapBanner } from "./mapBanner";
import { BlogBannerListDTO } from '../api/dto/get-blog-banner-list-DTO';


export function mapBannerList(dto: BlogBannerListDTO): BlogBannerList {
  return dto.map((item) => mapBanner(item));
}
