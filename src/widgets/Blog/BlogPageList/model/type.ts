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
