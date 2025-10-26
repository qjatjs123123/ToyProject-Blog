'use client';
import { FC } from 'react';

export const BlogCardSkeleton: FC = () => {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      {/* 썸네일 */}
      <div className="relative aspect-[2/1] rounded-2xl bg-gray-200" />

      {/* 카테고리 */}
      <div className="h-4 w-24 bg-gray-200 rounded" />

      {/* 제목 */}
      <div className="h-6 w-full bg-gray-200 rounded mt-1" />

      {/* 작성일 */}
      <div className="h-4 w-32 bg-gray-200 rounded mt-1" />
    </div>
  );
};
