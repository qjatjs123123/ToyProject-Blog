import Text from "@/app_/_components/Text";

interface BlogSearchSummaryProps {
  term: string;
  totalCount: number;
}

export default function BlogSearchSummary({ term, totalCount }: BlogSearchSummaryProps) {
  if (!term) return null; 

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
