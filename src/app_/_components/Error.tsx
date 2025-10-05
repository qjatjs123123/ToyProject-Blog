import Image from "next/image";
import Text from "./Text";
import Link from "next/link";

interface ErrorProps {
  type: "Error" | "Empty";
}

export default function Error({ type }: ErrorProps) {
  const title = type === "Error" ? "다시 시도해주세요" : "검색 결과가 없어요";
  const content =
    type === "Error"
      ? "서버에 잠깐 문제가 생겼어요"
      : "아래와 같은 단어로 다시 검색해보세요";

  return (
    <div className="flex flex-col items-center py-[50px]">
      <div
        className="relative 
    w-[50px] h-[50px] 
    md:w-[80px] md:h-[80px] 
    lg:w-[100px] lg:h-[100px] mb-[20px]"
      >
        <Image
          src="/empty-box.webp"
          alt="빈 공간"
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Text type="title" size="4" weight="medium">
          {title}
        </Text>

        <Text
          type="body"
          size="2"
          weight="normal"
          className="text-[var(--color-label-700)]"
        >
          {content}
        </Text>

        {type === "Empty" && (
          <div className="flex text-[var(--color-primary)] text-[0.875.rem] font-semibold gap-3 justify-center">
            <Link href={"/blogs?term=트렌드"}>트렌드</Link>
            <Link href={"/blogs?term=올라소식"}>올라소식</Link>
            <Link href={"/blogs?term=이커머스"}>이커머스</Link>
          </div>
        )}
      </div>
    </div>
  );
}
