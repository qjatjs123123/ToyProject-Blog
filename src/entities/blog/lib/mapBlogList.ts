import { BlogListDTO } from "../api/dto/get-blog-list-DTO";
import { BlogCardList } from "../model/blog-list";
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
