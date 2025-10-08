'use client'
import { useState, ReactNode, ChangeEvent, useEffect } from "react";

interface InputRenderProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
  children: (props: InputRenderProps) => ReactNode;
  initialValue?: string;
}

export function InputWrapper({ children, initialValue = "" }: InputProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <>{children({ value, onChange: handleChange })}</>;
}
