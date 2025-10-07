import { BlogBannerDTO, BlogBannerListDTO } from "../api/types";
import { BlogBannerList } from "../model/types";
import { mapBanner } from "./mapBanner";


export function mapBannerList(dto: BlogBannerListDTO): BlogBannerList {
  return dto.map((item) => mapBanner(item));
}
