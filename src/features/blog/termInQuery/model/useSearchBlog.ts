import { CATEGORY, PAGE, TERM } from "@/entities/blog";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface SearchFormValues {
  [TERM]: string;
}

export function useSearchBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const term = searchParams?.get(TERM) ?? "";
  const { control, reset } = useForm<SearchFormValues>({
    defaultValues: { [TERM]: term },
  });

  useEffect(() => {
    reset({ [TERM]: term });
  }, [term, reset]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const params = new URLSearchParams(window.location.search);
        const value = (e.target as HTMLInputElement).value;

        if (value) {
          params.set(TERM, value);
        } else {
          params.delete(TERM);
        }
        params.delete(CATEGORY);
        params.delete(PAGE);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.replace(newUrl);
      }
    },
    []
  );

  return {
    control,
    handleKeyDown,
  };
}
