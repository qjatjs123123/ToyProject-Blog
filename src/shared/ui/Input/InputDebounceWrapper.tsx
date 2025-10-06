import { useDebounce } from "@/shared/lib";
import { useState, ReactNode, ChangeEvent } from "react";

interface InputRenderProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
  children: (props: InputRenderProps) => ReactNode;
  delay: number
}

export function InputDebounceWrapper({ children, delay }: InputProps) {
  const [value, setValue] = useState("");
  const debouncedTerm = useDebounce(value, delay);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <>{children({ value, onChange: handleChange })}</>;
}
