'use client'
import { useState, ReactNode, ChangeEvent } from "react";

interface InputRenderProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
  children: (props: InputRenderProps) => ReactNode;
}

export function InputWrapper({ children }: InputProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <>{children({ value, onChange: handleChange })}</>;
}
