import { Text } from "@/shared/ui";

interface BlogSearchSummaryProps {
  term: string;
  totalCount: number;
}

export function BlogSearchSummary({ term, totalCount }: BlogSearchSummaryProps) {

  return (
    <div className="w-full mt-10">
      <Text
        type="body"
        size="3"
        weight="medium"
        className="text-[var(--color-label-500)]"
        align="left"
      >
        {`'${term}'에 대한 ${totalCount}개의 검색 결과`}
      </Text>
    </div>
  );
}
