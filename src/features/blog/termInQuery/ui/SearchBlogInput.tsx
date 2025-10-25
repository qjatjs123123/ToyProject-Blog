"use client";

import { TERM } from "@/entities/blog";
import { Input } from "@/shared/ui";
import { SearchIcon } from "@/shared/ui";
import { Controller } from "react-hook-form";
import { useSearchBlog } from "../model/useSearchBlog";
import { SEARCH } from "../config/constants";

export function SearchBlogInput() {
  const { control, handleKeyDown } = useSearchBlog();

  return (
    <Controller
      name={TERM}
      control={control}
      render={({ field }) => (
        <div className="relative w-full">
          <div className="absolute top-1/2 transform -translate-y-1/2 left-5 pointer-events-none">
            <SearchIcon />
          </div>
          <Input
            {...field}
            placeholder={SEARCH.placeholder}
            value={field.value}
            onKeyDown={handleKeyDown}
            onChange={(e) => field.onChange(e.target.value)}
            error={false}
            className="!pl-[3rem] md:!w-[400px] lg:!w-[468px]"
          />
        </div>
      )}
    />
  );
}
