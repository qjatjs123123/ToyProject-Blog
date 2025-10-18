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

export interface PageListProps {
  pagination: PageNationProps
  grouping: GroupingProps
}

export interface PageNationProps {
  currentPage: number;
  pageNumbers: number[];
  totalPages: number;
}

export interface GroupingProps {
  currentGroupIndex: number;
  lastGroupIndex: number;
  getStartPageByGroup: (groupIndex: number) => number;
}
