"use client";

import { Input, InputWrapper } from "@/shared/ui";
import { SearchIcon } from "@/shared/ui";

export function SearchBlogButton() {
  return (
    <InputWrapper>
      {({ value, onChange }) => (
        <div className="relative w-full">
          <div className="absolute top-1/2 transform -translate-y-1/2 left-5 pointer ">
            <SearchIcon />
          </div>
          <Input
            value={value}
            onChange={onChange}
            placeholder="검색어를 입력해주세요"
            error={false}
            className="!pl-[3rem] md:!w-[400px] lg:!w-[468px] "
          />
        </div>
      )}
    </InputWrapper>
  );
}
