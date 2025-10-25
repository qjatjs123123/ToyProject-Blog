"use client";
import { useState, ReactNode } from "react";

type typeProps = "text" | "password";

interface InputRenderProps {
  setType: (v: typeProps) => void;
  type: typeProps;
}

interface InputProps {
  children: (props: InputRenderProps) => ReactNode;
  initalType?: typeProps;
}

export function InputWrapper({ children, initalType = "text" }: InputProps) {
  const [type, setType] = useState(initalType);

  return <>{children({ setType, type })}</>;
}
