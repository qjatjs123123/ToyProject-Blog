import { validateShowSummary } from "../lib/validateShowSummary";
import { BlogSearchSummary } from "./BlogSearchSummary";

interface BlogSummaryProps {
  term: string;
  totalCount: number;
}

export function BlogSummary({ term, totalCount }: BlogSummaryProps) {
  return validateShowSummary(term) ? null : (
    <BlogSearchSummary term={term} totalCount={totalCount} />
  );
}
