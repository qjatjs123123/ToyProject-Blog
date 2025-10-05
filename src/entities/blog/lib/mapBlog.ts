import { BlogDTO } from "../api/types";
import { BlogCard } from "../model/types";


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
