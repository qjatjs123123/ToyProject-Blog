'use client';

import { Text } from "@/shared/ui";
import { useDebounce } from "@/app_/hooks/useDebounce";
import { SearchBlogButton } from "@/features/blog/searchBlog";
import { useCallback, useEffect, useState } from "react";

export function BlogListHeader() {
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
        <SearchBlogButton />
      </div>
    </header>
  );
}
