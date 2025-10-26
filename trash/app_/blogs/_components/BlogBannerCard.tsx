import Image from "next/image";
import { BlogBanner } from "../type/types";

interface BlogCardProps {
  banner: BlogBanner;
}

export default function BlogCard({ banner }: BlogCardProps) {
  return (
    <div className="relative w-full lg:h-[350px] md:h-[325px] h-[300px] rounded-lg overflow-hidden shadow-lg group transition-transform duration-300 hover:scale-105">
      {/* 이미지 */}
      <Image
        src={banner.thumbnail}
        alt={banner.title}
        fill
        className="object-cover"
      />

      {/* 아래 summary 오버레이 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 text-2xl text-white transition-opacity duration-300 group-hover:opacity-0">
        <p className="overflow-hidden text-ellipsis custom-line-clamp">
          {banner.summary}
        </p>
      </div>

      {/* 아래쪽 그림자 */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/50 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0"></div>
    </div>
  );
}
