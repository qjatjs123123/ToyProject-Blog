export interface BlogBannerDTO {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
}

export type BlogBannerListDTO = BlogBannerDTO[]