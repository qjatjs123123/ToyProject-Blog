import { useState, useCallback } from "react";


export function useUniqueValue(init? : string) {
  const [value, setValue] = useState(init ?? "" );

  const setUniqueValue = useCallback((val : string) => {
    if (!val) return;
    const random = Math.random().toString(36).substring(2, 8); 
    setValue(`${val}_${random}`);
  }, []);


  const displayValue = value?.split("_")[0] ?? "";

  return [displayValue, setUniqueValue, value] as const;
}
