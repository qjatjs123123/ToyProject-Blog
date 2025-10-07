export interface FetchBlogsParams {
  page?: string;
  category?: string;
  term?: string;
}

export interface BlogBannerDTO {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
}

export type BlogBannerListDTO = BlogBannerDTO[]