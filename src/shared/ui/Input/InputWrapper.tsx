"use client";
import { useState, ReactNode, ChangeEvent, useEffect } from "react";

type t = "text" | "password";

interface InputRenderProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setType: (v: t) => void;
  type: t;
}

interface InputProps {
  children: (props: InputRenderProps) => ReactNode;
  initialValue?: string;
  initalType?: t;
}

export function InputWrapper({
  children,
  initialValue = "",
  initalType = "text",
}: InputProps) {
  const [value, setValue] = useState("");
  const [type, setType] = useState(initalType);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <>{children({ value, onChange: handleChange, setType, type })}</>;
}
