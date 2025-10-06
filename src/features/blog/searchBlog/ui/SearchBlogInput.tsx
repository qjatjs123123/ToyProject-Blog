"use client";

import { Input, InputDebounceWrapper } from "@/shared/ui";
import { SearchIcon } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function SearchBlogInput() {
  const router = useRouter();
  
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const params = new URLSearchParams(window.location.search);
        const value = (e.target as HTMLInputElement).value;

        if (value) {
          params.set("term", value);
        } else {
          params.delete("term");
        }
        params.delete("page");

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.replace(newUrl);
      }
    },
    []
  );

  return (
    <InputDebounceWrapper delay={500}>
      {({ value, onChange }) => (
        <div className="relative w-full">
          <div className="absolute top-1/2 transform -translate-y-1/2 left-5 pointer ">
            <SearchIcon />
          </div>
          <Input
            value={value}
            onChange={onChange}
            onKeyDown = {handleKeyDown}
            placeholder="검색어를 입력해주세요"
            error={false}
            className="!pl-[3rem] md:!w-[400px] lg:!w-[468px] "
          />
        </div>
      )}
    </InputDebounceWrapper>
  );
}
