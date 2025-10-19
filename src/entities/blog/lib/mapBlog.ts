import { BlogDTO } from "../api/dto/get-blog-list-DTO";
import { BlogCard } from "../model/blog-list";


export function mapBlog(dto: BlogDTO): BlogCard {
  return {
    id: dto.id,
    title: dto.title,
    category: dto.category,
    thumbnail: dto.thumbnail,
    showCount: dto.showCount,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  }
}
