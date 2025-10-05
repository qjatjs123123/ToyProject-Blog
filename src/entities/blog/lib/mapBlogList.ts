import { BlogListDTO } from "../api/types";
import { BlogCardList } from "../model/types";
import { mapBlog } from "./mapBlog";

export function mapBlogList(dto: BlogListDTO): BlogCardList {
  return {
    list: dto.list.map((item) => mapBlog(item)),
    totalCount: dto.totalCount,
    totalPages: dto.totalPages,
    page: dto.page,
    pageSize: dto.pageSize,
  }
}
