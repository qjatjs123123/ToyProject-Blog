export interface BlogCard {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  showCount: number;
  createdAt: string; // 날짜 문자열
  updatedAt: string; // 날짜 문자열
}

export interface BlogCardList {
  list: BlogCard[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}