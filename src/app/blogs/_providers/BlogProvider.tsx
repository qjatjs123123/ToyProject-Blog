'use client';

import { createContext, useContext, useState, ReactNode, MutableRefObject } from "react";

type BlogContextType = {
  category: string;
  setCategory: (value: string) => void;
  term : string;
  setTerm: (value: string) => void;
  page : string;
  setPage : (value: string) => void;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState("");
  const [term, setTerm] = useState("");
  const [page, setPage] = useState("");

  return (
    <BlogContext.Provider value={{ category, setCategory, term, setTerm, page, setPage }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
};
