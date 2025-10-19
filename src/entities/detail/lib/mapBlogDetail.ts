import { BlogDetailDTO } from "../api/dto/get-blog-detail-DTO";
import { BlogDetail } from "../model/blog-detail";

export function mapBlogDetail(dto: BlogDetailDTO): BlogDetail {
  return {
    id: dto.id,
    category: dto.category,
    title: dto.title,
    thumbnail: dto.thumbnail,
    summary: dto.summary,
    content: dto.content,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
