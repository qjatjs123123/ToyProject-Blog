'use client';

import Input from "@/app/_components/Input";
import Text from "@/app/_components/Text";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";

export default function BlogTitle() {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 500);

  const updateUrl = useCallback((value: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set("term", value);
    } else {
      params.delete("term");
    }
    params.delete("page")
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, "", newUrl);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        updateUrl(term);
      }
    },
    [term, updateUrl]
  );

  useEffect(() => {
    if (debouncedTerm === "") {
      updateUrl(debouncedTerm);
    }
  }, [debouncedTerm, updateUrl]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const term = params.get("term") ?? "";
    setTerm(term);
  }, [])

  return (
    <header className="flex flex-col justify-between md:flex-row gap-6">
      <h2>
        <Text type="title" size="1" weight="bold">
          블로그
        </Text>
      </h2>
      <div>
        <Input
          type="search"
          placeholder="검색어를 입력해주세요"
          error={false}
          className="md:!w-[400px] lg:!w-[468px]"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </header>
  );
}
