export interface FetchBlogsParams {
  page?: string;
  category?: string;
  term?: string;
}

export interface BlogDTO {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  showCount: number;
  createdAt: string; // 날짜 문자열
  updatedAt: string; // 날짜 문자열
}

export interface BlogListDTO {
  list: BlogDTO[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}