"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";

interface ImageSkeletonProps {
  data: {
    thumbnail: string;
    title: string;
  };
  Skeleton?: ReactNode;
}

export function ImageSkeletonWrapper({ data, Skeleton }: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && Skeleton}

      {/* 실제 이미지 */}
      <Image
        src={data.thumbnail}
        alt={data.title}
        fill
        loading="lazy"
        onLoadingComplete={() => setLoaded(true)}
        className={`object-cover transition-opacity duration-300`}
      />
    </>
  );
}
