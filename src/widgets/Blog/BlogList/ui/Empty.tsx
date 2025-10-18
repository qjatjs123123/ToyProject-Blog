import { EmptyMessage } from "@/shared/config";
import Error from "@/shared/ui/Error/Error";
import Link from "next/link";

export function Empty() {
  return (
    <Error
      image={EmptyMessage.src}
      title={EmptyMessage.title}
      content={EmptyMessage.content}
      alt={EmptyMessage.alt}
    >
      <div className="flex gap-3 text-[var(--color-primary)] text-[0.875rem] font-semibold justify-center">
        <Link href="/blogs?term=트렌드">트렌드</Link>
        <Link href="/blogs?term=올라소식">올라소식</Link>
        <Link href="/blogs?term=이커머스">이커머스</Link>
      </div>
    </Error>
  );
}
