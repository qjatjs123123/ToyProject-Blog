export interface BlogDetail {
  id: number;
  category: string; // TIP, NEWS 등 카테고리
  title: string;
  thumbnail: string; // 이미지 URL
  summary: string;
  content: string; // HTML 문자열
  createdAt: string; // "2023-08-22 14:59:37"
  updatedAt: string; // "2025-07-10 09:03:13"
}