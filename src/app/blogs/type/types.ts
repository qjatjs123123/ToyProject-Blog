export interface BlogBanner {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
}

export interface BlogCardProps {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  showCount: number;
  createdAt: string; // 날짜 문자열
  updatedAt: string; // 날짜 문자열
}

export interface BlogListProps {
  list: BlogCardProps[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface BlogDetailProps {
  id: number;
  category: string; // TIP, NEWS 등 카테고리
  title: string;
  thumbnail: string; // 이미지 URL
  summary: string;
  content: string; // HTML 문자열
  createdAt: string; // "2023-08-22 14:59:37"
  updatedAt: string; // "2025-07-10 09:03:13"
}

export type BlogBannerProps = BlogBanner[];