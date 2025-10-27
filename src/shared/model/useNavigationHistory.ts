"use client";

import { useRouter } from "next/navigation";

export function useNavigationHistory() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goForward = () => {
    if (typeof window !== "undefined") {
      window.history.forward();
    }
  };

  const goTo = (path: string) => {
    router.push(path);
  };

  const replace = (path: string) => {
    router.replace(path);
  };

  return { goBack, goForward, goTo, replace };
}
