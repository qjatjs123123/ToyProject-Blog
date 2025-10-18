import Image from "next/image";
import { Text } from "../Text/Text";

interface ErrorProps {
  image: string;
  title: string;
  content: string;
  alt: string;
  children?: React.ReactNode;
}

export default function Error({
  image,
  alt,
  title,
  content,
  children,
}: ErrorProps) {
  return (
    <div className="flex flex-col items-center py-[200px]">
      <div
        className="relative 
    w-[50px] h-[50px] 
    md:w-[80px] md:h-[80px] 
    lg:w-[100px] lg:h-[100px] mb-[20px]"
      >
        <Image src={image} alt={alt} fill className="object-cover rounded" />
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

        {children}
      </div>
    </div>
  );
}
